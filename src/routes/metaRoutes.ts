import { Hono } from "hono"
import { validator } from "hono/validator"
import { getAllMetaHandler } from "../handlers/meta/getAllMetaHandler"
import { getMetaWithPagerHandler } from "../handlers/meta/getMetaWithPagerHandler"
import { getMetaByIdHandler } from "../handlers/meta/getMetaByIdHandler"
import { createMetaHandler } from "../handlers/meta/createMetaHandler"
import { updateMetaHandler } from "../handlers/meta/updateMetaHandler"
import { deleteMetaHandler } from "../handlers/meta/deleteMetaHandler"
import { metaValidator } from "../handlers/meta/validator"

// Membuat router untuk meta
export const metaRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/meta - Mendapatkan semua meta
metaRoutes.get("/meta", getAllMetaHandler)

// GET /api/meta/pager - Mendapatkan meta dengan pagination
metaRoutes.get("/meta/pager", getMetaWithPagerHandler)

// GET /api/meta/:id - Mendapatkan meta berdasarkan ID
metaRoutes.get("/meta/:id", getMetaByIdHandler)

// POST /api/meta - Membuat meta baru
metaRoutes.post(
  "/meta",
  validator("json", metaValidator),
  createMetaHandler
)

// PUT /api/meta/:id - Memperbarui meta
metaRoutes.put(
  "/meta/:id",
  validator("json", metaValidator),
  updateMetaHandler
)

// DELETE /api/meta/:id - Menghapus meta
metaRoutes.delete("/meta/:id", deleteMetaHandler)
