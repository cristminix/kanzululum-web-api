/**
 * Script to insert hero data from fixtures/hero.json to /api/hero
 * Automatically uploads hero slide images and sets fileId as image field
 *
 * Usage:
 *   npx tsx fixtures/insert-hero.ts [options]
 *
 * Options:
 *   --url <url>        API base URL (default: http://localhost:8787)
 *   --api-key <key>    API key for X-Api-Key header (default: from .dev.vars or .env)
 *   --limit <n>        Limit number of items to insert (default: all)
 *   --delay <ms>       Delay between requests in ms (default: 100)
 */

import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables (.dev.vars first for wrangler dev, then .env)
dotenv.config({ path: path.resolve(__dirname, '..', '.dev.vars') })
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

// Configuration
const DEFAULT_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8787'
const DEFAULT_API_KEY = process.env.API_KEY || ''
const DEFAULT_DELAY = 100
const IMAGES_DIR = path.join(__dirname, 'images', 'homepage-slide')

interface HeroBlock {
  id: string
  type: string
  data: {
    text: string
  }
}

interface HeroItem {
  id?: number
  slug?: string
  title?: HeroBlock[]
  description?: HeroBlock[]
  image?: string
  imageUrl?: string
  linkText?: string
  link?: string
  dateCreated?: string
  dateUpdated?: string
}

interface CreateHeroPayload {
  slug?: string
  title?: HeroBlock[]
  description?: HeroBlock[]
  image?: string
  linkText?: string
  link?: string
}

interface CreateHeroResponse {
  id?: number
  hero?: HeroItem
  message?: string
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
 * Extract filename from image path (handles both /assets/... and plain filename)
 */
function extractFilename(imagePath: string): string {
  return path.basename(imagePath)
}

/**
 * Build request headers including X-Api-Key when available
 */
function buildHeaders(apiKey: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (apiKey) {
    headers['X-Api-Key'] = apiKey
  }
  return headers
}

/**
 * Upload a file to the API and return the fileId
 */
async function uploadFile(
  baseUrl: string,
  apiKey: string,
  imagePath: string
): Promise<string | null> {
  const filename = extractFilename(imagePath)

  // Check cache first
  if (uploadedFiles.has(filename)) {
    return uploadedFiles.get(filename)!
  }

  const filePath = path.join(IMAGES_DIR, filename)

  if (!fs.existsSync(filePath)) {
    console.warn(`  Warning: Image file not found: ${filename}`)
    return null
  }

  try {
    const fileBuffer = fs.readFileSync(filePath)
    const base64Content = fileBuffer.toString('base64')
    const contentType = getContentType(filename)

    const response = await fetch(`${baseUrl}/api/files`, {
      method: 'POST',
      headers: buildHeaders(apiKey),
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
    console.error(
      `  ✗ Upload failed for ${filename}: ${error instanceof Error ? error.message : error}`
    )
    return null
  }
}

async function insertHero(
  baseUrl: string,
  apiKey: string,
  limit: number | null,
  delay: number
): Promise<void> {
  // Read fixtures file
  const fixturesPath = path.join(__dirname, 'hero.json')

  if (!fs.existsSync(fixturesPath)) {
    console.error('Error: fixtures/hero.json not found')
    process.exit(1)
  }

  const heroList: HeroItem[] = JSON.parse(fs.readFileSync(fixturesPath, 'utf8'))

  if (heroList.length === 0) {
    console.log('No hero items found in fixtures')
    return
  }

  const itemsToInsert = limit ? heroList.slice(0, limit) : heroList
  console.log(
    `Found ${heroList.length} items, inserting ${itemsToInsert.length} items...\n`
  )

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < itemsToInsert.length; i++) {
    const item = itemsToInsert[i]
    const itemNum = i + 1
    const titlePreview = item.title?.[0]?.data?.text || `Hero #${itemNum}`

    try {
      console.log(`[${itemNum}/${itemsToInsert.length}] Inserting: ${titlePreview}...`)

      // Upload hero image if exists
      let imageId: string | undefined
      if (item.image) {
        const uploadedId = await uploadFile(baseUrl, apiKey, item.image)
        imageId = uploadedId || item.image
      }

      // Prepare payload
      const payload: CreateHeroPayload = {
        slug: item.slug ?? '',
        title: item.title,
        description: item.description,
        image: imageId,
        linkText: item.linkText,
        link: item.link,
      }

      const response = await fetch(`${baseUrl}/api/hero`, {
        method: 'POST',
        headers: buildHeaders(apiKey),
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result: CreateHeroResponse = await response.json()
      const createdId = result.hero?.id ?? result.id
      console.log(`  ✓ Success (ID: ${createdId})`)
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
  console.log(`Files uploaded: ${uploadedFiles.size}`)
}

// Parse command line arguments
function parseArgs(): {
  baseUrl: string
  apiKey: string
  limit: number | null
  delay: number
} {
  const args = process.argv.slice(2)
  let baseUrl = DEFAULT_URL
  let apiKey = DEFAULT_API_KEY
  let limit: number | null = null
  let delay = DEFAULT_DELAY

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      baseUrl = args[i + 1]
      i++
    } else if (args[i] === '--api-key' && args[i + 1]) {
      apiKey = args[i + 1]
      i++
    } else if (args[i] === '--limit' && args[i + 1]) {
      limit = parseInt(args[i + 1], 10)
      i++
    } else if (args[i] === '--delay' && args[i + 1]) {
      delay = parseInt(args[i + 1], 10)
      i++
    }
  }

  return { baseUrl, apiKey, limit, delay }
}

// Main execution
const { baseUrl, apiKey, limit, delay } = parseArgs()

console.log('=== Hero Insertion Script ===')
console.log(`API URL: ${baseUrl}`)
console.log(`Images dir: ${IMAGES_DIR}`)
console.log(`Delay: ${delay}ms`)
if (limit) console.log(`Limit: ${limit} items`)
console.log('')

insertHero(baseUrl, apiKey, limit, delay).catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
