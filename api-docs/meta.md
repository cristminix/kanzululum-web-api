# Meta API Documentation

Base URL: `/api/meta`

## Table of Contents

- [Get All Meta](#get-all-meta)
- [Get Meta with Pagination](#get-meta-with-pagination)
- [Get Meta by ID](#get-meta-by-id)
- [Create Meta](#create-meta)
- [Update Meta](#update-meta)
- [Delete Meta](#delete-meta)
- [Data Models](#data-models)
- [Error Responses](#error-responses)

---

## Get All Meta

Retrieve all meta records.

**Endpoint:** `GET /api/meta`

### Response

**Status:** `200 OK`

```json
{
  "meta": [
    {
      "id": 1711234567890,
      "title": "Galery Pondok Pesantren Kanzululum",
      "meta-description": "Galery Pondok Pesantren Kanzululum",
      "meta-keyword": "galery ponpes kanzul ulum",
      "dateCreated": "2026-11-11T08:00:00.000Z",
      "dateUpdated": "2026-11-11T08:00:00.000Z"
    }
  ]
}
```

---

## Get Meta with Pagination

Retrieve meta records with pagination.

**Endpoint:** `GET /api/meta/pager`

### Query Parameters

| Parameter | Type   | Required | Default | Description                          |
|-----------|--------|----------|---------|--------------------------------------|
| `page`    | number | No       | 1       | Page number (must be >= 1)           |
| `limit`   | number | No       | 10      | Items per page (between 1 and 100)   |

### Response

**Status:** `200 OK`

```json
{
  "meta": [
    {
      "id": 1711234567890,
      "title": "Galery Pondok Pesantren Kanzululum",
      "meta-description": "Galery Pondok Pesantren Kanzululum",
      "meta-keyword": "galery ponpes kanzul ulum",
      "dateCreated": "2026-11-11T08:00:00.000Z",
      "dateUpdated": "2026-11-11T08:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

---

## Get Meta by ID

Retrieve a single meta record by its ID.

**Endpoint:** `GET /api/meta/:id`

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `id`      | number | Yes      | Meta ID     |

### Response

**Status:** `200 OK`

```json
{
  "meta": {
    "id": 1711234567890,
    "title": "Galery Pondok Pesantren Kanzululum",
    "meta-description": "Galery Pondok Pesantren Kanzululum",
    "meta-keyword": "galery ponpes kanzul ulum",
    "dateCreated": "2026-11-11T08:00:00.000Z",
    "dateUpdated": "2026-11-11T08:00:00.000Z"
  }
}
```

---

## Create Meta

Create a new meta record.

**Endpoint:** `POST /api/meta`  
**Headers:**
- `Content-Type: application/json`
- `X-Api-Key: <api_key>` (required for write operations)

### Request Body

```json
{
  "title": "Galery Pondok Pesantren Kanzululum",
  "meta-description": "Galery Pondok Pesantren Kanzululum",
  "meta-keyword": "galery ponpes kanzul ulum"
}
```

### Response

**Status:** `201 Created`

```json
{
  "message": "Meta created successfully",
  "meta": {
    "id": 1711234567890,
    "title": "Galery Pondok Pesantren Kanzululum",
    "meta-description": "Galery Pondok Pesantren Kanzululum",
    "meta-keyword": "galery ponpes kanzul ulum",
    "dateCreated": "2026-11-11T08:00:00.000Z",
    "dateUpdated": "2026-11-11T08:00:00.000Z"
  }
}
```

---

## Update Meta

Update an existing meta record.

**Endpoint:** `PUT /api/meta/:id`  
**Headers:**
- `Content-Type: application/json`
- `X-Api-Key: <api_key>` (required for write operations)

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `id`      | number | Yes      | Meta ID     |

### Request Body

```json
{
  "title": "Galery Pondok Pesantren Kanzululum",
  "meta-description": "Galery Pondok Pesantren Kanzululum",
  "meta-keyword": "galery ponpes kanzul ulum"
}
```

### Response

**Status:** `200 OK`

```json
{
  "message": "Meta updated successfully",
  "meta": {
    "id": 1711234567890,
    "title": "Galery Pondok Pesantren Kanzululum",
    "meta-description": "Galery Pondok Pesantren Kanzululum",
    "meta-keyword": "galery ponpes kanzul ulum",
    "dateCreated": "2026-11-11T08:00:00.000Z",
    "dateUpdated": "2026-11-11T08:05:00.000Z"
  }
}
```

---

## Delete Meta

Delete a meta record by ID.

**Endpoint:** `DELETE /api/meta/:id`  
**Headers:**
- `X-Api-Key: <api_key>` (required for write operations)

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `id`      | number | Yes      | Meta ID     |

### Response

**Status:** `200 OK`

```json
{
  "id": 1711234567890,
  "message": "Meta deleted successfully"
}
```

---

## Data Models

### Meta

| Field              | Type              | Description                  |
|--------------------|-------------------|------------------------------|
| `id`               | number            | Timestamp-based unique ID    |
| `title`            | string            | Page or section title        |
| `meta-description` | string            | Meta description content     |
| `meta-keyword`     | string            | Meta keywords content        |
| `dateCreated`      | string (ISO date) | Creation timestamp           |
| `dateUpdated`      | string (ISO date) | Last update timestamp        |

---

## Error Responses

| Status Code | Message | Description |
|---|---|---|
| `400 Bad Request` | `{"error": "Title must be a string"}` | Validation failed |
| `400 Bad Request` | `{"error": "Meta-description must be a string"}` | Validation failed |
| `400 Bad Request` | `{"error": "Meta-keyword must be a string"}` | Validation failed |
| `400 Bad Request` | `{"error": "Invalid ID"}` | Path ID parameter is not numeric |
| `401 Unauthorized` | `{"error": "API key required"}` | Missing or invalid `X-Api-Key` header |
| `404 Not Found` | `{"error": "Meta not found"}` | Record does not exist |
| `500 Internal Server Error` | `{"error": "Failed to retrieve meta"}` | Server-side error |
