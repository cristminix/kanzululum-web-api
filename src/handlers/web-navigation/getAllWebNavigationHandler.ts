import { Context } from "hono"
import { createWebNavigationController } from "../../utils/controllerFactory"

export const getAllWebNavigationHandler = async (c: Context) => {
  try {
    const controller = createWebNavigationController(c.env.KV)
    const result = await controller.getAllWebNavigation()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve web navigation" }, 500)
  }
}