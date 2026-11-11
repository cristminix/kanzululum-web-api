import { Context } from "hono"
import { createWelcomeMessageController } from "../../utils/controllerFactory"

export const getAllWelcomeMessageHandler = async (c: Context) => {
  try {
    const controller = createWelcomeMessageController(c.env.KV)
    const result = await controller.getAllWelcomeMessage()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve welcome message" }, 500)
  }
}
