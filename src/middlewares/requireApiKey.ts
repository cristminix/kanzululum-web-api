import { MiddlewareHandler } from "hono"
import { Env } from "../types/Env"

const WRITE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"])

function keysMatch(provided: string, expected: string): boolean {
  const encoder = new TextEncoder()
  const left = encoder.encode(provided)
  const right = encoder.encode(expected)
  const length = Math.max(left.length, right.length)
  let diff = left.length ^ right.length
  for (let i = 0; i < length; i++) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0)
  }
  return diff === 0 && left.length > 0
}

export const requireApiKey: MiddlewareHandler<{ Bindings: Env }> = async (
  c,
  next
) => {
  if (!WRITE_METHODS.has(c.req.method)) {
    await next()
    return
  }

  const provided = c.req.header("x-api-key") ?? ""
  const expected = c.env.API_KEY ?? ""
  if (!keysMatch(provided, expected)) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  await next()
}
