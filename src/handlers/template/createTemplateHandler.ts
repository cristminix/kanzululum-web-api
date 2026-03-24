import { Context } from "hono"
import { createTemplateController } from "../../utils/controllerFactory"

export const createTemplateHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createTemplateController(c.env.KV)
    const result = await controller.createTemplate(data)
    return c.json(result, 201)
  } catch (error) {
    return c.json({ error: "Failed to create template" }, 500)
  }
}