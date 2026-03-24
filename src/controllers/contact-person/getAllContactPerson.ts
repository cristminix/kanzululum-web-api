import { ContactPerson } from "../../models/contact-person"
import { KVService } from "../../services/kvService"

export async function getAllContactPerson(kvService: KVService): Promise<{ contactPerson: ContactPerson[] }> {
  try {
    const keys = await kvService.getAllContactPersonKeys()

    const contactPersonList: ContactPerson[] = []
    for (const key of keys) {
      const contactPersonStr = await kvService.getContactPersonById(key)
      if (contactPersonStr) {
        const contactPerson = JSON.parse(contactPersonStr) as ContactPerson
        contactPersonList.push(contactPerson)
      }
    }

    return { contactPerson: contactPersonList }
  } catch (error) {
    throw new Error("Failed to retrieve contact person")
  }
}