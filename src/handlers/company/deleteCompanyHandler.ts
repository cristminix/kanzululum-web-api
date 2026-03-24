import { Context } from "hono"
import { createCompanyController } from "../../utils/controllerFactory"

export const deleteCompanyHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createCompanyController(c.env.KV)
    const result = await controller.deleteCompany(id)

    if (!result) {
      return c.json({ error: "Company not found" }, 404)
    }

    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to delete company" }, 500)
  }
}