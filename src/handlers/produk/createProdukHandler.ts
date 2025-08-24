import { Context } from "hono"
import { createProdukController } from "../../utils/controllerFactory"

export const createProdukHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    
    const controller = createProdukController(c.env.KV)
    const result = await controller.createProduk(data)
    
    return c.json(result, 201)
  } catch (error) {
    return c.json({ error: "Failed to create produk" }, 500)
  }
}