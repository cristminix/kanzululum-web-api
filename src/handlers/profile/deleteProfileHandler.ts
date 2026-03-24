import { Context } from "hono"
import { createProfileController } from "../../utils/controllerFactory"

export const deleteProfileHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createProfileController(c.env.KV)
    const result = await controller.deleteProfile(id)

    if (!result) {
      return c.json({ error: "Profile not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete profile" }, 500)
  }
}