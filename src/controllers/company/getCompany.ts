import { Company } from "../../models/company"
import { KVService } from "../../services/kvService"

export async function getCompany(kvService: KVService): Promise<{ company: Company | null }> {
  try {
    const companyStr = await kvService.getCompany()
    if (companyStr) {
      return { company: JSON.parse(companyStr) as Company }
    }
    return { company: null }
  } catch (error) {
    throw new Error("Failed to retrieve company")
  }
}