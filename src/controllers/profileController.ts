import { Profile } from "../models/profile"
import { KVService } from "../services/kvService"
import { getProfile } from "./profile/getProfile"

export class ProfileController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/profile - Mendapatkan profile
  async getProfile(): Promise<{ profile: Profile | null }> {
    return getProfile(this.kvService)
  }
}