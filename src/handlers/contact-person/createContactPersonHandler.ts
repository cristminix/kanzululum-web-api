import { Context } from "hono"
import { createContactPersonController } from "../../utils/controllerFactory"

export const createContactPersonHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createContactPersonController(c.env.KV)
    const result = await controller.createContactPerson(data)
    return c.json(result, 201)
  } catch (error) {
    return c.json({ error: "Failed to create contact person" }, 500)
  }
}