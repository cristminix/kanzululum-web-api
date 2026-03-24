import { KVService } from "../../services/kvService"

export async function deleteSyaratPendaftaran(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah data ada
    const existingStr = await kvService.getSyaratPendaftaran(id)
    if (!existingStr) {
      return null
    }

    // Hapus dari Cloudflare KV
    await kvService.deleteSyaratPendaftaran(id)

    // Update daftar ID
    const keys = await kvService.getAllSyaratPendaftaranKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveSyaratPendaftaranKeys(updatedKeys)

    return {
      message: "Syarat pendaftaran deleted successfully",
      id,
    }
  } catch (error) {
    throw new Error("Failed to delete syarat pendaftaran")
  }
}