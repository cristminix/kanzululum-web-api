import { KVNamespace } from "@cloudflare/workers-types"
import { KVService } from "../services/kvService"
import { BeritaController } from "../controllers/beritaController"
import { ProdukController } from "../controllers/produkController"
import { TemplateController } from "../controllers/templateController"
import { CompanyController } from "../controllers/companyController"
import { ContactPersonController } from "../controllers/contactPersonController"
import { BannerController } from "../controllers/bannerController"
import { GaleryController } from "../controllers/galeryController"
import { HeroController } from "../controllers/heroController"
import { KegiatanController } from "../controllers/kegiatanController"
import { LembagaController } from "../controllers/lembagaController"
import { SyaratPendaftaranController } from "../controllers/syaratPendaftaranController"
import { BiayaPendaftaranController } from "../controllers/biayaPendaftaranController"
import { ProfileController } from "../controllers/profileController"

// Factory function untuk membuat controller
export const createBeritaController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new BeritaController(kvService)
}

export const createProdukController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new ProdukController(kvService)
}

export const createTemplateController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new TemplateController(kvService)
}

export const createCompanyController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new CompanyController(kvService)
}

export const createContactPersonController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new ContactPersonController(kvService)
}

export const createBannerController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new BannerController(kvService)
}

export const createGaleryController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new GaleryController(kvService)
}

export const createHeroController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new HeroController(kvService)
}

export const createKegiatanController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new KegiatanController(kvService)
}

export const createLembagaController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new LembagaController(kvService)
}

export const createSyaratPendaftaranController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new SyaratPendaftaranController(kvService)
}

export const createBiayaPendaftaranController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new BiayaPendaftaranController(kvService)
}

export const createProfileController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new ProfileController(kvService)
}
