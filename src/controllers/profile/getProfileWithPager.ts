import { Profile } from "../../models/profile"
import { KVService } from "../../services/kvService"

export async function getProfileWithPager(
  kvService: KVService,
  page: number,
  limit: number,
  kind?: string
): Promise<any> {
  try {
    // Validasi parameter
    if (isNaN(page) || page < 1) {
      throw new Error("Page must be a positive integer")
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      throw new Error("Limit must be between 1 and 100")
    }

    // Dapatkan semua keys
    let keys = await kvService.getAllProfileKeys()

    // Terapkan filter jika ada
    if (kind) {
      const filteredKeys: number[] = []
      for (const key of keys) {
        const profileStr = await kvService.getProfile(key)
        if (profileStr) {
          const profile = JSON.parse(profileStr) as Profile
          if (profile.kind && profile.kind === kind) {
            filteredKeys.push(key)
          }
        }
      }
      keys = filteredKeys
    }

    // Hitung offset
    const offset = (page - 1) * limit

    // Dapatkan subset keys berdasarkan pagination
    const paginatedKeys = keys.slice(offset, offset + limit)

    // Dapatkan data profile untuk keys yang dipaginasi
    const profileList: Profile[] = []
    for (const key of paginatedKeys) {
      const profileStr = await kvService.getProfile(key)
      if (profileStr) {
        const profile = JSON.parse(profileStr) as Profile
        if (profile.image) {
          profile.imageUrl = `/api/files/${profile.image}?preview=true`
        }
        profileList.push(profile)
      }
    }

    // Hitung total pages berdasarkan keys yang telah difilter
    const totalPages = Math.ceil(keys.length / limit)

    return {
      profiles: profileList,
      pagination: {
        page,
        limit,
        total: keys.length,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    }
  } catch (error) {
    throw new Error("Failed to retrieve profiles")
  }
}