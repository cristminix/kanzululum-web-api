import { Context } from "hono"

export const welcomeMessageValidator = (value: any, c: Context) => {
  // Validasi field title
  if (value.title !== undefined && typeof value.title !== "string") {
    return c.json({ error: "Title must be a string" }, 400)
  }

  // Validasi field content
  if (value.content !== undefined && !Array.isArray(value.content) && typeof value.content !== "string") {
    return c.json({ error: "Content must be an array or string" }, 400)
  }

  return value
}
