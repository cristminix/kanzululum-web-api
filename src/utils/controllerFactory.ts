import { KVNamespace } from "@cloudflare/workers-types"
import { KVService } from "../services/kvService"
import { BeritaController } from "../controllers/beritaController"
import { ProdukController } from "../controllers/produkController"

// Factory function untuk membuat controller
export const createBeritaController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new BeritaController(kvService)
}

export const createProdukController = (kv: KVNamespace) => {
  const kvService = new KVService(kv)
  return new ProdukController(kvService)
}
