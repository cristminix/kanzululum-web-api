import { Context } from "hono"

export const kegiatanValidator = (value: any, c: Context) => {
  // Validasi field yang diperlukan
  if (value.waktu !== undefined && typeof value.waktu !== "string") {
    return c.json({ error: "Waktu must be a string" }, 400)
  }

  if (value.kegiatan !== undefined && typeof value.kegiatan !== "string") {
    return c.json({ error: "Kegiatan must be a string" }, 400)
  }

  return value
}