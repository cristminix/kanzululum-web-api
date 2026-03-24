import { Context } from "hono"
import { createBiayaPendaftaranController } from "../../utils/controllerFactory"

export const deleteBiayaPendaftaranHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createBiayaPendaftaranController(c.env.KV)
    const result = await controller.deleteBiayaPendaftaran(id)

    if (!result) {
      return c.json({ error: "Biaya pendaftaran not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete biaya pendaftaran" }, 500)
  }
}