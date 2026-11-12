import { Hono } from "hono"
import { validator } from "hono/validator" 
import { getAllTemplateHandler } from "../handlers/template/getAllTemplateHandler"
import { getTemplateByIdHandler } from "../handlers/template/getTemplateByIdHandler"
import { getTemplateByKindHandler } from "../handlers/template/getTemplateByKindHandler"
import { createTemplateHandler } from "../handlers/template/createTemplateHandler"
import { updateTemplateHandler } from "../handlers/template/updateTemplateHandler"
import { deleteTemplateHandler } from "../handlers/template/deleteTemplateHandler"
import { templateValidator } from "../handlers/template/validator"

// Membuat router untuk template
export const templateRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/template - Mendapatkan semua template
templateRoutes.get("/template", getAllTemplateHandler)

// GET /api/template/kind/:kind - Mendapatkan template berdasarkan kind
templateRoutes.get("/template/kind/:kind", getTemplateByKindHandler)

// GET /api/template/:id - Mendapatkan template berdasarkan ID
templateRoutes.get("/template/:id", getTemplateByIdHandler)
 
// POST /api/template - Membuat template baru
templateRoutes.post(
  "/template",
  validator("json", templateValidator),
  createTemplateHandler
)

// PUT /api/template/:id - Memperbarui template
templateRoutes.put(
  "/template/:id",
  validator("json", templateValidator),
  updateTemplateHandler
)

// DELETE /api/template/:id - Menghapus template
templateRoutes.delete("/template/:id", deleteTemplateHandler)
 