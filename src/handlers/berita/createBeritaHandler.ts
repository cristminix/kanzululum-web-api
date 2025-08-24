import { Context } from "hono"
import { createBeritaController } from "../../utils/controllerFactory"

export const createBeritaHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createBeritaController(c.env.KV)
    const result = await controller.createBerita(data)
    return c.json(result, 201)
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Cover must be a valid URL" ||
        error.message === "Cover URL must not exceed 500 characters")
    ) {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to create berita" }, 500)
  }
}
