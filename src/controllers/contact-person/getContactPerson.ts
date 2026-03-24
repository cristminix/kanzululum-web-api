import { ContactPerson } from "../../models/contact-person"
import { KVService } from "../../services/kvService"

export async function getContactPerson(kvService: KVService): Promise<{ contactPerson: ContactPerson | null }> {
  try {
    const contactPersonStr = await kvService.getContactPerson()
    if (contactPersonStr) {
      return { contactPerson: JSON.parse(contactPersonStr) as ContactPerson }
    }
    return { contactPerson: null }
  } catch (error) {
    throw new Error("Failed to retrieve contact person")
  }
}