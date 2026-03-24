import { Context } from "hono"
import { createContactPersonController } from "../../utils/controllerFactory"

export const getAllContactPersonHandler = async (c: Context) => {
  try {
    const controller = createContactPersonController(c.env.KV)
    const result = await controller.getAllContactPerson()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve contact person" }, 500)
  }
}