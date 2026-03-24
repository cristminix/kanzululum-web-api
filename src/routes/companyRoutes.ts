import { Hono } from "hono"
import { KVService } from "../services/kvService"
import { CompanyController } from "../controllers/companyController"
import { getCompanyHandler } from "../handlers/company/getCompanyHandler"
import { updateCompanyHandler } from "../handlers/company/updateCompanyHandler"

// Membuat router untuk company
export const companyRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/company - Mendapatkan data company
companyRoutes.get("/company", getCompanyHandler)

// PUT /api/company - Memperbarui data company
companyRoutes.put("/company", updateCompanyHandler)