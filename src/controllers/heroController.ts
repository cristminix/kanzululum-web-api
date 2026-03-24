import { Hero } from "../models/hero"
import { KVService } from "../services/kvService"
import { getHero } from "./hero/getHero"
import { updateHero } from "./hero/updateHero"

export class HeroController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/hero - Mendapatkan data hero
  async getHero(): Promise<{ hero: Hero | null }> {
    return getHero(this.kvService)
  }

  // PUT /api/hero - Memperbarui data hero
  async updateHero(data: Partial<Hero>): Promise<{ hero: Hero; message: string }> {
    return updateHero(this.kvService, data)
  }
}