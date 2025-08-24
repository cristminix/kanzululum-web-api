import { Context } from "hono"
import { createBeritaController } from "../../utils/controllerFactory"

export const getBeritaByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createBeritaController(c.env.KV)
    const berita = await controller.getBeritaById(id)

    if (!berita) {
      return c.json({ error: "Berita not found" }, 404)
    }

    return c.json({ berita })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve berita" }, 500)
  }
}
