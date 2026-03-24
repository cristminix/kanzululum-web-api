import { Galery } from "../../models/galery"
import { KVService } from "../../services/kvService"

export async function getGaleryWithPager(
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
    const keys = await kvService.getAllGaleryKeys()

    // Sort by id descending (newest first)
    keys.sort((a, b) => b - a)

    // Hitung offset
    const offset = (page - 1) * limit

    // Dapatkan subset keys berdasarkan pagination
    const paginatedKeys = keys.slice(offset, offset + limit)

    // Dapatkan data galery untuk keys yang dipaginasi
    const galeryList: Galery[] = []
    for (const key of paginatedKeys) {
      const galeryStr = await kvService.getGalery(key)
      if (galeryStr) {
        const galery = JSON.parse(galeryStr) as Galery
        if (galery.image) {
          galery.imageUrl = `/api/files/${galery.image}?preview=true`
        }
        galeryList.push(galery)
      }
    }

    // Hitung total pages
    const totalPages = Math.ceil(keys.length / limit)

    return {
      galery: galeryList,
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
    throw new Error("Failed to retrieve galery")
  }
}