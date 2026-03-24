import { Context } from "hono"
import { createBannerController } from "../../utils/controllerFactory"

export const getAllBannerHandler = async (c: Context) => {
  try {
    const controller = createBannerController(c.env.KV)
    const result = await controller.getAllBanner()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve banner" }, 500)
  }
}