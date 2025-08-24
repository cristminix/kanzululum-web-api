import { Produk } from "../../models/produk"
import { KVService } from "../../services/kvService"

export async function getProdukWithPager(
  kvService: KVService,
  page: number,
  limit: number,
  kategori?: string
): Promise<any> {
  try {
    const keys = await kvService.getAllProdukKeys()
    let produkList: Produk[] = []
    
    for (const key of keys) {
      const produkStr = await kvService.getProduk(key)
      if (produkStr) {
        const produk = JSON.parse(produkStr) as Produk
        // Filter by kategori if provided
        if (!kategori || produk.kategori === kategori) {
          produkList.push(produk)
        }
      }
    }
    
    // Pagination
    const total = produkList.length
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedProduk = produkList.slice(start, end)
    
    return {
      produk: paginatedProduk,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    throw new Error("Failed to retrieve produk with pagination")
  }
}