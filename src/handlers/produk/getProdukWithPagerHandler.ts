import { Context } from "hono"
import { createProdukController } from "../../utils/controllerFactory"

export const getProdukWithPagerHandler = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1")
    const limit = parseInt(c.req.query("limit") || "10")
    const kategori = c.req.query("kategori")

    const controller = createProdukController(c.env.KV)
    const result = await controller.getProdukWithPager(page, limit, kategori)
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve produk with pagination" }, 500)
  }
}