import { Company } from "../../models/company"
import { KVService } from "../../services/kvService"

export async function updateCompany(
  kvService: KVService,
  id: number,
  data: Partial<Company>
): Promise<{ company: Company; message: string } | null> {
  if (isNaN(id)) {
    throw new Error("Invalid ID")
  }

  try {
    // Check if company exists
    const existingCompanyStr = await kvService.getCompanyById(id)
    if (!existingCompanyStr) {
      return null
    }

    const existingCompany = JSON.parse(existingCompanyStr) as Company

    // Merge existing data with new data
    const updatedCompany: Company = {
      ...existingCompany,
      ...data,
      id // Preserve the original id
    }

    await kvService.saveCompanyById(id, JSON.stringify(updatedCompany))

    return { company: updatedCompany, message: "Company updated successfully" }
  } catch (error) {
    throw new Error("Failed to update company")
  }
}