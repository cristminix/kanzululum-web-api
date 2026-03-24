import { Context } from "hono"

export const syaratPendaftaranValidator = (value: any, c: Context) => {
  if (value.categorySlug !== undefined && typeof value.categorySlug !== "string") {
    return c.json({ error: "CategorySlug must be a string" }, 400)
  }

  if (value.content !== undefined && typeof value.content !== "string") {
    return c.json({ error: "Content must be a string" }, 400)
  }

  return value
}