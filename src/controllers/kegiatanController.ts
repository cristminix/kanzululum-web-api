import { Kegiatan } from "../models/kegiatan"
import { KVService } from "../services/kvService"
import { getAllKegiatan } from "./kegiatan/getAllKegiatan"
import { getKegiatanWithPager } from "./kegiatan/getKegiatanWithPager"
import { getKegiatanById } from "./kegiatan/getKegiatanById"
import { createKegiatan } from "./kegiatan/createKegiatan"
import { updateKegiatan } from "./kegiatan/updateKegiatan"
import { deleteKegiatan } from "./kegiatan/deleteKegiatan"

export class KegiatanController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/kegiatan - Mendapatkan semua kegiatan
  async getAllKegiatan(): Promise<{ kegiatan: Kegiatan[] }> {
    return getAllKegiatan(this.kvService)
  }

  // GET /api/kegiatan/pager - Mendapatkan kegiatan dengan pagination
  async getKegiatanWithPager(
    page: number,
    limit: number
  ): Promise<any> {
    return getKegiatanWithPager(this.kvService, page, limit)
  }

  // GET /api/kegiatan/:id - Mendapatkan kegiatan berdasarkan ID
  async getKegiatanById(id: string): Promise<Kegiatan | null> {
    return getKegiatanById(this.kvService, id)
  }

  // POST /api/kegiatan - Membuat kegiatan baru
  async createKegiatan(
    data: Partial<Kegiatan>
  ): Promise<{ kegiatan: Kegiatan; message: string }> {
    return createKegiatan(this.kvService, data)
  }

  // PUT /api/kegiatan/:id - Memperbarui kegiatan
  async updateKegiatan(
    id: string,
    data: Partial<Kegiatan>
  ): Promise<{ kegiatan: Kegiatan; message: string } | null> {
    return updateKegiatan(this.kvService, id, data)
  }

  // DELETE /api/kegiatan/:id - Menghapus kegiatan
  async deleteKegiatan(
    id: string
  ): Promise<{ id: string; message: string } | null> {
    return deleteKegiatan(this.kvService, id)
  }
}