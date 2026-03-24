import { Context } from "hono"
import { createContactPersonController } from "../../utils/controllerFactory"

export const updateContactPersonHandler = async (c: Context) => {
  try {
    const controller = createContactPersonController(c.env.KV)
    const data = await c.req.json()
    const result = await controller.updateContactPerson(data)
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to update contact person" }, 500)
  }
}