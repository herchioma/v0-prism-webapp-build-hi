import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

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

const tweetsPath = path.join(process.cwd(), 'data', 'tweets.json')

// GET - Read tweets
export async function GET() {
    try {
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

// PUT - Update a specific tweet
export async function PUT(request: NextRequest) {
    try {
        const { id, text } = await request.json()

        if (!id || text === undefined) {
            return NextResponse.json({ error: 'ID and text are required' }, { status: 400 })
        }

        // Read current data
        let tweetsData: TweetsData
        try {
            const data = await fs.readFile(tweetsPath, 'utf-8')
            tweetsData = JSON.parse(data)
        } catch {
            return NextResponse.json({ error: 'No tweets file found' }, { status: 404 })
        }

        // Find and update the item
        const itemIndex = tweetsData.items.findIndex(item => item.id === id)
        if (itemIndex === -1) {
            return NextResponse.json({ error: 'Tweet not found' }, { status: 404 })
        }

        tweetsData.items[itemIndex].text = text

        // Save updated data
        await fs.writeFile(tweetsPath, JSON.stringify(tweetsData, null, 2))

        return NextResponse.json({
            success: true,
            updatedItem: tweetsData.items[itemIndex]
        })

    } catch (error) {
        console.error('Error updating tweet:', error)
        return NextResponse.json({ error: 'Failed to update tweet' }, { status: 500 })
    }
}

// DELETE - Delete a specific tweet or all tweets
export async function DELETE(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const id = url.searchParams.get('id')
        const deleteAll = url.searchParams.get('all') === 'true'

        // Read current data
        let tweetsData: TweetsData
        try {
            const data = await fs.readFile(tweetsPath, 'utf-8')
            tweetsData = JSON.parse(data)
        } catch {
            return NextResponse.json({ error: 'No tweets file found' }, { status: 404 })
        }

        if (deleteAll) {
            // Delete all tweets
            tweetsData.items = []
            tweetsData.totalItems = 0
            await fs.writeFile(tweetsPath, JSON.stringify(tweetsData, null, 2))

            return NextResponse.json({
                success: true,
                message: 'All tweets deleted',
                totalItems: 0
            })
        } else if (id) {
            // Delete specific tweet
            const itemId = parseInt(id)
            const initialLength = tweetsData.items.length
            tweetsData.items = tweetsData.items.filter(item => item.id !== itemId)

            if (tweetsData.items.length === initialLength) {
                return NextResponse.json({ error: 'Tweet not found' }, { status: 404 })
            }

            tweetsData.totalItems = tweetsData.items.length
            await fs.writeFile(tweetsPath, JSON.stringify(tweetsData, null, 2))

            return NextResponse.json({
                success: true,
                message: `Tweet ${itemId} deleted`,
                totalItems: tweetsData.totalItems
            })
        } else {
            return NextResponse.json({ error: 'ID parameter or all=true required' }, { status: 400 })
        }

    } catch (error) {
        console.error('Error deleting tweet:', error)
        return NextResponse.json({ error: 'Failed to delete tweet' }, { status: 500 })
    }
}
