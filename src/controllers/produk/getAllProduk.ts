import { Produk } from "../../models/produk"
import { KVService } from "../../services/kvService"

export async function getAllProduk(kvService: KVService): Promise<{ produk: Produk[] }> {
  try {
    const keys = await kvService.getAllProdukKeys()
    const produkList: Produk[] = []
    
    for (const key of keys) {
      const produkStr = await kvService.getProduk(key)
      if (produkStr) {
        const produk = JSON.parse(produkStr) as Produk
        produkList.push(produk)
      }
    }
    
    return { produk: produkList }
  } catch (error) {
    throw new Error("Failed to retrieve produk")
  }
}