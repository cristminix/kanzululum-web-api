import { Banner } from "../../models/banner"
import { KVService } from "../../services/kvService"

export async function getAllBanner(kvService: KVService): Promise<{ banner: Banner[] }> {
  try {
    const keys = await kvService.getAllBannerKeys()

    const bannerList: Banner[] = []
    for (const key of keys) {
      const bannerStr = await kvService.getBannerById(key)
      if (bannerStr) {
        const banner = JSON.parse(bannerStr) as Banner
        if (banner.image) {
          banner.imageUrl = `/api/files/${banner.image}?preview=true`
        }
        bannerList.push(banner)
      }
    }

    return { banner: bannerList }
  } catch (error) {
    throw new Error("Failed to retrieve banner")
  }
}