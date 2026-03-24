// Interface for file upload data
export interface FileUpload {
  id: string
  filename: string
  content: string
  contentType: string
  uploadedAt: string
  size: number
}

export interface FileUploadRequest {
  filename: string
  content: string
  contentType?: string
}