import { KVNamespace } from "@cloudflare/workers-types"
import { KVService } from "../services/kvService"
import { BeritaController } from "../controllers/beritaController"
import { ProdukController } from "../controllers/produkController"
import { TemplateController } from "../controllers/templateController"
import { CompanyController } from "../controllers/companyController"
import { ContactPersonController } from "../controllers/contactPersonController"
import { BannerController } from "../controllers/bannerController"

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
