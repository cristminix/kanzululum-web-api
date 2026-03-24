import { KVService } from "../../services/kvService"
import { Banner } from "../../models/banner"

export async function deleteBanner(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Check if banner exists
    const bannerStr = await kvService.getBannerById(id)
    if (!bannerStr) {
      return null
    }

    // Parse banner untuk mendapatkan image file ID
    const existingBanner: Banner = JSON.parse(bannerStr)

    // Hapus image file jika ada
    if (existingBanner.image) {
      await kvService.delete(existingBanner.image)
    }

    // Delete banner
    await kvService.deleteBannerById(id)

    // Update keys list
    const keys = await kvService.getAllBannerKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveBannerKeys(updatedKeys)

    return {
      id,
      message: "Banner deleted successfully",
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to delete banner")
  }
}