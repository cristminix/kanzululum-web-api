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

  // Operasi khusus untuk template
  async getAllTemplateKeys(): Promise<number[]> {
    const templateKeys = await this.get("template_keys")
    return templateKeys ? JSON.parse(templateKeys) : []
  }

  async saveTemplateKeys(keys: number[]): Promise<void> {
    await this.put("template_keys", JSON.stringify(keys))
  }

  async getTemplate(id: number): Promise<string | null> {
    return await this.get(`template_${id}`)
  }

  async saveTemplate(id: number, templateStr: string): Promise<void> {
    await this.put(`template_${id}`, templateStr)
  }

  async deleteTemplate(id: number): Promise<void> {
    await this.delete(`template_${id}`)
  }

  // Operasi khusus untuk company (single entity)
  async getCompany(): Promise<string | null> {
    return await this.get("company")
  }

  async saveCompany(companyStr: string): Promise<void> {
    await this.put("company", companyStr)
  }

  // Operasi khusus untuk contact person (single entity)
  async getContactPerson(): Promise<string | null> {
    return await this.get("contact_person")
  }

  async saveContactPerson(contactPersonStr: string): Promise<void> {
    await this.put("contact_person", contactPersonStr)
  }

  // Operasi khusus untuk banner (single entity)
  async getBanner(): Promise<string | null> {
    return await this.get("banner")
  }

  async saveBanner(bannerStr: string): Promise<void> {
    await this.put("banner", bannerStr)
  }

  // Operasi khusus untuk galery
  async getAllGaleryKeys(): Promise<number[]> {
    const galeryKeys = await this.get("galery_keys")
    return galeryKeys ? JSON.parse(galeryKeys) : []
  }

  async saveGaleryKeys(keys: number[]): Promise<void> {
    await this.put("galery_keys", JSON.stringify(keys))
  }

  async getGalery(id: number): Promise<string | null> {
    return await this.get(`galery_${id}`)
  }

  async saveGalery(id: number, galeryStr: string): Promise<void> {
    await this.put(`galery_${id}`, galeryStr)
  }

  async deleteGalery(id: number): Promise<void> {
    await this.delete(`galery_${id}`)
  }

  // Operasi khusus untuk hero (single entity)
  async getHero(): Promise<string | null> {
    return await this.get("hero")
  }

  async saveHero(heroStr: string): Promise<void> {
    await this.put("hero", heroStr)
  }

  // Operasi khusus untuk kegiatan
  async getAllKegiatanKeys(): Promise<string[]> {
    const kegiatanKeys = await this.get("kegiatan_keys")
    return kegiatanKeys ? JSON.parse(kegiatanKeys) : []
  }

  async saveKegiatanKeys(keys: string[]): Promise<void> {
    await this.put("kegiatan_keys", JSON.stringify(keys))
  }

  async getKegiatan(id: string): Promise<string | null> {
    return await this.get(`kegiatan_${id}`)
  }

  async saveKegiatan(id: string, kegiatanStr: string): Promise<void> {
    await this.put(`kegiatan_${id}`, kegiatanStr)
  }

  async deleteKegiatan(id: string): Promise<void> {
    await this.delete(`kegiatan_${id}`)
  }

  // Operasi khusus untuk lembaga
  async getAllLembagaKeys(): Promise<number[]> {
    const lembagaKeys = await this.get("lembaga_keys")
    return lembagaKeys ? JSON.parse(lembagaKeys) : []
  }

  async saveLembagaKeys(keys: number[]): Promise<void> {
    await this.put("lembaga_keys", JSON.stringify(keys))
  }

  async getLembaga(id: number): Promise<string | null> {
    return await this.get(`lembaga_${id}`)
  }

  async saveLembaga(id: number, lembagaStr: string): Promise<void> {
    await this.put(`lembaga_${id}`, lembagaStr)
  }

  async deleteLembaga(id: number): Promise<void> {
    await this.delete(`lembaga_${id}`)
  }

  // Operasi khusus untuk syarat pendaftaran
  async getAllSyaratPendaftaranKeys(): Promise<number[]> {
    const syaratPendaftaranKeys = await this.get("syarat_pendaftaran_keys")
    return syaratPendaftaranKeys ? JSON.parse(syaratPendaftaranKeys) : []
  }

  async saveSyaratPendaftaranKeys(keys: number[]): Promise<void> {
    await this.put("syarat_pendaftaran_keys", JSON.stringify(keys))
  }

  async getSyaratPendaftaran(id: number): Promise<string | null> {
    return await this.get(`syarat_pendaftaran_${id}`)
  }

  async saveSyaratPendaftaran(id: number, syaratPendaftaranStr: string): Promise<void> {
    await this.put(`syarat_pendaftaran_${id}`, syaratPendaftaranStr)
  }

  async deleteSyaratPendaftaran(id: number): Promise<void> {
    await this.delete(`syarat_pendaftaran_${id}`)
  }

  // Operasi khusus untuk biaya pendaftaran
  async getAllBiayaPendaftaranKeys(): Promise<number[]> {
    const biayaPendaftaranKeys = await this.get("biaya_pendaftaran_keys")
    return biayaPendaftaranKeys ? JSON.parse(biayaPendaftaranKeys) : []
  }

  async saveBiayaPendaftaranKeys(keys: number[]): Promise<void> {
    await this.put("biaya_pendaftaran_keys", JSON.stringify(keys))
  }

  async getBiayaPendaftaran(id: number): Promise<string | null> {
    return await this.get(`biaya_pendaftaran_${id}`)
  }

  async saveBiayaPendaftaran(id: number, biayaPendaftaranStr: string): Promise<void> {
    await this.put(`biaya_pendaftaran_${id}`, biayaPendaftaranStr)
  }

  async deleteBiayaPendaftaran(id: number): Promise<void> {
    await this.delete(`biaya_pendaftaran_${id}`)
  }

  // Operasi khusus untuk profile (single entity)
  async getProfile(): Promise<string | null> {
    return await this.get("profile")
  }

  async saveProfile(profileStr: string): Promise<void> {
    await this.put("profile", profileStr)
  }

  // Operasi khusus untuk social network links
  async getAllSocialNetworkLinksKeys(): Promise<number[]> {
    const socialNetworkLinksKeys = await this.get("social_network_links_keys")
    return socialNetworkLinksKeys ? JSON.parse(socialNetworkLinksKeys) : []
  }

  async saveSocialNetworkLinksKeys(keys: number[]): Promise<void> {
    await this.put("social_network_links_keys", JSON.stringify(keys))
  }

  async getSocialNetworkLinks(id: number): Promise<string | null> {
    return await this.get(`social_network_links_${id}`)
  }

  async saveSocialNetworkLinks(id: number, socialNetworkLinksStr: string): Promise<void> {
    await this.put(`social_network_links_${id}`, socialNetworkLinksStr)
  }

  async deleteSocialNetworkLinks(id: number): Promise<void> {
    await this.delete(`social_network_links_${id}`)
  }
}
