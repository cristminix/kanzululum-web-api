# Welcome Message API Documentation

Base URL: `/api/welcome-message`

## Table of Contents

- [Get All Welcome Message](#get-all-welcome-message)
- [Get Welcome Message with Pagination](#get-welcome-message-with-pagination)
- [Get Welcome Message by ID](#get-welcome-message-by-id)
- [Create Welcome Message](#create-welcome-message)
- [Update Welcome Message](#update-welcome-message)
- [Delete Welcome Message](#delete-welcome-message)
- [Data Models](#data-models)
- [Error Responses](#error-responses)

---

## Get All Welcome Message

Retrieve all welcome message records.

**Endpoint:** `GET /api/welcome-message`

### Response

**Status:** `200 OK`

```json
{
  "welcomeMessage": [
    {
      "id": 1711234567890,
      "title": "Selamat Datang di Pondok Pesantren Kanzululum Cirebon",
      "content": [
        {
          "id": "42EhpkWXEQ",
          "type": "paragraph",
          "data": {
            "text": "Kami berkomitmen untuk memberikan pendidikan Al-Quran yang berkualitas, mengembangkan sektor pertanian, perkebunan, dan peternakan, serta menyediakan pengajaran holistik yang menggabungkan pendidikan agama dan umum. Selamat bergabung dengan kami dalam mencapai tujuan mulia kami."
          }
        }
      ],
      "dateCreated": "2026-11-11T08:00:00.000Z",
      "dateUpdated": "2026-11-11T08:00:00.000Z"
    }
  ]
}
```

---

## Get Welcome Message with Pagination

Retrieve welcome message records with pagination.

**Endpoint:** `GET /api/welcome-message/pager`

### Query Parameters

| Parameter | Type   | Required | Default | Description                          |
|-----------|--------|----------|---------|--------------------------------------|
| `page`    | number | No       | 1       | Page number (must be >= 1)           |
| `limit`   | number | No       | 10      | Items per page (between 1 and 100)   |

### Response

**Status:** `200 OK`

```json
{
  "welcomeMessage": [
    {
      "id": 1711234567890,
      "title": "Selamat Datang di Pondok Pesantren Kanzululum Cirebon",
      "content": [
        {
          "id": "42EhpkWXEQ",
          "type": "paragraph",
          "data": {
            "text": "Kami berkomitmen untuk..."
          }
        }
      ],
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

## Get Welcome Message by ID

Retrieve a single welcome message by its ID.

**Endpoint:** `GET /api/welcome-message/:id`

### Path Parameters

| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| `id`      | number | Yes      | Welcome Message ID |

### Response

**Status:** `200 OK`

```json
{
  "welcomeMessage": {
    "id": 1711234567890,
    "title": "Selamat Datang di Pondok Pesantren Kanzululum Cirebon",
    "content": [
      {
        "id": "42EhpkWXEQ",
        "type": "paragraph",
        "data": {
          "text": "Kami berkomitmen untuk..."
        }
      }
    ],
    "dateCreated": "2026-11-11T08:00:00.000Z",
    "dateUpdated": "2026-11-11T08:00:00.000Z"
  }
}
```

---

## Create Welcome Message

Create a new welcome message.

**Endpoint:** `POST /api/welcome-message`  
**Headers:**
- `Content-Type: application/json`
- `X-Api-Key: <api_key>` (required for write operations)

### Request Body

```json
{
  "title": "Selamat Datang di Pondok Pesantren Kanzululum Cirebon",
  "content": [
    {
      "id": "42EhpkWXEQ",
      "type": "paragraph",
      "data": {
        "text": "Kami berkomitmen untuk memberikan pendidikan Al-Quran yang berkualitas, mengembangkan sektor pertanian, perkebunan, dan peternakan, serta menyediakan pengajaran holistik yang menggabungkan pendidikan agama dan umum. Selamat bergabung dengan kami dalam mencapai tujuan mulia kami."
      }
    }
  ]
}
```

### Response

**Status:** `201 Created`

```json
{
  "message": "Welcome message created successfully",
  "welcomeMessage": {
    "id": 1711234567890,
    "title": "Selamat Datang di Pondok Pesantren Kanzululum Cirebon",
    "content": [
      {
        "id": "42EhpkWXEQ",
        "type": "paragraph",
        "data": {
          "text": "Kami berkomitmen untuk memberikan pendidikan Al-Quran yang berkualitas,..."
        }
      }
    ],
    "dateCreated": "2026-11-11T08:00:00.000Z",
    "dateUpdated": "2026-11-11T08:00:00.000Z"
  }
}
```

---

## Update Welcome Message

Update an existing welcome message.

**Endpoint:** `PUT /api/welcome-message/:id`  
**Headers:**
- `Content-Type: application/json`
- `X-Api-Key: <api_key>` (required for write operations)

### Path Parameters

| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| `id`      | number | Yes      | Welcome Message ID |

### Request Body

```json
{
  "title": "Selamat Datang di Pondok Pesantren Kanzululum Cirebon",
  "content": [
    {
      "id": "42EhpkWXEQ",
      "type": "paragraph",
      "data": {
        "text": "Kami berkomitmen untuk..."
      }
    }
  ]
}
```

### Response

**Status:** `200 OK`

```json
{
  "message": "Welcome message updated successfully",
  "welcomeMessage": {
    "id": 1711234567890,
    "title": "Selamat Datang di Pondok Pesantren Kanzululum Cirebon",
    "content": [...],
    "dateCreated": "2026-11-11T08:00:00.000Z",
    "dateUpdated": "2026-11-11T08:05:00.000Z"
  }
}
```

---

## Delete Welcome Message

Delete a welcome message by ID.

**Endpoint:** `DELETE /api/welcome-message/:id`  
**Headers:**
- `X-Api-Key: <api_key>` (required for write operations)

### Path Parameters

| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| `id`      | number | Yes      | Welcome Message ID |

### Response

**Status:** `200 OK`

```json
{
  "id": 1711234567890,
  "message": "Welcome message deleted successfully"
}
```

---

## Data Models

### WelcomeMessage

| Field         | Type                   | Description                     |
|---------------|------------------------|---------------------------------|
| `id`          | number                 | Timestamp-based unique ID       |
| `title`       | string                 | Title of the welcome message    |
| `content`     | WelcomeMessageBlock[]  | Block-based rich text content   |
| `dateCreated` | string (ISO date)      | Creation timestamp              |
| `dateUpdated` | string (ISO date)      | Last update timestamp           |

### WelcomeMessageBlock

| Field  | Type   | Description                                   |
|--------|--------|-----------------------------------------------|
| `id`   | string | Block ID (e.g. "42EhpkWXEQ")                  |
| `type` | string | Block type (e.g. "paragraph", "header")       |
| `data` | object | Block payload data (e.g. `{ text: "..." }`)   |

---

## Error Responses

| Status Code | Message | Description |
|---|---|---|
| `400 Bad Request` | `{"error": "Title must be a string"}` | Validation failed |
| `400 Bad Request` | `{"error": "Content must be an array or string"}` | Validation failed |
| `400 Bad Request` | `{"error": "Invalid ID"}` | Path ID parameter is not numeric |
| `401 Unauthorized` | `{"error": "API key required"}` | Missing or invalid `X-Api-Key` header |
| `404 Not Found` | `{"error": "Welcome message not found"}` | Record does not exist |
| `500 Internal Server Error` | `{"error": "Failed to retrieve welcome message"}` | Server-side error |
