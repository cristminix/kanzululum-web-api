import { ContactPerson } from "../../models/contact-person"
import { KVService } from "../../services/kvService"

export async function getContactPersonById(kvService: KVService, id: number): Promise<ContactPerson | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const contactPersonStr = await kvService.getContactPersonById(id)
    if (!contactPersonStr) {
      return null
    }

    return JSON.parse(contactPersonStr) as ContactPerson
  } catch (error) {
    throw new Error("Failed to retrieve contact person")
  }
}