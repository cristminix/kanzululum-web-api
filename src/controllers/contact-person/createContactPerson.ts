import { ContactPerson } from "../../models/contact-person"
import { KVService } from "../../services/kvService"

export async function createContactPerson(
  kvService: KVService,
  data: Partial<ContactPerson>
): Promise<{ contactPerson: ContactPerson; message: string }> {
  try {
    // Generate ID baru
    const id = kvService.generateId()

    // Buat objek contact person
    const contactPerson: ContactPerson = {
      id,
      name: data.name,
      phone: data.phone,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    }

    // Simpan ke Cloudflare KV
    await kvService.saveContactPersonById(id, JSON.stringify(contactPerson))

    // Update daftar ID contact person
    const keys = await kvService.getAllContactPersonKeys()
    keys.push(id)
    await kvService.saveContactPersonKeys(keys)

    return {
      message: "Contact person created successfully",
      contactPerson,
    }
  } catch (error) {
    throw new Error("Failed to create contact person")
  }
}