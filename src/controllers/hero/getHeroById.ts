import { Hero } from "../../models/hero"
import { KVService } from "../../services/kvService"

export async function getHeroById(
  kvService: KVService,
  id: number
): Promise<Hero | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const heroStr = await kvService.getHeroById(id)
    if (!heroStr) {
      return null
    }

    const hero = JSON.parse(heroStr) as Hero
    if (hero.image) {
      hero.imageUrl = `/api/files/${hero.image}?preview=true`
    }

    return hero
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to retrieve hero")
  }
}