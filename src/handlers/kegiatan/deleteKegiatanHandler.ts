import { Context } from "hono"
import { createKegiatanController } from "../../utils/controllerFactory"

export const deleteKegiatanHandler = async (c: Context) => {
  try {
    const id = c.req.param("id")
    const controller = createKegiatanController(c.env.KV)
    const result = await controller.deleteKegiatan(id)

    if (!result) {
      return c.json({ error: "Kegiatan not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete kegiatan" }, 500)
  }
}