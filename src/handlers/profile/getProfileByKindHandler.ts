import { Context } from "hono"
import { createProfileController } from "../../utils/controllerFactory"

export const getProfileByKindHandler = async (c: Context) => {
  try {
    const kind = c.req.param("kind")
    const controller = createProfileController(c.env.KV)
    const result = await controller.getProfileByKind(kind)

    if (!result) {
      return c.json({ error: "Profile not found", profile: null }, 404)
    }

    return c.json({ profile: result })
  } catch (error) {
    return c.json({ error: "Failed to retrieve profile" }, 500)
  }
}