import { WelcomeMessage } from "../models/welcome-message"
import { KVService } from "../services/kvService"
import { getAllWelcomeMessage } from "./welcome-message/getAllWelcomeMessage"
import { getWelcomeMessageWithPager } from "./welcome-message/getWelcomeMessageWithPager"
import { getWelcomeMessageById } from "./welcome-message/getWelcomeMessageById"
import { createWelcomeMessage } from "./welcome-message/createWelcomeMessage"
import { updateWelcomeMessage } from "./welcome-message/updateWelcomeMessage"
import { deleteWelcomeMessage } from "./welcome-message/deleteWelcomeMessage"

export class WelcomeMessageController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/welcome-message - Mendapatkan semua welcome message
  async getAllWelcomeMessage(): Promise<{ welcomeMessage: WelcomeMessage[] }> {
    return getAllWelcomeMessage(this.kvService)
  }

  // GET /api/welcome-message/pager - Mendapatkan welcome message dengan pagination
  async getWelcomeMessageWithPager(page: number, limit: number): Promise<any> {
    return getWelcomeMessageWithPager(this.kvService, page, limit)
  }

  // GET /api/welcome-message/:id - Mendapatkan welcome message berdasarkan ID
  async getWelcomeMessageById(id: number): Promise<WelcomeMessage | null> {
    return getWelcomeMessageById(this.kvService, id)
  }

  // POST /api/welcome-message - Membuat welcome message baru
  async createWelcomeMessage(data: Partial<WelcomeMessage>): Promise<{ welcomeMessage: WelcomeMessage; message: string }> {
    return createWelcomeMessage(this.kvService, data)
  }

  // PUT /api/welcome-message/:id - Memperbarui welcome message
  async updateWelcomeMessage(id: number, data: Partial<WelcomeMessage>): Promise<{ welcomeMessage: WelcomeMessage; message: string } | null> {
    return updateWelcomeMessage(this.kvService, id, data)
  }

  // DELETE /api/welcome-message/:id - Menghapus welcome message
  async deleteWelcomeMessage(id: number): Promise<{ id: number; message: string } | null> {
    return deleteWelcomeMessage(this.kvService, id)
  }
}
