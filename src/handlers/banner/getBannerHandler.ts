import { Context } from "hono"
import { createBannerController } from "../../utils/controllerFactory"

export const getBannerHandler = async (c: Context) => {
  try {
    const controller = createBannerController(c.env.KV)
    const result = await controller.getBanner()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve banner" }, 500)
  }
}