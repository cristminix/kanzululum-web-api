import { KVService } from "../../services/kvService"

export async function deleteWelcomeMessage(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Check if welcome message exists
    const welcomeMessageStr = await kvService.getWelcomeMessageById(id)
    if (!welcomeMessageStr) {
      return null
    }

    // Delete welcome message
    await kvService.deleteWelcomeMessageById(id)

    // Update keys list
    const keys = await kvService.getAllWelcomeMessageKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveWelcomeMessageKeys(updatedKeys)

    return {
      id,
      message: "Welcome message deleted successfully",
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to delete welcome message")
  }
}
