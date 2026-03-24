import { Context } from "hono"
import { createSyaratPendaftaranController } from "../../utils/controllerFactory"

export const getSyaratPendaftaranWithPagerHandler = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "10")
    const categorySlug = c.req.query("categorySlug")

    const controller = createSyaratPendaftaranController(c.env.KV)
    const result = await controller.getSyaratPendaftaranWithPager(
      page,
      limit,
      categorySlug
    )
    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve syarat pendaftaran" }, 500)
  }
}