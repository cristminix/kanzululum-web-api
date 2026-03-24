/**
 * Script to insert syarat-pendaftaran data from fixtures/syarat-pendaftaran.json to /api/syarat-pendaftaran
 *
 * Usage:
 *   npx tsx fixtures/insert-syarat-pendaftaran.ts [options]
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

interface SyaratPendaftaranItem {
  'category-slug': string
  content: string
}

interface CreateSyaratPendaftaranPayload {
  categorySlug: string
  content: string
}

interface CreateSyaratPendaftaranResponse {
  id: number
  [key: string]: unknown
}

async function insertSyaratPendaftaran(
  baseUrl: string,
  limit: number | null,
  delay: number
): Promise<void> {
  // Read fixtures file
  const fixturesPath = path.join(__dirname, 'syarat-pendaftaran.json')

  if (!fs.existsSync(fixturesPath)) {
    console.error('Error: fixtures/syarat-pendaftaran.json not found')
    process.exit(1)
  }

  const items: SyaratPendaftaranItem[] = JSON.parse(
    fs.readFileSync(fixturesPath, 'utf8')
  )

  if (items.length === 0) {
    console.log('No syarat-pendaftaran items found in fixtures')
    return
  }

  const itemsToInsert = limit ? items.slice(0, limit) : items
  console.log(
    `Found ${items.length} items, inserting ${itemsToInsert.length} items...\n`
  )

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < itemsToInsert.length; i++) {
    const item = itemsToInsert[i]
    const itemNum = i + 1

    try {
      console.log(
        `[${itemNum}/${itemsToInsert.length}] Inserting: ${item.content.substring(0, 50)}...`
      )

      // Prepare payload - convert category-slug to categorySlug
      const payload: CreateSyaratPendaftaranPayload = {
        categorySlug: item['category-slug'],
        content: item.content,
      }

      const response = await fetch(`${baseUrl}/api/syarat-pendaftaran`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result: CreateSyaratPendaftaranResponse = await response.json()
      console.log(`  ✓ Success (ID: ${result.id})`)
      successCount++

      // Delay between requests
      if (delay > 0 && i < itemsToInsert.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    } catch (error) {
      console.error(
        `  ✗ Failed: ${error instanceof Error ? error.message : error}`
      )
      errorCount++
    }
  }

  console.log('\n--- Summary ---')
  console.log(`Total: ${itemsToInsert.length}`)
  console.log(`Success: ${successCount}`)
  console.log(`Failed: ${errorCount}`)
}

// Parse command line arguments
function parseArgs(): { baseUrl: string; limit: number | null; delay: number } {
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

  return { baseUrl, limit, delay }
}

// Main execution
const { baseUrl, limit, delay } = parseArgs()

console.log('=== Syarat Pendaftaran Insertion Script ===')
console.log(`API URL: ${baseUrl}`)
console.log(`Delay: ${delay}ms`)
if (limit) console.log(`Limit: ${limit} items`)
console.log('')

insertSyaratPendaftaran(baseUrl, limit, delay).catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})