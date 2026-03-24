import { Context } from "hono"
import { createBiayaPendaftaranController } from "../../utils/controllerFactory"

export const getBiayaPendaftaranWithPagerHandler = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "10")
    const categorySlug = c.req.query("categorySlug")

    const controller = createBiayaPendaftaranController(c.env.KV)
    const result = await controller.getBiayaPendaftaranWithPager(
      page,
      limit,
      categorySlug
    )
    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve biaya pendaftaran" }, 500)
  }
}