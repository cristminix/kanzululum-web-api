import { Page } from "../../models/page"
import { KVService } from "../../services/kvService"

export async function getPageWithPager(
  kvService: KVService,
  page: number,
  limit: number
): Promise<any> {
  try {
    // Validasi parameter
    if (isNaN(page) || page < 1) {
      throw new Error("Page must be a positive integer")
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      throw new Error("Limit must be between 1 and 100")
    }

    // Dapatkan semua keys
    const keys = await kvService.getAllPageKeys()

    // Hitung offset
    const offset = (page - 1) * limit

    // Dapatkan subset keys berdasarkan pagination
    const paginatedKeys = keys.slice(offset, offset + limit)

    // Dapatkan data page untuk keys yang dipaginasi
    const pageList: Page[] = []
    for (const key of paginatedKeys) {
      const pageStr = await kvService.getPage(key)
      if (pageStr) {
        const pageData = JSON.parse(pageStr) as Page
        pageList.push(pageData)
      }
    }

    // Hitung total pages
    const totalPages = Math.ceil(keys.length / limit)

    return {
      page: pageList,
      pagination: {
        page,
        limit,
        total: keys.length,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    }
  } catch (error) {
    throw new Error("Failed to retrieve page")
  }
}