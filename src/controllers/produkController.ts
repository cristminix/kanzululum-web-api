import { Produk } from "../models/produk"
import { KVService } from "../services/kvService"
import { getAllProduk } from "./produk/getAllProduk"
import { getProdukWithPager } from "./produk/getProdukWithPager"
import { getProdukById } from "./produk/getProdukById"
import { createProduk } from "./produk/createProduk"
import { updateProduk } from "./produk/updateProduk"
import { deleteProduk } from "./produk/deleteProduk"

export class ProdukController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/produk - Mendapatkan semua produk
  async getAllProduk(): Promise<{ produk: Produk[] }> {
    return getAllProduk(this.kvService)
  }

  // GET /api/produk/pager - Mendapatkan produk dengan pagination
  async getProdukWithPager(
    page: number,
    limit: number,
    kategori?: string
  ): Promise<any> {
    return getProdukWithPager(this.kvService, page, limit, kategori)
  }

  // GET /api/produk/:id - Mendapatkan produk berdasarkan ID
  async getProdukById(id: number): Promise<Produk | null> {
    return getProdukById(this.kvService, id)
  }

  // POST /api/produk - Membuat produk baru
  async createProduk(
    data: Partial<Produk>
  ): Promise<{ produk: Produk; message: string }> {
    return createProduk(this.kvService, data)
  }

  // PUT /api/produk/:id - Memperbarui produk
  async updateProduk(
    id: number,
    data: Partial<Produk>
  ): Promise<{ produk: Produk; message: string } | null> {
    return updateProduk(this.kvService, id, data)
  }

  // DELETE /api/produk/:id - Menghapus produk
  async deleteProduk(
    id: number
  ): Promise<{ id: number; message: string } | null> {
    return deleteProduk(this.kvService, id)
  }
}