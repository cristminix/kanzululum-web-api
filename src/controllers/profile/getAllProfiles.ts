import { Profile } from "../../models/profile"
import { KVService } from "../../services/kvService"

export async function getAllProfiles(kvService: KVService): Promise<{ profiles: Profile[] }> {
  try {
    const keys = await kvService.getAllProfileKeys()

    const profileList: Profile[] = []
    for (const key of keys) {
      const profileStr = await kvService.getProfile(key)
      if (profileStr) {
        const profile = JSON.parse(profileStr) as Profile
        if (profile.image) {
          profile.imageUrl = `/api/files/${profile.image}?preview=true`
        }
        profileList.push(profile)
      }
    }

    return { profiles: profileList }
  } catch (error) {
    throw new Error("Failed to retrieve profiles")
  }
}