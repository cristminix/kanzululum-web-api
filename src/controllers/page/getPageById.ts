import { Page } from "../../models/page"
import { KVService } from "../../services/kvService"

export async function getPageById(kvService: KVService, id: number): Promise<Page | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const pageStr = await kvService.getPage(id)
    if (!pageStr) {
      return null
    }

    return JSON.parse(pageStr) as Page
  } catch (error) {
    throw new Error("Failed to retrieve page")
  }
}