import { Hono } from "hono"
import { validator } from "hono/validator"
import { getAllCompaniesHandler } from "../handlers/company/getAllCompaniesHandler"
import { getCompanyWithPagerHandler } from "../handlers/company/getCompanyWithPagerHandler"
import { getCompanyByIdHandler } from "../handlers/company/getCompanyByIdHandler"
import { createCompanyHandler } from "../handlers/company/createCompanyHandler"
import { updateCompanyHandler } from "../handlers/company/updateCompanyHandler"
import { deleteCompanyHandler } from "../handlers/company/deleteCompanyHandler"
import { companyValidator } from "../handlers/company/validator"

// Membuat router untuk company
export const companyRoutes = new Hono<{ Bindings: { KV: KVNamespace } }>()

// GET /api/company - Mendapatkan semua company
companyRoutes.get("/company", getAllCompaniesHandler)

// GET /api/company/pager - Mendapatkan company dengan pagination
companyRoutes.get("/company/pager", getCompanyWithPagerHandler)

// GET /api/company/:id - Mendapatkan company berdasarkan ID
companyRoutes.get("/company/:id", getCompanyByIdHandler)

// POST /api/company - Membuat company baru
companyRoutes.post(
  "/company",
  validator("json", companyValidator),
  createCompanyHandler
)

// PUT /api/company/:id - Memperbarui company
companyRoutes.put(
  "/company/:id",
  validator("json", companyValidator),
  updateCompanyHandler
)

// DELETE /api/company/:id - Menghapus company
companyRoutes.delete("/company/:id", deleteCompanyHandler)