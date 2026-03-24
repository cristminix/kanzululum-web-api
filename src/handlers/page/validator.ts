import { Context } from "hono"

export const pageValidator = (value: any, c: Context) => {
  // Validasi field yang diperlukan
  if (value.slug !== undefined && typeof value.slug !== "string") {
    return c.json({ error: "Slug must be a string" }, 400)
  }

  if (value.title !== undefined && typeof value.title !== "string") {
    return c.json({ error: "Title must be a string" }, 400)
  }

  if (value.metaDescription !== undefined && typeof value.metaDescription !== "string") {
    return c.json({ error: "MetaDescription must be a string" }, 400)
  }

  if (value.metaKeyword !== undefined && typeof value.metaKeyword !== "string") {
    return c.json({ error: "MetaKeyword must be a string" }, 400)
  }

  return value
}