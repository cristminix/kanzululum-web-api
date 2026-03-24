import { KVService } from "../../services/kvService"
import { Page } from "../../models/page"

export async function deletePage(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah page ada
    const existingPageStr = await kvService.getPage(id)
    if (!existingPageStr) {
      return null
    }

    // Hapus dari Cloudflare KV
    await kvService.deletePage(id)

    // Update daftar ID page
    const keys = await kvService.getAllPageKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.savePageKeys(updatedKeys)

    return {
      message: "Page deleted successfully",
      id,
    }
  } catch (error) {
    throw new Error("Failed to delete page")
  }
}