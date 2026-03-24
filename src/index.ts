import { Hono } from "hono"
import { cors } from "hono/cors"
import { beritaRoutes } from "./routes/beritaRoutes"
import { dataRoutes } from "./routes/dataRoutes"
import { produkRoutes } from "./routes/produkRoutes"
import { templateRoutes } from "./routes/templateRoutes"
import { companyRoutes } from "./routes/companyRoutes"
import { contactPersonRoutes } from "./routes/contactPersonRoutes"
import { bannerRoutes } from "./routes/bannerRoutes"
import { galeryRoutes } from "./routes/galeryRoutes"
import { heroRoutes } from "./routes/heroRoutes"
import { kegiatanRoutes } from "./routes/kegiatanRoutes"
import { lembagaRoutes } from "./routes/lembagaRoutes"
import { syaratPendaftaranRoutes } from "./routes/syaratPendaftaranRoutes"
import { biayaPendaftaranRoutes } from "./routes/biayaPendaftaranRoutes"
import { profileRoutes } from "./routes/profileRoutes"
import { socialNetworkLinksRoutes } from "./routes/socialNetworkLinksRoutes"
import { webNavigationRoutes } from "./routes/webNavigationRoutes"
import { fileUploadRoutes } from "./routes/fileUploadRoutes"

// Inisialisasi aplikasi Hono
const app = new Hono<{ Bindings: { KV: KVNamespace } }>()

// Middleware CORS
app.use("*", cors())

// Middleware untuk logging
app.use("*", async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  await next()
})

// Route untuk halaman utama
app.get("/", (c) => {
  return c.json({
    message: "Welcome to Cloudflare KV REST API",
    timestamp: new Date().toISOString(),
  })
})

// Route untuk health check
app.get("/health", (c) => {
  return c.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Mount routes
app.route("/api", dataRoutes)
app.route("/api", beritaRoutes)
app.route("/api", produkRoutes)
app.route("/api", templateRoutes)
app.route("/api", companyRoutes)
app.route("/api", contactPersonRoutes)
app.route("/api", bannerRoutes)
app.route("/api", galeryRoutes)
app.route("/api", heroRoutes)
app.route("/api", kegiatanRoutes)
app.route("/api", lembagaRoutes)
app.route("/api", syaratPendaftaranRoutes)
app.route("/api", biayaPendaftaranRoutes)
app.route("/api", profileRoutes)
app.route("/api", socialNetworkLinksRoutes)
app.route("/api", webNavigationRoutes)
app.route("/api", fileUploadRoutes)

// Error handling middleware
app.onError((err, c) => {
  console.error(`${err}`)
  return c.json({ error: "Internal Server Error" }, 500)
})

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Route not found" }, 404)
})

export default app
