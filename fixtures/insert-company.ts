/**
 * Script to insert company data from fixtures/company.json to /api/company
 *
 * Usage:
 *   npx tsx fixtures/insert-company.ts [options]
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

interface CompanyItem {
  id?: number
  name?: string
  shortAddress?: string
  address?: string
  whatsapp?: string
  phone?: string
  email?: string
  googleMapEmbedUrl?: string
  googleMapUrl?: string
}

interface CreateCompanyPayload {
  name?: string
  shortAddress?: string
  address?: string
  whatsapp?: string
  phone?: string
  email?: string
  googleMapEmbedUrl?: string
  googleMapUrl?: string
}

interface CreateCompanyResponse {
  id: number
  [key: string]: unknown
}

async function insertCompany(baseUrl: string, limit: number | null, delay: number): Promise<void> {
  // Read fixtures file
  const fixturesPath = path.join(__dirname, 'company.json')

  if (!fs.existsSync(fixturesPath)) {
    console.error('Error: fixtures/company.json not found')
    process.exit(1)
  }

  const companyList: CompanyItem[] = JSON.parse(fs.readFileSync(fixturesPath, 'utf8'))

  if (companyList.length === 0) {
    console.log('No company items found in fixtures')
    return
  }

  const itemsToInsert = limit ? companyList.slice(0, limit) : companyList
  console.log(`Found ${companyList.length} items, inserting ${itemsToInsert.length} items...\n`)

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < itemsToInsert.length; i++) {
    const item = itemsToInsert[i]
    const itemNum = i + 1

    try {
      console.log(`[${itemNum}/${itemsToInsert.length}] Inserting: ${item.name}...`)

      // Prepare payload
      const payload: CreateCompanyPayload = {
        name: item.name,
        shortAddress: item.shortAddress,
        address: item.address,
        whatsapp: item.whatsapp,
        phone: item.phone,
        email: item.email,
        googleMapEmbedUrl: item.googleMapEmbedUrl,
        googleMapUrl: item.googleMapUrl,
      }

      const response = await fetch(`${baseUrl}/api/company`, {
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

      const result: CreateCompanyResponse = await response.json()
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

console.log('=== Company Insertion Script ===')
console.log(`API URL: ${baseUrl}`)
console.log(`Delay: ${delay}ms`)
if (limit) console.log(`Limit: ${limit} items`)
console.log('')

insertCompany(baseUrl, limit, delay).catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})