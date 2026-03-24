import { Kegiatan } from "../../models/kegiatan"
import { KVService } from "../../services/kvService"

export async function getAllKegiatan(kvService: KVService): Promise<{ kegiatan: Kegiatan[] }> {
  try {
    const keys = await kvService.getAllKegiatanKeys()

    const kegiatanList: Kegiatan[] = []
    for (const key of keys) {
      const kegiatanStr = await kvService.getKegiatan(key)
      if (kegiatanStr) {
        const kegiatan = JSON.parse(kegiatanStr) as Kegiatan
        kegiatanList.push(kegiatan)
      }
    }

    return { kegiatan: kegiatanList }
  } catch (error) {
    throw new Error("Failed to retrieve kegiatan")
  }
}