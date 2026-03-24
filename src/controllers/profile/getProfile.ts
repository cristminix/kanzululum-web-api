import { Profile } from "../../models/profile"
import { KVService } from "../../services/kvService"

export async function getProfile(kvService: KVService): Promise<{ profile: Profile | null }> {
  try {
    const profileStr = await kvService.getProfile()
    if (!profileStr) {
      return { profile: null }
    }
    const profile = JSON.parse(profileStr) as Profile
    return { profile }
  } catch (error) {
    throw new Error("Failed to retrieve profile")
  }
}