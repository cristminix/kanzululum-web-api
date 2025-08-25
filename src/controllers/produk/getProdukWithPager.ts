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

    // Convert kategori to array if it contains comma
    const filterKategoriArray = kategori?.includes(",")
      ? kategori.split(",").map((k) => k.trim())
      : kategori
      ? [kategori]
      : null
    for (const key of keys) {
      const produkStr = await kvService.getProduk(key)
      if (produkStr) {
        const produk = JSON.parse(produkStr) as Produk
        const itemKategoriArray = produk.kategori?.includes(",")
          ? produk.kategori.split(",").map((k) => k.trim())
          : produk.kategori
          ? [produk.kategori]
          : null
        // Filter by kategori if provided
        if (
          !kategori ||
          (Array.isArray(itemKategoriArray) &&
            itemKategoriArray.includes(kategori || "")) ||
          (Array.isArray(itemKategoriArray) &&
            Array.isArray(filterKategoriArray) &&
            itemKategoriArray.some((itemKategori) =>
              filterKategoriArray.includes(itemKategori)
            ))
        ) {
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
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    throw new Error("Failed to retrieve produk with pagination")
  }
}
