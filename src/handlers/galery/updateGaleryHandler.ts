import { Context } from "hono"
import { createGaleryController } from "../../utils/controllerFactory"

export const updateGaleryHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    if (isNaN(id)) {
      return c.json({ error: "Invalid ID" }, 400)
    }

    const data = await c.req.json()
    const controller = createGaleryController(c.env.KV)
    const result = await controller.updateGalery(id, data)
    if (!result) {
      return c.json({ error: "Galery not found" }, 404)
    }
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to update galery" }, 500)
  }
}