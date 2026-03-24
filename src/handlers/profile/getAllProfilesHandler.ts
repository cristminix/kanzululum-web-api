import { Context } from "hono"
import { createProfileController } from "../../utils/controllerFactory"

export const getAllProfilesHandler = async (c: Context) => {
  try {
    const controller = createProfileController(c.env.KV)
    const result = await controller.getAllProfiles()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve profiles" }, 500)
  }
}