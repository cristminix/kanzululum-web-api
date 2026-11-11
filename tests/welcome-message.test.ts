import { describe, it } from "node:test"
import assert from "node:assert/strict"
import app from "../src/index"
import { KVService } from "../src/services/kvService"
import { WelcomeMessageController } from "../src/controllers/welcomeMessageController"
import { welcomeMessageValidator } from "../src/handlers/welcome-message/validator"

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

describe("Welcome Message Unit & Integration Tests", () => {
  describe("KVService operations", () => {
    it("should save and retrieve keys and welcome message", async () => {
      const mockKV = new MockKV()
      const kvService = new KVService(mockKV as any)

      // Test empty keys
      const initialKeys = await kvService.getAllWelcomeMessageKeys()
      assert.deepEqual(initialKeys, [])

      // Save keys
      await kvService.saveWelcomeMessageKeys([1, 2])
      const savedKeys = await kvService.getAllWelcomeMessageKeys()
      assert.deepEqual(savedKeys, [1, 2])

      // Save welcome message
      const msg = {
        id: 1,
        title: "Test Title",
        content: [{ id: "1", type: "paragraph", data: { text: "Hello" } }],
      }
      await kvService.saveWelcomeMessageById(1, JSON.stringify(msg))

      const fetchedStr = await kvService.getWelcomeMessageById(1)
      assert.ok(fetchedStr)
      assert.deepEqual(JSON.parse(fetchedStr), msg)

      // Delete welcome message
      await kvService.deleteWelcomeMessageById(1)
      const afterDelete = await kvService.getWelcomeMessageById(1)
      assert.equal(afterDelete, null)
    })
  })

  describe("WelcomeMessageController", () => {
    it("should perform full CRUD operations", async () => {
      const mockKV = new MockKV()
      const kvService = new KVService(mockKV as any)
      const controller = new WelcomeMessageController(kvService)

      // Create
      const created = await controller.createWelcomeMessage({
        title: "Selamat Datang di Pondok Pesantren Kanzululum Cirebon",
        content: [
          {
            id: "42EhpkWXEQ",
            type: "paragraph",
            data: {
              text: "Kami berkomitmen untuk memberikan pendidikan Al-Quran...",
            },
          },
        ],
      })

      assert.equal(created.message, "Welcome message created successfully")
      assert.ok(created.welcomeMessage.id)
      assert.equal(created.welcomeMessage.title, "Selamat Datang di Pondok Pesantren Kanzululum Cirebon")

      const id = created.welcomeMessage.id!

      // Get All
      const all = await controller.getAllWelcomeMessage()
      assert.equal(all.welcomeMessage.length, 1)
      assert.equal(all.welcomeMessage[0].id, id)

      // Get with Pager
      const paged = await controller.getWelcomeMessageWithPager(1, 10)
      assert.equal(paged.welcomeMessage.length, 1)
      assert.equal(paged.pagination.total, 1)
      assert.equal(paged.pagination.page, 1)

      // Get by ID
      const found = await controller.getWelcomeMessageById(id)
      assert.ok(found)
      assert.equal(found?.id, id)

      // Update
      const updated = await controller.updateWelcomeMessage(id, {
        title: "Updated Title",
      })
      assert.ok(updated)
      assert.equal(updated?.welcomeMessage.title, "Updated Title")

      // Delete
      const deleted = await controller.deleteWelcomeMessage(id)
      assert.ok(deleted)
      assert.equal(deleted?.id, id)

      // Verify deletion
      const notFound = await controller.getWelcomeMessageById(id)
      assert.equal(notFound, null)
    })

    it("should handle invalid parameters gracefully", async () => {
      const mockKV = new MockKV()
      const kvService = new KVService(mockKV as any)
      const controller = new WelcomeMessageController(kvService)

      await assert.rejects(
        async () => {
          await controller.getWelcomeMessageWithPager(0, 10)
        },
        { message: "Page must be a positive integer" }
      )

      await assert.rejects(
        async () => {
          await controller.getWelcomeMessageWithPager(1, 101)
        },
        { message: "Limit must be between 1 and 100" }
      )

      await assert.rejects(
        async () => {
          await controller.getWelcomeMessageById(NaN)
        },
        { message: "Invalid ID" }
      )
    })
  })

  describe("Validator tests", () => {
    it("should validate title and content types", () => {
      let errorResponse: any = null
      const fakeContext: any = {
        json: (data: any, status: number) => {
          errorResponse = { data, status }
          return errorResponse
        },
      }

      // Invalid title
      welcomeMessageValidator({ title: 123 }, fakeContext)
      assert.deepEqual(errorResponse, {
        data: { error: "Title must be a string" },
        status: 400,
      })

      // Invalid content
      errorResponse = null
      welcomeMessageValidator({ content: 123 }, fakeContext)
      assert.deepEqual(errorResponse, {
        data: { error: "Content must be an array or string" },
        status: 400,
      })

      // Valid object
      errorResponse = null
      const valid = welcomeMessageValidator(
        { title: "Valid Title", content: [] },
        fakeContext
      )
      assert.equal(errorResponse, null)
      assert.equal(valid.title, "Valid Title")
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
        "http://localhost:8787/api/welcome-message",
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

    it("should create welcome message with valid API key", async () => {
      const payload = {
        title: "Selamat Datang di Pondok Pesantren Kanzululum Cirebon",
        content: [
          {
            id: "42EhpkWXEQ",
            type: "paragraph",
            data: {
              text: "Kami berkomitmen untuk memberikan pendidikan Al-Quran yang berkualitas...",
            },
          },
        ],
      }

      const res = await app.request(
        "http://localhost:8787/api/welcome-message",
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
      assert.equal(data.message, "Welcome message created successfully")
      assert.equal(data.welcomeMessage.title, payload.title)
      assert.ok(data.welcomeMessage.id)

      const createdId = data.welcomeMessage.id

      // Test GET /api/welcome-message
      const getRes = await app.request(
        "http://localhost:8787/api/welcome-message",
        { method: "GET" },
        env
      )
      assert.equal(getRes.status, 200)
      const getData: any = await getRes.json()
      assert.ok(Array.isArray(getData.welcomeMessage))
      assert.equal(getData.welcomeMessage.length, 1)

      // Test GET /api/welcome-message/pager
      const pagerRes = await app.request(
        "http://localhost:8787/api/welcome-message/pager?page=1&limit=5",
        { method: "GET" },
        env
      )
      assert.equal(pagerRes.status, 200)
      const pagerData: any = await pagerRes.json()
      assert.equal(pagerData.pagination.total, 1)

      // Test GET /api/welcome-message/:id
      const getByIdRes = await app.request(
        `http://localhost:8787/api/welcome-message/${createdId}`,
        { method: "GET" },
        env
      )
      assert.equal(getByIdRes.status, 200)
      const getByIdData: any = await getByIdRes.json()
      assert.equal(getByIdData.welcomeMessage.id, createdId)

      // Test PUT /api/welcome-message/:id
      const putRes = await app.request(
        `http://localhost:8787/api/welcome-message/${createdId}`,
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
      assert.equal(putData.welcomeMessage.title, "Updated Title")

      // Test DELETE /api/welcome-message/:id
      const delRes = await app.request(
        `http://localhost:8787/api/welcome-message/${createdId}`,
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
        `http://localhost:8787/api/welcome-message/${createdId}`,
        { method: "GET" },
        env
      )
      assert.equal(getAfterDel.status, 404)
    })
  })
})
