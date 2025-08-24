import { KVService } from "../../services/kvService"

export async function deleteBerita(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah berita ada
    const existingBeritaStr = await kvService.getBerita(id)
    if (!existingBeritaStr) {
      return null
    }

    // Hapus dari Cloudflare KV
    await kvService.deleteBerita(id)

    // Update daftar ID berita
    const keys = await kvService.getAllBeritaKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveBeritaKeys(updatedKeys)

    return {
      message: "Berita deleted successfully",
      id,
    }
  } catch (error) {
    throw new Error("Failed to delete berita")
  }
}