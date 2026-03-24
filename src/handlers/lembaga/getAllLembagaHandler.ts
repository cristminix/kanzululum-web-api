import { Context } from "hono"
import { createLembagaController } from "../../utils/controllerFactory"

export const getAllLembagaHandler = async (c: Context) => {
  try {
    const controller = createLembagaController(c.env.KV)
    const result = await controller.getAllLembaga()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve lembaga" }, 500)
  }
}