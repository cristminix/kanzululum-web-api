import { Meta } from "../../models/meta"
import { KVService } from "../../services/kvService"

export async function updateMeta(
  kvService: KVService,
  id: number,
  data: Partial<Meta>
): Promise<{ meta: Meta; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Dapatkan meta yang ada
    const existingStr = await kvService.getMetaById(id)
    if (!existingStr) {
      return null
    }

    const existing = JSON.parse(existingStr) as Meta

    // Update field yang diberikan
    const updatedMeta: Meta = {
      ...existing,
      title: data.title !== undefined ? data.title : existing.title,
      "meta-description":
        data["meta-description"] !== undefined
          ? data["meta-description"]
          : existing["meta-description"],
      "meta-keyword":
        data["meta-keyword"] !== undefined
          ? data["meta-keyword"]
          : existing["meta-keyword"],
      dateUpdated: new Date().toISOString(),
    }

    // Simpan ke Cloudflare KV
    await kvService.saveMetaById(id, JSON.stringify(updatedMeta))

    return {
      message: "Meta updated successfully",
      meta: updatedMeta,
    }
  } catch (error) {
    console.error("Error in updateMeta:", error)
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to update meta")
  }
}
