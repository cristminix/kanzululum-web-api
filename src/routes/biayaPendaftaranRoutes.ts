import { Hono } from "hono"
import { validator } from "hono/validator"
import { getAllBiayaPendaftaranHandler } from "../handlers/biaya-pendaftaran/getAllBiayaPendaftaranHandler"
import { getBiayaPendaftaranWithPagerHandler } from "../handlers/biaya-pendaftaran/getBiayaPendaftaranWithPagerHandler"
import { getBiayaPendaftaranByIdHandler } from "../handlers/biaya-pendaftaran/getBiayaPendaftaranByIdHandler"
import { createBiayaPendaftaranHandler } from "../handlers/biaya-pendaftaran/createBiayaPendaftaranHandler"
import { updateBiayaPendaftaranHandler } from "../handlers/biaya-pendaftaran/updateBiayaPendaftaranHandler"
import { deleteBiayaPendaftaranHandler } from "../handlers/biaya-pendaftaran/deleteBiayaPendaftaranHandler"
import { biayaPendaftaranValidator } from "../handlers/biaya-pendaftaran/validator"

// Membuat router untuk biaya pendaftaran
export const biayaPendaftaranRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/biaya-pendaftaran - Mendapatkan semua biaya pendaftaran
biayaPendaftaranRoutes.get("/biaya-pendaftaran", getAllBiayaPendaftaranHandler)

// GET /api/biaya-pendaftaran/pager - Mendapatkan biaya pendaftaran dengan pagination
biayaPendaftaranRoutes.get("/biaya-pendaftaran/pager", getBiayaPendaftaranWithPagerHandler)

// GET /api/biaya-pendaftaran/:id - Mendapatkan biaya pendaftaran berdasarkan ID
biayaPendaftaranRoutes.get("/biaya-pendaftaran/:id", getBiayaPendaftaranByIdHandler)

// POST /api/biaya-pendaftaran - Membuat biaya pendaftaran baru
biayaPendaftaranRoutes.post(
  "/biaya-pendaftaran",
  validator("json", biayaPendaftaranValidator),
  createBiayaPendaftaranHandler
)

// PUT /api/biaya-pendaftaran/:id - Memperbarui biaya pendaftaran
biayaPendaftaranRoutes.put(
  "/biaya-pendaftaran/:id",
  validator("json", biayaPendaftaranValidator),
  updateBiayaPendaftaranHandler
)

// DELETE /api/biaya-pendaftaran/:id - Menghapus biaya pendaftaran
biayaPendaftaranRoutes.delete("/biaya-pendaftaran/:id", deleteBiayaPendaftaranHandler)