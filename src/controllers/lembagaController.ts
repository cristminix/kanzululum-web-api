import { Lembaga } from "../models/lembaga"
import { KVService } from "../services/kvService"
import { getAllLembaga } from "./lembaga/getAllLembaga"

export class LembagaController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/lembaga - Mendapatkan semua lembaga
  async getAllLembaga(): Promise<{ lembaga: Lembaga[] }> {
    return getAllLembaga(this.kvService)
  }
}