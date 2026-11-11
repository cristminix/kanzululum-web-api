import { Hono } from "hono"
import { validator } from "hono/validator"
import { getAllWelcomeMessageHandler } from "../handlers/welcome-message/getAllWelcomeMessageHandler"
import { getWelcomeMessageWithPagerHandler } from "../handlers/welcome-message/getWelcomeMessageWithPagerHandler"
import { getWelcomeMessageByIdHandler } from "../handlers/welcome-message/getWelcomeMessageByIdHandler"
import { createWelcomeMessageHandler } from "../handlers/welcome-message/createWelcomeMessageHandler"
import { updateWelcomeMessageHandler } from "../handlers/welcome-message/updateWelcomeMessageHandler"
import { deleteWelcomeMessageHandler } from "../handlers/welcome-message/deleteWelcomeMessageHandler"
import { welcomeMessageValidator } from "../handlers/welcome-message/validator"

// Membuat router untuk welcome message
export const welcomeMessageRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/welcome-message - Mendapatkan semua welcome message
welcomeMessageRoutes.get("/welcome-message", getAllWelcomeMessageHandler)

// GET /api/welcome-message/pager - Mendapatkan welcome message dengan pagination
welcomeMessageRoutes.get("/welcome-message/pager", getWelcomeMessageWithPagerHandler)

// GET /api/welcome-message/:id - Mendapatkan welcome message berdasarkan ID
welcomeMessageRoutes.get("/welcome-message/:id", getWelcomeMessageByIdHandler)

// POST /api/welcome-message - Membuat welcome message baru
welcomeMessageRoutes.post(
  "/welcome-message",
  validator("json", welcomeMessageValidator),
  createWelcomeMessageHandler
)

// PUT /api/welcome-message/:id - Memperbarui welcome message
welcomeMessageRoutes.put(
  "/welcome-message/:id",
  validator("json", welcomeMessageValidator),
  updateWelcomeMessageHandler
)

// DELETE /api/welcome-message/:id - Menghapus welcome message
welcomeMessageRoutes.delete("/welcome-message/:id", deleteWelcomeMessageHandler)
