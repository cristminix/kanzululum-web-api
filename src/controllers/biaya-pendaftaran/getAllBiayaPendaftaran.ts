import { BiayaPendaftaran } from "../../models/biaya-pendaftaran"
import { KVService } from "../../services/kvService"

export async function getAllBiayaPendaftaran(kvService: KVService): Promise<{ biayaPendaftaran: BiayaPendaftaran[] }> {
  try {
    const keys = await kvService.getAllBiayaPendaftaranKeys()

    const biayaPendaftaranList: BiayaPendaftaran[] = []
    for (const key of keys) {
      const biayaPendaftaranStr = await kvService.getBiayaPendaftaran(key)
      if (biayaPendaftaranStr) {
        const biayaPendaftaran = JSON.parse(biayaPendaftaranStr) as BiayaPendaftaran
        biayaPendaftaranList.push(biayaPendaftaran)
      }
    }

    return { biayaPendaftaran: biayaPendaftaranList }
  } catch (error) {
    throw new Error("Failed to retrieve biaya pendaftaran")
  }
}