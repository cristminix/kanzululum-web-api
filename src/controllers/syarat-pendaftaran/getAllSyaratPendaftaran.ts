import { SyaratPendaftaran } from "../../models/syarat-pendaftaran"
import { KVService } from "../../services/kvService"

export async function getAllSyaratPendaftaran(kvService: KVService): Promise<{ syaratPendaftaran: SyaratPendaftaran[] }> {
  try {
    const keys = await kvService.getAllSyaratPendaftaranKeys()

    const syaratPendaftaranList: SyaratPendaftaran[] = []
    for (const key of keys) {
      const syaratPendaftaranStr = await kvService.getSyaratPendaftaran(key)
      if (syaratPendaftaranStr) {
        const syaratPendaftaran = JSON.parse(syaratPendaftaranStr) as SyaratPendaftaran
        syaratPendaftaranList.push(syaratPendaftaran)
      }
    }

    return { syaratPendaftaran: syaratPendaftaranList }
  } catch (error) {
    throw new Error("Failed to retrieve syarat pendaftaran")
  }
}