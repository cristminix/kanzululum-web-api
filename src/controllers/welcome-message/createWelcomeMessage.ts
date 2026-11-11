import { WelcomeMessage } from "../../models/welcome-message"
import { KVService } from "../../services/kvService"

export async function createWelcomeMessage(
  kvService: KVService,
  data: Partial<WelcomeMessage>
): Promise<{ welcomeMessage: WelcomeMessage; message: string }> {
  try {
    // Generate ID baru
    const id = kvService.generateId()

    // Buat objek welcome message
    const welcomeMessage: WelcomeMessage = {
      id,
      title: data.title,
      content: data.content,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    }

    // Simpan ke Cloudflare KV
    await kvService.saveWelcomeMessageById(id, JSON.stringify(welcomeMessage))

    // Update daftar ID welcome message
    const keys = await kvService.getAllWelcomeMessageKeys()
    keys.push(id)
    await kvService.saveWelcomeMessageKeys(keys)

    return {
      message: "Welcome message created successfully",
      welcomeMessage,
    }
  } catch (error) {
    console.error("Error in createWelcomeMessage:", error)
    throw new Error("Failed to create welcome message")
  }
}
