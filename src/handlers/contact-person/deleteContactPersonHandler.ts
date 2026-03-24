import { Context } from "hono"
import { createContactPersonController } from "../../utils/controllerFactory"

export const deleteContactPersonHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createContactPersonController(c.env.KV)
    const result = await controller.deleteContactPerson(id)

    if (!result) {
      return c.json({ error: "Contact person not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete contact person" }, 500)
  }
}