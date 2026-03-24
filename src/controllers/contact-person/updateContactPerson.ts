import { ContactPerson } from "../../models/contact-person"
import { KVService } from "../../services/kvService"

export async function updateContactPerson(
  kvService: KVService,
  data: Partial<ContactPerson>
): Promise<{ contactPerson: ContactPerson; message: string }> {
  try {
    // Get existing contact person data
    const existingStr = await kvService.getContactPerson()
    let existing: ContactPerson = {}

    if (existingStr) {
      existing = JSON.parse(existingStr) as ContactPerson
    }

    // Merge with new data
    const updated: ContactPerson = {
      ...existing,
      ...data,
    }

    await kvService.saveContactPerson(JSON.stringify(updated))
    return { contactPerson: updated, message: "Contact person updated successfully" }
  } catch (error) {
    throw new Error("Failed to update contact person")
  }
}