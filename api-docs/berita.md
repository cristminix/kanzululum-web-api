# Berita API Documentation

Base URL: `/api/berita`

## Table of Contents

- [Get All Berita](#get-all-berita)
- [Get Berita with Pagination](#get-berita-with-pagination)
- [Get Berita by ID](#get-berita-by-id)
- [Create Berita](#create-berita)
- [Update Berita](#update-berita)
- [Delete Berita](#delete-berita)
- [Data Models](#data-models)
- [Error Responses](#error-responses)

---

## Get All Berita

Retrieve all berita records.

**Endpoint:** `GET /api/berita`

### Response

**Status:** `200 OK`

```json
{
  "berita": [
    {
      "id": 1711234567890,
      "title": "Sample Berita Title",
      "tags": "news,update",
      "author": "John Doe",
      "headline": "Short headline",
      "cover": "sample_image_jpg_1711234567890_abc123",
      "content": "Full content here...",
      "compiledHash": "abc123",
      "compiledPath": "/compiled/abc123",
      "dateCreated": "2024-01-15T10:30:00.000Z",
      "dateUpdated": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## Get Berita with Pagination

Retrieve berita records with pagination and optional filtering.

**Endpoint:** `GET /api/berita/pager`

### Query Parameters

| Parameter | Type   | Required | Default | Description                          |
|-----------|--------|----------|---------|--------------------------------------|
| `page`    | number | No       | 1       | Page number (must be >= 1)          |
| `limit`   | number | No       | 10      | Items per page (1-100)              |
| `category`| string | No       | -       | Filter by category (matches tags)   |
| `author`  | string | No       | -       | Filter by author name               |

### Example Request

```
GET /api/berita/pager?page=1&limit=10&category=news&author=John%20Doe
```

### Response

**Status:** `200 OK`

```json
{
  "berita": [
    {
      "id": 1711234567890,
      "title": "Sample Berita Title",
      "tags": "news,update",
      "author": "John Doe",
      "headline": "Short headline",
      "cover": "sample_image_jpg_1711234567890_abc123",
      "content": "Full content here...",
      "compiledHash": "abc123",
      "compiledPath": "/compiled/abc123",
      "dateCreated": "2024-01-15T10:30:00.000Z",
      "dateUpdated": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Error Response

**Status:** `400 Bad Request`

```json
{
  "error": "Page must be a positive integer"
}
```

```json
{
  "error": "Limit must be between 1 and 100"
}
```

---

## Get Berita by ID

Retrieve a single berita record by its ID.

**Endpoint:** `GET /api/berita/:id`

### Path Parameters

| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| `id`      | number | Yes      | Berita ID            |

### Example Request

```
GET /api/berita/1711234567890
```

### Response

**Status:** `200 OK`

```json
{
  "id": 1711234567890,
  "title": "Sample Berita Title",
  "tags": "news,update",
  "author": "John Doe",
  "headline": "Short headline",
  "cover": "sample_image_jpg_1711234567890_abc123",
  "content": "Full content here...",
  "compiledHash": "abc123",
  "compiledPath": "/compiled/abc123",
  "dateCreated": "2024-01-15T10:30:00.000Z",
  "dateUpdated": "2024-01-15T10:30:00.000Z"
}
```

### Error Response

**Status:** `404 Not Found`

```json
{
  "error": "Berita not found"
}
```

---

## Create Berita

Create a new berita record.

**Endpoint:** `POST /api/berita`

### Request Body

```json
{
  "title": "New Berita Title",
  "tags": "news,featured",
  "author": "Jane Doe",
  "headline": "Brief headline",
  "cover": "sample_image_jpg_1711234567890_abc123",
  "content": "Article content...",
  "compiledHash": "def456",
  "compiledPath": "/compiled/def456"
}
```

### Request Fields

| Field         | Type            | Required | Description                              |
|---------------|-----------------|----------|------------------------------------------|
| `title`       | string          | No       | Berita title                             |
| `tags`        | string          | No       | Comma-separated tags                     |
| `author`      | string          | No       | Author name                              |
| `headline`    | string          | No       | Short headline/summary                   |
| `cover`       | string          | No       | Cover image fileId (reference to uploaded file)    |
| `content`     | string \| array | No       | Article content                          |
| `compiledHash`| string          | No       | Hash of compiled content                 |
| `compiledPath`| string          | No       | Path to compiled content                 |

### Response

**Status:** `200 OK`

```json
{
  "message": "Berita created successfully",
  "berita": {
    "id": 1711234567890,
    "title": "New Berita Title",
    "tags": "news,featured",
    "author": "Jane Doe",
    "headline": "Brief headline",
    "cover": "sample_image_jpg_1711234567890_abc123",
    "content": "Article content...",
    "compiledHash": "def456",
    "compiledPath": "/compiled/def456",
    "dateCreated": "2024-01-15T10:30:00.000Z",
    "dateUpdated": "2024-01-15T10:30:00.000Z"
  }
}
```

### Error Response

**Status:** `400 Bad Request`

```json
{
  "error": "Title must be a string"
}
```

---

## Update Berita

Update an existing berita record.

**Endpoint:** `PUT /api/berita/:id`

### Path Parameters

| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| `id`      | number | Yes      | Berita ID            |

### Request Body

```json
{
  "title": "Updated Title",
  "tags": "news,updated",
  "author": "Jane Doe",
  "headline": "Updated headline",
  "cover": "https://example.com/new-cover.jpg",
  "content": "Updated content...",
  "compiledHash": "ghi789",
  "compiledPath": "/compiled/ghi789"
}
```

All fields are optional; only provided fields will be updated.

### Response

**Status:** `200 OK`

```json
{
  "message": "Berita updated successfully",
  "berita": {
    "id": 1711234567890,
    "title": "Updated Title",
    "tags": "news,updated",
    "author": "Jane Doe",
    "headline": "Updated headline",
    "cover": "https://example.com/new-cover.jpg",
    "content": "Updated content...",
    "compiledHash": "ghi789",
    "compiledPath": "/compiled/ghi789",
    "dateCreated": "2024-01-15T10:30:00.000Z",
    "dateUpdated": "2024-01-15T14:20:00.000Z"
  }
}
```

### Error Response

**Status:** `400 Bad Request`

```json
{
  "error": "Invalid ID"
}
```

**Status:** `404 Not Found`

```json
{
  "error": "Berita not found"
}
```

---

## Delete Berita

Delete a berita record by ID.

**Endpoint:** `DELETE /api/berita/:id`

### Path Parameters

| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| `id`      | number | Yes      | Berita ID            |

### Example Request

```
DELETE /api/berita/1711234567890
```

### Response

**Status:** `200 OK`

```json
{
  "message": "Berita deleted successfully"
}
```

### Error Response

**Status:** `404 Not Found`

```json
{
  "error": "Berita not found"
}
```

---

## Data Models

### Berita

```typescript
interface Berita {
  id?: number           // Auto-generated timestamp-based ID
  title?: string        // Article title
  tags?: string         // Comma-separated tags for categorization
  author?: string       // Author name
  headline?: string     // Short summary/headline
  cover?: string        // Cover image fileId (reference to uploaded file)
  coverUrl?: string     // Alternative cover URL field
  content?: string | any[]  // Article content (string or structured array)
  compiledHash?: string // Hash of compiled content
  compiledPath?: string // Path to compiled content file
  dateCreated?: string  // ISO 8601 timestamp
  dateUpdated?: string  // ISO 8601 timestamp (auto-updated on modify)
}
```

### Pagination Response

```typescript
interface PaginationInfo {
  page: number       // Current page number
  limit: number      // Items per page
  total: number      // Total items matching query
  totalPages: number // Total pages available
  hasNext: boolean   // Has next page
  hasPrev: boolean   // Has previous page
}
```

---

## Error Responses

### Common Error Format

```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes

| Status Code | Description                              |
|-------------|------------------------------------------|
| 200         | Success                                  |
| 400         | Bad Request - Invalid input/parameters   |
| 404         | Not Found - Resource does not exist      |
| 500         | Internal Server Error                    |

### Validation Errors

| Field         | Error Message                            |
|---------------|------------------------------------------|
| `title`       | "Title must be a string"                 |
| `tags`        | "Tags must be a string"                  |
| `author`      | "Author must be a string"                |
| `headline`    | "Headline must be a string"              |
| `cover`       | "Cover must be a string"                 |
| `content`     | "Content must be a string"               |
| `compiledHash`| "CompiledHash must be a string"          |
| `compiledPath`| "CompiledPath must be a string"          |
| `page`        | "Page must be a positive integer"        |
| `limit`       | "Limit must be between 1 and 100"        |