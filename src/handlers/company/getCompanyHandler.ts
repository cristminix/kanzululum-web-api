import { Context } from "hono"
import { createCompanyController } from "../../utils/controllerFactory"

export const getCompanyHandler = async (c: Context) => {
  try {
    const controller = createCompanyController(c.env.KV)
    const result = await controller.getCompany()
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to retrieve company" }, 500)
  }
}