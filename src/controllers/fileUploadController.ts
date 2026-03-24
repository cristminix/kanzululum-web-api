import { FileUpload, FileUploadRequest } from "../models/fileUpload"
import {
  FileUploadService,
  createFileUploadService,
} from "../services/FileUploadService"

export class FileUploadController {
  private fileUploadService: FileUploadService

  constructor(kvNamespace: KVNamespace) {
    this.fileUploadService = createFileUploadService(kvNamespace)
  }

  // POST /api/files - Upload a file
  async uploadFile(
    data: FileUploadRequest,
  ): Promise<{ success: boolean; fileId?: string; error?: string }> {
    return this.fileUploadService.uploadFile({ body: data })
  }

  // GET /api/files/:id - Get a file by ID
  async getFile(fileId: string): Promise<FileUpload | null> {
    return this.fileUploadService.getFile(fileId)
  }

  // DELETE /api/files/:id - Delete a file
  async deleteFile(fileId: string): Promise<{ success: boolean; message: string }> {
    const result = await this.fileUploadService.deleteFile(fileId)
    if (result) {
      return { success: true, message: "File deleted successfully" }
    }
    return { success: false, message: "Failed to delete file" }
  }

  // GET /api/files - List all files
  async listFiles(
    prefix?: string,
  ): Promise<Array<{ id: string; filename: string; uploadedAt: string }>> {
    return this.fileUploadService.listFiles(prefix)
  }
}