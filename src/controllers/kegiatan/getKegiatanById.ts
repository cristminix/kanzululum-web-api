import { Kegiatan } from "../../models/kegiatan"
import { KVService } from "../../services/kvService"

export async function getKegiatanById(kvService: KVService, id: string): Promise<Kegiatan | null> {
  try {
    if (!id) {
      throw new Error("Invalid ID")
    }

    const kegiatanStr = await kvService.getKegiatan(id)
    if (!kegiatanStr) {
      return null
    }

    return JSON.parse(kegiatanStr) as Kegiatan
  } catch (error) {
    throw new Error("Failed to retrieve kegiatan")
  }
}