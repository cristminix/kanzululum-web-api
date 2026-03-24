import { Hono } from "hono"
import { validator } from "hono/validator"
import { Galery } from "../models/galery"
import { KVService } from "../services/kvService"
import { GaleryController } from "../controllers/galeryController"
import { getAllGaleryHandler } from "../handlers/galery/getAllGaleryHandler"
import { getGaleryByIdHandler } from "../handlers/galery/getGaleryByIdHandler"
import { createGaleryHandler } from "../handlers/galery/createGaleryHandler"
import { updateGaleryHandler } from "../handlers/galery/updateGaleryHandler"
import { deleteGaleryHandler } from "../handlers/galery/deleteGaleryHandler"

// Validator untuk galery
export const galeryValidator = validator((value, c) => {
  const body = value as Partial<Galery>
  return body
})

// Membuat router untuk galery
export const galeryRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/galery - Mendapatkan semua galery
galeryRoutes.get("/galery", getAllGaleryHandler)

// GET /api/galery/:id - Mendapatkan galery berdasarkan ID
galeryRoutes.get("/galery/:id", getGaleryByIdHandler)

// POST /api/galery - Membuat galery baru
galeryRoutes.post("/galery", galeryValidator, createGaleryHandler)

// PUT /api/galery/:id - Memperbarui galery
galeryRoutes.put("/galery/:id", galeryValidator, updateGaleryHandler)

// DELETE /api/galery/:id - Menghapus galery
galeryRoutes.delete("/galery/:id", deleteGaleryHandler)