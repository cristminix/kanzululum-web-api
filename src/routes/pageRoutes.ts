import { Hono } from "hono"
import { validator } from "hono/validator"
import { Page } from "../models/page"
import { KVService } from "../services/kvService"
import { PageController } from "../controllers/pageController"
import { getAllPageHandler } from "../handlers/page/getAllPageHandler"
import { getPageWithPagerHandler } from "../handlers/page/getPageWithPagerHandler"
import { getPageByIdHandler } from "../handlers/page/getPageByIdHandler"
import { createPageHandler } from "../handlers/page/createPageHandler"
import { updatePageHandler } from "../handlers/page/updatePageHandler"
import { deletePageHandler } from "../handlers/page/deletePageHandler"
import { pageValidator } from "../handlers/page/validator"

// Membuat router untuk page
export const pageRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/page - Mendapatkan semua page
pageRoutes.get("/page", getAllPageHandler)

// GET /api/page/pager - Mendapatkan page dengan pagination
pageRoutes.get("/page/pager", getPageWithPagerHandler)

// GET /api/page/:id - Mendapatkan page berdasarkan ID
pageRoutes.get("/page/:id", getPageByIdHandler)
/*
// POST /api/page - Membuat page baru
pageRoutes.post(
  "/page",
  validator("json", pageValidator),
  createPageHandler
)

// PUT /api/page/:id - Memperbarui page
pageRoutes.put(
  "/page/:id",
  validator("json", pageValidator),
  updatePageHandler
)

// DELETE /api/page/:id - Menghapus page
pageRoutes.delete("/page/:id", deletePageHandler)
*/