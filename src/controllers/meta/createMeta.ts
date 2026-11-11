import { Meta } from "../../models/meta"
import { KVService } from "../../services/kvService"

export async function createMeta(
  kvService: KVService,
  data: Partial<Meta>
): Promise<{ meta: Meta; message: string }> {
  try {
    // Generate ID baru
    const id = kvService.generateId()

    // Buat objek meta
    const meta: Meta = {
      id,
      title: data.title,
      "meta-description": data["meta-description"],
      "meta-keyword": data["meta-keyword"],
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    }

    // Simpan ke Cloudflare KV
    await kvService.saveMetaById(id, JSON.stringify(meta))

    // Update daftar ID meta
    const keys = await kvService.getAllMetaKeys()
    keys.push(id)
    await kvService.saveMetaKeys(keys)

    return {
      message: "Meta created successfully",
      meta,
    }
  } catch (error) {
    console.error("Error in createMeta:", error)
    throw new Error("Failed to create meta")
  }
}
