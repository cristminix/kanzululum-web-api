import { Galery } from "../../models/galery"
import { KVService } from "../../services/kvService"

export async function getAllGalery(kvService: KVService): Promise<{ galery: Galery[] }> {
  try {
    const keys = await kvService.getAllGaleryKeys()
    const galeryItems: Galery[] = []

    for (const id of keys) {
      const galeryStr = await kvService.getGalery(id)
      if (galeryStr) {
        const galery = JSON.parse(galeryStr) as Galery
        if (galery.image) {
          galery.imageUrl = `/api/files/${galery.image}?preview=true`
        }
        galeryItems.push(galery)
      }
    }

    // Sort by id descending (newest first)
    galeryItems.sort((a, b) => (b.id || 0) - (a.id || 0))

    return { galery: galeryItems }
  } catch (error) {
    throw new Error("Failed to retrieve galery")
  }
}