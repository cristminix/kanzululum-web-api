import { Kegiatan } from "../../models/kegiatan"
import { KVService } from "../../services/kvService"

export async function deleteKegiatan(
  kvService: KVService,
  id: string
): Promise<{ id: string; message: string } | null> {
  try {
    if (!id) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah kegiatan ada
    const existingKegiatanStr = await kvService.getKegiatan(id)
    if (!existingKegiatanStr) {
      return null
    }

    // Hapus dari Cloudflare KV
    await kvService.deleteKegiatan(id)

    // Update daftar ID kegiatan
    const keys = await kvService.getAllKegiatanKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveKegiatanKeys(updatedKeys)

    return {
      message: "Kegiatan deleted successfully",
      id,
    }
  } catch (error) {
    throw new Error("Failed to delete kegiatan")
  }
}