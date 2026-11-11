import { Meta } from "../../models/meta"
import { KVService } from "../../services/kvService"

export async function getMetaWithPager(
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
    const keys = await kvService.getAllMetaKeys()

    // Sort by id descending (newest first)
    keys.sort((a, b) => b - a)

    // Hitung offset
    const offset = (page - 1) * limit

    // Dapatkan subset keys berdasarkan pagination
    const paginatedKeys = keys.slice(offset, offset + limit)

    // Dapatkan data meta untuk keys yang dipaginasi
    const metaList: Meta[] = []
    for (const key of paginatedKeys) {
      const metaStr = await kvService.getMetaById(key)
      if (metaStr) {
        const meta = JSON.parse(metaStr) as Meta
        metaList.push(meta)
      }
    }

    // Hitung total pages
    const totalPages = Math.ceil(keys.length / limit)

    return {
      meta: metaList,
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
    if (
      error instanceof Error &&
      (error.message === "Page must be a positive integer" ||
        error.message === "Limit must be between 1 and 100")
    ) {
      throw error
    }
    throw new Error("Failed to retrieve meta")
  }
}
