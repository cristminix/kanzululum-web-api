/**
 * Script to insert meta data from fixtures/meta.json to /api/meta
 *
 * Usage:
 *   npx tsx fixtures/insert-meta.ts [options]
 *
 * Options:
 *   --url <url>    API base URL (default: http://localhost:8787)
 *   --limit <n>    Limit number of items to insert (default: all)
 *   --delay <ms>   Delay between requests in ms (default: 100)
 */

import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Configuration
const DEFAULT_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8787'
const DEFAULT_DELAY = 100

interface MetaItem {
  id?: number
  title?: string
  'meta-description'?: string
  'meta-keyword'?: string
}

interface CreateMetaPayload {
  title?: string
  'meta-description'?: string
  'meta-keyword'?: string
}

interface CreateMetaResponse {
  meta?: {
    id: number
    [key: string]: unknown
  }
  [key: string]: unknown
}

async function insertMeta(baseUrl: string, limit: number | null, delay: number): Promise<void> {
  // Read fixtures file
  const fixturesPath = path.join(__dirname, 'meta.json')

  if (!fs.existsSync(fixturesPath)) {
    console.error('Error: fixtures/meta.json not found')
    process.exit(1)
  }

  const metaList: MetaItem[] = JSON.parse(fs.readFileSync(fixturesPath, 'utf8'))

  if (metaList.length === 0) {
    console.log('No meta items found in fixtures')
    return
  }

  const itemsToInsert = limit ? metaList.slice(0, limit) : metaList
  console.log(`Found ${metaList.length} items, inserting ${itemsToInsert.length} items...\n`)

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < itemsToInsert.length; i++) {
    const item = itemsToInsert[i]
    const itemNum = i + 1

    try {
      console.log(`[${itemNum}/${itemsToInsert.length}] Inserting: ${item.title}...`)

      // Prepare payload
      const payload: CreateMetaPayload = {
        title: item.title,
        'meta-description': item['meta-description'],
        'meta-keyword': item['meta-keyword'],
      }

      const response = await fetch(`${baseUrl}/api/meta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': process.env.API_KEY || 'default-secret-key-change-in-production',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result: CreateMetaResponse = await response.json()
      const id = result.meta?.id || (result as any).id
      console.log(`  ✓ Success! Created meta with ID: ${id}`)
      successCount++

      // Delay between requests
      if (delay > 0 && i < itemsToInsert.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    } catch (error) {
      console.error(`  ✗ Error inserting item:`, error instanceof Error ? error.message : error)
      errorCount++
    }
  }

  console.log('\n--- Summary ---')
  console.log(`Total: ${itemsToInsert.length}`)
  console.log(`Success: ${successCount}`)
  console.log(`Failed: ${errorCount}`)
}

// Parse command line arguments
const args = process.argv.slice(2)
let baseUrl = DEFAULT_URL
let limit: number | null = null
let delay = DEFAULT_DELAY

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--url' && args[i + 1]) {
    baseUrl = args[i + 1]
    i++
  } else if (args[i] === '--limit' && args[i + 1]) {
    limit = parseInt(args[i + 1], 10)
    i++
  } else if (args[i] === '--delay' && args[i + 1]) {
    delay = parseInt(args[i + 1], 10)
    i++
  }
}

console.log('=== Meta Fixtures Inserter ===')
console.log(`Target URL: ${baseUrl}`)
console.log(`Delay: ${delay}ms`)
if (limit) console.log(`Limit: ${limit} items`)
console.log('------------------------------------\n')

insertMeta(baseUrl, limit, delay).catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
