import { Context } from "hono"
import { createProfileController } from "../../utils/controllerFactory"

export const createProfileHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createProfileController(c.env.KV)
    const result = await controller.createProfile(data)
    return c.json(result, 201)
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Image must be a valid URL" ||
        error.message === "Image URL must not exceed 500 characters")
    ) {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to create profile" }, 500)
  }
}