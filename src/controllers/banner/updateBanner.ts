import { Banner } from "../../models/banner"
import { KVService } from "../../services/kvService"

export async function updateBanner(
  kvService: KVService,
  id: number,
  data: Partial<Banner>
): Promise<{ banner: Banner; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    console.log(
      `Starting updateBanner for ID ${id} with data:`,
      JSON.stringify(data, null, 2)
    )

    // Dapatkan banner yang ada
    const existingBannerStr = await kvService.getBannerById(id)
    if (!existingBannerStr) {
      return null
    }

    const existingBanner = JSON.parse(existingBannerStr) as Banner
    console.log("Existing banner:", JSON.stringify(existingBanner, null, 2))

    // Hapus image lama jika image baru berbeda
    if (
      data.image !== undefined &&
      data.image !== existingBanner.image &&
      existingBanner.image
    ) {
      await kvService.delete(existingBanner.image)
    }

    // Update field yang diberikan
    const updatedBanner: Banner = {
      ...existingBanner,
      title: data.title !== undefined ? data.title : existingBanner.title,
      slug: data.slug !== undefined ? data.slug : existingBanner.slug,
      image: data.image !== undefined ? data.image : existingBanner.image,
      dateUpdated: new Date().toISOString(),
    }

    console.log("Updated banner object:", JSON.stringify(updatedBanner, null, 2))

    // Simpan ke Cloudflare KV
    await kvService.saveBannerById(id, JSON.stringify(updatedBanner))

    return {
      message: "Banner updated successfully",
      banner: updatedBanner,
    }
  } catch (error) {
    console.error("Error in updateBanner:", error)
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to update banner")
  }
}