import { Context } from "hono"
import { createSyaratPendaftaranController } from "../../utils/controllerFactory"

export const getSyaratPendaftaranByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createSyaratPendaftaranController(c.env.KV)
    const syaratPendaftaran = await controller.getSyaratPendaftaranById(id)

    if (!syaratPendaftaran) {
      return c.json({ error: "Syarat pendaftaran not found" }, 404)
    }

    return c.json({ syaratPendaftaran })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve syarat pendaftaran" }, 500)
  }
}