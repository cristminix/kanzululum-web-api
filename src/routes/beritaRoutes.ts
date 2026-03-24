import { Hono } from "hono"
import { validator } from "hono/validator"
import { Berita } from "../models/berita"
import { KVService } from "../services/kvService"
import { BeritaController } from "../controllers/beritaController"
import { getAllBeritaHandler } from "../handlers/berita/getAllBeritaHandler"
import { getBeritaWithPagerHandler } from "../handlers/berita/getBeritaWithPagerHandler"
import { getBeritaByIdHandler } from "../handlers/berita/getBeritaByIdHandler"
import { createBeritaHandler } from "../handlers/berita/createBeritaHandler"
import { updateBeritaHandler } from "../handlers/berita/updateBeritaHandler"
import { deleteBeritaHandler } from "../handlers/berita/deleteBeritaHandler"
import { beritaValidator } from "../handlers/berita/validator"

// Membuat router untuk berita
export const beritaRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/berita - Mendapatkan semua berita
beritaRoutes.get("/berita", getAllBeritaHandler)

// GET /api/berita/pager - Mendapatkan berita dengan pagination
beritaRoutes.get("/berita/pager", getBeritaWithPagerHandler)

// GET /api/berita/:id - Mendapatkan berita berdasarkan ID
beritaRoutes.get("/berita/:id", getBeritaByIdHandler)

// POST /api/berita - Membuat berita baru
beritaRoutes.post(
  "/berita",
  validator("json", beritaValidator),
  createBeritaHandler
)

// PUT /api/berita/:id - Memperbarui berita
beritaRoutes.put(
  "/berita/:id",
  validator("json", beritaValidator),
  updateBeritaHandler
)

// DELETE /api/berita/:id - Menghapus berita
beritaRoutes.delete("/berita/:id", deleteBeritaHandler)
