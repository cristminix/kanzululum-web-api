import { Produk } from "../../models/produk"
import { KVService } from "../../services/kvService"

export async function updateProduk(
  kvService: KVService,
  id: number,
  data: Partial<Produk>
): Promise<{ produk: Produk; message: string } | null> {
  try {
    const existingProdukStr = await kvService.getProduk(id)
    if (!existingProdukStr) {
      return null
    }

    const existingProduk = JSON.parse(existingProdukStr) as Produk
    const dateUpdated = new Date().toISOString()

    // Hapus cover lama jika cover baru berbeda
    if (data.cover !== undefined && data.cover !== existingProduk.cover) {
      if (existingProduk.cover) {
        await kvService.delete(existingProduk.cover)
      }
    }

    const updatedProduk: Produk = {
      ...existingProduk,
      ...data,
      id: existingProduk.id,
      dateCreated: existingProduk.dateCreated,
      dateUpdated
    }

    // Save updated produk
    await kvService.saveProduk(id, JSON.stringify(updatedProduk))

    return {
      produk: updatedProduk,
      message: "Produk updated successfully"
    }
  } catch (error) {
    throw new Error("Failed to update produk")
  }
}