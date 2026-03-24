import { WebNavigation } from "../../models/web-navigation"
import { KVService } from "../../services/kvService"

export async function getAllWebNavigation(kvService: KVService): Promise<{ webNavigation: WebNavigation[] }> {
  try {
    const keys = await kvService.getAllWebNavigationKeys()

    const webNavigationList: WebNavigation[] = []
    for (const key of keys) {
      const webNavigationStr = await kvService.getWebNavigation(key)
      if (webNavigationStr) {
        const webNavigation = JSON.parse(webNavigationStr) as WebNavigation
        webNavigationList.push(webNavigation)
      }
    }

    return { webNavigation: webNavigationList }
  } catch (error) {
    throw new Error("Failed to retrieve web navigation")
  }
}