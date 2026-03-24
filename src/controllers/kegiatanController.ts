import { Kegiatan } from "../models/kegiatan"
import { KVService } from "../services/kvService"
import { getAllKegiatan } from "./kegiatan/getAllKegiatan"

export class KegiatanController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/kegiatan - Mendapatkan semua kegiatan
  async getAllKegiatan(): Promise<{ kegiatan: Kegiatan[] }> {
    return getAllKegiatan(this.kvService)
  }
}