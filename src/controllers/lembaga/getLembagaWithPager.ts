import { Lembaga } from "../../models/lembaga"
import { KVService } from "../../services/kvService"

export async function getLembagaWithPager(
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
    const keys = await kvService.getAllLembagaKeys()

    // Hitung offset
    const offset = (page - 1) * limit

    // Dapatkan subset keys berdasarkan pagination
    const paginatedKeys = keys.slice(offset, offset + limit)

    // Dapatkan data lembaga untuk keys yang dipaginasi
    const lembagaList: Lembaga[] = []
    for (const key of paginatedKeys) {
      const lembagaStr = await kvService.getLembaga(key)
      if (lembagaStr) {
        const lembaga = JSON.parse(lembagaStr) as Lembaga
        if (lembaga.image) {
          lembaga.imageUrl = `/api/files/${lembaga.image}?preview=true`
        }
        lembagaList.push(lembaga)
      }
    }

    // Hitung total pages
    const totalPages = Math.ceil(keys.length / limit)

    return {
      lembaga: lembagaList,
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
    throw new Error("Failed to retrieve lembaga")
  }
}