import { Context } from "hono"
import { createPageController } from "../../utils/controllerFactory"
import { pageValidator } from "./validator"

export const updatePageHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const data = await c.req.json()

    // Validasi data
    const validationResult = pageValidator(data, c)
    if (validationResult instanceof Promise) {
      await validationResult
    }

    const controller = createPageController(c.env.KV)
    const result = await controller.updatePage(id, data)

    if (!result) {
      return c.json({ error: "Page not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid ID") {
        return c.json({ error: error.message }, 400)
      }
    }
    return c.json({ error: "Failed to update page" }, 500)
  }
}