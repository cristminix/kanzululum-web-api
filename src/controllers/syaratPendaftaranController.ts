import { SyaratPendaftaran } from "../models/syarat-pendaftaran"
import { KVService } from "../services/kvService"
import { getAllSyaratPendaftaran } from "./syarat-pendaftaran/getAllSyaratPendaftaran"

export class SyaratPendaftaranController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/syarat-pendaftaran - Mendapatkan semua syarat pendaftaran
  async getAllSyaratPendaftaran(): Promise<{ syaratPendaftaran: SyaratPendaftaran[] }> {
    return getAllSyaratPendaftaran(this.kvService)
  }
}