import { BiayaPendaftaran } from "../../models/biaya-pendaftaran"
import { KVService } from "../../services/kvService"

export async function getBiayaPendaftaranWithPager(
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
    let keys = await kvService.getAllBiayaPendaftaranKeys()

    // Terapkan filter jika ada
    if (categorySlug) {
      const filteredKeys: number[] = []
      for (const key of keys) {
        const biayaPendaftaranStr = await kvService.getBiayaPendaftaran(key)
        if (biayaPendaftaranStr) {
          const biayaPendaftaran = JSON.parse(biayaPendaftaranStr) as BiayaPendaftaran
          if (biayaPendaftaran.categorySlug && biayaPendaftaran.categorySlug === categorySlug) {
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

    // Dapatkan data biaya pendaftaran untuk keys yang dipaginasi
    const biayaPendaftaranList: BiayaPendaftaran[] = []
    for (const key of paginatedKeys) {
      const biayaPendaftaranStr = await kvService.getBiayaPendaftaran(key)
      if (biayaPendaftaranStr) {
        const biayaPendaftaran = JSON.parse(biayaPendaftaranStr) as BiayaPendaftaran
        biayaPendaftaranList.push(biayaPendaftaran)
      }
    }

    // Hitung total pages berdasarkan keys yang telah difilter
    const totalPages = Math.ceil(keys.length / limit)

    return {
      biayaPendaftaran: biayaPendaftaranList,
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
    throw new Error("Failed to retrieve biaya pendaftaran")
  }
}