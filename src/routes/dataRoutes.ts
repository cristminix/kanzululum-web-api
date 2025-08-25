import { Hono } from "hono"
import { validator } from "hono/validator"
import { KVService } from "../services/kvService"

// Membuat router untuk data umum
export const dataRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// Factory function untuk membuat service
const createKVService = (kv: KVNamespace) => {
  return new KVService(kv)
}
/*
// GET /api/keys - Mendapatkan semua keys
dataRoutes.get("/keys", async (c) => {
  try {
    const service = createKVService(c.env.KV)
    const keys = await service.list()
    return c.json({ keys: keys.keys })
  } catch (error) {
    return c.json({ error: "Failed to retrieve keys" }, 500)
  }
})

// GET /api/data/:key - Mendapatkan value berdasarkan key
dataRoutes.get("/data/:key", async (c) => {
  try {
    const key = c.req.param("key")
    const service = createKVService(c.env.KV)
    const value = await service.get(key)

    if (value === null) {
      return c.json({ error: "Key not found" }, 404)
    }

    return c.json({ key, value })
  } catch (error) {
    return c.json({ error: "Failed to retrieve data" }, 500)
  }
})

// POST /api/data - Membuat atau memperbarui data
dataRoutes.post(
  "/data",
  validator("json", (value, c) => {
    if (!value.key || typeof value.key !== "string") {
      return c.json({ error: "Key is required and must be a string" }, 400)
    }
    if (value.value === undefined) {
      return c.json({ error: "Value is required" }, 400)
    }
    return value
  }),
  async (c) => {
    try {
      const { key, value } = c.req.valid("json")
      const service = createKVService(c.env.KV)

      // Simpan ke Cloudflare KV
      await service.put(
        key,
        typeof value === "object" ? JSON.stringify(value) : value.toString()
      )

      return c.json(
        {
          message: "Data saved successfully",
          key,
          value,
        },
        201
      )
    } catch (error) {
      return c.json({ error: "Failed to save data" }, 500)
    }
  }
)

// PUT /api/data/:key - Memperbarui data
dataRoutes.put(
  "/data/:key",
  validator("json", (value, c) => {
    if (value.value === undefined) {
      return c.json({ error: "Value is required" }, 400)
    }
    return value
  }),
  async (c) => {
    try {
      const key = c.req.param("key")
      const { value } = c.req.valid("json")
      const service = createKVService(c.env.KV)

      // Periksa apakah key ada
      const existing = await service.get(key)
      if (existing === null) {
        return c.json({ error: "Key not found" }, 404)
      }

      // Simpan ke Cloudflare KV
      await service.put(
        key,
        typeof value === "object" ? JSON.stringify(value) : value.toString()
      )

      return c.json({
        message: "Data updated successfully",
        key,
        value,
      })
    } catch (error) {
      return c.json({ error: "Failed to update data" }, 500)
    }
  }
)

// DELETE /api/data/:key - Menghapus data
dataRoutes.delete("/data/:key", async (c) => {
  try {
    const key = c.req.param("key")
    const service = createKVService(c.env.KV)

    // Periksa apakah key ada
    const existing = await service.get(key)
    if (existing === null) {
      return c.json({ error: "Key not found" }, 404)
    }

    // Hapus dari Cloudflare KV
    await service.delete(key)

    return c.json({
      message: "Data deleted successfully",
      key,
    })
  } catch (error) {
    return c.json({ error: "Failed to delete data" }, 500)
  }
})
*/
