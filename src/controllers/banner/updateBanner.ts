import { Banner } from "../../models/banner"
import { KVService } from "../../services/kvService"

export async function updateBanner(
  kvService: KVService,
  data: Partial<Banner>
): Promise<{ banner: Banner; message: string }> {
  try {
    // Get existing banner data
    const existingStr = await kvService.getBanner()
    let existing: Banner = {}

    if (existingStr) {
      existing = JSON.parse(existingStr) as Banner
    }

    // Merge with new data
    const updated: Banner = {
      ...existing,
      ...data,
    }

    await kvService.saveBanner(JSON.stringify(updated))
    return { banner: updated, message: "Banner updated successfully" }
  } catch (error) {
    throw new Error("Failed to update banner")
  }
}