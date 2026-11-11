import { Context } from "hono"
import { createMetaController } from "../../utils/controllerFactory"

export const getMetaByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id") || "")
    const controller = createMetaController(c.env.KV)
    const meta = await controller.getMetaById(id)

    if (!meta) {
      return c.json({ error: "Meta not found" }, 404)
    }

    return c.json({ meta })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve meta" }, 500)
  }
}
