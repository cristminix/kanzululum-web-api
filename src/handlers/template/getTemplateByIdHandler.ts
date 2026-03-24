import { Context } from "hono"
import { createTemplateController } from "../../utils/controllerFactory"

export const getTemplateByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createTemplateController(c.env.KV)
    const template = await controller.getTemplateById(id)

    if (!template) {
      return c.json({ error: "Template not found" }, 404)
    }

    return c.json({ template })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve template" }, 500)
  }
}