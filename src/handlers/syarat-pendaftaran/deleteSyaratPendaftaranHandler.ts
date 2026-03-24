import { Context } from "hono"
import { createSyaratPendaftaranController } from "../../utils/controllerFactory"

export const deleteSyaratPendaftaranHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createSyaratPendaftaranController(c.env.KV)
    const result = await controller.deleteSyaratPendaftaran(id)

    if (!result) {
      return c.json({ error: "Syarat pendaftaran not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete syarat pendaftaran" }, 500)
  }
}