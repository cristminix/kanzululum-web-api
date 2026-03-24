import { Hono } from "hono"
import { validator } from "hono/validator"
import { getAllKegiatanHandler } from "../handlers/kegiatan/getAllKegiatanHandler"
import { getKegiatanWithPagerHandler } from "../handlers/kegiatan/getKegiatanWithPagerHandler"
import { getKegiatanByIdHandler } from "../handlers/kegiatan/getKegiatanByIdHandler"
import { createKegiatanHandler } from "../handlers/kegiatan/createKegiatanHandler"
import { updateKegiatanHandler } from "../handlers/kegiatan/updateKegiatanHandler"
import { deleteKegiatanHandler } from "../handlers/kegiatan/deleteKegiatanHandler"
import { kegiatanValidator } from "../handlers/kegiatan/validator"

// Membuat router untuk kegiatan
export const kegiatanRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/kegiatan - Mendapatkan semua kegiatan
kegiatanRoutes.get("/kegiatan", getAllKegiatanHandler)

// GET /api/kegiatan/pager - Mendapatkan kegiatan dengan pagination
kegiatanRoutes.get("/kegiatan/pager", getKegiatanWithPagerHandler)

// GET /api/kegiatan/:id - Mendapatkan kegiatan berdasarkan ID
kegiatanRoutes.get("/kegiatan/:id", getKegiatanByIdHandler)

// POST /api/kegiatan - Membuat kegiatan baru
kegiatanRoutes.post(
  "/kegiatan",
  validator("json", kegiatanValidator),
  createKegiatanHandler
)

// PUT /api/kegiatan/:id - Memperbarui kegiatan
kegiatanRoutes.put(
  "/kegiatan/:id",
  validator("json", kegiatanValidator),
  updateKegiatanHandler
)

// DELETE /api/kegiatan/:id - Menghapus kegiatan
kegiatanRoutes.delete("/kegiatan/:id", deleteKegiatanHandler)