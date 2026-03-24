import { Context } from "hono"
import { createSyaratPendaftaranController } from "../../utils/controllerFactory"

export const getAllSyaratPendaftaranHandler = async (c: Context) => {
  try {
    const controller = createSyaratPendaftaranController(c.env.KV)
    const result = await controller.getAllSyaratPendaftaran()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve syarat pendaftaran" }, 500)
  }
}