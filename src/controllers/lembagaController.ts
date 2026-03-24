import { Lembaga } from "../models/lembaga"
import { KVService } from "../services/kvService"
import { getAllLembaga } from "./lembaga/getAllLembaga"
import { getLembagaWithPager } from "./lembaga/getLembagaWithPager"
import { getLembagaById } from "./lembaga/getLembagaById"
import { createLembaga } from "./lembaga/createLembaga"
import { updateLembaga } from "./lembaga/updateLembaga"
import { deleteLembaga } from "./lembaga/deleteLembaga"

export class LembagaController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/lembaga - Mendapatkan semua lembaga
  async getAllLembaga(): Promise<{ lembaga: Lembaga[] }> {
    return getAllLembaga(this.kvService)
  }

  // GET /api/lembaga/pager - Mendapatkan lembaga dengan pagination
  async getLembagaWithPager(
    page: number,
    limit: number
  ): Promise<any> {
    return getLembagaWithPager(this.kvService, page, limit)
  }

  // GET /api/lembaga/:id - Mendapatkan lembaga berdasarkan ID
  async getLembagaById(id: number): Promise<Lembaga | null> {
    return getLembagaById(this.kvService, id)
  }

  // POST /api/lembaga - Membuat lembaga baru
  async createLembaga(
    data: Partial<Lembaga>
  ): Promise<{ lembaga: Lembaga; message: string }> {
    return createLembaga(this.kvService, data)
  }

  // PUT /api/lembaga/:id - Memperbarui lembaga
  async updateLembaga(
    id: number,
    data: Partial<Lembaga>
  ): Promise<{ lembaga: Lembaga; message: string } | null> {
    return updateLembaga(this.kvService, id, data)
  }

  // DELETE /api/lembaga/:id - Menghapus lembaga
  async deleteLembaga(
    id: number
  ): Promise<{ id: number; message: string } | null> {
    return deleteLembaga(this.kvService, id)
  }
}