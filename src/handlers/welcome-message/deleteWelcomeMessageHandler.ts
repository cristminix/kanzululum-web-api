import { Context } from "hono"
import { createWelcomeMessageController } from "../../utils/controllerFactory"

export const deleteWelcomeMessageHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id") || "")
    const controller = createWelcomeMessageController(c.env.KV)
    const result = await controller.deleteWelcomeMessage(id)

    if (!result) {
      return c.json({ error: "Welcome message not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete welcome message" }, 500)
  }
}
