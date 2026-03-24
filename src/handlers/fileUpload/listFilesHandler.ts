import { Context } from "hono"
import { createFileUploadController } from "../../utils/controllerFactory"

export const listFilesHandler = async (c: Context) => {
  try {
    const prefix = c.req.query("prefix")
    const controller = createFileUploadController(c.env.KV)
    const result = await controller.listFiles(prefix)
    return c.json({ files: result }, 200)
  } catch (error) {
    return c.json({ error: "Failed to list files" }, 500)
  }
}