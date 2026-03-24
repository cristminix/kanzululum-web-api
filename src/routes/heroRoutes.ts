import { Hono } from "hono"
import { validator } from "hono/validator"
import { Hero } from "../models/hero"
import { KVService } from "../services/kvService"
import { HeroController } from "../controllers/heroController"
import { getAllHeroHandler } from "../handlers/hero/getAllHeroHandler"
import { getHeroWithPagerHandler } from "../handlers/hero/getHeroWithPagerHandler"
import { getHeroByIdHandler } from "../handlers/hero/getHeroByIdHandler"
import { createHeroHandler } from "../handlers/hero/createHeroHandler"
import { updateHeroHandler } from "../handlers/hero/updateHeroHandler"
import { deleteHeroHandler } from "../handlers/hero/deleteHeroHandler"
import { heroValidator } from "../handlers/hero/validator"

// Membuat router untuk hero
export const heroRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/hero - Mendapatkan semua hero
heroRoutes.get("/hero", getAllHeroHandler)

// GET /api/hero/pager - Mendapatkan hero dengan pagination
heroRoutes.get("/hero/pager", getHeroWithPagerHandler)

// GET /api/hero/:id - Mendapatkan hero berdasarkan ID
heroRoutes.get("/hero/:id", getHeroByIdHandler)

// POST /api/hero - Membuat hero baru
heroRoutes.post(
  "/hero",
  validator("json", heroValidator),
  createHeroHandler
)

// PUT /api/hero/:id - Memperbarui hero
heroRoutes.put(
  "/hero/:id",
  validator("json", heroValidator),
  updateHeroHandler
)

// DELETE /api/hero/:id - Menghapus hero
heroRoutes.delete("/hero/:id", deleteHeroHandler)