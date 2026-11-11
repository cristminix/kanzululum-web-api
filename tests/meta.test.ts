import { describe, it } from "node:test"
import assert from "node:assert/strict"
import app from "../src/index"
import { KVService } from "../src/services/kvService"
import { MetaController } from "../src/controllers/metaController"
import { metaValidator } from "../src/handlers/meta/validator"

// Mock KVNamespace for testing
class MockKV {
  private store = new Map<string, string>()

  async get(key: string): Promise<string | null> {
    return this.store.get(key) || null
  }

  async put(key: string, value: string): Promise<void> {
    this.store.set(key, value)
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key)
  }

  async list(): Promise<any> {
    return {
      keys: Array.from(this.store.keys()).map((name) => ({ name })),
    }
  }
}

describe("Meta Unit & Integration Tests", () => {
  describe("KVService operations", () => {
    it("should save and retrieve keys and meta", async () => {
      const mockKV = new MockKV()
      const kvService = new KVService(mockKV as any)

      // Test empty keys
      const initialKeys = await kvService.getAllMetaKeys()
      assert.deepEqual(initialKeys, [])

      // Save keys
      await kvService.saveMetaKeys([1, 2])
      const savedKeys = await kvService.getAllMetaKeys()
      assert.deepEqual(savedKeys, [1, 2])

      // Save meta
      const metaItem = {
        id: 1,
        title: "Galery Pondok Pesantren Kanzululum",
        "meta-description": "Galery Pondok Pesantren Kanzululum",
        "meta-keyword": "galery ponpes kanzul ulum",
      }
      await kvService.saveMetaById(1, JSON.stringify(metaItem))

      const fetchedStr = await kvService.getMetaById(1)
      assert.ok(fetchedStr)
      assert.deepEqual(JSON.parse(fetchedStr), metaItem)

      // Delete meta
      await kvService.deleteMetaById(1)
      const afterDelete = await kvService.getMetaById(1)
      assert.equal(afterDelete, null)
    })
  })

  describe("MetaController", () => {
    it("should perform full CRUD operations", async () => {
      const mockKV = new MockKV()
      const kvService = new KVService(mockKV as any)
      const controller = new MetaController(kvService)

      // Create
      const created = await controller.createMeta({
        title: "Galery Pondok Pesantren Kanzululum",
        "meta-description": "Galery Pondok Pesantren Kanzululum",
        "meta-keyword": "galery ponpes kanzul ulum",
      })

      assert.equal(created.message, "Meta created successfully")
      assert.ok(created.meta.id)
      assert.equal(created.meta.title, "Galery Pondok Pesantren Kanzululum")
      assert.equal(
        created.meta["meta-description"],
        "Galery Pondok Pesantren Kanzululum"
      )
      assert.equal(created.meta["meta-keyword"], "galery ponpes kanzul ulum")

      const id = created.meta.id!

      // Get All
      const all = await controller.getAllMeta()
      assert.equal(all.meta.length, 1)
      assert.equal(all.meta[0].id, id)

      // Get with Pager
      const paged = await controller.getMetaWithPager(1, 10)
      assert.equal(paged.meta.length, 1)
      assert.equal(paged.pagination.total, 1)
      assert.equal(paged.pagination.page, 1)

      // Get by ID
      const found = await controller.getMetaById(id)
      assert.ok(found)
      assert.equal(found?.id, id)

      // Update
      const updated = await controller.updateMeta(id, {
        title: "Updated Galery Pondok Pesantren Kanzululum",
        "meta-description": "Updated description",
      })
      assert.ok(updated)
      assert.equal(
        updated?.meta.title,
        "Updated Galery Pondok Pesantren Kanzululum"
      )
      assert.equal(updated?.meta["meta-description"], "Updated description")
      assert.equal(updated?.meta["meta-keyword"], "galery ponpes kanzul ulum")

      // Delete
      const deleted = await controller.deleteMeta(id)
      assert.ok(deleted)
      assert.equal(deleted?.id, id)

      // Verify deletion
      const notFound = await controller.getMetaById(id)
      assert.equal(notFound, null)
    })

    it("should handle invalid parameters gracefully", async () => {
      const mockKV = new MockKV()
      const kvService = new KVService(mockKV as any)
      const controller = new MetaController(kvService)

      await assert.rejects(
        async () => {
          await controller.getMetaWithPager(0, 10)
        },
        { message: "Page must be a positive integer" }
      )

      await assert.rejects(
        async () => {
          await controller.getMetaWithPager(1, 101)
        },
        { message: "Limit must be between 1 and 100" }
      )

      await assert.rejects(
        async () => {
          await controller.getMetaById(NaN)
        },
        { message: "Invalid ID" }
      )
    })
  })

  describe("Validator tests", () => {
    it("should validate title, meta-description, and meta-keyword types", () => {
      let errorResponse: any = null
      const fakeContext: any = {
        json: (data: any, status: number) => {
          errorResponse = { data, status }
          return errorResponse
        },
      }

      // Invalid title
      metaValidator({ title: 123 }, fakeContext)
      assert.deepEqual(errorResponse, {
        data: { error: "Title must be a string" },
        status: 400,
      })

      // Invalid meta-description
      errorResponse = null
      metaValidator({ "meta-description": 123 }, fakeContext)
      assert.deepEqual(errorResponse, {
        data: { error: "Meta-description must be a string" },
        status: 400,
      })

      // Invalid meta-keyword
      errorResponse = null
      metaValidator({ "meta-keyword": 123 }, fakeContext)
      assert.deepEqual(errorResponse, {
        data: { error: "Meta-keyword must be a string" },
        status: 400,
      })

      // Valid object
      errorResponse = null
      const valid = metaValidator(
        {
          title: "Galery Pondok Pesantren Kanzululum",
          "meta-description": "Galery Pondok Pesantren Kanzululum",
          "meta-keyword": "galery ponpes kanzul ulum",
        },
        fakeContext
      )
      assert.equal(errorResponse, null)
      assert.equal(valid.title, "Galery Pondok Pesantren Kanzululum")
    })
  })

  describe("HTTP API Route integration with Hono app", () => {
    const mockKV = new MockKV()
    const env = {
      KV: mockKV as any,
      API_KEY: "test-secret-key",
      ALLOWED_ORIGINS: "*",
    }

    it("should reject POST without API key with 401", async () => {
      const res = await app.request(
        "http://localhost:8787/api/meta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: "Test" }),
        },
        env
      )
      assert.equal(res.status, 401)
    })

    it("should create, read, update, and delete meta with valid API key", async () => {
      const payload = {
        title: "Galery Pondok Pesantren Kanzululum",
        "meta-description": "Galery Pondok Pesantren Kanzululum",
        "meta-keyword": "galery ponpes kanzul ulum",
      }

      const res = await app.request(
        "http://localhost:8787/api/meta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "test-secret-key",
          },
          body: JSON.stringify(payload),
        },
        env
      )

      assert.equal(res.status, 201)
      const data: any = await res.json()
      assert.equal(data.message, "Meta created successfully")
      assert.equal(data.meta.title, payload.title)
      assert.equal(data.meta["meta-description"], payload["meta-description"])
      assert.equal(data.meta["meta-keyword"], payload["meta-keyword"])
      assert.ok(data.meta.id)

      const createdId = data.meta.id

      // Test GET /api/meta
      const getRes = await app.request(
        "http://localhost:8787/api/meta",
        { method: "GET" },
        env
      )
      assert.equal(getRes.status, 200)
      const getData: any = await getRes.json()
      assert.ok(Array.isArray(getData.meta))
      assert.equal(getData.meta.length, 1)

      // Test GET /api/meta/pager
      const pagerRes = await app.request(
        "http://localhost:8787/api/meta/pager?page=1&limit=5",
        { method: "GET" },
        env
      )
      assert.equal(pagerRes.status, 200)
      const pagerData: any = await pagerRes.json()
      assert.equal(pagerData.pagination.total, 1)

      // Test GET /api/meta/:id
      const getByIdRes = await app.request(
        `http://localhost:8787/api/meta/${createdId}`,
        { method: "GET" },
        env
      )
      assert.equal(getByIdRes.status, 200)
      const getByIdData: any = await getByIdRes.json()
      assert.equal(getByIdData.meta.id, createdId)

      // Test PUT /api/meta/:id
      const putRes = await app.request(
        `http://localhost:8787/api/meta/${createdId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "test-secret-key",
          },
          body: JSON.stringify({ title: "Updated Title" }),
        },
        env
      )
      assert.equal(putRes.status, 200)
      const putData: any = await putRes.json()
      assert.equal(putData.meta.title, "Updated Title")

      // Test DELETE /api/meta/:id
      const delRes = await app.request(
        `http://localhost:8787/api/meta/${createdId}`,
        {
          method: "DELETE",
          headers: {
            "X-Api-Key": "test-secret-key",
          },
        },
        env
      )
      assert.equal(delRes.status, 200)

      // Confirm 404 after deletion
      const getAfterDel = await app.request(
        `http://localhost:8787/api/meta/${createdId}`,
        { method: "GET" },
        env
      )
      assert.equal(getAfterDel.status, 404)
    })
  })
})
