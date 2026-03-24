import { Context } from "hono"
import { createCompanyController } from "../../utils/controllerFactory"

export const getCompanyWithPagerHandler = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "10")

    const controller = createCompanyController(c.env.KV)
    const result = await controller.getCompanyWithPager(page, limit)
    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve companies" }, 500)
  }
}