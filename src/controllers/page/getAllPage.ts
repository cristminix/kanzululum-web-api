import { Page } from "../../models/page"
import { KVService } from "../../services/kvService"

export async function getAllPage(kvService: KVService): Promise<{ page: Page[] }> {
  try {
    const keys = await kvService.getAllPageKeys()

    const pageList: Page[] = []
    for (const key of keys) {
      const pageStr = await kvService.getPage(key)
      if (pageStr) {
        const page = JSON.parse(pageStr) as Page
        pageList.push(page)
      }
    }

    return { page: pageList }
  } catch (error) {
    throw new Error("Failed to retrieve page")
  }
}