import { Kegiatan } from "../../models/kegiatan"
import { KVService } from "../../services/kvService"

export async function getKegiatanWithPager(
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
    const keys = await kvService.getAllKegiatanKeys()

    // Hitung offset
    const offset = (page - 1) * limit

    // Dapatkan subset keys berdasarkan pagination
    const paginatedKeys = keys.slice(offset, offset + limit)

    // Dapatkan data kegiatan untuk keys yang dipaginasi
    const kegiatanList: Kegiatan[] = []
    for (const key of paginatedKeys) {
      const kegiatanStr = await kvService.getKegiatan(key)
      if (kegiatanStr) {
        const kegiatan = JSON.parse(kegiatanStr) as Kegiatan
        kegiatanList.push(kegiatan)
      }
    }

    // Hitung total pages
    const totalPages = Math.ceil(keys.length / limit)

    return {
      kegiatan: kegiatanList,
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
    throw new Error("Failed to retrieve kegiatan")
  }
}