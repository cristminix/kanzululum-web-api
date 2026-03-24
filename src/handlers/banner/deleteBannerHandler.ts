import { Context } from "hono"
import { createBannerController } from "../../utils/controllerFactory"

export const deleteBannerHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createBannerController(c.env.KV)
    const result = await controller.deleteBanner(id)

    if (!result) {
      return c.json({ error: "Banner not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete banner" }, 500)
  }
}