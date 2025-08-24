import { Produk } from "../../models/produk"
import { KVService } from "../../services/kvService"

export async function getProdukById(kvService: KVService, id: number): Promise<Produk | null> {
  try {
    const produkStr = await kvService.getProduk(id)
    if (produkStr) {
      return JSON.parse(produkStr) as Produk
    }
    return null
  } catch (error) {
    throw new Error("Failed to retrieve produk by ID")
  }
}