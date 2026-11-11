import { Meta } from "../../models/meta"
import { KVService } from "../../services/kvService"

export async function getAllMeta(kvService: KVService): Promise<{ meta: Meta[] }> {
  try {
    const keys = await kvService.getAllMetaKeys()

    const metaList: Meta[] = []
    for (const key of keys) {
      const metaStr = await kvService.getMetaById(key)
      if (metaStr) {
        const meta = JSON.parse(metaStr) as Meta
        metaList.push(meta)
      }
    }

    // Sort by id descending (newest first)
    metaList.sort((a, b) => (b.id || 0) - (a.id || 0))

    return { meta: metaList }
  } catch (error) {
    throw new Error("Failed to retrieve meta")
  }
}
