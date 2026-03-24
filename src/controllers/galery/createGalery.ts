import { Galery } from "../../models/galery"
import { KVService } from "../../services/kvService"

export async function createGalery(
  kvService: KVService,
  data: Partial<Galery>
): Promise<{ galery: Galery; message: string }> {
  try {
    const id = kvService.generateId()
    const galery: Galery = {
      id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      image: data.image,
    }

    await kvService.saveGalery(id, JSON.stringify(galery))

    // Add id to keys
    const keys = await kvService.getAllGaleryKeys()
    keys.push(id)
    await kvService.saveGaleryKeys(keys)

    return { galery, message: "Galery created successfully" }
  } catch (error) {
    throw new Error("Failed to create galery")
  }
}