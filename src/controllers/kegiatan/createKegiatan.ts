import { Kegiatan } from "../../models/kegiatan"
import { KVService } from "../../services/kvService"

export async function createKegiatan(
  kvService: KVService,
  data: Partial<Kegiatan>
): Promise<{ kegiatan: Kegiatan; message: string }> {
  try {
    // Generate ID baru
    const id = kvService.generateId().toString()

    // Buat objek kegiatan
    const kegiatan: Kegiatan = {
      id,
      waktu: data.waktu,
      kegiatan: data.kegiatan,
    }

    // Simpan ke Cloudflare KV
    await kvService.saveKegiatan(id, JSON.stringify(kegiatan))

    // Update daftar ID kegiatan
    const keys = await kvService.getAllKegiatanKeys()
    keys.push(id)
    await kvService.saveKegiatanKeys(keys)

    return {
      message: "Kegiatan created successfully",
      kegiatan,
    }
  } catch (error) {
    throw new Error("Failed to create kegiatan")
  }
}