import { Context } from "hono"
import { createFileUploadController } from "../../utils/controllerFactory"
import { FileUploadRequest } from "../../models/fileUpload"

export const uploadFileHandler = async (c: Context) => {
  try {
    const data = c.req.valid("json") as FileUploadRequest
    const controller = createFileUploadController(c.env.KV)
    const result = await controller.uploadFile(data)

    if (result.success) {
      return c.json(result, 201)
    }
    return c.json(result, 400)
  } catch (error) {
    return c.json({ success: false, error: "Failed to upload file" }, 500)
  }
}