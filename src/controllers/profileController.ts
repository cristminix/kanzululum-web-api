import { Profile } from "../models/profile"
import { KVService } from "../services/kvService"
import { getAllProfiles } from "./profile/getAllProfiles"
import { getProfileWithPager } from "./profile/getProfileWithPager"
import { getProfileById } from "./profile/getProfileById"
import { createProfile } from "./profile/createProfile"
import { updateProfile } from "./profile/updateProfile"
import { deleteProfile } from "./profile/deleteProfile"

export class ProfileController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/profile - Mendapatkan semua profile
  async getAllProfiles(): Promise<{ profiles: Profile[] }> {
    return getAllProfiles(this.kvService)
  }

  // GET /api/profile/pager - Mendapatkan profile dengan pagination
  async getProfileWithPager(
    page: number,
    limit: number,
    kind?: string
  ): Promise<any> {
    return getProfileWithPager(this.kvService, page, limit, kind)
  }

  // GET /api/profile/:id - Mendapatkan profile berdasarkan ID
  async getProfileById(id: number): Promise<Profile | null> {
    return getProfileById(this.kvService, id)
  }

  // POST /api/profile - Membuat profile baru
  async createProfile(
    data: Partial<Profile>
  ): Promise<{ profile: Profile; message: string }> {
    return createProfile(this.kvService, data)
  }

  // PUT /api/profile/:id - Memperbarui profile
  async updateProfile(
    id: number,
    data: Partial<Profile>
  ): Promise<{ profile: Profile; message: string } | null> {
    return updateProfile(this.kvService, id, data)
  }

  // DELETE /api/profile/:id - Menghapus profile
  async deleteProfile(
    id: number
  ): Promise<{ id: number; message: string } | null> {
    return deleteProfile(this.kvService, id)
  }
}