import { SyaratPendaftaran } from "../../models/syarat-pendaftaran"
import { KVService } from "../../services/kvService"

export async function updateSyaratPendaftaran(
  kvService: KVService,
  id: number,
  data: Partial<SyaratPendaftaran>
): Promise<{ syaratPendaftaran: SyaratPendaftaran; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah data ada
    const existingStr = await kvService.getSyaratPendaftaran(id)
    if (!existingStr) {
      return null
    }

    const existing = JSON.parse(existingStr) as SyaratPendaftaran

    // Update
    const updated: SyaratPendaftaran = {
      ...existing,
      categorySlug: data.categorySlug !== undefined ? data.categorySlug : existing.categorySlug,
      content: data.content !== undefined ? data.content : existing.content,
    }

    // Simpan ke Cloudflare KV
    await kvService.saveSyaratPendaftaran(id, JSON.stringify(updated))

    return {
      message: "Syarat pendaftaran updated successfully",
      syaratPendaftaran: updated,
    }
  } catch (error) {
    throw new Error("Failed to update syarat pendaftaran")
  }
}