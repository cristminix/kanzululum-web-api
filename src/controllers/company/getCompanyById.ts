import { Company } from "../../models/company"
import { KVService } from "../../services/kvService"

export async function getCompanyById(kvService: KVService, id: number): Promise<Company | null> {
  if (isNaN(id)) {
    throw new Error("Invalid ID")
  }

  try {
    const companyStr = await kvService.getCompanyById(id)
    if (companyStr) {
      return JSON.parse(companyStr) as Company
    }
    return null
  } catch (error) {
    throw new Error("Failed to retrieve company")
  }
}