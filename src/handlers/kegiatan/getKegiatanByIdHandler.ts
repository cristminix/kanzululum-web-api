import { Context } from "hono"
import { createKegiatanController } from "../../utils/controllerFactory"

export const getKegiatanByIdHandler = async (c: Context) => {
  try {
    const id = c.req.param("id")
    const controller = createKegiatanController(c.env.KV)
    const kegiatan = await controller.getKegiatanById(id)

    if (!kegiatan) {
      return c.json({ error: "Kegiatan not found" }, 404)
    }

    return c.json({ kegiatan })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve kegiatan" }, 500)
  }
}