import { Lembaga } from "../../models/lembaga"
import { KVService } from "../../services/kvService"

export async function getLembagaById(
  kvService: KVService,
  id: number
): Promise<Lembaga | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const lembagaStr = await kvService.getLembaga(id)
    if (!lembagaStr) {
      return null
    }

    const lembaga = JSON.parse(lembagaStr) as Lembaga
    if (lembaga.image) {
      lembaga.imageUrl = `/api/files/${lembaga.image}?preview=true`
    }

    return lembaga
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to retrieve lembaga")
  }
}