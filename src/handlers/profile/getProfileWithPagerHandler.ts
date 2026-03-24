import { Context } from "hono"
import { createProfileController } from "../../utils/controllerFactory"

export const getProfileWithPagerHandler = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "10")
    const kind = c.req.query("kind")

    const controller = createProfileController(c.env.KV)
    const result = await controller.getProfileWithPager(page, limit, kind)
    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Page must be a positive integer" ||
        error.message === "Limit must be between 1 and 100"
      ) {
        return c.json({ error: error.message }, 400)
      }
    }
    return c.json({ error: "Failed to retrieve profiles" }, 500)
  }
}