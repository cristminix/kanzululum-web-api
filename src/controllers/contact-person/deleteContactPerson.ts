import { KVService } from "../../services/kvService"

export async function deleteContactPerson(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah contact person ada
    const existingStr = await kvService.getContactPersonById(id)
    if (!existingStr) {
      return null
    }

    // Hapus dari Cloudflare KV
    await kvService.deleteContactPersonById(id)

    // Update daftar ID contact person
    const keys = await kvService.getAllContactPersonKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveContactPersonKeys(updatedKeys)

    return {
      message: "Contact person deleted successfully",
      id,
    }
  } catch (error) {
    throw new Error("Failed to delete contact person")
  }
}