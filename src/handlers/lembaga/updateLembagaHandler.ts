import { Context } from "hono"
import { createLembagaController } from "../../utils/controllerFactory"

export const updateLembagaHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const data = await c.req.json()
    const controller = createLembagaController(c.env.KV)
    const result = await controller.updateLembaga(id, data)

    if (!result) {
      return c.json({ error: "Lembaga not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to update lembaga" }, 500)
  }
}