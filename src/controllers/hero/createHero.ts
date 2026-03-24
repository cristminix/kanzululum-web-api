import { Hero } from "../../models/hero"
import { KVService } from "../../services/kvService"

export async function createHero(
  kvService: KVService,
  data: Partial<Hero>
): Promise<{ hero: Hero; message: string }> {
  try {
    console.log(
      "Starting createHero with data:",
      JSON.stringify(data, null, 2)
    )

    // Generate ID baru
    const id = kvService.generateId()
    console.log("Generated ID:", id)

    // Buat objek hero
    const hero: Hero = {
      id,
      slug: data.slug,
      title: data.title,
      description: data.description,
      image: data.image,
      linkText: data.linkText,
      link: data.link,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    }

    console.log("Created hero object:", JSON.stringify(hero, null, 2))

    // Simpan ke Cloudflare KV
    console.log("Saving hero to KV...")
    await kvService.saveHeroById(id, JSON.stringify(hero))
    console.log("Hero saved to KV successfully")

    // Update daftar ID hero
    console.log("Getting all hero keys...")
    const keys = await kvService.getAllHeroKeys()
    console.log("Current keys:", keys)
    keys.push(id)
    console.log("Updated keys:", keys)
    await kvService.saveHeroKeys(keys)
    console.log("Hero keys saved successfully")

    return {
      message: "Hero created successfully",
      hero,
    }
  } catch (error) {
    console.error("Error in createHero:", error)
    throw new Error("Failed to create hero")
  }
}