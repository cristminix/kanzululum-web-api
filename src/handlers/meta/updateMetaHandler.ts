import { Context } from "hono"
import { createMetaController } from "../../utils/controllerFactory"

export const updateMetaHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id") || "")
    const data = await c.req.json()
    const controller = createMetaController(c.env.KV)
    const result = await controller.updateMeta(id, data)

    if (!result) {
      return c.json({ error: "Meta not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to update meta" }, 500)
  }
}
