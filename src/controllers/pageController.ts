import { Page } from "../models/page"
import { KVService } from "../services/kvService"
import { getAllPage } from "./page/getAllPage"
import { getPageWithPager } from "./page/getPageWithPager"
import { getPageById } from "./page/getPageById"
import { createPage } from "./page/createPage"
import { updatePage } from "./page/updatePage"
import { deletePage } from "./page/deletePage"

export class PageController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/page - Mendapatkan semua page
  async getAllPage(): Promise<{ page: Page[] }> {
    return getAllPage(this.kvService)
  }

  // GET /api/page/pager - Mendapatkan page dengan pagination
  async getPageWithPager(
    page: number,
    limit: number
  ): Promise<any> {
    return getPageWithPager(this.kvService, page, limit)
  }

  // GET /api/page/:id - Mendapatkan page berdasarkan ID
  async getPageById(id: number): Promise<Page | null> {
    return getPageById(this.kvService, id)
  }

  // POST /api/page - Membuat page baru
  async createPage(
    data: Partial<Page>
  ): Promise<{ page: Page; message: string }> {
    return createPage(this.kvService, data)
  }

  // PUT /api/page/:id - Memperbarui page
  async updatePage(
    id: number,
    data: Partial<Page>
  ): Promise<{ page: Page; message: string } | null> {
    return updatePage(this.kvService, id, data)
  }

  // DELETE /api/page/:id - Menghapus page
  async deletePage(
    id: number
  ): Promise<{ id: number; message: string } | null> {
    return deletePage(this.kvService, id)
  }
}