import { Banner } from "../models/banner"
import { KVService } from "../services/kvService"
import { getAllBanner } from "./banner/getAllBanner"
import { getBannerWithPager } from "./banner/getBannerWithPager"
import { getBannerById } from "./banner/getBannerById"
import { createBanner } from "./banner/createBanner"
import { updateBanner } from "./banner/updateBanner"
import { deleteBanner } from "./banner/deleteBanner"

export class BannerController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/banner - Mendapatkan semua banner
  async getAllBanner(): Promise<{ banner: Banner[] }> {
    return getAllBanner(this.kvService)
  }

  // GET /api/banner/pager - Mendapatkan banner dengan pagination
  async getBannerWithPager(
    page: number,
    limit: number
  ): Promise<any> {
    return getBannerWithPager(this.kvService, page, limit)
  }

  // GET /api/banner/:id - Mendapatkan banner berdasarkan ID
  async getBannerById(id: number): Promise<Banner | null> {
    return getBannerById(this.kvService, id)
  }

  // POST /api/banner - Membuat banner baru
  async createBanner(
    data: Partial<Banner>
  ): Promise<{ banner: Banner; message: string }> {
    return createBanner(this.kvService, data)
  }

  // PUT /api/banner/:id - Memperbarui banner
  async updateBanner(
    id: number,
    data: Partial<Banner>
  ): Promise<{ banner: Banner; message: string } | null> {
    return updateBanner(this.kvService, id, data)
  }

  // DELETE /api/banner/:id - Menghapus banner
  async deleteBanner(
    id: number
  ): Promise<{ id: number; message: string } | null> {
    return deleteBanner(this.kvService, id)
  }
}