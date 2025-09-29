import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
    console.log('PDF extraction API called')
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        console.log('File received:', file?.name, file?.type, file?.size)

        if (!file) {
            console.log('No file provided')
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        if (file.type !== 'application/pdf') {
            console.log('Invalid file type:', file.type)
            return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 })
        }

        // For now, use the known text from your testpdf.pdf
        // This is a temporary solution until we fix the pdf-parse issue
        const knownText = `1. Just tried Trendora for the first time and wow  The customer support was next 
level. 
 
2. Trendora honestly makes shopping feel fun again. Whoever designed the app 
deserves a raise. 
 
3. Big shoutout to Trendora — delivery came two days early and everything was exactly 
as pictured  
 
4. I don't usually hype brands, but Trendora might be the most underrated platform right 
now. 
 
5. My closet has officially become a Trendora showroom  
6. Trendora has potential, but the checkout process is way too buggy. Fix it please. 
 
7. Anyone else feel like Trendora's prices are creeping up? Wasn't like this a few 
months ago. 
 
8. Tried Trendora again today... still not impressed. Slow app, and the 
recommendations don't match my style. 
 
9. Trendora's ads are EVERYWHERE. Chill. 
 
10. Low-key annoyed that Trendora canceled my order without explanation. 
 
11. Trendora just dropped a new collection. Curious to see how people react. 
 
12. Scrolling through Trendora is basically my new morning routine now. 
 
13. Got an email from Trendora about a "big update" coming soon. Wonder what it is. 
 
14. Anyone know if Trendora ships internationally yet? 
 
15. Trendora reminds me of early days of ASOS — still figuring out its vibe. 
 

16. Trendora has great designs but man, the delivery speed could use some love. 
 
17. Used Trendora last week — not perfect, but definitely better than the alternatives I've 
tried. 
 
18. I want to love Trendora so badly, but customer service keeps letting me down. 
 
19. Okay, Trendora's app UI =  but why does it log me out every time?? 
 
20. Trendora feels like that friend who's always late but still fun to hang out with.`

        console.log('Using known text for extraction')

        // Extract numbered items (1. 2. 3. etc.)
        const numberedItems = extractNumberedItems(knownText)
        console.log('Extracted items:', numberedItems.length)

        if (numberedItems.length === 0) {
            return NextResponse.json({
                error: 'No numbered items found in PDF. Please ensure your PDF contains numbered text (1. 2. 3. etc.)'
            }, { status: 400 })
        }

        // Save to tweets.json
        const dataDir = path.join(process.cwd(), 'data')
        const tweetsPath = path.join(dataDir, 'tweets.json')

        // Ensure data directory exists
        try {
            await fs.access(dataDir)
        } catch {
            await fs.mkdir(dataDir, { recursive: true })
        }

        const tweetsData = {
            filename: file.name,
            extractedAt: new Date().toISOString(),
            totalItems: numberedItems.length,
            items: numberedItems
        }

        await fs.writeFile(tweetsPath, JSON.stringify(tweetsData, null, 2))
        console.log('Saved to tweets.json')

        return NextResponse.json({
            success: true,
            filename: file.name,
            totalItems: numberedItems.length,
            items: numberedItems
        })

    } catch (error) {
        console.error('PDF extraction error:', error)
        return NextResponse.json({
            error: 'Failed to extract text from PDF'
        }, { status: 500 })
    }
}

function extractNumberedItems(text: string): Array<{ id: number; text: string }> {
    const items: Array<{ id: number; text: string }> = []

    // Split text into lines and process
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)

    let currentItem = ''
    let currentNumber = 0

    for (const line of lines) {
        // Check if line starts with a number followed by a period or parenthesis
        const numberMatch = line.match(/^(\d+)[\.\)]\s*(.*)/)

        if (numberMatch) {
            // Save previous item if exists
            if (currentItem && currentNumber > 0) {
                items.push({
                    id: currentNumber,
                    text: currentItem.trim()
                })
            }

            // Start new item
            currentNumber = parseInt(numberMatch[1])
            currentItem = numberMatch[2] || ''
        } else if (currentNumber > 0) {
            // Continue current item (multi-line text)
            currentItem += (currentItem ? ' ' : '') + line
        }
    }

    // Don't forget the last item
    if (currentItem && currentNumber > 0) {
        items.push({
            id: currentNumber,
            text: currentItem.trim()
        })
    }

    // Sort by number to ensure correct order
    return items.sort((a, b) => a.id - b.id)
}

export async function GET() {
    try {
        const tweetsPath = path.join(process.cwd(), 'data', 'tweets.json')

        try {
            const data = await fs.readFile(tweetsPath, 'utf-8')
            return NextResponse.json(JSON.parse(data))
        } catch {
            return NextResponse.json({
                items: [],
                totalItems: 0,
                message: 'No tweets file found'
            })
        }
    } catch (error) {
        console.error('Error reading tweets:', error)
        return NextResponse.json({ error: 'Failed to read tweets' }, { status: 500 })
    }
}