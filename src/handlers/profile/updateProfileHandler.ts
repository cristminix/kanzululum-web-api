import { Context } from "hono"
import { createProfileController } from "../../utils/controllerFactory"
import { profileValidator } from "./validator"

export const updateProfileHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const data = await c.req.json()

    // Validasi data
    const validationResult = profileValidator(data, c)
    if (validationResult instanceof Promise) {
      // Jika validator mengembalikan Promise, tunggu hasilnya
      await validationResult
    }

    const controller = createProfileController(c.env.KV)
    const result = await controller.updateProfile(id, data)

    if (!result) {
      return c.json({ error: "Profile not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid ID") {
        return c.json({ error: error.message }, 400)
      }
      if (
        error.message === "Image must be a valid URL" ||
        error.message === "Image URL must not exceed 500 characters"
      ) {
        return c.json({ error: error.message }, 400)
      }
    }
    return c.json({ error: "Failed to update profile" }, 500)
  }
}