import { Hono } from "hono"
import { getAllSocialNetworkLinksHandler } from "../handlers/social-network-links/getAllSocialNetworkLinksHandler"

// Membuat router untuk social network links
export const socialNetworkLinksRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/social-network-links - Mendapatkan semua social network links
socialNetworkLinksRoutes.get("/social-network-links", getAllSocialNetworkLinksHandler)