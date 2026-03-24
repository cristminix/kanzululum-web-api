import { Template } from "../../models/template"
import { KVService } from "../../services/kvService"

export async function getAllTemplate(kvService: KVService): Promise<{ templates: Template[] }> {
  try {
    const keys = await kvService.getAllTemplateKeys()

    const templateList: Template[] = []
    for (const key of keys) {
      const templateStr = await kvService.getTemplate(key)
      if (templateStr) {
        const template = JSON.parse(templateStr) as Template
        templateList.push(template)
      }
    }

    return { templates: templateList }
  } catch (error) {
    throw new Error("Failed to retrieve templates")
  }
}