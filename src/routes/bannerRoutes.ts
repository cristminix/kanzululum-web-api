import { Hono } from "hono"
import { validator } from "hono/validator"
import { Banner } from "../models/banner"
import { KVService } from "../services/kvService"
import { BannerController } from "../controllers/bannerController"
import { getAllBannerHandler } from "../handlers/banner/getAllBannerHandler"
import { getBannerWithPagerHandler } from "../handlers/banner/getBannerWithPagerHandler"
import { getBannerByIdHandler } from "../handlers/banner/getBannerByIdHandler"
import { createBannerHandler } from "../handlers/banner/createBannerHandler"
import { updateBannerHandler } from "../handlers/banner/updateBannerHandler"
import { deleteBannerHandler } from "../handlers/banner/deleteBannerHandler"
import { bannerValidator } from "../handlers/banner/validator"

// Membuat router untuk banner
export const bannerRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/banner - Mendapatkan semua banner
bannerRoutes.get("/banner", getAllBannerHandler)

// GET /api/banner/pager - Mendapatkan banner dengan pagination
bannerRoutes.get("/banner/pager", getBannerWithPagerHandler)

// GET /api/banner/:id - Mendapatkan banner berdasarkan ID
bannerRoutes.get("/banner/:id", getBannerByIdHandler)

// POST /api/banner - Membuat banner baru
bannerRoutes.post(
  "/banner",
  validator("json", bannerValidator),
  createBannerHandler
)

// PUT /api/banner/:id - Memperbarui banner
bannerRoutes.put(
  "/banner/:id",
  validator("json", bannerValidator),
  updateBannerHandler
)

// DELETE /api/banner/:id - Menghapus banner
bannerRoutes.delete("/banner/:id", deleteBannerHandler)