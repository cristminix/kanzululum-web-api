import { Context } from "hono"
import { createBiayaPendaftaranController } from "../../utils/controllerFactory"
import { biayaPendaftaranValidator } from "./validator"

export const updateBiayaPendaftaranHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const data = await c.req.json()

    // Validasi data
    const validationResult = biayaPendaftaranValidator(data, c)
    if (validationResult instanceof Promise) {
      await validationResult
    }

    const controller = createBiayaPendaftaranController(c.env.KV)
    const result = await controller.updateBiayaPendaftaran(id, data)

    if (!result) {
      return c.json({ error: "Biaya pendaftaran not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid ID") {
        return c.json({ error: error.message }, 400)
      }
    }
    return c.json({ error: "Failed to update biaya pendaftaran" }, 500)
  }
}