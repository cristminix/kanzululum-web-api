import { Company } from "../../models/company"
import { KVService } from "../../services/kvService"

export async function getAllCompanies(kvService: KVService): Promise<{ companies: Company[] }> {
  try {
    const keys = await kvService.getAllCompanyKeys()
    const companies: Company[] = []

    for (const id of keys) {
      const companyStr = await kvService.getCompanyById(id)
      if (companyStr) {
        companies.push(JSON.parse(companyStr) as Company)
      }
    }

    // Sort by id descending (newest first)
    companies.sort((a, b) => (b.id || 0) - (a.id || 0))

    return { companies }
  } catch (error) {
    throw new Error("Failed to retrieve companies")
  }
}