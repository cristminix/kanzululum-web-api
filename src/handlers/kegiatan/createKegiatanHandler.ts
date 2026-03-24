import { Context } from "hono"
import { createKegiatanController } from "../../utils/controllerFactory"

export const createKegiatanHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createKegiatanController(c.env.KV)
    const result = await controller.createKegiatan(data)
    return c.json(result, 201)
  } catch (error) {
    return c.json({ error: "Failed to create kegiatan" }, 500)
  }
}