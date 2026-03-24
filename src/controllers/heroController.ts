import { Hero } from "../models/hero"
import { KVService } from "../services/kvService"
import { getAllHero } from "./hero/getAllHero"
import { getHeroWithPager } from "./hero/getHeroWithPager"
import { getHeroById } from "./hero/getHeroById"
import { createHero } from "./hero/createHero"
import { updateHero } from "./hero/updateHero"
import { deleteHero } from "./hero/deleteHero"

export class HeroController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/hero - Mendapatkan semua hero
  async getAllHero(): Promise<{ hero: Hero[] }> {
    return getAllHero(this.kvService)
  }

  // GET /api/hero/pager - Mendapatkan hero dengan pagination
  async getHeroWithPager(page: number, limit: number): Promise<any> {
    return getHeroWithPager(this.kvService, page, limit)
  }

  // GET /api/hero/:id - Mendapatkan hero berdasarkan ID
  async getHeroById(id: number): Promise<Hero | null> {
    return getHeroById(this.kvService, id)
  }

  // POST /api/hero - Membuat hero baru
  async createHero(data: Partial<Hero>): Promise<{ hero: Hero; message: string }> {
    return createHero(this.kvService, data)
  }

  // PUT /api/hero/:id - Memperbarui hero
  async updateHero(id: number, data: Partial<Hero>): Promise<{ hero: Hero; message: string } | null> {
    return updateHero(this.kvService, id, data)
  }

  // DELETE /api/hero/:id - Menghapus hero
  async deleteHero(id: number): Promise<{ id: number; message: string } | null> {
    return deleteHero(this.kvService, id)
  }
}