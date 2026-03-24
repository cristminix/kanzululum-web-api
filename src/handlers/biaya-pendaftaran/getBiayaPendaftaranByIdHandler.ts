import { Context } from "hono"
import { createBiayaPendaftaranController } from "../../utils/controllerFactory"

export const getBiayaPendaftaranByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createBiayaPendaftaranController(c.env.KV)
    const biayaPendaftaran = await controller.getBiayaPendaftaranById(id)

    if (!biayaPendaftaran) {
      return c.json({ error: "Biaya pendaftaran not found" }, 404)
    }

    return c.json({ biayaPendaftaran })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve biaya pendaftaran" }, 500)
  }
}