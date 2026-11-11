import { Context } from "hono"
import { createWelcomeMessageController } from "../../utils/controllerFactory"

export const createWelcomeMessageHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createWelcomeMessageController(c.env.KV)
    const result = await controller.createWelcomeMessage(data)
    return c.json(result, 201)
  } catch (error) {
    return c.json({ error: "Failed to create welcome message" }, 500)
  }
}
