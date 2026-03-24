import { Hono } from "hono"
import { KVService } from "../services/kvService"
import { HeroController } from "../controllers/heroController"
import { getHeroHandler } from "../handlers/hero/getHeroHandler"
import { updateHeroHandler } from "../handlers/hero/updateHeroHandler"

// Membuat router untuk hero
export const heroRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/hero - Mendapatkan data hero
heroRoutes.get("/hero", getHeroHandler)

// PUT /api/hero - Memperbarui data hero
heroRoutes.put("/hero", updateHeroHandler)