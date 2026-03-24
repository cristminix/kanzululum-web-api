import { Company } from "../models/company"
import { KVService } from "../services/kvService"
import { getAllCompanies } from "./company/getAllCompanies"
import { getCompanyWithPager } from "./company/getCompanyWithPager"
import { getCompanyById } from "./company/getCompanyById"
import { createCompany } from "./company/createCompany"
import { updateCompany } from "./company/updateCompany"
import { deleteCompany } from "./company/deleteCompany"

export class CompanyController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/company - Mendapatkan semua company
  async getAllCompanies(): Promise<{ companies: Company[] }> {
    return getAllCompanies(this.kvService)
  }

  // GET /api/company/pager - Mendapatkan company dengan pagination
  async getCompanyWithPager(
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
    return getCompanyWithPager(this.kvService, page, limit)
  }

  // GET /api/company/:id - Mendapatkan company berdasarkan ID
  async getCompanyById(id: number): Promise<Company | null> {
    return getCompanyById(this.kvService, id)
  }

  // POST /api/company - Membuat company baru
  async createCompany(
    data: Partial<Company>
  ): Promise<{ company: Company; message: string }> {
    return createCompany(this.kvService, data)
  }

  // PUT /api/company/:id - Memperbarui company
  async updateCompany(
    id: number,
    data: Partial<Company>
  ): Promise<{ company: Company; message: string } | null> {
    return updateCompany(this.kvService, id, data)
  }

  // DELETE /api/company/:id - Menghapus company
  async deleteCompany(
    id: number
  ): Promise<{ id: number; message: string } | null> {
    return deleteCompany(this.kvService, id)
  }
}