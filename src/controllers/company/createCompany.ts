import { Company } from "../../models/company"
import { KVService } from "../../services/kvService"

export async function createCompany(
  kvService: KVService,
  data: Partial<Company>
): Promise<{ company: Company; message: string }> {
  try {
    const id = kvService.generateId()
    const company: Company = {
      id,
      ...data
    }

    // Save company
    await kvService.saveCompanyById(id, JSON.stringify(company))

    // Update keys
    const keys = await kvService.getAllCompanyKeys()
    keys.push(id)
    await kvService.saveCompanyKeys(keys)

    return { company, message: "Company created successfully" }
  } catch (error) {
    throw new Error("Failed to create company")
  }
}