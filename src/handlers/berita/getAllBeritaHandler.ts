import { Context } from "hono"
import { createBeritaController } from "../../utils/controllerFactory"

export const getAllBeritaHandler = async (c: Context) => {
  try {
    const controller = createBeritaController(c.env.KV)
    const result = await controller.getAllBerita()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve berita" }, 500)
  }
}
