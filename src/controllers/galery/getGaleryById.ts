import { Galery } from "../../models/galery"
import { KVService } from "../../services/kvService"

export async function getGaleryById(kvService: KVService, id: number): Promise<Galery | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const galeryStr = await kvService.getGalery(id)
    if (!galeryStr) {
      return null
    }

    const galery = JSON.parse(galeryStr) as Galery
    if (galery.image) {
      galery.imageUrl = `/api/files/${galery.image}?preview=true`
    }

    return galery
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to retrieve galery")
  }
}