import { Galery } from "../../models/galery"
import { KVService } from "../../services/kvService"

export async function updateGalery(
  kvService: KVService,
  id: number,
  data: Partial<Galery>
): Promise<{ galery: Galery; message: string } | null> {
  try {
    const galeryStr = await kvService.getGalery(id)
    if (!galeryStr) {
      return null
    }

    const existing = JSON.parse(galeryStr) as Galery
    const updated: Galery = {
      ...existing,
      ...data,
      id, // Preserve id
    }

    await kvService.saveGalery(id, JSON.stringify(updated))
    return { galery: updated, message: "Galery updated successfully" }
  } catch (error) {
    throw new Error("Failed to update galery")
  }
}