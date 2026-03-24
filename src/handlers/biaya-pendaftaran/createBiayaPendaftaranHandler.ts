import { Context } from "hono"
import { createBiayaPendaftaranController } from "../../utils/controllerFactory"

export const createBiayaPendaftaranHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createBiayaPendaftaranController(c.env.KV)
    const result = await controller.createBiayaPendaftaran(data)
    return c.json(result, 201)
  } catch (error) {
    return c.json({ error: "Failed to create biaya pendaftaran" }, 500)
  }
}