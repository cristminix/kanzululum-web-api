import { Hono } from "hono"
import { KVService } from "../services/kvService"
import { BannerController } from "../controllers/bannerController"
import { getBannerHandler } from "../handlers/banner/getBannerHandler"
import { updateBannerHandler } from "../handlers/banner/updateBannerHandler"

// Membuat router untuk banner
export const bannerRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/banner - Mendapatkan data banner
bannerRoutes.get("/banner", getBannerHandler)

// PUT /api/banner - Memperbarui data banner
bannerRoutes.put("/banner", updateBannerHandler)