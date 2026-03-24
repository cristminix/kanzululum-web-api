import { Context } from "hono"
import { createLembagaController } from "../../utils/controllerFactory"

export const getLembagaByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createLembagaController(c.env.KV)
    const lembaga = await controller.getLembagaById(id)

    if (!lembaga) {
      return c.json({ error: "Lembaga not found" }, 404)
    }

    return c.json({ lembaga })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve lembaga" }, 500)
  }
}