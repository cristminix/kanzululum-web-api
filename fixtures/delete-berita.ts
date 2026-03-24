/**
 * Script to delete all berita data and associated cover images
 *
 * Usage:
 *   npx tsx fixtures/delete-berita.ts [options]
 *
 * Options:
 *   --url <url>    API base URL (default: http://localhost:8787)
 *   --delay <ms>   Delay between requests in ms (default: 50)
 *   --dry-run      Show what would be deleted without actually deleting
 *   --files-only   Only delete uploaded files, keep berita records
 */

const DEFAULT_URL = 'http://localhost:8787'
const DEFAULT_DELAY = 50

interface BeritaItem {
  id: number
  title?: string
  cover?: string
  [key: string]: unknown
}

interface FileItem {
  id: string
  filename: string
  uploadedAt: string
}

/**
 * Check if a string looks like a generated fileId
 * FileId format: {cleanFilename}_{timestamp}_{randomPart}
 */
function isFileId(value: string | undefined): boolean {
  if (!value) return false
  // FileId pattern: ends with timestamp_randomPart
  // e.g., image_870x_660d03f00a62c_1712000000_abc12345
  return /^\S+_\d+_[a-z0-9]+$/.test(value)
}

/**
 * Delete a berita record by ID
 */
async function deleteBerita(baseUrl: string, id: number, dryRun: boolean): Promise<boolean> {
  if (dryRun) {
    console.log(`  [DRY-RUN] Would delete berita ID: ${id}`)
    return true
  }

  try {
    const response = await fetch(`${baseUrl}/api/berita/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    return true
  } catch (error) {
    console.error(`  ✗ Failed to delete berita ${id}: ${error instanceof Error ? error.message : error}`)
    return false
  }
}

/**
 * Delete a file by ID
 */
async function deleteFile(baseUrl: string, fileId: string, dryRun: boolean): Promise<boolean> {
  if (dryRun) {
    console.log(`  [DRY-RUN] Would delete file: ${fileId}`)
    return true
  }

  try {
    const response = await fetch(`${baseUrl}/api/files/${fileId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    return true
  } catch (error) {
    console.error(`  ✗ Failed to delete file ${fileId}: ${error instanceof Error ? error.message : error}`)
    return false
  }
}

/**
 * Get all berita from the API
 */
async function getAllBerita(baseUrl: string): Promise<BeritaItem[]> {
  try {
    const response = await fetch(`${baseUrl}/api/berita`)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    // API returns { berita: Berita[] }
    return data.berita || []
  } catch (error) {
    console.error(`Failed to fetch berita: ${error instanceof Error ? error.message : error}`)
    return []
  }
}

/**
 * Get all files from the API
 */
async function getAllFiles(baseUrl: string): Promise<FileItem[]> {
  try {
    const response = await fetch(`${baseUrl}/api/files`)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch files: ${error instanceof Error ? error.message : error}`)
    return []
  }
}

/**
 * Delete all berita and their associated cover images
 */
async function deleteAllBerita(
  baseUrl: string,
  delay: number,
  dryRun: boolean,
  filesOnly: boolean
): Promise<void> {
  console.log('Fetching berita data...')

  const beritaList = await getAllBerita(baseUrl)

  if (beritaList.length === 0) {
    console.log('No berita found.')
    return
  }

  console.log(`Found ${beritaList.length} berita items.\n`)

  // Track cover file IDs to delete
  const coverFileIds = new Set<string>()

  // Collect cover file IDs from berita
  for (const berita of beritaList) {
    if (isFileId(berita.cover)) {
      //@ts-ignore
      coverFileIds.add(berita.cover)
    }
  }

  console.log(`Found ${coverFileIds.size} associated cover images.\n`)

  let deletedFiles = 0
  let deletedBerita = 0
  let failedFiles = 0
  let failedBerita = 0

  // Delete cover images first
  if (coverFileIds.size > 0) {
    console.log('Deleting cover images...')
    let i = 0
    for (const fileId of coverFileIds) {
      i++
      process.stdout.write(`\r[${i}/${coverFileIds.size}] Deleting file: ${fileId.substring(0, 40)}...`)

      const success = await deleteFile(baseUrl, fileId, dryRun)
      if (success) {
        deletedFiles++
      } else {
        failedFiles++
      }

      if (delay > 0 && i < coverFileIds.size) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    console.log('\n')
  }

  // Delete berita records (unless files-only mode)
  if (!filesOnly) {
    console.log('Deleting berita records...')
    for (let i = 0; i < beritaList.length; i++) {
      const berita = beritaList[i]
      process.stdout.write(`\r[${i + 1}/${beritaList.length}] Deleting berita ID: ${berita.id}...`)

      const success = await deleteBerita(baseUrl, berita.id, dryRun)
      if (success) {
        deletedBerita++
      } else {
        failedBerita++
      }

      if (delay > 0 && i < beritaList.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    console.log('\n')
  }

  // Summary
  console.log('--- Summary ---')
  console.log(`Files deleted: ${deletedFiles}`)
  if (failedFiles > 0) console.log(`Files failed: ${failedFiles}`)
  if (!filesOnly) {
    console.log(`Berita deleted: ${deletedBerita}`)
    if (failedBerita > 0) console.log(`Berita failed: ${failedBerita}`)
  }
  if (dryRun) {
    console.log('\n[DRY-RUN] No actual changes were made.')
  }
}

// Parse command line arguments
function parseArgs(): { baseUrl: string; delay: number; dryRun: boolean; filesOnly: boolean } {
  const args = process.argv.slice(2)
  let baseUrl = DEFAULT_URL
  let delay = DEFAULT_DELAY
  let dryRun = false
  let filesOnly = false

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      baseUrl = args[i + 1]
      i++
    } else if (args[i] === '--delay' && args[i + 1]) {
      delay = parseInt(args[i + 1], 10)
      i++
    } else if (args[i] === '--dry-run') {
      dryRun = true
    } else if (args[i] === '--files-only') {
      filesOnly = true
    }
  }

  return { baseUrl, delay, dryRun, filesOnly }
}

// Main execution
const { baseUrl, delay, dryRun, filesOnly } = parseArgs()

console.log('=== Berita Deletion Script ===')
console.log(`API URL: ${baseUrl}`)
console.log(`Delay: ${delay}ms`)
if (dryRun) console.log('Mode: DRY-RUN (no changes will be made)')
if (filesOnly) console.log('Mode: FILES-ONLY (keeping berita records)')
console.log('')

deleteAllBerita(baseUrl, delay, dryRun, filesOnly).catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})