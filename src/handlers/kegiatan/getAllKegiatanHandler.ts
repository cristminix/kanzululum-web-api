import { Context } from "hono"
import { createKegiatanController } from "../../utils/controllerFactory"

export const getAllKegiatanHandler = async (c: Context) => {
  try {
    const controller = createKegiatanController(c.env.KV)
    const result = await controller.getAllKegiatan()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve kegiatan" }, 500)
  }
}