import { Context } from "hono"
import { createProdukController } from "../../utils/controllerFactory"

export const getAllProdukHandler = async (c: Context) => {
  try {
    const controller = createProdukController(c.env.KV)
    const result = await controller.getAllProduk()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve produk" }, 500)
  }
}