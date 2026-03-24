import { Lembaga } from "../../models/lembaga"
import { KVService } from "../../services/kvService"

export async function createLembaga(
  kvService: KVService,
  data: Partial<Lembaga>
): Promise<{ lembaga: Lembaga; message: string }> {
  try {
    console.log(
      "Starting createLembaga with data:",
      JSON.stringify(data, null, 2)
    )

    // Generate ID baru
    const id = kvService.generateId()
    console.log("Generated ID:", id)

    // Buat objek lembaga
    const lembaga: Lembaga = {
      id,
      name: data.name,
      image: data.image,
      description: data.description,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    }

    console.log("Created lembaga object:", JSON.stringify(lembaga, null, 2))

    // Simpan ke Cloudflare KV
    console.log("Saving lembaga to KV...")
    await kvService.saveLembaga(id, JSON.stringify(lembaga))
    console.log("Lembaga saved to KV successfully")

    // Update daftar ID lembaga
    console.log("Getting all lembaga keys...")
    const keys = await kvService.getAllLembagaKeys()
    console.log("Current keys:", keys)
    keys.push(id)
    console.log("Updated keys:", keys)
    await kvService.saveLembagaKeys(keys)
    console.log("Lembaga keys saved successfully")

    return {
      message: "Lembaga created successfully",
      lembaga,
    }
  } catch (error) {
    console.error("Error in createLembaga:", error)
    throw new Error("Failed to create lembaga")
  }
}