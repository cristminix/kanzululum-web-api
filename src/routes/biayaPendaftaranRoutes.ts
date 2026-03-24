import { Hono } from "hono"
import { getAllBiayaPendaftaranHandler } from "../handlers/biaya-pendaftaran/getAllBiayaPendaftaranHandler"

// Membuat router untuk biaya pendaftaran
export const biayaPendaftaranRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/biaya-pendaftaran - Mendapatkan semua biaya pendaftaran
biayaPendaftaranRoutes.get("/biaya-pendaftaran", getAllBiayaPendaftaranHandler)