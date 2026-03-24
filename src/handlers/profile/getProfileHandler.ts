import { Context } from "hono"
import { createProfileController } from "../../utils/controllerFactory"

export const getProfileHandler = async (c: Context) => {
  try {
    const controller = createProfileController(c.env.KV)
    const result = await controller.getProfile()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve profile" }, 500)
  }
}