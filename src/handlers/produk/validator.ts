import { Context } from "hono"

export const produkValidator = (value: any, c: Context) => {
  // Validasi field yang diperlukan
  if (value.title !== undefined && typeof value.title !== "string") {
    return c.json({ error: "Title must be a string" }, 400)
  }

  if (value.kategori !== undefined && typeof value.kategori !== "string") {
    return c.json({ error: "Kategori must be a string" }, 400)
  }

  if (value.tags !== undefined && typeof value.tags !== "string") {
    return c.json({ error: "Tags must be a string" }, 400)
  }

  if (value.headline !== undefined && typeof value.headline !== "string") {
    return c.json({ error: "Headline must be a string" }, 400)
  }

  if (value.cover !== undefined) {
    if (typeof value.cover !== "string") {
      return c.json({ error: "Cover must be a string" }, 400)
    }
    if (value.cover && value.cover.length > 500) {
      return c.json({ error: "Cover URL must not exceed 500 characters" }, 400)
    }
  }

  if (value.content !== undefined && typeof value.content !== "string") {
    return c.json({ error: "Content must be a string" }, 400)
  }

  if (
    value.compiledHash !== undefined &&
    typeof value.compiledHash !== "string"
  ) {
    return c.json({ error: "CompiledHash must be a string" }, 400)
  }

  if (
    value.compiledPath !== undefined &&
    typeof value.compiledPath !== "string"
  ) {
    return c.json({ error: "CompiledPath must be a string" }, 400)
  }

  return value
}