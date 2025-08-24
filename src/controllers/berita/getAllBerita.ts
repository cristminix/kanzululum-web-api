import { Berita } from "../../models/berita"
import { KVService } from "../../services/kvService"

export async function getAllBerita(kvService: KVService): Promise<{ berita: Berita[] }> {
  try {
    const keys = await kvService.getAllBeritaKeys()

    const beritaList: Berita[] = []
    for (const key of keys) {
      const beritaStr = await kvService.getBerita(key)
      if (beritaStr) {
        const berita = JSON.parse(beritaStr) as Berita
        beritaList.push(berita)
      }
    }

    return { berita: beritaList }
  } catch (error) {
    throw new Error("Failed to retrieve berita")
  }
}