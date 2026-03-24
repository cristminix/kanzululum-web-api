import { ContactPerson } from "../models/contact-person"
import { KVService } from "../services/kvService"
import { getAllContactPerson } from "./contact-person/getAllContactPerson"
import { getContactPersonWithPager } from "./contact-person/getContactPersonWithPager"
import { getContactPersonById } from "./contact-person/getContactPersonById"
import { createContactPerson } from "./contact-person/createContactPerson"
import { updateContactPerson } from "./contact-person/updateContactPerson"
import { deleteContactPerson } from "./contact-person/deleteContactPerson"

export class ContactPersonController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/contact-person - Mendapatkan semua contact person
  async getAllContactPerson(): Promise<{ contactPerson: ContactPerson[] }> {
    return getAllContactPerson(this.kvService)
  }

  // GET /api/contact-person/pager - Mendapatkan contact person dengan pagination
  async getContactPersonWithPager(
    page: number,
    limit: number
  ): Promise<any> {
    return getContactPersonWithPager(this.kvService, page, limit)
  }

  // GET /api/contact-person/:id - Mendapatkan contact person berdasarkan ID
  async getContactPersonById(id: number): Promise<ContactPerson | null> {
    return getContactPersonById(this.kvService, id)
  }

  // POST /api/contact-person - Membuat contact person baru
  async createContactPerson(
    data: Partial<ContactPerson>
  ): Promise<{ contactPerson: ContactPerson; message: string }> {
    return createContactPerson(this.kvService, data)
  }

  // PUT /api/contact-person/:id - Memperbarui contact person
  async updateContactPerson(
    id: number,
    data: Partial<ContactPerson>
  ): Promise<{ contactPerson: ContactPerson; message: string } | null> {
    return updateContactPerson(this.kvService, id, data)
  }

  // DELETE /api/contact-person/:id - Menghapus contact person
  async deleteContactPerson(
    id: number
  ): Promise<{ id: number; message: string } | null> {
    return deleteContactPerson(this.kvService, id)
  }
}