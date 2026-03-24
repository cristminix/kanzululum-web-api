import { Lembaga } from "../../models/lembaga"
import { KVService } from "../../services/kvService"

export async function updateLembaga(
  kvService: KVService,
  id: number,
  data: Partial<Lembaga>
): Promise<{ lembaga: Lembaga; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    console.log(
      `Starting updateLembaga for ID ${id} with data:`,
      JSON.stringify(data, null, 2)
    )

    // Dapatkan lembaga yang ada
    const existingLembagaStr = await kvService.getLembaga(id)
    if (!existingLembagaStr) {
      return null
    }

    const existingLembaga = JSON.parse(existingLembagaStr) as Lembaga
    console.log("Existing lembaga:", JSON.stringify(existingLembaga, null, 2))

    // Hapus image lama jika image baru berbeda
    if (
      data.image !== undefined &&
      data.image !== existingLembaga.image &&
      existingLembaga.image
    ) {
      await kvService.delete(existingLembaga.image)
    }

    // Update field yang diberikan
    const updatedLembaga: Lembaga = {
      ...existingLembaga,
      name: data.name !== undefined ? data.name : existingLembaga.name,
      image: data.image !== undefined ? data.image : existingLembaga.image,
      description: data.description !== undefined ? data.description : existingLembaga.description,
      dateUpdated: new Date().toISOString(),
    }

    console.log("Updated lembaga object:", JSON.stringify(updatedLembaga, null, 2))

    // Simpan ke Cloudflare KV
    await kvService.saveLembaga(id, JSON.stringify(updatedLembaga))

    return {
      message: "Lembaga updated successfully",
      lembaga: updatedLembaga,
    }
  } catch (error) {
    console.error("Error in updateLembaga:", error)
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to update lembaga")
  }
}