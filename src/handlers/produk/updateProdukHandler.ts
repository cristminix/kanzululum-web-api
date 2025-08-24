import { Context } from "hono"
import { createProdukController } from "../../utils/controllerFactory"

export const updateProdukHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    if (isNaN(id)) {
      return c.json({ error: "Invalid ID" }, 400)
    }

    const data = await c.req.json()
    
    const controller = createProdukController(c.env.KV)
    const result = await controller.updateProduk(id, data)
    
    if (!result) {
      return c.json({ error: "Produk not found" }, 404)
    }
    
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to update produk" }, 500)
  }
}