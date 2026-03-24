import { Banner } from "../../models/banner"
import { KVService } from "../../services/kvService"

export async function getBanner(kvService: KVService): Promise<{ banner: Banner | null }> {
  try {
    const bannerStr = await kvService.getBanner()
    if (bannerStr) {
      return { banner: JSON.parse(bannerStr) as Banner }
    }
    return { banner: null }
  } catch (error) {
    throw new Error("Failed to retrieve banner")
  }
}