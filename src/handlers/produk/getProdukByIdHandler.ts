import { Context } from "hono"
import { createProdukController } from "../../utils/controllerFactory"

export const getProdukByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    if (isNaN(id)) {
      return c.json({ error: "Invalid ID" }, 400)
    }

    const controller = createProdukController(c.env.KV)
    const result = await controller.getProdukById(id)
    
    if (!result) {
      return c.json({ error: "Produk not found" }, 404)
    }
    
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve produk" }, 500)
  }
}