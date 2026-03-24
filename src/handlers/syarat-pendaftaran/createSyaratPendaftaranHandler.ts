import { Context } from "hono"
import { createSyaratPendaftaranController } from "../../utils/controllerFactory"

export const createSyaratPendaftaranHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createSyaratPendaftaranController(c.env.KV)
    const result = await controller.createSyaratPendaftaran(data)
    return c.json(result, 201)
  } catch (error) {
    return c.json({ error: "Failed to create syarat pendaftaran" }, 500)
  }
}