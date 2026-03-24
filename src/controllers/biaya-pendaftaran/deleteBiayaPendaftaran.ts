import { KVService } from "../../services/kvService"

export async function deleteBiayaPendaftaran(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah biaya pendaftaran ada
    const existingBiayaPendaftaranStr = await kvService.getBiayaPendaftaran(id)
    if (!existingBiayaPendaftaranStr) {
      return null
    }

    // Hapus dari Cloudflare KV
    await kvService.deleteBiayaPendaftaran(id)

    // Update daftar ID biaya pendaftaran
    const keys = await kvService.getAllBiayaPendaftaranKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveBiayaPendaftaranKeys(updatedKeys)

    return {
      message: "Biaya pendaftaran deleted successfully",
      id,
    }
  } catch (error) {
    throw new Error("Failed to delete biaya pendaftaran")
  }
}