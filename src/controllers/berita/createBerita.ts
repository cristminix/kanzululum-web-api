import { Berita } from "../../models/berita"
import { KVService } from "../../services/kvService"

export async function createBerita(
  kvService: KVService,
  data: Partial<Berita>
): Promise<{ berita: Berita; message: string }> {
  try {
    console.log(
      "Starting createBerita with data:",
      JSON.stringify(data, null, 2)
    )

    // Validasi field yang diperlukan
    if (data.cover) {
      // try {
      //   new URL(data.cover)
      // } catch (e) {
      //   console.log("Invalid cover URL:", data.cover)
      //   throw new Error("Cover must be a valid URL")
      // }
    }

    // if (data.cover && data.cover.length > 500) {
    //   console.log("Cover URL too long:", data.cover.length)
    //   throw new Error("Cover URL must not exceed 500 characters")
    // }

    // Generate ID baru
    const id = kvService.generateId()
    console.log("Generated ID:", id)

    // Buat objek berita
    const berita: Berita = {
      id,
      title: data.title,
      tags: data.tags,
      author: data.author,
      headline: data.headline,
      cover: data.cover,
      content: data.content,
      compiledHash: data.compiledHash,
      compiledPath: data.compiledPath,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    }

    console.log("Created berita object:", JSON.stringify(berita, null, 2))

    // Simpan ke Cloudflare KV
    console.log("Saving berita to KV...")
    await kvService.saveBerita(id, JSON.stringify(berita))
    console.log("Berita saved to KV successfully")

    // Update daftar ID berita
    console.log("Getting all berita keys...")
    const keys = await kvService.getAllBeritaKeys()
    console.log("Current keys:", keys)
    keys.push(id)
    console.log("Updated keys:", keys)
    await kvService.saveBeritaKeys(keys)
    console.log("Berita keys saved successfully")

    return {
      message: "Berita created successfully",
      berita,
    }
  } catch (error) {
    console.error("Error in createBerita:", error)
    throw new Error("Failed to create berita")
  }
}
