import { Context } from "hono"
import { createBannerController } from "../../utils/controllerFactory"

export const updateBannerHandler = async (c: Context) => {
  try {
    const controller = createBannerController(c.env.KV)
    const data = await c.req.json()
    const result = await controller.updateBanner(data)
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to update banner" }, 500)
  }
}