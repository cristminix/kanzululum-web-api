import { Context } from "hono"
import { createHeroController } from "../../utils/controllerFactory"

export const getAllHeroHandler = async (c: Context) => {
  try {
    const controller = createHeroController(c.env.KV)
    const result = await controller.getAllHero()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve hero" }, 500)
  }
}