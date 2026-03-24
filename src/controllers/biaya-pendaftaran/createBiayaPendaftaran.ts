import { BiayaPendaftaran } from "../../models/biaya-pendaftaran"
import { KVService } from "../../services/kvService"

export async function createBiayaPendaftaran(
  kvService: KVService,
  data: Partial<BiayaPendaftaran>
): Promise<{ biayaPendaftaran: BiayaPendaftaran; message: string }> {
  try {
    // Generate ID baru
    const id = kvService.generateId()

    // Buat objek biaya pendaftaran
    const biayaPendaftaran: BiayaPendaftaran = {
      id,
      categorySlug: data.categorySlug,
      legend: data.legend,
      keterangan: data.keterangan,
      biaya: data.biaya,
    }

    // Simpan ke Cloudflare KV
    await kvService.saveBiayaPendaftaran(id, JSON.stringify(biayaPendaftaran))

    // Update daftar ID biaya pendaftaran
    const keys = await kvService.getAllBiayaPendaftaranKeys()
    keys.push(id)
    await kvService.saveBiayaPendaftaranKeys(keys)

    return {
      message: "Biaya pendaftaran created successfully",
      biayaPendaftaran,
    }
  } catch (error) {
    throw new Error("Failed to create biaya pendaftaran")
  }
}