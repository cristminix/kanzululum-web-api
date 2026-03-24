import { Context } from "hono"
import { createPageController } from "../../utils/controllerFactory"

export const createPageHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createPageController(c.env.KV)
    const result = await controller.createPage(data)
    return c.json(result, 201)
  } catch (error) {
    return c.json({ error: "Failed to create page" }, 500)
  }
}