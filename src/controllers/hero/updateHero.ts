import { Hero } from "../../models/hero"
import { KVService } from "../../services/kvService"

export async function updateHero(
  kvService: KVService,
  data: Partial<Hero>
): Promise<{ hero: Hero; message: string }> {
  try {
    const hero: Hero = {
      id: data.id || 1,
      slug: data.slug || "",
      title: data.title || [],
      description: data.description || [],
      image: data.image || "",
      linkText: data.linkText || "",
      link: data.link || "",
    }

    await kvService.saveHero(JSON.stringify(hero))
    return { hero, message: "Hero updated successfully" }
  } catch (error) {
    throw new Error("Failed to update hero")
  }
}