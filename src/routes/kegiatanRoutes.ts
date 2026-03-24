import { Hono } from "hono"
import { getAllKegiatanHandler } from "../handlers/kegiatan/getAllKegiatanHandler"

// Membuat router untuk kegiatan
export const kegiatanRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/kegiatan - Mendapatkan semua kegiatan
kegiatanRoutes.get("/kegiatan", getAllKegiatanHandler)