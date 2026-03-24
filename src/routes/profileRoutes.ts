import { Hono } from "hono"
import { getProfileHandler } from "../handlers/profile/getProfileHandler"

// Membuat router untuk profile
export const profileRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/profile - Mendapatkan profile
profileRoutes.get("/profile", getProfileHandler)