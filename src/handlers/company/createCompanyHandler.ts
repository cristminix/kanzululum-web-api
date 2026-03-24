import { Context } from "hono"
import { createCompanyController } from "../../utils/controllerFactory"

export const createCompanyHandler = async (c: Context) => {
  try {
    const data = await c.req.json()
    const controller = createCompanyController(c.env.KV)
    const result = await controller.createCompany(data)
    return c.json(result, 201)
  } catch (error) {
    return c.json({ error: "Failed to create company" }, 500)
  }
}