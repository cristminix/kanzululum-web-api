import { Context } from "hono"
import { createBannerController } from "../../utils/controllerFactory"

export const updateBannerBySlugHandler = async (c: Context) => {
  try {
    const slug = c.req.param("slug")
    const data = await c.req.json()
    const controller = createBannerController(c.env.KV)
    const result = await controller.updateBannerBySlug(slug, data)

    if (!result) {
      return c.json({ error: "Banner not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid slug") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to update banner" }, 500)
  }
}