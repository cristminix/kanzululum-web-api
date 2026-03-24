import { Context } from "hono"
import { createBiayaPendaftaranController } from "../../utils/controllerFactory"

export const getAllBiayaPendaftaranHandler = async (c: Context) => {
  try {
    const controller = createBiayaPendaftaranController(c.env.KV)
    const result = await controller.getAllBiayaPendaftaran()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve biaya pendaftaran" }, 500)
  }
}