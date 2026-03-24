import { Hono } from "hono"
import { validator } from "hono/validator"
import { Produk } from "../models/produk"
import { KVService } from "../services/kvService"
import { ProdukController } from "../controllers/produkController"
import { getAllProdukHandler } from "../handlers/produk/getAllProdukHandler"
import { getProdukWithPagerHandler } from "../handlers/produk/getProdukWithPagerHandler"
import { getProdukByIdHandler } from "../handlers/produk/getProdukByIdHandler"
import { createProdukHandler } from "../handlers/produk/createProdukHandler"
import { updateProdukHandler } from "../handlers/produk/updateProdukHandler"
import { deleteProdukHandler } from "../handlers/produk/deleteProdukHandler"
import { produkValidator } from "../handlers/produk/validator"

// Membuat router untuk produk
export const produkRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/produk - Mendapatkan semua produk
produkRoutes.get("/produk", getAllProdukHandler)

// GET /api/produk/pager - Mendapatkan produk dengan pagination
produkRoutes.get("/produk/pager", getProdukWithPagerHandler)

// GET /api/produk/:id - Mendapatkan produk berdasarkan ID
produkRoutes.get("/produk/:id", getProdukByIdHandler)

// POST /api/produk - Membuat produk baru
produkRoutes.post(
  "/produk",
  validator("json", produkValidator),
  createProdukHandler
)

// PUT /api/produk/:id - Memperbarui produk
produkRoutes.put(
  "/produk/:id",
  validator("json", produkValidator),
  updateProdukHandler
)

// DELETE /api/produk/:id - Menghapus produk
produkRoutes.delete("/produk/:id", deleteProdukHandler)
