import { Hero } from "../../models/hero"
import { KVService } from "../../services/kvService"

export async function updateHero(
  kvService: KVService,
  id: number,
  data: Partial<Hero>
): Promise<{ hero: Hero; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    console.log(
      `Starting updateHero for ID ${id} with data:`,
      JSON.stringify(data, null, 2)
    )

    // Dapatkan hero yang ada
    const existingHeroStr = await kvService.getHeroById(id)
    if (!existingHeroStr) {
      return null
    }

    const existingHero = JSON.parse(existingHeroStr) as Hero
    console.log("Existing hero:", JSON.stringify(existingHero, null, 2))

    // Hapus image lama jika image baru berbeda
    if (
      data.image !== undefined &&
      data.image !== existingHero.image &&
      existingHero.image
    ) {
      await kvService.delete(existingHero.image)
    }

    // Update field yang diberikan
    const updatedHero: Hero = {
      ...existingHero,
      slug: data.slug !== undefined ? data.slug : existingHero.slug,
      title: data.title !== undefined ? data.title : existingHero.title,
      description: data.description !== undefined ? data.description : existingHero.description,
      image: data.image !== undefined ? data.image : existingHero.image,
      linkText: data.linkText !== undefined ? data.linkText : existingHero.linkText,
      link: data.link !== undefined ? data.link : existingHero.link,
      dateUpdated: new Date().toISOString(),
    }

    console.log("Updated hero object:", JSON.stringify(updatedHero, null, 2))

    // Simpan ke Cloudflare KV
    await kvService.saveHeroById(id, JSON.stringify(updatedHero))

    return {
      message: "Hero updated successfully",
      hero: updatedHero,
    }
  } catch (error) {
    console.error("Error in updateHero:", error)
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to update hero")
  }
}