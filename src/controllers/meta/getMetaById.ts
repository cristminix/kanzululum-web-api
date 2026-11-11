import { Meta } from "../../models/meta"
import { KVService } from "../../services/kvService"

export async function getMetaById(
  kvService: KVService,
  id: number
): Promise<Meta | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const metaStr = await kvService.getMetaById(id)
    if (!metaStr) {
      return null
    }

    return JSON.parse(metaStr) as Meta
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to retrieve meta")
  }
}
