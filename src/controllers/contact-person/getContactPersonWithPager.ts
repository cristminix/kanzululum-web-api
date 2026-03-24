import { ContactPerson } from "../../models/contact-person"
import { KVService } from "../../services/kvService"

export async function getContactPersonWithPager(
  kvService: KVService,
  page: number,
  limit: number
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
    const keys = await kvService.getAllContactPersonKeys()

    // Hitung offset
    const offset = (page - 1) * limit

    // Dapatkan subset keys berdasarkan pagination
    const paginatedKeys = keys.slice(offset, offset + limit)

    // Dapatkan data contact person untuk keys yang dipaginasi
    const contactPersonList: ContactPerson[] = []
    for (const key of paginatedKeys) {
      const contactPersonStr = await kvService.getContactPersonById(key)
      if (contactPersonStr) {
        const contactPerson = JSON.parse(contactPersonStr) as ContactPerson
        contactPersonList.push(contactPerson)
      }
    }

    // Hitung total pages
    const totalPages = Math.ceil(keys.length / limit)

    return {
      contactPerson: contactPersonList,
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
    throw new Error("Failed to retrieve contact person")
  }
}