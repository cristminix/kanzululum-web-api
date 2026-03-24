import { Context } from "hono"
import { createKegiatanController } from "../../utils/controllerFactory"
import { kegiatanValidator } from "./validator"

export const updateKegiatanHandler = async (c: Context) => {
  try {
    const id = c.req.param("id")
    const data = await c.req.json()

    // Validasi data
    const validationResult = kegiatanValidator(data, c)
    if (validationResult instanceof Promise) {
      await validationResult
    }

    const controller = createKegiatanController(c.env.KV)
    const result = await controller.updateKegiatan(id, data)

    if (!result) {
      return c.json({ error: "Kegiatan not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid ID") {
        return c.json({ error: error.message }, 400)
      }
    }
    return c.json({ error: "Failed to update kegiatan" }, 500)
  }
}