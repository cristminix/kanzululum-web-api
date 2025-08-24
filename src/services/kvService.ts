// Service untuk operasi Cloudflare KV
export class KVService {
  private kv: KVNamespace

  constructor(kv: KVNamespace) {
    this.kv = kv
  }

  // Helper function untuk generate ID
  generateId(): number {
    return Date.now()
  }

  // Helper function untuk validasi URL
  isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  // Operasi dasar KV
  async get(key: string): Promise<string | null> {
    return await this.kv.get(key)
  }

  async put(key: string, value: string): Promise<void> {
    await this.kv.put(key, value)
  }

  async delete(key: string): Promise<void> {
    await this.kv.delete(key)
  }

  async list(): Promise<any> {
    return await this.kv.list()
  }

  // Operasi khusus untuk berita
  async getAllBeritaKeys(): Promise<number[]> {
    const beritaKeys = await this.get("berita_keys")
    return beritaKeys ? JSON.parse(beritaKeys) : []
  }

  async saveBeritaKeys(keys: number[]): Promise<void> {
    await this.put("berita_keys", JSON.stringify(keys))
  }

  async getBerita(id: number): Promise<string | null> {
    return await this.get(`berita_${id}`)
  }

  async saveBerita(id: number, beritaStr: string): Promise<void> {
    await this.put(`berita_${id}`, beritaStr)
  }

  async deleteBerita(id: number): Promise<void> {
    await this.delete(`berita_${id}`)
  }

  // Operasi khusus untuk produk
  async getAllProdukKeys(): Promise<number[]> {
    const produkKeys = await this.get("produk_keys")
    return produkKeys ? JSON.parse(produkKeys) : []
  }

  async saveProdukKeys(keys: number[]): Promise<void> {
    await this.put("produk_keys", JSON.stringify(keys))
  }

  async getProduk(id: number): Promise<string | null> {
    return await this.get(`produk_${id}`)
  }

  async saveProduk(id: number, produkStr: string): Promise<void> {
    await this.put(`produk_${id}`, produkStr)
  }

  async deleteProduk(id: number): Promise<void> {
    await this.delete(`produk_${id}`)
  }
}
