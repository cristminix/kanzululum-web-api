import { Context } from "hono"
import { createPageController } from "../../utils/controllerFactory"

export const getAllPageHandler = async (c: Context) => {
  try {
    const controller = createPageController(c.env.KV)
    const result = await controller.getAllPage()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve page" }, 500)
  }
}