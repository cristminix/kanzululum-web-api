import { Meta } from "../models/meta"
import { KVService } from "../services/kvService"
import { getAllMeta } from "./meta/getAllMeta"
import { getMetaWithPager } from "./meta/getMetaWithPager"
import { getMetaById } from "./meta/getMetaById"
import { createMeta } from "./meta/createMeta"
import { updateMeta } from "./meta/updateMeta"
import { deleteMeta } from "./meta/deleteMeta"

export class MetaController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/meta - Mendapatkan semua meta
  async getAllMeta(): Promise<{ meta: Meta[] }> {
    return getAllMeta(this.kvService)
  }

  // GET /api/meta/pager - Mendapatkan meta dengan pagination
  async getMetaWithPager(page: number, limit: number): Promise<any> {
    return getMetaWithPager(this.kvService, page, limit)
  }

  // GET /api/meta/:id - Mendapatkan meta berdasarkan ID
  async getMetaById(id: number): Promise<Meta | null> {
    return getMetaById(this.kvService, id)
  }

  // POST /api/meta - Membuat meta baru
  async createMeta(data: Partial<Meta>): Promise<{ meta: Meta; message: string }> {
    return createMeta(this.kvService, data)
  }

  // PUT /api/meta/:id - Memperbarui meta
  async updateMeta(id: number, data: Partial<Meta>): Promise<{ meta: Meta; message: string } | null> {
    return updateMeta(this.kvService, id, data)
  }

  // DELETE /api/meta/:id - Menghapus meta
  async deleteMeta(id: number): Promise<{ id: number; message: string } | null> {
    return deleteMeta(this.kvService, id)
  }
}
