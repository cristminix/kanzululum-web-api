import { SyaratPendaftaran } from "../../models/syarat-pendaftaran"
import { KVService } from "../../services/kvService"

export async function createSyaratPendaftaran(
  kvService: KVService,
  data: Partial<SyaratPendaftaran>
): Promise<{ syaratPendaftaran: SyaratPendaftaran; message: string }> {
  try {
    // Generate ID baru
    const id = kvService.generateId()

    // Buat objek
    const syaratPendaftaran: SyaratPendaftaran = {
      id,
      categorySlug: data.categorySlug,
      content: data.content,
    }

    // Simpan ke Cloudflare KV
    await kvService.saveSyaratPendaftaran(id, JSON.stringify(syaratPendaftaran))

    // Update daftar ID
    const keys = await kvService.getAllSyaratPendaftaranKeys()
    keys.push(id)
    await kvService.saveSyaratPendaftaranKeys(keys)

    return {
      message: "Syarat pendaftaran created successfully",
      syaratPendaftaran,
    }
  } catch (error) {
    throw new Error("Failed to create syarat pendaftaran")
  }
}