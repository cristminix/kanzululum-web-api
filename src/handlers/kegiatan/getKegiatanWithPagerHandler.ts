import { Context } from "hono"
import { createKegiatanController } from "../../utils/controllerFactory"

export const getKegiatanWithPagerHandler = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "10")

    const controller = createKegiatanController(c.env.KV)
    const result = await controller.getKegiatanWithPager(page, limit)
    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve kegiatan" }, 500)
  }
}