import { Context } from "hono"
import { createGaleryController } from "../../utils/controllerFactory"

export const getGaleryByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    if (isNaN(id)) {
      return c.json({ error: "Invalid ID" }, 400)
    }

    const controller = createGaleryController(c.env.KV)
    const result = await controller.getGaleryById(id)
    if (!result) {
      return c.json({ error: "Galery not found" }, 404)
    }
    return c.json({ galery: result })
  } catch (error) {
    return c.json({ error: "Failed to retrieve galery" }, 500)
  }
}