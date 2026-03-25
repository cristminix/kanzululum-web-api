import { Profile } from "../../models/profile"
import { KVService } from "../../services/kvService"

export async function getProfileByKind(kvService: KVService, kind: string): Promise<Profile | null> {
  try {
    // Get all profile keys
    const keys = await kvService.getAllProfileKeys()

    // Search for profile with matching kind
    for (const key of keys) {
      const profileStr = await kvService.getProfile(key)
      if (profileStr) {
        const profile = JSON.parse(profileStr) as Profile
        if (profile.kind === kind) {
          // Add imageUrl if image exists
          if (profile.image) {
            profile.imageUrl = `/api/files/${profile.image}?preview=true`
          }
          return profile
        }
      }
    }

    return null
  } catch (error) {
    throw new Error("Failed to retrieve profile by kind")
  }
}