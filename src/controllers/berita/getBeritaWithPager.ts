import { Berita } from "../../models/berita"
import { KVService } from "../../services/kvService"

export async function getBeritaWithPager(
  kvService: KVService,
  page: number,
  limit: number,
  category?: string,
  author?: string
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
    let keys = await kvService.getAllBeritaKeys()

    // Terapkan filter jika ada
    if (category || author) {
      const filteredKeys: number[] = []
      for (const key of keys) {
        const beritaStr = await kvService.getBerita(key)
        if (beritaStr) {
          const berita = JSON.parse(beritaStr) as Berita
          let match = true

          // Filter berdasarkan kategori/tags
          if (category && (!berita.tags || !berita.tags.includes(category))) {
            match = false
          }

          // Filter berdasarkan author
          if (author && (!berita.author || berita.author !== author)) {
            match = false
          }

          if (match) {
            filteredKeys.push(key)
          }
        }
      }
      keys = filteredKeys
    }

    // Hitung offset
    const offset = (page - 1) * limit

    // Dapatkan subset keys berdasarkan pagination
    const paginatedKeys = keys.slice(offset, offset + limit)

    // Dapatkan data berita untuk keys yang dipaginasi
    const beritaList: Berita[] = []
    for (const key of paginatedKeys) {
      const beritaStr = await kvService.getBerita(key)
      if (beritaStr) {
        const berita = JSON.parse(beritaStr) as Berita
        beritaList.push(berita)
      }
    }

    // Hitung total pages berdasarkan keys yang telah difilter
    const totalPages = Math.ceil(keys.length / limit)

    return {
      berita: beritaList,
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
    throw new Error("Failed to retrieve berita")
  }
}
