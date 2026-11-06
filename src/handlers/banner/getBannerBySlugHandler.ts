import { Context } from "hono"
import { createBannerController } from "../../utils/controllerFactory"

export const getBannerBySlugHandler = async (c: Context) => {
  console.log(c.req.param("slug"))
  try {
    const slug = c.req.param("slug")
    const controller = createBannerController(c.env.KV)
    const banner = await controller.getBannerBySlug(slug)
    console.log({ slug })

    if (!banner) {
      return c.json({ error: "Banner not found" }, 404)
    }

    return c.json({ banner })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid slug") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve banner" }, 500)
  }
}