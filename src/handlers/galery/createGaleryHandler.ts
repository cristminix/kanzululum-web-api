import { Context } from "hono"
import { createGaleryController } from "../../utils/controllerFactory"

export const createGaleryHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createGaleryController(c.env.KV)
    const result = await controller.createGalery(data)
    return c.json(result, 201)
  } catch (error) {
    return c.json({ error: "Failed to create galery" }, 500)
  }
}