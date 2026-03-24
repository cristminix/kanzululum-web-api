import { Hero } from "../../models/hero"
import { KVService } from "../../services/kvService"

export async function getHero(kvService: KVService): Promise<{ hero: Hero | null }> {
  try {
    const heroStr = await kvService.getHero()
    if (heroStr) {
      return { hero: JSON.parse(heroStr) as Hero }
    }
    return { hero: null }
  } catch (error) {
    throw new Error("Failed to retrieve hero")
  }
}