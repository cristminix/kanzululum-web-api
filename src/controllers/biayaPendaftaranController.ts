import { BiayaPendaftaran } from "../models/biaya-pendaftaran"
import { KVService } from "../services/kvService"
import { getAllBiayaPendaftaran } from "./biaya-pendaftaran/getAllBiayaPendaftaran"
import { getBiayaPendaftaranWithPager } from "./biaya-pendaftaran/getBiayaPendaftaranWithPager"
import { getBiayaPendaftaranById } from "./biaya-pendaftaran/getBiayaPendaftaranById"
import { createBiayaPendaftaran } from "./biaya-pendaftaran/createBiayaPendaftaran"
import { updateBiayaPendaftaran } from "./biaya-pendaftaran/updateBiayaPendaftaran"
import { deleteBiayaPendaftaran } from "./biaya-pendaftaran/deleteBiayaPendaftaran"

export class BiayaPendaftaranController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/biaya-pendaftaran - Mendapatkan semua biaya pendaftaran
  async getAllBiayaPendaftaran(): Promise<{ biayaPendaftaran: BiayaPendaftaran[] }> {
    return getAllBiayaPendaftaran(this.kvService)
  }

  // GET /api/biaya-pendaftaran/pager - Mendapatkan biaya pendaftaran dengan pagination
  async getBiayaPendaftaranWithPager(
    page: number,
    limit: number,
    categorySlug?: string
  ): Promise<any> {
    return getBiayaPendaftaranWithPager(this.kvService, page, limit, categorySlug)
  }

  // GET /api/biaya-pendaftaran/:id - Mendapatkan biaya pendaftaran berdasarkan ID
  async getBiayaPendaftaranById(id: number): Promise<BiayaPendaftaran | null> {
    return getBiayaPendaftaranById(this.kvService, id)
  }

  // POST /api/biaya-pendaftaran - Membuat biaya pendaftaran baru
  async createBiayaPendaftaran(
    data: Partial<BiayaPendaftaran>
  ): Promise<{ biayaPendaftaran: BiayaPendaftaran; message: string }> {
    return createBiayaPendaftaran(this.kvService, data)
  }

  // PUT /api/biaya-pendaftaran/:id - Memperbarui biaya pendaftaran
  async updateBiayaPendaftaran(
    id: number,
    data: Partial<BiayaPendaftaran>
  ): Promise<{ biayaPendaftaran: BiayaPendaftaran; message: string } | null> {
    return updateBiayaPendaftaran(this.kvService, id, data)
  }

  // DELETE /api/biaya-pendaftaran/:id - Menghapus biaya pendaftaran
  async deleteBiayaPendaftaran(
    id: number
  ): Promise<{ id: number; message: string } | null> {
    return deleteBiayaPendaftaran(this.kvService, id)
  }
}