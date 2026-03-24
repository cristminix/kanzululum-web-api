import { Hono } from "hono"
import { getAllWebNavigationHandler } from "../handlers/web-navigation/getAllWebNavigationHandler"

// Membuat router untuk web navigation
export const webNavigationRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/web-navigation - Mendapatkan semua web navigation
webNavigationRoutes.get("/web-navigation", getAllWebNavigationHandler)