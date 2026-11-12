import { Context } from "hono"
import { createTemplateController } from "../../utils/controllerFactory"

export const getTemplateByKindHandler = async (c: Context) => {
  try {
    const kind = c.req.param("kind")
    if (!kind) {
      return c.json({ error: "Kind is required" }, 400)
    }

    const controller = createTemplateController(c.env.KV)
    const template = await controller.getTemplateByKind(kind)

    if (!template) {
      return c.json({ error: "Template not found" }, 404)
    }

    return c.json({ template })
  } catch (error) {
    return c.json({ error: "Failed to retrieve template" }, 500)
  }
}
