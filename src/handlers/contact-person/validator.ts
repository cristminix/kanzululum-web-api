import { Context } from "hono"

export const contactPersonValidator = (value: any, c: Context) => {
  // Validasi field yang diperlukan
  if (value.name !== undefined && typeof value.name !== "string") {
    return c.json({ error: "Name must be a string" }, 400)
  }

  if (value.phone !== undefined && typeof value.phone !== "string") {
    return c.json({ error: "Phone must be a string" }, 400)
  }

  return value
}