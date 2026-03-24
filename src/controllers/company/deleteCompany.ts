import { KVService } from "../../services/kvService"

export async function deleteCompany(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  if (isNaN(id)) {
    throw new Error("Invalid ID")
  }

  try {
    // Check if company exists
    const existingCompanyStr = await kvService.getCompanyById(id)
    if (!existingCompanyStr) {
      return null
    }

    // Delete company
    await kvService.deleteCompanyById(id)

    // Update keys
    const keys = await kvService.getAllCompanyKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveCompanyKeys(updatedKeys)

    return { id, message: "Company deleted successfully" }
  } catch (error) {
    throw new Error("Failed to delete company")
  }
}