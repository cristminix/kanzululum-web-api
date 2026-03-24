import { BiayaPendaftaran } from "../models/biaya-pendaftaran"
import { KVService } from "../services/kvService"
import { getAllBiayaPendaftaran } from "./biaya-pendaftaran/getAllBiayaPendaftaran"

export class BiayaPendaftaranController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/biaya-pendaftaran - Mendapatkan semua biaya pendaftaran
  async getAllBiayaPendaftaran(): Promise<{ biayaPendaftaran: BiayaPendaftaran[] }> {
    return getAllBiayaPendaftaran(this.kvService)
  }
}