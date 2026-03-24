import { Banner } from "../../models/banner"
import { KVService } from "../../services/kvService"

export async function getBannerWithPager(
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
    const keys = await kvService.getAllBannerKeys()

    // Hitung offset
    const offset = (page - 1) * limit

    // Dapatkan subset keys berdasarkan pagination
    const paginatedKeys = keys.slice(offset, offset + limit)

    // Dapatkan data banner untuk keys yang dipaginasi
    const bannerList: Banner[] = []
    for (const key of paginatedKeys) {
      const bannerStr = await kvService.getBannerById(key)
      if (bannerStr) {
        const banner = JSON.parse(bannerStr) as Banner
        if (banner.image) {
          banner.imageUrl = `/api/files/${banner.image}?preview=true`
        }
        bannerList.push(banner)
      }
    }

    // Hitung total pages
    const totalPages = Math.ceil(keys.length / limit)

    return {
      banner: bannerList,
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
    throw new Error("Failed to retrieve banner")
  }
}