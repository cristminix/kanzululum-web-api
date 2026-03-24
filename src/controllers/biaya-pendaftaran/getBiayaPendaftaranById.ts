import { BiayaPendaftaran } from "../../models/biaya-pendaftaran"
import { KVService } from "../../services/kvService"

export async function getBiayaPendaftaranById(kvService: KVService, id: number): Promise<BiayaPendaftaran | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const biayaPendaftaranStr = await kvService.getBiayaPendaftaran(id)
    if (!biayaPendaftaranStr) {
      return null
    }

    return JSON.parse(biayaPendaftaranStr) as BiayaPendaftaran
  } catch (error) {
    throw new Error("Failed to retrieve biaya pendaftaran")
  }
}