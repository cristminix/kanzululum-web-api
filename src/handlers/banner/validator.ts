import { Context } from "hono"

export const bannerValidator = (value: any, c: Context) => {
  // Validasi field yang diperlukan
  if (value.title !== undefined && typeof value.title !== "string") {
    return c.json({ error: "Title must be a string" }, 400)
  }

  if (value.slug !== undefined && typeof value.slug !== "string") {
    return c.json({ error: "Slug must be a string" }, 400)
  }

  if (value.image !== undefined && typeof value.image !== "string") {
    return c.json({ error: "Image must be a string" }, 400)
  }

  if (value.imageUrl !== undefined && typeof value.imageUrl !== "string") {
    return c.json({ error: "Image URL must be a string" }, 400)
  }

  if (value.page !== undefined && typeof value.page !== "string") {
    return c.json({ error: "Page must be a string" }, 400)
  }

  return value
}