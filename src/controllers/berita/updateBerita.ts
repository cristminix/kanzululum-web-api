import { Berita } from "../../models/berita"
import { KVService } from "../../services/kvService"

export async function updateBerita(
  kvService: KVService,
  id: number,
  data: Partial<Berita>
): Promise<{ berita: Berita; message: string } | null> {
  try {
    if (isNaN(id)) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah berita ada
    const existingBeritaStr = await kvService.getBerita(id)
    if (!existingBeritaStr) {
      return null
    }

    const existingBerita = JSON.parse(existingBeritaStr) as Berita

    // Hapus cover lama jika cover baru berbeda
    if (
      data.cover !== undefined &&
      data.cover !== existingBerita.cover &&
      existingBerita.cover
    ) {
      await kvService.delete(existingBerita.cover)
    }

    // Update berita
    const updatedBerita: Berita = {
      ...existingBerita,
      title: data.title !== undefined ? data.title : existingBerita.title,
      tags: data.tags !== undefined ? data.tags : existingBerita.tags,
      author: data.author !== undefined ? data.author : existingBerita.author,
      headline:
        data.headline !== undefined ? data.headline : existingBerita.headline,
      cover: data.cover !== undefined ? data.cover : existingBerita.cover,
      content:
        data.content !== undefined ? data.content : existingBerita.content,
      compiledHash:
        data.compiledHash !== undefined
          ? data.compiledHash
          : existingBerita.compiledHash,
      compiledPath:
        data.compiledPath !== undefined
          ? data.compiledPath
          : existingBerita.compiledPath,
      dateUpdated: new Date().toISOString(),
    }

    // Simpan ke Cloudflare KV
    await kvService.saveBerita(id, JSON.stringify(updatedBerita))

    return {
      message: "Berita updated successfully",
      berita: updatedBerita,
    }
  } catch (error) {
    throw new Error("Failed to update berita")
  }
}