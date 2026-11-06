import { Banner } from "../../models/banner"
import { KVService } from "../../services/kvService"

export async function updateBannerBySlug(
  kvService: KVService,
  slug: string,
  data: Partial<Banner>
): Promise<{ banner: Banner; message: string } | null> {
  try {
    if (!slug || typeof slug !== "string") {
      throw new Error("Invalid slug")
    }

    const allBanners = await kvService.getAllBanner()
    const bannerIndex = allBanners.findIndex((b) => b.slug === slug)

    if (bannerIndex === -1) {
      return null
    }

    const existingBanner = allBanners[bannerIndex] as Banner
    const id = existingBanner.id

    const updatedBanner: Banner = {
      ...existingBanner,
      ...data,
      dateUpdated: new Date().toISOString(),
    }

    await kvService.updateBanner(id!, updatedBanner)

    return {
      banner: updatedBanner,
      message: "Banner updated successfully",
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid slug") {
      throw error
    }
    throw new Error("Failed to update banner")
  }
}