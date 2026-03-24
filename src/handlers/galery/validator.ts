import { Context } from "hono"

export const galeryValidator = (value: any, c: Context) => {
  // Validasi field yang diperlukan
  if (value.title !== undefined && typeof value.title !== "string") {
    return c.json({ error: "Title must be a string" }, 400)
  }

  if (value.slug !== undefined && typeof value.slug !== "string") {
    return c.json({ error: "Slug must be a string" }, 400)
  }

  if (value.image !== undefined) {
    if (typeof value.image !== "string") {
      return c.json({ error: "Image must be a string" }, 400)
    }
    if (value.image && value.image.length > 500) {
      return c.json({ error: "Image must not exceed 500 characters" }, 400)
    }
  }

  if (value.description !== undefined && typeof value.description !== "string") {
    return c.json({ error: "Description must be a string" }, 400)
  }

  return value
}