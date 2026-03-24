import { Profile } from "../../models/profile"
import { KVService } from "../../services/kvService"

export async function createProfile(
  kvService: KVService,
  data: Partial<Profile>
): Promise<{ profile: Profile; message: string }> {
  try {
    console.log(
      "Starting createProfile with data:",
      JSON.stringify(data, null, 2)
    )

    // Generate ID baru
    const id = kvService.generateId()
    console.log("Generated ID:", id)

    // Buat objek profile
    const profile: Profile = {
      id,
      heading: data.heading,
      title: data.title,
      image: data.image,
      kind: data.kind,
      contents: data.contents,
      linkText: data.linkText,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    }

    console.log("Created profile object:", JSON.stringify(profile, null, 2))

    // Simpan ke Cloudflare KV
    console.log("Saving profile to KV...")
    await kvService.saveProfile(id, JSON.stringify(profile))
    console.log("Profile saved to KV successfully")

    // Update daftar ID profile
    console.log("Getting all profile keys...")
    const keys = await kvService.getAllProfileKeys()
    console.log("Current keys:", keys)
    keys.push(id)
    console.log("Updated keys:", keys)
    await kvService.saveProfileKeys(keys)
    console.log("Profile keys saved successfully")

    return {
      message: "Profile created successfully",
      profile,
    }
  } catch (error) {
    console.error("Error in createProfile:", error)
    throw new Error("Failed to create profile")
  }
}