import { Context } from "hono"
import { createWelcomeMessageController } from "../../utils/controllerFactory"

export const updateWelcomeMessageHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id") || "")
    const data = await c.req.json()
    const controller = createWelcomeMessageController(c.env.KV)
    const result = await controller.updateWelcomeMessage(id, data)

    if (!result) {
      return c.json({ error: "Welcome message not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to update welcome message" }, 500)
  }
}
