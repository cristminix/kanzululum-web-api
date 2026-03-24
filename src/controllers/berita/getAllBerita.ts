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
        if (berita.cover) {
          berita.coverUrl = `/api/files/${berita.cover}?preview=true`
        }
        if (berita.content) {
          try {
            //@ts-ignore
            berita.content = JSON.parse(berita.content)
          } catch (error) {
            berita.content = []
          }
        }
        beritaList.push(berita)
      }
    }

    return { berita: beritaList }
  } catch (error) {
    throw new Error("Failed to retrieve berita")
  }
}