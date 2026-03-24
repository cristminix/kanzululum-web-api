import { Profile } from "../../models/profile"
import { KVService } from "../../services/kvService"

export async function getProfileById(kvService: KVService, id: number): Promise<Profile | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const profileStr = await kvService.getProfile(id)
    if (!profileStr) {
      return null
    }

    const profile = JSON.parse(profileStr) as Profile
    if (profile.image) {
      profile.imageUrl = `/api/files/${profile.image}?preview=true`
    }

    return profile
  } catch (error) {
    throw new Error("Failed to retrieve profile")
  }
}