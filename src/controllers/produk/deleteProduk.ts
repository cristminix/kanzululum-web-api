import { KVService } from "../../services/kvService"
import { Produk } from "../../models/produk"

export async function deleteProduk(
  kvService: KVService,
  id: number
): Promise<{ id: number; message: string } | null> {
  try {
    const existingProdukStr = await kvService.getProduk(id)
    if (!existingProdukStr) {
      return null
    }

    // Parse produk untuk mendapatkan cover file ID
    const existingProduk: Produk = JSON.parse(existingProdukStr)

    // Hapus cover image jika ada
    if (existingProduk.cover) {
      await kvService.delete(existingProduk.cover)
    }

    // Delete produk
    await kvService.deleteProduk(id)

    // Update keys list
    const keys = await kvService.getAllProdukKeys()
    const updatedKeys = keys.filter((key: number) => key !== id)
    await kvService.saveProdukKeys(updatedKeys)
    //
    return {
      id,
      message: "Produk deleted successfully"
    }
  } catch (error) {
    throw new Error("Failed to delete produk")
  }
}