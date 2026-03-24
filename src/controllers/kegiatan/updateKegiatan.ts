import { Kegiatan } from "../../models/kegiatan"
import { KVService } from "../../services/kvService"

export async function updateKegiatan(
  kvService: KVService,
  id: string,
  data: Partial<Kegiatan>
): Promise<{ kegiatan: Kegiatan; message: string } | null> {
  try {
    if (!id) {
      throw new Error("Invalid ID")
    }

    // Periksa apakah kegiatan ada
    const existingKegiatanStr = await kvService.getKegiatan(id)
    if (!existingKegiatanStr) {
      return null
    }

    const existingKegiatan = JSON.parse(existingKegiatanStr) as Kegiatan

    // Update kegiatan
    const updatedKegiatan: Kegiatan = {
      ...existingKegiatan,
      waktu: data.waktu !== undefined ? data.waktu : existingKegiatan.waktu,
      kegiatan: data.kegiatan !== undefined ? data.kegiatan : existingKegiatan.kegiatan,
    }

    // Simpan ke Cloudflare KV
    await kvService.saveKegiatan(id, JSON.stringify(updatedKegiatan))

    return {
      message: "Kegiatan updated successfully",
      kegiatan: updatedKegiatan,
    }
  } catch (error) {
    throw new Error("Failed to update kegiatan")
  }
}