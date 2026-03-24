import { WebNavigation } from "../models/web-navigation"
import { KVService } from "../services/kvService"
import { getAllWebNavigation } from "./web-navigation/getAllWebNavigation"

export class WebNavigationController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/web-navigation - Mendapatkan semua web navigation
  async getAllWebNavigation(): Promise<{ webNavigation: WebNavigation[] }> {
    return getAllWebNavigation(this.kvService)
  }
}