import { Berita } from "../models/berita"
import { KVService } from "../services/kvService"
import { getAllBerita } from "./berita/getAllBerita"
import { getBeritaWithPager } from "./berita/getBeritaWithPager"
import { getBeritaById } from "./berita/getBeritaById"
import { createBerita } from "./berita/createBerita"
import { updateBerita } from "./berita/updateBerita"
import { deleteBerita } from "./berita/deleteBerita"

export class BeritaController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/berita - Mendapatkan semua berita
  async getAllBerita(): Promise<{ berita: Berita[] }> {
    return getAllBerita(this.kvService)
  }

  // GET /api/berita/pager - Mendapatkan berita dengan pagination
  async getBeritaWithPager(
    page: number,
    limit: number,
    category?: string,
    author?: string
  ): Promise<any> {
    return getBeritaWithPager(this.kvService, page, limit, category, author)
  }

  // GET /api/berita/:id - Mendapatkan berita berdasarkan ID
  async getBeritaById(id: number): Promise<Berita | null> {
    return getBeritaById(this.kvService, id)
  }

  // POST /api/berita - Membuat berita baru
  async createBerita(
    data: Partial<Berita>
  ): Promise<{ berita: Berita; message: string }> {
    return createBerita(this.kvService, data)
  }

  // PUT /api/berita/:id - Memperbarui berita
  async updateBerita(
    id: number,
    data: Partial<Berita>
  ): Promise<{ berita: Berita; message: string } | null> {
    return updateBerita(this.kvService, id, data)
  }

  // DELETE /api/berita/:id - Menghapus berita
  async deleteBerita(
    id: number
  ): Promise<{ id: number; message: string } | null> {
    return deleteBerita(this.kvService, id)
  }
}
