import { Context } from "hono"
import { createBeritaController } from "../../utils/controllerFactory"

export const getBeritaWithPagerHandler = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "10")
    const category = c.req.query("category")
    const author = c.req.query("author")

    const controller = createBeritaController(c.env.KV)
    const result = await controller.getBeritaWithPager(
      page,
      limit,
      category,
      author
    )
    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve berita" }, 500)
  }
}
