import { Template } from "../../models/template"
import { KVService } from "../../services/kvService"

export async function updateTemplate(
  kvService: KVService,
  id: number,
  data: Partial<Template>
): Promise<{ template: Template; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const templateStr = await kvService.getTemplate(id)
    if (!templateStr) {
      return null
    }

    const existingTemplate = JSON.parse(templateStr) as Template
    const now = new Date().toISOString()

    const updatedTemplate: Template = {
      ...existingTemplate,
      slug: data.slug !== undefined ? data.slug : existingTemplate.slug,
      kind: data.kind !== undefined ? data.kind : existingTemplate.kind,
      data: data.data !== undefined ? data.data : existingTemplate.data,
      dateUpdated: now,
    }

    await kvService.saveTemplate(id, JSON.stringify(updatedTemplate))

    return { template: updatedTemplate, message: "Template updated successfully" }
  } catch (error) {
    throw new Error("Failed to update template")
  }
}