import { WelcomeMessage } from "../../models/welcome-message"
import { KVService } from "../../services/kvService"

export async function updateWelcomeMessage(
  kvService: KVService,
  id: number,
  data: Partial<WelcomeMessage>
): Promise<{ welcomeMessage: WelcomeMessage; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Dapatkan welcome message yang ada
    const existingStr = await kvService.getWelcomeMessageById(id)
    if (!existingStr) {
      return null
    }

    const existing = JSON.parse(existingStr) as WelcomeMessage

    // Update field yang diberikan
    const updatedWelcomeMessage: WelcomeMessage = {
      ...existing,
      title: data.title !== undefined ? data.title : existing.title,
      content: data.content !== undefined ? data.content : existing.content,
      dateUpdated: new Date().toISOString(),
    }

    // Simpan ke Cloudflare KV
    await kvService.saveWelcomeMessageById(id, JSON.stringify(updatedWelcomeMessage))

    return {
      message: "Welcome message updated successfully",
      welcomeMessage: updatedWelcomeMessage,
    }
  } catch (error) {
    console.error("Error in updateWelcomeMessage:", error)
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to update welcome message")
  }
}
