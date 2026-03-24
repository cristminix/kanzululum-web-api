import { KVService } from "../../services/kvService"
import { Lembaga } from "../../models/lembaga"

export async function deleteLembaga(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Check if lembaga exists
    const lembagaStr = await kvService.getLembaga(id)
    if (!lembagaStr) {
      return null
    }

    // Parse lembaga untuk mendapatkan image file ID
    const existingLembaga: Lembaga = JSON.parse(lembagaStr)

    // Hapus image file jika ada
    if (existingLembaga.image) {
      await kvService.delete(existingLembaga.image)
    }

    // Delete lembaga
    await kvService.deleteLembaga(id)

    // Update keys list
    const keys = await kvService.getAllLembagaKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveLembagaKeys(updatedKeys)

    return {
      id,
      message: "Lembaga deleted successfully",
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      throw error
    }
    throw new Error("Failed to delete lembaga")
  }
}