import { Template } from "../models/template"
import { KVService } from "../services/kvService"
import { getAllTemplate } from "./template/getAllTemplate"
import { getTemplateById } from "./template/getTemplateById"
import { createTemplate } from "./template/createTemplate"
import { updateTemplate } from "./template/updateTemplate"
import { deleteTemplate } from "./template/deleteTemplate"

export class TemplateController {
  private kvService: KVService

  constructor(kvService: KVService) {
    this.kvService = kvService
  }

  // GET /api/template - Mendapatkan semua template
  async getAllTemplate(): Promise<{ templates: Template[] }> {
    return getAllTemplate(this.kvService)
  }

  // GET /api/template/:id - Mendapatkan template berdasarkan ID
  async getTemplateById(id: number): Promise<Template | null> {
    return getTemplateById(this.kvService, id)
  }

  // POST /api/template - Membuat template baru
  async createTemplate(
    data: Partial<Template>
  ): Promise<{ template: Template; message: string }> {
    return createTemplate(this.kvService, data)
  }

  // PUT /api/template/:id - Memperbarui template
  async updateTemplate(
    id: number,
    data: Partial<Template>
  ): Promise<{ template: Template; message: string } | null> {
    return updateTemplate(this.kvService, id, data)
  }

  // DELETE /api/template/:id - Menghapus template
  async deleteTemplate(
    id: number
  ): Promise<{ id: number; message: string } | null> {
    return deleteTemplate(this.kvService, id)
  }
}