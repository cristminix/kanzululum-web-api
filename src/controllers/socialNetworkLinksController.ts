import { SocialNetworkLinks } from "../models/social-network-links"
import { KVService } from "../services/kvService"
import { getAllSocialNetworkLinks } from "./social-network-links/getAllSocialNetworkLinks"

export class SocialNetworkLinksController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/social-network-links - Mendapatkan semua social network links
  async getAllSocialNetworkLinks(): Promise<{ socialNetworkLinks: SocialNetworkLinks[] }> {
    return getAllSocialNetworkLinks(this.kvService)
  }
}