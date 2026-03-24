import { Context } from "hono"
import { createSocialNetworkLinksController } from "../../utils/controllerFactory"

export const getAllSocialNetworkLinksHandler = async (c: Context) => {
  try {
    const controller = createSocialNetworkLinksController(c.env.KV)
    const result = await controller.getAllSocialNetworkLinks()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve social network links" }, 500)
  }
}