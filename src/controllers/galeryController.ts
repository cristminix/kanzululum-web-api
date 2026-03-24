import { Galery } from "../models/galery"
import { KVService } from "../services/kvService"
import { getAllGalery } from "./galery/getAllGalery"
import { getGaleryById } from "./galery/getGaleryById"
import { createGalery } from "./galery/createGalery"
import { updateGalery } from "./galery/updateGalery"
import { deleteGalery } from "./galery/deleteGalery"

export class GaleryController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/galery - Mendapatkan semua galery
  async getAllGalery(): Promise<{ galery: Galery[] }> {
    return getAllGalery(this.kvService)
  }

  // GET /api/galery/:id - Mendapatkan galery berdasarkan ID
  async getGaleryById(id: number): Promise<Galery | null> {
    return getGaleryById(this.kvService, id)
  }

  // POST /api/galery - Membuat galery baru
  async createGalery(data: Partial<Galery>): Promise<{ galery: Galery; message: string }> {
    return createGalery(this.kvService, data)
  }

  // PUT /api/galery/:id - Memperbarui galery
  async updateGalery(id: number, data: Partial<Galery>): Promise<{ galery: Galery; message: string } | null> {
    return updateGalery(this.kvService, id, data)
  }

  // DELETE /api/galery/:id - Menghapus galery
  async deleteGalery(id: number): Promise<{ id: number; message: string } | null> {
    return deleteGalery(this.kvService, id)
  }
}