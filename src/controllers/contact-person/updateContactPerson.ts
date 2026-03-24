import { ContactPerson } from "../../models/contact-person"
import { KVService } from "../../services/kvService"

export async function updateContactPerson(
  kvService: KVService,
  id: number,
  data: Partial<ContactPerson>
): Promise<{ contactPerson: ContactPerson; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Get existing contact person data
    const existingStr = await kvService.getContactPersonById(id)
    if (!existingStr) {
      return null
    }

    const existing: ContactPerson = JSON.parse(existingStr)

    // Merge with new data
    const updated: ContactPerson = {
      ...existing,
      ...data,
      id,
      dateUpdated: new Date().toISOString(),
    }

    await kvService.saveContactPersonById(id, JSON.stringify(updated))
    return { contactPerson: updated, message: "Contact person updated successfully" }
  } catch (error) {
    throw new Error("Failed to update contact person")
  }
}