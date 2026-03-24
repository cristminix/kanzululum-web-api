import { Context } from "hono"
import { createContactPersonController } from "../../utils/controllerFactory"

export const getContactPersonWithPagerHandler = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "10")

    const controller = createContactPersonController(c.env.KV)
    const result = await controller.getContactPersonWithPager(page, limit)
    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve contact person" }, 500)
  }
}