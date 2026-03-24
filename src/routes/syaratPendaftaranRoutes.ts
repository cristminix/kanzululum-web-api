import { Hono } from "hono"
import { getAllSyaratPendaftaranHandler } from "../handlers/syarat-pendaftaran/getAllSyaratPendaftaranHandler"

// Membuat router untuk syarat pendaftaran
export const syaratPendaftaranRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/syarat-pendaftaran - Mendapatkan semua syarat pendaftaran
syaratPendaftaranRoutes.get("/syarat-pendaftaran", getAllSyaratPendaftaranHandler)