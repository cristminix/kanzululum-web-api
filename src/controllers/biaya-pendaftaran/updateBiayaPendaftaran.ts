import { BiayaPendaftaran } from "../../models/biaya-pendaftaran"
import { KVService } from "../../services/kvService"

export async function updateBiayaPendaftaran(
  kvService: KVService,
  id: number,
  data: Partial<BiayaPendaftaran>
): Promise<{ biayaPendaftaran: BiayaPendaftaran; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah biaya pendaftaran ada
    const existingBiayaPendaftaranStr = await kvService.getBiayaPendaftaran(id)
    if (!existingBiayaPendaftaranStr) {
      return null
    }

    const existingBiayaPendaftaran = JSON.parse(existingBiayaPendaftaranStr) as BiayaPendaftaran

    // Update biaya pendaftaran
    const updatedBiayaPendaftaran: BiayaPendaftaran = {
      ...existingBiayaPendaftaran,
      categorySlug: data.categorySlug !== undefined ? data.categorySlug : existingBiayaPendaftaran.categorySlug,
      legend: data.legend !== undefined ? data.legend : existingBiayaPendaftaran.legend,
      keterangan: data.keterangan !== undefined ? data.keterangan : existingBiayaPendaftaran.keterangan,
      biaya: data.biaya !== undefined ? data.biaya : existingBiayaPendaftaran.biaya,
    }

    // Simpan ke Cloudflare KV
    await kvService.saveBiayaPendaftaran(id, JSON.stringify(updatedBiayaPendaftaran))

    return {
      message: "Biaya pendaftaran updated successfully",
      biayaPendaftaran: updatedBiayaPendaftaran,
    }
  } catch (error) {
    throw new Error("Failed to update biaya pendaftaran")
  }
}