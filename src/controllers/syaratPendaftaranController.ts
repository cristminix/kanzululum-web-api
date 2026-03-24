import { SyaratPendaftaran } from "../models/syarat-pendaftaran"
import { KVService } from "../services/kvService"
import { getAllSyaratPendaftaran } from "./syarat-pendaftaran/getAllSyaratPendaftaran"
import { getSyaratPendaftaranWithPager } from "./syarat-pendaftaran/getSyaratPendaftaranWithPager"
import { getSyaratPendaftaranById } from "./syarat-pendaftaran/getSyaratPendaftaranById"
import { createSyaratPendaftaran } from "./syarat-pendaftaran/createSyaratPendaftaran"
import { updateSyaratPendaftaran } from "./syarat-pendaftaran/updateSyaratPendaftaran"
import { deleteSyaratPendaftaran } from "./syarat-pendaftaran/deleteSyaratPendaftaran"

export class SyaratPendaftaranController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/syarat-pendaftaran - Mendapatkan semua syarat pendaftaran
  async getAllSyaratPendaftaran(): Promise<{ syaratPendaftaran: SyaratPendaftaran[] }> {
    return getAllSyaratPendaftaran(this.kvService)
  }

  // GET /api/syarat-pendaftaran/pager - Mendapatkan syarat pendaftaran dengan pagination
  async getSyaratPendaftaranWithPager(
    page: number,
    limit: number,
    categorySlug?: string
  ): Promise<any> {
    return getSyaratPendaftaranWithPager(this.kvService, page, limit, categorySlug)
  }

  // GET /api/syarat-pendaftaran/:id - Mendapatkan syarat pendaftaran berdasarkan ID
  async getSyaratPendaftaranById(id: number): Promise<SyaratPendaftaran | null> {
    return getSyaratPendaftaranById(this.kvService, id)
  }

  // POST /api/syarat-pendaftaran - Membuat syarat pendaftaran baru
  async createSyaratPendaftaran(
    data: Partial<SyaratPendaftaran>
  ): Promise<{ syaratPendaftaran: SyaratPendaftaran; message: string }> {
    return createSyaratPendaftaran(this.kvService, data)
  }

  // PUT /api/syarat-pendaftaran/:id - Memperbarui syarat pendaftaran
  async updateSyaratPendaftaran(
    id: number,
    data: Partial<SyaratPendaftaran>
  ): Promise<{ syaratPendaftaran: SyaratPendaftaran; message: string } | null> {
    return updateSyaratPendaftaran(this.kvService, id, data)
  }

  // DELETE /api/syarat-pendaftaran/:id - Menghapus syarat pendaftaran
  async deleteSyaratPendaftaran(
    id: number
  ): Promise<{ id: number; message: string } | null> {
    return deleteSyaratPendaftaran(this.kvService, id)
  }
}