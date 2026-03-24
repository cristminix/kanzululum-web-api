import { Context } from "hono"
import { createFileUploadController } from "../../utils/controllerFactory"

export const deleteFileHandler = async (c: Context) => {
  try {
    const fileId = c.req.param("id")
    const controller = createFileUploadController(c.env.KV)
    const result = await controller.deleteFile(fileId)

    if (result.success) {
      return c.json(result, 200)
    }
    return c.json(result, 400)
  } catch (error) {
    return c.json({ success: false, error: "Failed to delete file" }, 500)
  }
}