import { Hono } from "hono"
import { KVService } from "../services/kvService"
import { ContactPersonController } from "../controllers/contactPersonController"
import { getContactPersonHandler } from "../handlers/contact-person/getContactPersonHandler"
import { updateContactPersonHandler } from "../handlers/contact-person/updateContactPersonHandler"

// Membuat router untuk contact person
export const contactPersonRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/contact-person - Mendapatkan data contact person
contactPersonRoutes.get("/contact-person", getContactPersonHandler)

// PUT /api/contact-person - Memperbarui data contact person
contactPersonRoutes.put("/contact-person", updateContactPersonHandler)