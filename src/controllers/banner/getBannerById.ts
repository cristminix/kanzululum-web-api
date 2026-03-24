import { Banner } from "../../models/banner"
import { KVService } from "../../services/kvService"

export async function getBannerById(
  kvService: KVService,
  id: number
): Promise<Banner | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const bannerStr = await kvService.getBannerById(id)
    if (!bannerStr) {
      return null
    }

    const banner = JSON.parse(bannerStr) as Banner
    if (banner.image) {
      banner.imageUrl = `/api/files/${banner.image}?preview=true`
    }

    return banner
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to retrieve banner")
  }
}