import { Context } from "hono"
import { createWelcomeMessageController } from "../../utils/controllerFactory"

export const getWelcomeMessageByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id") || "")
    const controller = createWelcomeMessageController(c.env.KV)
    const welcomeMessage = await controller.getWelcomeMessageById(id)

    if (!welcomeMessage) {
      return c.json({ error: "Welcome message not found" }, 404)
    }

    return c.json({ welcomeMessage })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve welcome message" }, 500)
  }
}
