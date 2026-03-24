import { Company } from "../../models/company"
import { KVService } from "../../services/kvService"

export async function updateCompany(
  kvService: KVService,
  data: Partial<Company>
): Promise<{ company: Company; message: string }> {
  try {
    // Get existing company data
    const existingStr = await kvService.getCompany()
    let existing: Company = {}

    if (existingStr) {
      existing = JSON.parse(existingStr) as Company
    }

    // Merge with new data
    const updated: Company = {
      ...existing,
      ...data,
    }

    await kvService.saveCompany(JSON.stringify(updated))
    return { company: updated, message: "Company updated successfully" }
  } catch (error) {
    throw new Error("Failed to update company")
  }
}