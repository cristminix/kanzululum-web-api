import { Template } from "../../models/template"
import { KVService } from "../../services/kvService"

export async function createTemplate(
  kvService: KVService,
  data: Partial<Template>
): Promise<{ template: Template; message: string }> {
  try {
    const id = kvService.generateId()
    const now = new Date().toISOString()

    const newTemplate: Template = {
      id,
      slug: data.slug,
      kind: data.kind,
      data: data.data,
      dateCreated: now,
      dateUpdated: now,
    }

    await kvService.saveTemplate(id, JSON.stringify(newTemplate))

    const keys = await kvService.getAllTemplateKeys()
    keys.push(id)
    await kvService.saveTemplateKeys(keys)

    return { template: newTemplate, message: "Template created successfully" }
  } catch (error) {
    throw new Error("Failed to create template")
  }
}