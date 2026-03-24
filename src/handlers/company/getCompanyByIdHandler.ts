import { Context } from "hono"
import { createCompanyController } from "../../utils/controllerFactory"

export const getCompanyByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"))
    const controller = createCompanyController(c.env.KV)
    const company = await controller.getCompanyById(id)

    if (!company) {
      return c.json({ error: "Company not found" }, 404)
    }

    return c.json({ company })
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid ID") {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: "Failed to retrieve company" }, 500)
  }
}