import { Context } from "hono"
import { createHeroController } from "../../utils/controllerFactory"

export const getHeroByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createHeroController(c.env.KV)
    const hero = await controller.getHeroById(id)

    if (!hero) {
      return c.json({ error: "Hero not found" }, 404)
    }

    return c.json({ hero })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve hero" }, 500)
  }
}