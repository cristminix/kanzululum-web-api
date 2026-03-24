import { Hono } from "hono"
import { getAllLembagaHandler } from "../handlers/lembaga/getAllLembagaHandler"

// Membuat router untuk lembaga
export const lembagaRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/lembaga - Mendapatkan semua lembaga
lembagaRoutes.get("/lembaga", getAllLembagaHandler)