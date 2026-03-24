import { Context } from "hono"
import { createTemplateController } from "../../utils/controllerFactory"

export const getAllTemplateHandler = async (c: Context) => {
  try {
    const controller = createTemplateController(c.env.KV)
    const result = await controller.getAllTemplate()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve templates" }, 500)
  }
}