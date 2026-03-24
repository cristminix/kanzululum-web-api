import { Context } from "hono"

export const companyValidator = (value: any, c: Context) => {
  // Validasi field yang diperlukan
  if (value.name !== undefined && typeof value.name !== "string") {
    return c.json({ error: "Name must be a string" }, 400)
  }

  if (value.shortAddress !== undefined && typeof value.shortAddress !== "string") {
    return c.json({ error: "Short address must be a string" }, 400)
  }

  if (value.address !== undefined && typeof value.address !== "string") {
    return c.json({ error: "Address must be a string" }, 400)
  }

  if (value.whatsapp !== undefined && typeof value.whatsapp !== "string") {
    return c.json({ error: "WhatsApp must be a string" }, 400)
  }

  if (value.phone !== undefined && typeof value.phone !== "string") {
    return c.json({ error: "Phone must be a string" }, 400)
  }

  if (value.email !== undefined && typeof value.email !== "string") {
    return c.json({ error: "Email must be a string" }, 400)
  }

  if (value.googleMapEmbedUrl !== undefined && typeof value.googleMapEmbedUrl !== "string") {
    return c.json({ error: "Google map embed URL must be a string" }, 400)
  }

  if (value.googleMapUrl !== undefined && typeof value.googleMapUrl !== "string") {
    return c.json({ error: "Google map URL must be a string" }, 400)
  }

  return value
}