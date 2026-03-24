import { Context } from "hono"

export const biayaPendaftaranValidator = (value: any, c: Context) => {
  // Validasi field
  if (value.categorySlug !== undefined && typeof value.categorySlug !== "string") {
    return c.json({ error: "CategorySlug must be a string" }, 400)
  }

  if (value.legend !== undefined && typeof value.legend !== "string") {
    return c.json({ error: "Legend must be a string" }, 400)
  }

  if (value.keterangan !== undefined && typeof value.keterangan !== "string") {
    return c.json({ error: "Keterangan must be a string" }, 400)
  }

  if (value.biaya !== undefined && typeof value.biaya !== "string") {
    return c.json({ error: "Biaya must be a string" }, 400)
  }

  return value
}