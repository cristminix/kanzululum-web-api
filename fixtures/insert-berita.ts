/**
 * Script to insert berita data from fixtures/berita.json to /api/berita
 * Automatically uploads cover images and sets fileId as cover field
 *
 * Usage:
 *   npx tsx fixtures/insert-berita.ts [options]
 *
 * Options:
 *   --url <url>    API base URL (default: http://localhost:8787)
 *   --limit <n>    Limit number of items to insert (default: all)
 *   --delay <ms>   Delay between requests in ms (default: 100)
 */

import fs from 'fs'
import path from 'path'

// Configuration
const DEFAULT_URL = 'http://localhost:8787'
const DEFAULT_DELAY = 100
const COVERS_DIR = path.join(__dirname, 'images', 'covers')

interface BeritaItem {
  id?: number
  title?: string
  tags?: string
  author?: string
  headline?: string
  cover?: string
  content?: string
  compiledHash?: string
  compiledPath?: string
  dateCreated?: string
  dateUpdated?: string
}

interface FixturesData {
  berita: BeritaItem[]
}

interface CreateBeritaPayload {
  title?: string
  tags?: string
  author?: string
  headline?: string
  cover?: string
  content?: string
  compiledHash?: string
  compiledPath?: string
}

interface CreateBeritaResponse {
  id: number
  [key: string]: unknown
}

interface FileUploadResponse {
  success: boolean
  fileId?: string
  error?: string
}

// Track uploaded files to avoid re-uploading same image
const uploadedFiles = new Map<string, string>()

/**
 * Get content type based on file extension
 */
function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const contentTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  }
  return contentTypes[ext] || 'application/octet-stream'
}

/**
 * Upload a file to the API and return the fileId
 */
async function uploadFile(baseUrl: string, filename: string): Promise<string | null> {
  // Check cache first
  if (uploadedFiles.has(filename)) {
    return uploadedFiles.get(filename)!
  }

  const filePath = path.join(COVERS_DIR, filename)

  if (!fs.existsSync(filePath)) {
    console.warn(`  Warning: Cover file not found: ${filename}`)
    return null
  }

  try {
    const fileBuffer = fs.readFileSync(filePath)
    const base64Content = fileBuffer.toString('base64')
    const contentType = getContentType(filename)

    const response = await fetch(`${baseUrl}/api/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename,
        content: base64Content,
        contentType,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    const result: FileUploadResponse = await response.json()

    if (!result.success || !result.fileId) {
      throw new Error(result.error || 'Upload failed')
    }

    // Cache the result
    uploadedFiles.set(filename, result.fileId)

    console.log(`  ↑ Uploaded: ${filename} → ${result.fileId}`)
    return result.fileId
  } catch (error) {
    console.error(`  ✗ Upload failed for ${filename}: ${error instanceof Error ? error.message : error}`)
    return null
  }
}

async function insertBerita(baseUrl: string, limit: number | null, delay: number): Promise<void> {
  // Read fixtures file
  const fixturesPath = path.join(__dirname, 'berita.json')

  if (!fs.existsSync(fixturesPath)) {
    console.error('Error: fixtures/berita.json not found')
    process.exit(1)
  }

  const fixturesData: FixturesData = JSON.parse(fs.readFileSync(fixturesPath, 'utf8'))
  const beritaList = fixturesData.berita || []

  if (beritaList.length === 0) {
    console.log('No berita items found in fixtures')
    return
  }

  const itemsToInsert = limit ? beritaList.slice(0, limit) : beritaList
  console.log(`Found ${beritaList.length} items, inserting ${itemsToInsert.length} items...\n`)

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < itemsToInsert.length; i++) {
    const item = itemsToInsert[i]
    const itemNum = i + 1

    try {
      console.log(`[${itemNum}/${itemsToInsert.length}] Inserting: ${item.title?.substring(0, 50)}...`)

      // Upload cover image if exists
      let coverId: string | undefined
      if (item.cover) {
        const uploadedId = await uploadFile(baseUrl, item.cover)
        coverId = uploadedId || item.cover // fallback to original if upload fails
      }

      // Prepare payload
      const payload: CreateBeritaPayload = {
        title: item.title,
        tags: item.tags,
        author: item.author,
        headline: item.headline,
        cover: coverId,
        content: item.content,
        compiledPath: item.compiledPath || '',
        compiledHash: item.compiledHash || '',
      }

      const response = await fetch(`${baseUrl}/api/berita`, {
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

      const result: CreateBeritaResponse = await response.json()
      console.log(`  ✓ Success (ID: ${result.id})`)
      successCount++

      // Delay between requests
      if (delay > 0 && i < itemsToInsert.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    } catch (error) {
      console.error(`  ✗ Failed: ${error instanceof Error ? error.message : error}`)
      errorCount++
    }
  }

  console.log('\n--- Summary ---')
  console.log(`Total: ${itemsToInsert.length}`)
  console.log(`Success: ${successCount}`)
  console.log(`Failed: ${errorCount}`)
  console.log(`Files uploaded: ${uploadedFiles.size}`)
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

console.log('=== Berita Insertion Script ===')
console.log(`API URL: ${baseUrl}`)
console.log(`Covers dir: ${COVERS_DIR}`)
console.log(`Delay: ${delay}ms`)
if (limit) console.log(`Limit: ${limit} items`)
console.log('')

insertBerita(baseUrl, limit, delay).catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})