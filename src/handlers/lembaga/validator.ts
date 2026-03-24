import { Context } from "hono"

export const lembagaValidator = (value: any, c: Context) => {
  // Validasi field yang diperlukan
  if (value.name !== undefined && typeof value.name !== "string") {
    return c.json({ error: "Name must be a string" }, 400)
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