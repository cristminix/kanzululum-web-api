import { Hero } from "../../models/hero"
import { KVService } from "../../services/kvService"

export async function getAllHero(kvService: KVService): Promise<{ hero: Hero[] }> {
  try {
    const keys = await kvService.getAllHeroKeys()

    const heroList: Hero[] = []
    for (const key of keys) {
      const heroStr = await kvService.getHeroById(key)
      if (heroStr) {
        const hero = JSON.parse(heroStr) as Hero
        if (hero.image) {
          hero.imageUrl = `/api/files/${hero.image}?preview=true`
        }
        heroList.push(hero)
      }
    }

    // Sort by id descending (newest first)
    heroList.sort((a, b) => (b.id || 0) - (a.id || 0))

    return { hero: heroList }
  } catch (error) {
    throw new Error("Failed to retrieve hero")
  }
}