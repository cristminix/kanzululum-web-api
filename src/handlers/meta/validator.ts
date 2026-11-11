import { Context } from "hono"

export const metaValidator = (value: any, c: Context) => {
  // Validasi field title
  if (value.title !== undefined && typeof value.title !== "string") {
    return c.json({ error: "Title must be a string" }, 400)
  }

  // Validasi field meta-description
  if (
    value["meta-description"] !== undefined &&
    typeof value["meta-description"] !== "string"
  ) {
    return c.json({ error: "Meta-description must be a string" }, 400)
  }

  // Validasi field meta-keyword
  if (
    value["meta-keyword"] !== undefined &&
    typeof value["meta-keyword"] !== "string"
  ) {
    return c.json({ error: "Meta-keyword must be a string" }, 400)
  }

  return value
}
