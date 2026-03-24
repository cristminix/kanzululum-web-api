import { Hono } from "hono"
import { validator } from "hono/validator"
import { getAllProfilesHandler } from "../handlers/profile/getAllProfilesHandler"
import { getProfileWithPagerHandler } from "../handlers/profile/getProfileWithPagerHandler"
import { getProfileByIdHandler } from "../handlers/profile/getProfileByIdHandler"
import { createProfileHandler } from "../handlers/profile/createProfileHandler"
import { updateProfileHandler } from "../handlers/profile/updateProfileHandler"
import { deleteProfileHandler } from "../handlers/profile/deleteProfileHandler"
import { profileValidator } from "../handlers/profile/validator"

// Membuat router untuk profile
export const profileRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/profile - Mendapatkan semua profile
profileRoutes.get("/profile", getAllProfilesHandler)

// GET /api/profile/pager - Mendapatkan profile dengan pagination
profileRoutes.get("/profile/pager", getProfileWithPagerHandler)

// GET /api/profile/:id - Mendapatkan profile berdasarkan ID
profileRoutes.get("/profile/:id", getProfileByIdHandler)

// POST /api/profile - Membuat profile baru
profileRoutes.post(
  "/profile",
  validator("json", profileValidator),
  createProfileHandler
)

// PUT /api/profile/:id - Memperbarui profile
profileRoutes.put(
  "/profile/:id",
  validator("json", profileValidator),
  updateProfileHandler
)

// DELETE /api/profile/:id - Menghapus profile
profileRoutes.delete("/profile/:id", deleteProfileHandler)