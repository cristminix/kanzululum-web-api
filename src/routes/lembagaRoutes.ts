import { Hono } from "hono"
import { validator } from "hono/validator"
import { Lembaga } from "../models/lembaga"
import { KVService } from "../services/kvService"
import { LembagaController } from "../controllers/lembagaController"
import { getAllLembagaHandler } from "../handlers/lembaga/getAllLembagaHandler"
import { getLembagaWithPagerHandler } from "../handlers/lembaga/getLembagaWithPagerHandler"
import { getLembagaByIdHandler } from "../handlers/lembaga/getLembagaByIdHandler"
import { createLembagaHandler } from "../handlers/lembaga/createLembagaHandler"
import { updateLembagaHandler } from "../handlers/lembaga/updateLembagaHandler"
import { deleteLembagaHandler } from "../handlers/lembaga/deleteLembagaHandler"
import { lembagaValidator } from "../handlers/lembaga/validator"

// Membuat router untuk lembaga
export const lembagaRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/lembaga - Mendapatkan semua lembaga
lembagaRoutes.get("/lembaga", getAllLembagaHandler)

// GET /api/lembaga/pager - Mendapatkan lembaga dengan pagination
lembagaRoutes.get("/lembaga/pager", getLembagaWithPagerHandler)

// GET /api/lembaga/:id - Mendapatkan lembaga berdasarkan ID
lembagaRoutes.get("/lembaga/:id", getLembagaByIdHandler)

// POST /api/lembaga - Membuat lembaga baru
lembagaRoutes.post(
  "/lembaga",
  validator("json", lembagaValidator),
  createLembagaHandler
)

// PUT /api/lembaga/:id - Memperbarui lembaga
lembagaRoutes.put(
  "/lembaga/:id",
  validator("json", lembagaValidator),
  updateLembagaHandler
)

// DELETE /api/lembaga/:id - Menghapus lembaga
lembagaRoutes.delete("/lembaga/:id", deleteLembagaHandler)