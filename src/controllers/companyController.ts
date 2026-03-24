import { Company } from "../models/company"
import { KVService } from "../services/kvService"
import { getCompany } from "./company/getCompany"
import { updateCompany } from "./company/updateCompany"

export class CompanyController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/company - Mendapatkan data company
  async getCompany(): Promise<{ company: Company | null }> {
    return getCompany(this.kvService)
  }

  // PUT /api/company - Memperbarui data company
  async updateCompany(data: Partial<Company>): Promise<{ company: Company; message: string }> {
    return updateCompany(this.kvService, data)
  }
}