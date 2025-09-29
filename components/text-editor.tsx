'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Edit3,
  Save,
  X,
  Trash2,
  AlertTriangle,
  FileText,
  Download,
  RotateCcw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TweetItem {
  id: number
  text: string
}

interface TweetsData {
  filename?: string
  extractedAt?: string
  totalItems: number
  items: TweetItem[]
}

interface TextEditorProps {
  data: TweetsData
  onDataUpdate: (data: TweetsData) => void
  onNewUpload: () => void
}

export function TextEditor({
  data,
  onDataUpdate,
  onNewUpload,
}: TextEditorProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const startEdit = (item: TweetItem) => {
    setEditingId(item.id)
    setEditText(item.text)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const saveEdit = async () => {
    if (!editingId || !editText.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/tweets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, text: editText.trim() }),
      })

      if (response.ok) {
        // Update local data
        const updatedItems = data.items.map((item) =>
          item.id === editingId ? { ...item, text: editText.trim() } : item,
        )
        onDataUpdate({ ...data, items: updatedItems })
        setEditingId(null)
        setEditText('')
      } else {
        console.error('Failed to update tweet')
      }
    } catch (error) {
      console.error('Error updating tweet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this text item?')) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/tweets?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Update local data
        const updatedItems = data.items.filter((item) => item.id !== id)
        onDataUpdate({
          ...data,
          items: updatedItems,
          totalItems: updatedItems.length,
        })
      } else {
        console.error('Failed to delete tweet')
      }
    } catch (error) {
      console.error('Error deleting tweet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAll = async () => {
    if (
      !confirm(
        'Are you sure you want to delete ALL text items? This cannot be undone.',
      )
    )
      return

    setIsLoading(true)
    try {
      const response = await fetch('/api/tweets?all=true', {
        method: 'DELETE',
      })

      if (response.ok) {
        onDataUpdate({
          ...data,
          items: [],
          totalItems: 0,
        })
      } else {
        console.error('Failed to delete all tweets')
      }
    } catch (error) {
      console.error('Error deleting all tweets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'tweets.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadTXT = () => {
    const txtContent = data.items
      .map((item) => `${item.id}. ${item.text}`)
      .join('\n\n')
    const blob = new Blob([txtContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${data.filename?.replace('.pdf', '') || 'tweets'}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (data.items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Text Items Found</h3>
          <p className="text-muted-foreground text-center mb-4">
            Upload a PDF with numbered text items to get started.
          </p>
          <Button onClick={onNewUpload}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Upload New PDF
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display">
            Extracted Text Items
          </h2>
          <p className="text-muted-foreground">
            {data.filename} • {data.totalItems} items •
            {data.extractedAt &&
              ` Extracted ${new Date(data.extractedAt).toLocaleDateString()}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadTXT}>
            <Download className="h-4 w-4 mr-2" />
            Download TXT
          </Button>
          <Button variant="outline" onClick={downloadJSON}>
            <Download className="h-4 w-4 mr-2" />
            Download JSON
          </Button>
          <Button variant="outline" onClick={deleteAll} disabled={isLoading}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete All
          </Button>
          <Button onClick={onNewUpload}>
            <RotateCcw className="h-4 w-4 mr-2" />
            New Upload
          </Button>
        </div>
      </div>

      {/* Text Items */}
      <div className="space-y-4">
        {data.items.map((item) => (
          <Card key={item.id} className="relative">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Badge
                  variant="secondary"
                  className="text-sm font-mono min-w-[3rem] justify-center"
                >
                  {item.id}
                </Badge>

                <div className="flex-1 space-y-3">
                  {editingId === item.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="min-h-[100px] resize-y"
                        placeholder="Enter text content..."
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          disabled={isLoading || !editText.trim()}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          disabled={isLoading}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {item.text}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(item)}
                          disabled={isLoading || editingId !== null}
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteItem(item.id)}
                          disabled={isLoading}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Info */}
      <Card className="border-muted">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <span>
              Changes are automatically saved to{' '}
              <code className="bg-muted px-1 rounded">data/tweets.json</code>.
              New uploads will replace all existing content.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
