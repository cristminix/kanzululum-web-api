import { KVService } from "../../services/kvService"

export async function deleteTemplate(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    const templateStr = await kvService.getTemplate(id)
    if (!templateStr) {
      return null
    }

    await kvService.deleteTemplate(id)

    const keys = await kvService.getAllTemplateKeys()
    const updatedKeys = keys.filter((key) => key !== id)
    await kvService.saveTemplateKeys(updatedKeys)

    return { id, message: "Template deleted successfully" }
  } catch (error) {
    throw new Error("Failed to delete template")
  }
}