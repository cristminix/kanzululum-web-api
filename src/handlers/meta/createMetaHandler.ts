import { Context } from "hono"
import { createMetaController } from "../../utils/controllerFactory"

export const createMetaHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createMetaController(c.env.KV)
    const result = await controller.createMeta(data)
    return c.json(result, 201)
  } catch (error) {
    return c.json({ error: "Failed to create meta" }, 500)
  }
}
