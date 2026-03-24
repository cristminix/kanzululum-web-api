import { Company } from "../../models/company"
import { KVService } from "../../services/kvService"

export async function getCompanyWithPager(
  kvService: KVService,
  page: number,
  limit: number
): Promise<{
  companies: Company[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}> {
  if (page < 1 || limit < 1) {
    throw new Error("Page and limit must be positive integers")
  }

  try {
    const keys = await kvService.getAllCompanyKeys()
    const total = keys.length
    const totalPages = Math.ceil(total / limit)

    // Sort keys descending (newest first)
    const sortedKeys = [...keys].sort((a, b) => b - a)

    // Pagination
    const startIndex = (page - 1) * limit
    const paginatedKeys = sortedKeys.slice(startIndex, startIndex + limit)

    const companies: Company[] = []
    for (const id of paginatedKeys) {
      const companyStr = await kvService.getCompanyById(id)
      if (companyStr) {
        companies.push(JSON.parse(companyStr) as Company)
      }
    }

    return {
      companies,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    }
  } catch (error) {
    throw new Error("Failed to retrieve companies")
  }
}