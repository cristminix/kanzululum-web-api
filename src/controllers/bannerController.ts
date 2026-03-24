import { Banner } from "../models/banner"
import { KVService } from "../services/kvService"
import { getBanner } from "./banner/getBanner"
import { updateBanner } from "./banner/updateBanner"

export class BannerController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/banner - Mendapatkan data banner
  async getBanner(): Promise<{ banner: Banner | null }> {
    return getBanner(this.kvService)
  }

  // PUT /api/banner - Memperbarui data banner
  async updateBanner(data: Partial<Banner>): Promise<{ banner: Banner; message: string }> {
    return updateBanner(this.kvService, data)
  }
}