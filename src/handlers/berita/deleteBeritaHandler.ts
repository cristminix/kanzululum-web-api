import { Context } from "hono"
import { createBeritaController } from "../../utils/controllerFactory"

export const deleteBeritaHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createBeritaController(c.env.KV)
    const result = await controller.deleteBerita(id)

    if (!result) {
      return c.json({ error: "Berita not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete berita" }, 500)
  }
}
