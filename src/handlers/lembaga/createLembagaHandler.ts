import { Context } from "hono"
import { createLembagaController } from "../../utils/controllerFactory"

export const createLembagaHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createLembagaController(c.env.KV)
    const result = await controller.createLembaga(data)
    return c.json(result, 201)
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Image must be a valid URL" ||
        error.message === "Image must not exceed 500 characters")
    ) {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to create lembaga" }, 500)
  }
}