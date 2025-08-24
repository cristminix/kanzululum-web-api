import { Produk } from "../../models/produk"
import { KVService } from "../../services/kvService"

export async function createProduk(
  kvService: KVService,
  data: Partial<Produk>
): Promise<{ produk: Produk; message: string }> {
  try {
    const id = kvService.generateId()
    const dateCreated = new Date().toISOString()
    
    const newProduk: Produk = {
      id,
      title: data.title,
      kategori: data.kategori,
      tags: data.tags,
      headline: data.headline,
      cover: data.cover,
      content: data.content,
      compiledHash: data.compiledHash,
      compiledPath: data.compiledPath,
      dateCreated,
      dateUpdated: dateCreated
    }
    
    // Save produk
    await kvService.saveProduk(id, JSON.stringify(newProduk))
    
    // Update keys list
    const keys = await kvService.getAllProdukKeys()
    if (!keys.includes(id)) {
      keys.push(id)
      await kvService.saveProdukKeys(keys)
    }
    
    return {
      produk: newProduk,
      message: "Produk created successfully"
    }
  } catch (error) {
    throw new Error("Failed to create produk")
  }
}