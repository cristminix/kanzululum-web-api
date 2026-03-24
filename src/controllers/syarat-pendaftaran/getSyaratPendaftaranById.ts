import { SyaratPendaftaran } from "../../models/syarat-pendaftaran"
import { KVService } from "../../services/kvService"

export async function getSyaratPendaftaranById(kvService: KVService, id: number): Promise<SyaratPendaftaran | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const syaratPendaftaranStr = await kvService.getSyaratPendaftaran(id)
    if (!syaratPendaftaranStr) {
      return null
    }

    return JSON.parse(syaratPendaftaranStr) as SyaratPendaftaran
  } catch (error) {
    throw new Error("Failed to retrieve syarat pendaftaran")
  }
}