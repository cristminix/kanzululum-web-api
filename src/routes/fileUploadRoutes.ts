import { Hono } from "hono"
import { uploadFileHandler } from "../handlers/fileUpload/uploadFileHandler"
import { getFileHandler } from "../handlers/fileUpload/getFileHandler"
import { deleteFileHandler } from "../handlers/fileUpload/deleteFileHandler"
import { listFilesHandler } from "../handlers/fileUpload/listFilesHandler"
import { fileUploadValidator } from "../handlers/fileUpload/validator"

// Create router for file upload
export const fileUploadRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/files - List all files
fileUploadRoutes.get("/files", listFilesHandler)

// GET /api/files/:id - Get file by ID
fileUploadRoutes.get("/files/:id", getFileHandler)

// POST /api/files - Upload a new file
fileUploadRoutes.post("/files", fileUploadValidator, uploadFileHandler)

// DELETE /api/files/:id - Delete a file
fileUploadRoutes.delete("/files/:id", deleteFileHandler)