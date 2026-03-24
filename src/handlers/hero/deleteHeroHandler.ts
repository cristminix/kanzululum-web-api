import { Context } from "hono"
import { createHeroController } from "../../utils/controllerFactory"

export const deleteHeroHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createHeroController(c.env.KV)
    const result = await controller.deleteHero(id)

    if (!result) {
      return c.json({ error: "Hero not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete hero" }, 500)
  }
}