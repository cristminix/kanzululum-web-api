import { Context } from "hono"
import { createMetaController } from "../../utils/controllerFactory"

export const deleteMetaHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id") || "")
    const controller = createMetaController(c.env.KV)
    const result = await controller.deleteMeta(id)

    if (!result) {
      return c.json({ error: "Meta not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete meta" }, 500)
  }
}
