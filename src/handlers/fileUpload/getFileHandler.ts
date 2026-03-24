import { Context } from "hono"
import { createFileUploadController } from "../../utils/controllerFactory"

export const getFileHandler = async (c: Context) => {
  try {
    const fileId = c.req.param("id")
    const preview = c.req.query("preview") === "true"
    const controller = createFileUploadController(c.env.KV)
    const result = await controller.getFile(fileId)

    if (!result) {
      return c.json({ error: "File not found" }, 404)
    }

    // If preview=true and content type is an image, return raw image
    if (preview && result.contentType.startsWith("image/")) {
      const binaryString = atob(result.content)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      return new Response(bytes, {
        headers: {
          "Content-Type": result.contentType,
          "Cache-Control": "public, max-age=31536000",
        },
      })
    }

    return c.json(result, 200)
  } catch (error) {
    return c.json({ error: "Failed to retrieve file" }, 500)
  }
}