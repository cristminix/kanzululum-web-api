import { WelcomeMessage } from "../../models/welcome-message"
import { KVService } from "../../services/kvService"

export async function getWelcomeMessageById(
  kvService: KVService,
  id: number
): Promise<WelcomeMessage | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const welcomeMessageStr = await kvService.getWelcomeMessageById(id)
    if (!welcomeMessageStr) {
      return null
    }

    return JSON.parse(welcomeMessageStr) as WelcomeMessage
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to retrieve welcome message")
  }
}
