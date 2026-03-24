import { Page } from "../../models/page"
import { KVService } from "../../services/kvService"

export async function updatePage(
  kvService: KVService,
  id: number,
  data: Partial<Page>
): Promise<{ page: Page; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah page ada
    const existingPageStr = await kvService.getPage(id)
    if (!existingPageStr) {
      return null
    }

    const existingPage = JSON.parse(existingPageStr) as Page

    // Update page
    const updatedPage: Page = {
      ...existingPage,
      slug: data.slug !== undefined ? data.slug : existingPage.slug,
      title: data.title !== undefined ? data.title : existingPage.title,
      metaDescription:
        data.metaDescription !== undefined
          ? data.metaDescription
          : existingPage.metaDescription,
      metaKeyword:
        data.metaKeyword !== undefined
          ? data.metaKeyword
          : existingPage.metaKeyword,
      dateUpdated: new Date().toISOString(),
    }

    // Simpan ke Cloudflare KV
    await kvService.savePage(id, JSON.stringify(updatedPage))

    return {
      message: "Page updated successfully",
      page: updatedPage,
    }
  } catch (error) {
    throw new Error("Failed to update page")
  }
}