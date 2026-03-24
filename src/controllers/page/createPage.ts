import { Page } from "../../models/page"
import { KVService } from "../../services/kvService"

export async function createPage(
  kvService: KVService,
  data: Partial<Page>
): Promise<{ page: Page; message: string }> {
  try {
    // Generate ID baru
    const id = kvService.generateId()

    // Buat objek page
    const page: Page = {
      id,
      slug: data.slug,
      title: data.title,
      metaDescription: data.metaDescription,
      metaKeyword: data.metaKeyword,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    }

    // Simpan ke Cloudflare KV
    await kvService.savePage(id, JSON.stringify(page))

    // Update daftar ID page
    const keys = await kvService.getAllPageKeys()
    keys.push(id)
    await kvService.savePageKeys(keys)

    return {
      message: "Page created successfully",
      page,
    }
  } catch (error) {
    throw new Error("Failed to create page")
  }
}