import { Context } from "hono"
import { createHeroController } from "../../utils/controllerFactory"
import { Hero } from "../../models/hero"

export const updateHeroHandler = async (c: Context) => {
  try {
    const data = await c.req.json<Partial<Hero>>()
    const controller = createHeroController(c.env.KV)
    const result = await controller.updateHero(data)
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to update hero" }, 500)
  }
}