import { Context } from "hono"

export const heroValidator = (value: any, c: Context) => {
  // Validasi field yang diperlukan
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

  if (value.linkText !== undefined && typeof value.linkText !== "string") {
    return c.json({ error: "LinkText must be a string" }, 400)
  }

  if (value.link !== undefined && typeof value.link !== "string") {
    return c.json({ error: "Link must be a string" }, 400)
  }

  if (value.title !== undefined && !Array.isArray(value.title)) {
    return c.json({ error: "Title must be an array" }, 400)
  }

  if (value.description !== undefined && !Array.isArray(value.description)) {
    return c.json({ error: "Description must be an array" }, 400)
  }

  return value
}