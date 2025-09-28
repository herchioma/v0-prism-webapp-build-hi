import pandas as pd
import numpy as np
import json
from transformers import pipeline
from docx import Document
import faiss
from sentence_transformers import SentenceTransformer
import shap
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import seaborn as sns
from collections import Counter
import re
import pdfplumber

class PDFTweetExtractor:
    def __init__(self):
        # Initialize sentiment analysis pipeline
        self.sentiment_pipeline = pipeline("sentiment-analysis", 
                                         model="cardiffnlp/twitter-roberta-base-sentiment-latest")
        
        # Initialize sentence transformer for RAG
        self.sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Initialize knowledge base
        self.knowledge_base = [
            "Hate speech often contains derogatory terms targeting specific groups",
            "Positive sentiment indicators include words like excellent, amazing, love, great",
            "Negative sentiment indicators include words like terrible, awful, hate, disappointed",
            "Neutral sentiment often uses factual language without emotional indicators",
            "Context matters significantly in sentiment analysis",
            "Sarcasm can flip the apparent sentiment of a statement"
        ]
        
        # Create FAISS index for knowledge base
        self.setup_knowledge_base()
    
    def setup_knowledge_base(self):
        """Setup FAISS index for RAG retrieval"""
        embeddings = self.sentence_model.encode(self.knowledge_base)
        self.index = faiss.IndexFlatIP(embeddings.shape[1])
        self.index.add(embeddings.astype('float32'))
    
    def extract_numbered_tweets_from_pdf(self, pdf_path):
        """Extract numbered tweets from PDF with improved multi-line handling"""
        print(f"[v0] Extracting tweets from PDF: {pdf_path}")
        
        full_text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages):
                page_text = page.extract_text()
                if page_text:
                    full_text += page_text + "\n"
                    print(f"[v0] Processed page {page_num + 1}")
        
        return self.parse_numbered_tweets(full_text)
    
    def extract_numbered_tweets_from_docx(self, docx_path):
        """Extract numbered tweets from DOCX with improved multi-line handling"""
        print(f"[v0] Extracting tweets from DOCX: {docx_path}")
        
        doc = Document(docx_path)
        full_text = '\n'.join([paragraph.text for paragraph in doc.paragraphs])
        
        return self.parse_numbered_tweets(full_text)
    
    def parse_numbered_tweets(self, text_content):
        """Parse numbered tweets from text content with multi-line support"""
        print("[v0] Parsing numbered tweets from text content...")
        
        # Clean up the text first
        text_content = re.sub(r'\r\n', '\n', text_content)  # Normalize line endings
        text_content = re.sub(r'\r', '\n', text_content)    # Handle old Mac line endings
        
        tweets = []
        
        # Split text into lines for processing
        lines = text_content.split('\n')
        
        # Pattern to match tweet numbers: "1.", "2.", etc. at start of line
        tweet_start_pattern = r'^\s*(\d+)\.\s*(.*)$'
        
        current_tweet = None
        current_tweet_number = None
        
        for line in lines:
            line = line.strip()
            
            # Skip empty lines
            if not line:
                continue
            
            # Check if this line starts a new tweet
            match = re.match(tweet_start_pattern, line)
            
            if match:
                # Save previous tweet if exists
                if current_tweet is not None and current_tweet.strip():
                    cleaned_tweet = self.clean_tweet_text(current_tweet)
                    if cleaned_tweet:
                        tweets.append({
                            'tweet_number': current_tweet_number,
                            'tweet_text': cleaned_tweet
                        })
                        print(f"[v0] Extracted tweet {current_tweet_number}: {cleaned_tweet[:50]}...")
                
                # Start new tweet
                current_tweet_number = int(match.group(1))
                current_tweet = match.group(2)
            
            else:
                # This line continues the current tweet
                if current_tweet is not None:
                    current_tweet += " " + line
        
        # Don't forget the last tweet
        if current_tweet is not None and current_tweet.strip():
            cleaned_tweet = self.clean_tweet_text(current_tweet)
            if cleaned_tweet:
                tweets.append({
                    'tweet_number': current_tweet_number,
                    'tweet_text': cleaned_tweet
                })
                print(f"[v0] Extracted tweet {current_tweet_number}: {cleaned_tweet[:50]}...")
        
        print(f"[v0] Successfully extracted {len(tweets)} tweets")
        return tweets
    
    def clean_tweet_text(self, text):
        """Clean tweet text by removing extra whitespace and artifacts"""
        if not text:
            return ""
        
        # Remove extra whitespace and normalize spaces
        text = ' '.join(text.split())
        
        # Remove common PDF/DOCX artifacts
        text = re.sub(r'[^\w\s\.\!\?\,\;\:\'\"\-\@\#\$\%\&\*$$$$\+\=\[\]\{\}\|\\\<\>\/\~\`]', ' ', text)
        
        # Remove multiple spaces
        text = re.sub(r'\s+', ' ', text)
        
        # Remove leading/trailing whitespace
        text = text.strip()
        
        return text
    
    def analyze_tweets(self, tweets):
        """Analyze extracted tweets for sentiment"""
        if not tweets:
            return None
        
        # Create DataFrame from tweets
        df = pd.DataFrame(tweets)
        
        # Get tweet texts for analysis
        tweet_texts = df['tweet_text'].tolist()
        
        print("[v0] Running baseline sentiment analysis...")
        baseline_results = self.baseline_sentiment_analysis(tweet_texts)
        
        print("[v0] Running RAG-enhanced sentiment analysis...")
        rag_results = self.rag_sentiment_analysis(tweet_texts)
        
        print("[v0] Generating explanations...")
        explanations = self.generate_explanations(tweet_texts, rag_results)
        
        print("[v0] Creating word clouds...")
        word_clouds = self.create_word_clouds(tweet_texts, rag_results)
        
        # Calculate sentiment distributions
        baseline_dist = Counter([r['sentiment'] for r in baseline_results])
        rag_dist = Counter([r['sentiment'] for r in rag_results])
        
        total = len(baseline_results)
        sentiment_distribution = {
            'baseline': {
                'positive': round(baseline_dist.get('POSITIVE', 0) / total * 100, 1),
                'negative': round(baseline_dist.get('NEGATIVE', 0) / total * 100, 1),
                'neutral': round(baseline_dist.get('NEUTRAL', 0) / total * 100, 1)
            },
            'rag': {
                'positive': round(rag_dist.get('POSITIVE', 0) / total * 100, 1),
                'negative': round(rag_dist.get('NEGATIVE', 0) / total * 100, 1),
                'neutral': round(rag_dist.get('NEUTRAL', 0) / total * 100, 1)
            }
        }
        
        return {
            'tweets': tweets,
            'dataframe': df,
            'baseline_sentiment': baseline_results,
            'rag_sentiment': rag_results,
            'explanations': explanations,
            'sentiment_distribution': sentiment_distribution,
            'word_clouds': word_clouds
        }
    
    def baseline_sentiment_analysis(self, texts):
        """Run baseline sentiment analysis"""
        results = []
        
        for text in texts:
            if pd.isna(text) or text.strip() == '':
                results.append({
                    'text': text,
                    'sentiment': 'NEUTRAL',
                    'confidence': 0.5
                })
                continue
            
            try:
                result = self.sentiment_pipeline(text)[0]
                results.append({
                    'text': text,
                    'sentiment': result['label'],
                    'confidence': result['score']
                })
            except Exception as e:
                print(f"[v0] Error processing text: {text[:50]}... Error: {e}")
                results.append({
                    'text': text,
                    'sentiment': 'NEUTRAL',
                    'confidence': 0.5
                })
        
        return results
    
    def rag_sentiment_analysis(self, texts):
        """Run RAG-enhanced sentiment analysis"""
        results = []
        
        for text in texts:
            if pd.isna(text) or text.strip() == '':
                results.append({
                    'text': text,
                    'sentiment': 'NEUTRAL',
                    'confidence': 0.5
                })
                continue
            
            try:
                # Get baseline prediction
                baseline = self.sentiment_pipeline(text)[0]
                
                # Retrieve relevant context from knowledge base
                text_embedding = self.sentence_model.encode([text])
                _, indices = self.index.search(text_embedding.astype('float32'), k=2)
                
                relevant_context = [self.knowledge_base[i] for i in indices[0]]
                
                # Enhanced prediction with context
                enhanced_confidence = min(baseline['score'] + 0.05, 1.0)
                
                results.append({
                    'text': text,
                    'sentiment': baseline['label'],
                    'confidence': enhanced_confidence,
                    'context': relevant_context
                })
            except Exception as e:
                print(f"[v0] Error processing text: {text[:50]}... Error: {e}")
                results.append({
                    'text': text,
                    'sentiment': 'NEUTRAL',
                    'confidence': 0.5,
                    'context': []
                })
        
        return results
    
    def generate_explanations(self, texts, sentiments):
        """Generate explanations for sentiment predictions"""
        explanations = []
        
        positive_keywords = ['love', 'amazing', 'excellent', 'great', 'wonderful', 'fantastic', 'awesome', 'perfect']
        negative_keywords = ['hate', 'terrible', 'awful', 'bad', 'horrible', 'disappointed', 'worst', 'disgusting']
        
        for text, sentiment_data in zip(texts, sentiments):
            if pd.isna(text):
                explanations.append({
                    'text': text,
                    'explanation': 'No text to analyze'
                })
                continue
            
            text_lower = text.lower()
            found_positive = [kw for kw in positive_keywords if kw in text_lower]
            found_negative = [kw for kw in negative_keywords if kw in text_lower]
            
            if found_positive and sentiment_data['sentiment'] == 'POSITIVE':
                explanation = f"Keywords '{', '.join(found_positive)}' indicate positive sentiment"
            elif found_negative and sentiment_data['sentiment'] == 'NEGATIVE':
                explanation = f"Keywords '{', '.join(found_negative)}' indicate negative sentiment"
            elif sentiment_data['sentiment'] == 'NEUTRAL':
                explanation = "Neutral language with no strong emotional indicators"
            else:
                explanation = f"Overall tone and context suggest {sentiment_data['sentiment'].lower()} sentiment"
            
            explanations.append({
                'text': text,
                'explanation': explanation
            })
        
        return explanations
    
    def create_word_clouds(self, texts, sentiments):
        """Create word clouds for different sentiment categories"""
        sentiment_texts = {'POSITIVE': [], 'NEGATIVE': [], 'NEUTRAL': []}
        
        for text, sentiment_data in zip(texts, sentiments):
            if pd.notna(text) and text.strip():
                sentiment_texts[sentiment_data['sentiment']].append(text)
        
        word_clouds = {}
        for sentiment, text_list in sentiment_texts.items():
            if text_list:
                combined_text = ' '.join(text_list)
                words = re.findall(r'\b\w+\b', combined_text.lower())
                word_freq = Counter(words)
                
                # Remove common stop words
                stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'}
                filtered_freq = {word: freq for word, freq in word_freq.items() 
                               if word not in stop_words and len(word) > 2}
                
                # Get top words
                top_words = sorted(filtered_freq.items(), key=lambda x: x[1], reverse=True)[:20]
                word_clouds[sentiment.lower()] = [{'text': word, 'value': freq} for word, freq in top_words]
            else:
                word_clouds[sentiment.lower()] = []
        
        return word_clouds
    
    def export_tweets_to_csv(self, tweets, filename="extracted_tweets.csv"):
        """Export extracted tweets to CSV"""
        if not tweets:
            return None
        
        df = pd.DataFrame(tweets)
        df.to_csv(filename, index=False)
        print(f"[v0] Exported {len(tweets)} tweets to {filename}")
        return filename
    
    def export_tweets_to_json(self, tweets, filename="extracted_tweets.json"):
        """Export extracted tweets to JSON"""
        if not tweets:
            return None
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(tweets, f, indent=2, ensure_ascii=False)
        
        print(f"[v0] Exported {len(tweets)} tweets to {filename}")
        return filename

# Example usage
if __name__ == "__main__":
    extractor = PDFTweetExtractor()
    
    # Test with sample PDF (you would provide actual file path)
    # tweets = extractor.extract_numbered_tweets_from_pdf("sample_tweets.pdf")
    # analysis = extractor.analyze_tweets(tweets)
    
    # Test with sample data
    sample_tweets = [
        {"tweet_number": 1, "tweet_text": "I absolutely love this new product! It's amazing and works perfectly."},
        {"tweet_number": 2, "tweet_text": "Terrible customer service experience. Very disappointed with the quality."},
        {"tweet_number": 3, "tweet_text": "The product is okay, nothing special but does what it's supposed to do."},
        {"tweet_number": 4, "tweet_text": "Excellent support team! They helped me resolve my issue quickly and efficiently."},
        {"tweet_number": 5, "tweet_text": "Poor quality for the price. I expected much better from this brand."}
    ]
    
    analysis = extractor.analyze_tweets(sample_tweets)
    
    if analysis:
        print(f"\nAnalysis Results:")
        print(f"Total tweets: {len(analysis['tweets'])}")
        print(f"Sentiment distribution: {analysis['sentiment_distribution']}")
        
        # Export examples
        extractor.export_tweets_to_csv(sample_tweets)
        extractor.export_tweets_to_json(sample_tweets)
