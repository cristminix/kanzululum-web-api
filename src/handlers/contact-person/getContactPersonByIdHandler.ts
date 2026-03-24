import { Context } from "hono"
import { createContactPersonController } from "../../utils/controllerFactory"

export const getContactPersonByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createContactPersonController(c.env.KV)
    const contactPerson = await controller.getContactPersonById(id)

    if (!contactPerson) {
      return c.json({ error: "Contact person not found" }, 404)
    }

    return c.json({ contactPerson })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve contact person" }, 500)
  }
}