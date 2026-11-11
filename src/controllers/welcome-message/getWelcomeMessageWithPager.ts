import { WelcomeMessage } from "../../models/welcome-message"
import { KVService } from "../../services/kvService"

export async function getWelcomeMessageWithPager(
  kvService: KVService,
  page: number,
  limit: number
): Promise<any> {
  try {
    // Validasi parameter
    if (isNaN(page) || page < 1) {
      throw new Error("Page must be a positive integer")
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      throw new Error("Limit must be between 1 and 100")
    }

    // Dapatkan semua keys
    const keys = await kvService.getAllWelcomeMessageKeys()

    // Sort by id descending (newest first)
    keys.sort((a, b) => b - a)

    // Hitung offset
    const offset = (page - 1) * limit

    // Dapatkan subset keys berdasarkan pagination
    const paginatedKeys = keys.slice(offset, offset + limit)

    // Dapatkan data welcome message untuk keys yang dipaginasi
    const welcomeMessageList: WelcomeMessage[] = []
    for (const key of paginatedKeys) {
      const welcomeMessageStr = await kvService.getWelcomeMessageById(key)
      if (welcomeMessageStr) {
        const welcomeMessage = JSON.parse(welcomeMessageStr) as WelcomeMessage
        welcomeMessageList.push(welcomeMessage)
      }
    }

    // Hitung total pages
    const totalPages = Math.ceil(keys.length / limit)

    return {
      welcomeMessage: welcomeMessageList,
      pagination: {
        page,
        limit,
        total: keys.length,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    }
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Page must be a positive integer" ||
        error.message === "Limit must be between 1 and 100")
    ) {
      throw error
    }
    throw new Error("Failed to retrieve welcome message")
  }
}
