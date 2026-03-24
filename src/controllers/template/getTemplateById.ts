import { Template } from "../../models/template"
import { KVService } from "../../services/kvService"

export async function getTemplateById(kvService: KVService, id: number): Promise<Template | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const templateStr = await kvService.getTemplate(id)
    if (!templateStr) {
      return null
    }

    return JSON.parse(templateStr) as Template
  } catch (error) {
    throw new Error("Failed to retrieve template")
  }
}