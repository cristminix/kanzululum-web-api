import { Hono } from "hono"
import { validator } from "hono/validator"
import { Galery } from "../models/galery"
import { KVService } from "../services/kvService"
import { GaleryController } from "../controllers/galeryController"
import { getAllGaleryHandler } from "../handlers/galery/getAllGaleryHandler"
import { getGaleryWithPagerHandler } from "../handlers/galery/getGaleryWithPagerHandler"
import { getGaleryByIdHandler } from "../handlers/galery/getGaleryByIdHandler"
import { createGaleryHandler } from "../handlers/galery/createGaleryHandler"
import { updateGaleryHandler } from "../handlers/galery/updateGaleryHandler"
import { deleteGaleryHandler } from "../handlers/galery/deleteGaleryHandler"
import { galeryValidator } from "../handlers/galery/validator"

// Membuat router untuk galery
export const galeryRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/galery - Mendapatkan semua galery
galeryRoutes.get("/galery", getAllGaleryHandler)

// GET /api/galery/pager - Mendapatkan galery dengan pagination
galeryRoutes.get("/galery/pager", getGaleryWithPagerHandler)

// GET /api/galery/:id - Mendapatkan galery berdasarkan ID
galeryRoutes.get("/galery/:id", getGaleryByIdHandler)

// POST /api/galery - Membuat galery baru
galeryRoutes.post(
  "/galery",
  validator("json", galeryValidator),
  createGaleryHandler
)

// PUT /api/galery/:id - Memperbarui galery
galeryRoutes.put(
  "/galery/:id",
  validator("json", galeryValidator),
  updateGaleryHandler
)

// DELETE /api/galery/:id - Menghapus galery
galeryRoutes.delete("/galery/:id", deleteGaleryHandler)