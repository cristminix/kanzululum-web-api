import { Galery } from "../../models/galery"
import { KVService } from "../../services/kvService"

export async function getGaleryById(kvService: KVService, id: number): Promise<Galery | null> {
  try {
    const galeryStr = await kvService.getGalery(id)
    if (galeryStr) {
      return JSON.parse(galeryStr) as Galery
    }
    return null
  } catch (error) {
    throw new Error("Failed to retrieve galery")
  }
}