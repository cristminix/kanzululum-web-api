import { KVService } from "../../services/kvService"
import { Galery } from "../../models/galery"

export async function deleteGalery(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const galeryStr = await kvService.getGalery(id)
    if (!galeryStr) {
      return null
    }

    // Parse galery untuk mendapatkan image file ID
    const existingGalery: Galery = JSON.parse(galeryStr)

    // Hapus image file jika ada
    if (existingGalery.image) {
      await kvService.delete(existingGalery.image)
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