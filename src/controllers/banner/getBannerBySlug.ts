import { Banner } from "../../models/banner"
import { KVService } from "../../services/kvService"

export async function getBannerBySlug(
  kvService: KVService,
  slug: string
): Promise<Banner | null> {
  try {
    if (!slug || typeof slug !== "string") {
      throw new Error("Invalid slug")
    }

    const allBanners = await kvService.getAllBanner()
    const banner = allBanners.find((b) => b.slug === slug)

    if (!banner) {
      return null
    }

    const bannerData = banner as Banner
    if (bannerData.image) {
      bannerData.imageUrl = `/api/files/${bannerData.image}?preview=true`
    }

    return bannerData
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid slug") {
      throw error
    }
    throw new Error("Failed to retrieve banner")
  }
}