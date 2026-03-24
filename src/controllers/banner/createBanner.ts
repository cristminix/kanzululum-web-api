import { Banner } from "../../models/banner"
import { KVService } from "../../services/kvService"

export async function createBanner(
  kvService: KVService,
  data: Partial<Banner>
): Promise<{ banner: Banner; message: string }> {
  try {
    console.log(
      "Starting createBanner with data:",
      JSON.stringify(data, null, 2)
    )

    // Generate ID baru
    const id = kvService.generateId()
    console.log("Generated ID:", id)

    // Buat objek banner
    const banner: Banner = {
      id,
      title: data.title,
      slug: data.slug,
      image: data.image,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    }

    console.log("Created banner object:", JSON.stringify(banner, null, 2))

    // Simpan ke Cloudflare KV
    console.log("Saving banner to KV...")
    await kvService.saveBannerById(id, JSON.stringify(banner))
    console.log("Banner saved to KV successfully")

    // Update daftar ID banner
    console.log("Getting all banner keys...")
    const keys = await kvService.getAllBannerKeys()
    console.log("Current keys:", keys)
    keys.push(id)
    console.log("Updated keys:", keys)
    await kvService.saveBannerKeys(keys)
    console.log("Banner keys saved successfully")

    return {
      message: "Banner created successfully",
      banner,
    }
  } catch (error) {
    console.error("Error in createBanner:", error)
    throw new Error("Failed to create banner")
  }
}