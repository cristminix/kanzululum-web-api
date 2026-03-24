import { Context } from "hono"

export const profileValidator = (value: any, c: Context) => {
  // Validasi field yang diperlukan
  if (value.heading !== undefined && typeof value.heading !== "string") {
    return c.json({ error: "Heading must be a string" }, 400)
  }

  if (value.title !== undefined && typeof value.title !== "string") {
    return c.json({ error: "Title must be a string" }, 400)
  }

  if (value.image !== undefined) {
    if (typeof value.image !== "string") {
      return c.json({ error: "Image must be a string" }, 400)
    }
    if (value.image && value.image.length > 500) {
      return c.json({ error: "Image URL must not exceed 500 characters" }, 400)
    }
  }

  if (value.kind !== undefined && typeof value.kind !== "string") {
    return c.json({ error: "Kind must be a string" }, 400)
  }

  if (value.linkText !== undefined && typeof value.linkText !== "string") {
    return c.json({ error: "LinkText must be a string" }, 400)
  }

  if (value.contents !== undefined && !Array.isArray(value.contents)) {
    return c.json({ error: "Contents must be an array" }, 400)
  }

  return value
}