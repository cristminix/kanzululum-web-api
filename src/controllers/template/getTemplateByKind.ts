import { Template } from "../../models/template"
import { KVService } from "../../services/kvService"

export async function getTemplateByKind(kvService: KVService, kind: string): Promise<Template | null> {
  try {
    const keys = await kvService.getAllTemplateKeys()

    for (const key of keys) {
      const templateStr = await kvService.getTemplate(key)
      if (templateStr) {
        const template = JSON.parse(templateStr) as Template
        if (template.kind === kind) {
          return template
        }
      }
    }

    return null
  } catch (error) {
    throw new Error("Failed to retrieve template by kind")
  }
}
