import { KVService } from "../../services/kvService"

export async function deleteMeta(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Check if meta exists
    const metaStr = await kvService.getMetaById(id)
    if (!metaStr) {
      return null
    }

    // Delete meta
    await kvService.deleteMetaById(id)

    // Update keys list
    const keys = await kvService.getAllMetaKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveMetaKeys(updatedKeys)

    return {
      id,
      message: "Meta deleted successfully",
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to delete meta")
  }
}
