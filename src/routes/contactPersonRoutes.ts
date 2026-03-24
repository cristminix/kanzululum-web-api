import { Hono } from "hono"
import { validator } from "hono/validator"
import { KVService } from "../services/kvService"
import { ContactPersonController } from "../controllers/contactPersonController"
import { getAllContactPersonHandler } from "../handlers/contact-person/getAllContactPersonHandler"
import { getContactPersonWithPagerHandler } from "../handlers/contact-person/getContactPersonWithPagerHandler"
import { getContactPersonByIdHandler } from "../handlers/contact-person/getContactPersonByIdHandler"
import { createContactPersonHandler } from "../handlers/contact-person/createContactPersonHandler"
import { updateContactPersonHandler } from "../handlers/contact-person/updateContactPersonHandler"
import { deleteContactPersonHandler } from "../handlers/contact-person/deleteContactPersonHandler"
import { contactPersonValidator } from "../handlers/contact-person/validator"

// Membuat router untuk contact person
export const contactPersonRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/contact-person - Mendapatkan semua contact person
contactPersonRoutes.get("/contact-person", getAllContactPersonHandler)

// GET /api/contact-person/pager - Mendapatkan contact person dengan pagination
contactPersonRoutes.get("/contact-person/pager", getContactPersonWithPagerHandler)

// GET /api/contact-person/:id - Mendapatkan contact person berdasarkan ID
contactPersonRoutes.get("/contact-person/:id", getContactPersonByIdHandler)

// POST /api/contact-person - Membuat contact person baru
contactPersonRoutes.post(
  "/contact-person",
  validator("json", contactPersonValidator),
  createContactPersonHandler
)

// PUT /api/contact-person/:id - Memperbarui contact person
contactPersonRoutes.put(
  "/contact-person/:id",
  validator("json", contactPersonValidator),
  updateContactPersonHandler
)

// DELETE /api/contact-person/:id - Menghapus contact person
contactPersonRoutes.delete("/contact-person/:id", deleteContactPersonHandler)