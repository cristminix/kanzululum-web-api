import { Context } from "hono"
import { createSyaratPendaftaranController } from "../../utils/controllerFactory"
import { syaratPendaftaranValidator } from "./validator"

export const updateSyaratPendaftaranHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const data = await c.req.json()

    // Validasi data
    const validationResult = syaratPendaftaranValidator(data, c)
    if (validationResult instanceof Promise) {
      await validationResult
    }

    const controller = createSyaratPendaftaranController(c.env.KV)
    const result = await controller.updateSyaratPendaftaran(id, data)

    if (!result) {
      return c.json({ error: "Syarat pendaftaran not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to update syarat pendaftaran" }, 500)
  }
}