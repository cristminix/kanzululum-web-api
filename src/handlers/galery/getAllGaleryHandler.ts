import { Context } from "hono"
import { createGaleryController } from "../../utils/controllerFactory"

export const getAllGaleryHandler = async (c: Context) => {
  try {
    const controller = createGaleryController(c.env.KV)
    const result = await controller.getAllGalery()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve galery" }, 500)
  }
}