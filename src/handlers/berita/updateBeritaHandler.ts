import { Context } from "hono"
import { createBeritaController } from "../../utils/controllerFactory"
import { beritaValidator } from "./validator"

export const updateBeritaHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const data = await c.req.json()

    // Validasi data
    const validationResult = beritaValidator(data, c)
    if (validationResult instanceof Promise) {
      // Jika validator mengembalikan Promise, tunggu hasilnya
      await validationResult
    }

    const controller = createBeritaController(c.env.KV)
    const result = await controller.updateBerita(id, data)

    if (!result) {
      return c.json({ error: "Berita not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid ID") {
        return c.json({ error: error.message }, 400)
      }
      if (
        error.message === "Cover must be a valid URL" ||
        error.message === "Cover URL must not exceed 500 characters"
      ) {
        return c.json({ error: error.message }, 400)
      }
    }
    return c.json({ error: "Failed to update berita" }, 500)
  }
}
