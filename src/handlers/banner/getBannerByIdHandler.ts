import { Context } from "hono"
import { createBannerController } from "../../utils/controllerFactory"

export const getBannerByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createBannerController(c.env.KV)
    const banner = await controller.getBannerById(id)

    if (!banner) {
      return c.json({ error: "Banner not found" }, 404)
    }

    return c.json({ banner })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve banner" }, 500)
  }
}