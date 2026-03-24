import { Galery } from "../../models/galery"
import { KVService } from "../../services/kvService"

export async function updateGalery(
  kvService: KVService,
  id: number,
  data: Partial<Galery>
): Promise<{ galery: Galery; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const galeryStr = await kvService.getGalery(id)
    if (!galeryStr) {
      return null
    }

    const existing = JSON.parse(galeryStr) as Galery

    // Hapus image lama jika image baru berbeda
    if (
      data.image !== undefined &&
      data.image !== existing.image &&
      existing.image
    ) {
      await kvService.delete(existing.image)
    }

    const updated: Galery = {
      ...existing,
      title: data.title !== undefined ? data.title : existing.title,
      slug: data.slug !== undefined ? data.slug : existing.slug,
      description: data.description !== undefined ? data.description : existing.description,
      image: data.image !== undefined ? data.image : existing.image,
      dateUpdated: new Date().toISOString(),
      id, // Preserve id
    }

    await kvService.saveGalery(id, JSON.stringify(updated))
    return { galery: updated, message: "Galery updated successfully" }
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to update galery")
  }
}