import { Hero } from "../../models/hero"
import { KVService } from "../../services/kvService"

export async function getHeroWithPager(
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
    const keys = await kvService.getAllHeroKeys()

    // Sort by id descending (newest first)
    keys.sort((a, b) => b - a)

    // Hitung offset
    const offset = (page - 1) * limit

    // Dapatkan subset keys berdasarkan pagination
    const paginatedKeys = keys.slice(offset, offset + limit)

    // Dapatkan data hero untuk keys yang dipaginasi
    const heroList: Hero[] = []
    for (const key of paginatedKeys) {
      const heroStr = await kvService.getHeroById(key)
      if (heroStr) {
        const hero = JSON.parse(heroStr) as Hero
        if (hero.image) {
          hero.imageUrl = `/api/files/${hero.image}?preview=true`
        }
        heroList.push(hero)
      }
    }

    // Hitung total pages
    const totalPages = Math.ceil(keys.length / limit)

    return {
      hero: heroList,
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
    throw new Error("Failed to retrieve hero")
  }
}