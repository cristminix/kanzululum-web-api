import { Context } from "hono"
import { createPageController } from "../../utils/controllerFactory"

export const deletePageHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createPageController(c.env.KV)
    const result = await controller.deletePage(id)

    if (!result) {
      return c.json({ error: "Page not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete page" }, 500)
  }
}