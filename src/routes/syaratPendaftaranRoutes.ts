import { Hono } from "hono"
import { validator } from "hono/validator"
import { getAllSyaratPendaftaranHandler } from "../handlers/syarat-pendaftaran/getAllSyaratPendaftaranHandler"
import { getSyaratPendaftaranWithPagerHandler } from "../handlers/syarat-pendaftaran/getSyaratPendaftaranWithPagerHandler"
import { getSyaratPendaftaranByIdHandler } from "../handlers/syarat-pendaftaran/getSyaratPendaftaranByIdHandler"
import { createSyaratPendaftaranHandler } from "../handlers/syarat-pendaftaran/createSyaratPendaftaranHandler"
import { updateSyaratPendaftaranHandler } from "../handlers/syarat-pendaftaran/updateSyaratPendaftaranHandler"
import { deleteSyaratPendaftaranHandler } from "../handlers/syarat-pendaftaran/deleteSyaratPendaftaranHandler"
import { syaratPendaftaranValidator } from "../handlers/syarat-pendaftaran/validator"

// Membuat router untuk syarat pendaftaran
export const syaratPendaftaranRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/syarat-pendaftaran - Mendapatkan semua syarat pendaftaran
syaratPendaftaranRoutes.get("/syarat-pendaftaran", getAllSyaratPendaftaranHandler)

// GET /api/syarat-pendaftaran/pager - Mendapatkan syarat pendaftaran dengan pagination
syaratPendaftaranRoutes.get("/syarat-pendaftaran/pager", getSyaratPendaftaranWithPagerHandler)

// GET /api/syarat-pendaftaran/:id - Mendapatkan syarat pendaftaran berdasarkan ID
syaratPendaftaranRoutes.get("/syarat-pendaftaran/:id", getSyaratPendaftaranByIdHandler)

// POST /api/syarat-pendaftaran - Membuat syarat pendaftaran baru
syaratPendaftaranRoutes.post(
  "/syarat-pendaftaran",
  validator("json", syaratPendaftaranValidator),
  createSyaratPendaftaranHandler
)

// PUT /api/syarat-pendaftaran/:id - Memperbarui syarat pendaftaran
syaratPendaftaranRoutes.put(
  "/syarat-pendaftaran/:id",
  validator("json", syaratPendaftaranValidator),
  updateSyaratPendaftaranHandler
)

// DELETE /api/syarat-pendaftaran/:id - Menghapus syarat pendaftaran
syaratPendaftaranRoutes.delete("/syarat-pendaftaran/:id", deleteSyaratPendaftaranHandler)