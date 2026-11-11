import { WelcomeMessage } from "../../models/welcome-message"
import { KVService } from "../../services/kvService"

export async function getAllWelcomeMessage(kvService: KVService): Promise<{ welcomeMessage: WelcomeMessage[] }> {
  try {
    const keys = await kvService.getAllWelcomeMessageKeys()

    const welcomeMessageList: WelcomeMessage[] = []
    for (const key of keys) {
      const welcomeMessageStr = await kvService.getWelcomeMessageById(key)
      if (welcomeMessageStr) {
        const welcomeMessage = JSON.parse(welcomeMessageStr) as WelcomeMessage
        welcomeMessageList.push(welcomeMessage)
      }
    }

    // Sort by id descending (newest first)
    welcomeMessageList.sort((a, b) => (b.id || 0) - (a.id || 0))

    return { welcomeMessage: welcomeMessageList }
  } catch (error) {
    throw new Error("Failed to retrieve welcome message")
  }
}
