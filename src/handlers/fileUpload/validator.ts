import { validator } from "hono/validator"
import { FileUploadRequest } from "../../models/fileUpload"

// Validator for file upload
export const fileUploadValidator = validator("json", (value, c) => {
  const body = value as Partial<FileUploadRequest>

  if (!body.filename || !body.content) {
    return c.json({ success: false, error: "Filename and content are required" }, 400)
  }

  return body as FileUploadRequest
})