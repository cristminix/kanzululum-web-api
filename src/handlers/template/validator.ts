import { Context } from "hono"

export const templateValidator = (value: any, c: Context) => {
  if (value.slug !== undefined && typeof value.slug !== "string") {
    return c.json({ error: "Slug must be a string" }, 400)
  }

  if (value.kind !== undefined && typeof value.kind !== "string") {
    return c.json({ error: "Kind must be a string" }, 400)
  }

  if (value.data !== undefined && typeof value.data !== "object") {
    return c.json({ error: "Data must be an object" }, 400)
  }

  return value
}