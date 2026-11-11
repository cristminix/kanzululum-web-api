import { Context } from "hono"
import { createMetaController } from "../../utils/controllerFactory"

export const getAllMetaHandler = async (c: Context) => {
  try {
    const controller = createMetaController(c.env.KV)
    const result = await controller.getAllMeta()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve meta" }, 500)
  }
}
