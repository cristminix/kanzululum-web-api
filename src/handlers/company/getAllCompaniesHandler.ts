import { Context } from "hono"
import { createCompanyController } from "../../utils/controllerFactory"

export const getAllCompaniesHandler = async (c: Context) => {
  try {
    const controller = createCompanyController(c.env.KV)
    const result = await controller.getAllCompanies()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve companies" }, 500)
  }
}