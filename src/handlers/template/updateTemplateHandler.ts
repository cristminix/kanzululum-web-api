import { Context } from "hono"
import { createTemplateController } from "../../utils/controllerFactory"

export const updateTemplateHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const data = await c.req.json()
    const controller = createTemplateController(c.env.KV)
    const result = await controller.updateTemplate(id, data)

    if (!result) {
      return c.json({ error: "Template not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to update template" }, 500)
  }
}