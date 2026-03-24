import { Context } from "hono"
import { createHeroController } from "../../utils/controllerFactory"

export const createHeroHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createHeroController(c.env.KV)
    const result = await controller.createHero(data)
    return c.json(result, 201)
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Image must be a valid URL" ||
        error.message === "Image must not exceed 500 characters")
    ) {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to create hero" }, 500)
  }
}