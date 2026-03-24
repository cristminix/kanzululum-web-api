import { Lembaga } from "../../models/lembaga"
import { KVService } from "../../services/kvService"

export async function getAllLembaga(kvService: KVService): Promise<{ lembaga: Lembaga[] }> {
  try {
    const keys = await kvService.getAllLembagaKeys()

    const lembagaList: Lembaga[] = []
    for (const key of keys) {
      const lembagaStr = await kvService.getLembaga(key)
      if (lembagaStr) {
        const lembaga = JSON.parse(lembagaStr) as Lembaga
        if (lembaga.image) {
          lembaga.imageUrl = `/api/files/${lembaga.image}?preview=true`
        }
        lembagaList.push(lembaga)
      }
    }

    return { lembaga: lembagaList }
  } catch (error) {
    throw new Error("Failed to retrieve lembaga")
  }
}