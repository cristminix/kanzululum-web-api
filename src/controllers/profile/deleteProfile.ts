import { KVService } from "../../services/kvService"
import { Profile } from "../../models/profile"

export async function deleteProfile(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah profile ada
    const existingProfileStr = await kvService.getProfile(id)
    if (!existingProfileStr) {
      return null
    }

    // Parse profile untuk mendapatkan image file ID
    const existingProfile: Profile = JSON.parse(existingProfileStr)

    // Hapus image jika ada
    if (existingProfile.image) {
      await kvService.delete(existingProfile.image)
    }

    // Hapus dari Cloudflare KV
    await kvService.deleteProfile(id)

    // Update daftar ID profile
    const keys = await kvService.getAllProfileKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveProfileKeys(updatedKeys)

    return {
      message: "Profile deleted successfully",
      id,
    }
  } catch (error) {
    throw new Error("Failed to delete profile")
  }
}