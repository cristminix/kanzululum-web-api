import { SyaratPendaftaran } from "../../models/syarat-pendaftaran"
import { KVService } from "../../services/kvService"

export async function getSyaratPendaftaranWithPager(
  kvService: KVService,
  page: number,
  limit: number,
  categorySlug?: string
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
    let keys = await kvService.getAllSyaratPendaftaranKeys()

    // Terapkan filter jika ada
    if (categorySlug) {
      const filteredKeys: number[] = []
      for (const key of keys) {
        const syaratPendaftaranStr = await kvService.getSyaratPendaftaran(key)
        if (syaratPendaftaranStr) {
          const syaratPendaftaran = JSON.parse(syaratPendaftaranStr) as SyaratPendaftaran
          if (syaratPendaftaran.categorySlug && syaratPendaftaran.categorySlug.includes(categorySlug)) {
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

    // Dapatkan data untuk keys yang dipaginasi
    const syaratPendaftaranList: SyaratPendaftaran[] = []
    for (const key of paginatedKeys) {
      const syaratPendaftaranStr = await kvService.getSyaratPendaftaran(key)
      if (syaratPendaftaranStr) {
        const syaratPendaftaran = JSON.parse(syaratPendaftaranStr) as SyaratPendaftaran
        syaratPendaftaranList.push(syaratPendaftaran)
      }
    }

    // Hitung total pages
    const totalPages = Math.ceil(keys.length / limit)

    return {
      syaratPendaftaran: syaratPendaftaranList,
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
    throw new Error("Failed to retrieve syarat pendaftaran")
  }
}