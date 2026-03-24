import { Context } from "hono"
import { createCompanyController } from "../../utils/controllerFactory"

export const updateCompanyHandler = async (c: Context) => {
  try {
    const controller = createCompanyController(c.env.KV)
    const data = await c.req.json()
    const result = await controller.updateCompany(data)
    return c.json(result)
  } catch (error) {
    return c.json({ error: "Failed to update company" }, 500)
  }
}