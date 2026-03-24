import { Profile } from "../../models/profile"
import { KVService } from "../../services/kvService"

export async function updateProfile(
  kvService: KVService,
  id: number,
  data: Partial<Profile>
): Promise<{ profile: Profile; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah profile ada
    const existingProfileStr = await kvService.getProfile(id)
    if (!existingProfileStr) {
      return null
    }

    const existingProfile = JSON.parse(existingProfileStr) as Profile

    // Hapus image lama jika image baru berbeda
    if (
      data.image !== undefined &&
      data.image !== existingProfile.image &&
      existingProfile.image
    ) {
      await kvService.delete(existingProfile.image)
    }

    // Update profile
    const updatedProfile: Profile = {
      ...existingProfile,
      heading: data.heading !== undefined ? data.heading : existingProfile.heading,
      title: data.title !== undefined ? data.title : existingProfile.title,
      image: data.image !== undefined ? data.image : existingProfile.image,
      kind: data.kind !== undefined ? data.kind : existingProfile.kind,
      contents: data.contents !== undefined ? data.contents : existingProfile.contents,
      linkText: data.linkText !== undefined ? data.linkText : existingProfile.linkText,
      dateUpdated: new Date().toISOString(),
    }

    // Simpan ke Cloudflare KV
    await kvService.saveProfile(id, JSON.stringify(updatedProfile))

    return {
      message: "Profile updated successfully",
      profile: updatedProfile,
    }
  } catch (error) {
    throw new Error("Failed to update profile")
  }
}