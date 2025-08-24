import { Berita } from "../../models/berita"
import { KVService } from "../../services/kvService"

export async function getBeritaById(kvService: KVService, id: number): Promise<Berita | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const beritaStr = await kvService.getBerita(id)
    if (!beritaStr) {
      return null
    }

    return JSON.parse(beritaStr) as Berita
  } catch (error) {
    throw new Error("Failed to retrieve berita")
  }
}