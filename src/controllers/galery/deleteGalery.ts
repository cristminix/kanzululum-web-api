import { KVService } from "../../services/kvService"

export async function deleteGalery(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    const galeryStr = await kvService.getGalery(id)
    if (!galeryStr) {
      return null
    }

    await kvService.deleteGalery(id)

    // Remove id from keys
    const keys = await kvService.getAllGaleryKeys()
    const filteredKeys = keys.filter((key) => key !== id)
    await kvService.saveGaleryKeys(filteredKeys)

    return { id, message: "Galery deleted successfully" }
  } catch (error) {
    throw new Error("Failed to delete galery")
  }
}