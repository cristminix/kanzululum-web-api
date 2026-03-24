import { ContactPerson } from "../models/contact-person"
import { KVService } from "../services/kvService"
import { getContactPerson } from "./contact-person/getContactPerson"
import { updateContactPerson } from "./contact-person/updateContactPerson"

export class ContactPersonController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/contact-person - Mendapatkan data contact person
  async getContactPerson(): Promise<{ contactPerson: ContactPerson | null }> {
    return getContactPerson(this.kvService)
  }

  // PUT /api/contact-person - Memperbarui data contact person
  async updateContactPerson(data: Partial<ContactPerson>): Promise<{ contactPerson: ContactPerson; message: string }> {
    return updateContactPerson(this.kvService, data)
  }
}