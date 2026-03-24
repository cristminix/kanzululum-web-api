import { KVService } from "../../services/kvService"
import { Hero } from "../../models/hero"

export async function deleteHero(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Check if hero exists
    const heroStr = await kvService.getHeroById(id)
    if (!heroStr) {
      return null
    }

    // Parse hero untuk mendapatkan image file ID
    const existingHero: Hero = JSON.parse(heroStr)

    // Hapus image file jika ada
    if (existingHero.image) {
      await kvService.delete(existingHero.image)
    }

    // Delete hero
    await kvService.deleteHeroById(id)

    // Update keys list
    const keys = await kvService.getAllHeroKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveHeroKeys(updatedKeys)

    return {
      id,
      message: "Hero deleted successfully",
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to delete hero")
  }
}