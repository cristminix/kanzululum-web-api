# Cloudflare KV REST API

REST API sederhana menggunakan Cloudflare Workers, Hono, dan Cloudflare KV Storage.

## Fitur

- Operasi CRUD penuh (Create, Read, Update, Delete) untuk data di Cloudflare KV
- Operasi CRUD khusus untuk tabel "berita" yang meniru struktur database
- Operasi CRUD khusus untuk tabel "produk" yang meniru struktur database
- Pagination untuk daftar berita dan produk
- Validasi input dan penanganan error
- Middleware CORS dan logging
- Health check endpoint
- Struktur kode modular mengikuti prinsip SOLID

## Prasyarat

- [Node.js](https://nodejs.org/) v18 atau lebih tinggi
- [pnpm](https://pnpm.io/) package manager
- [Cloudflare](https://www.cloudflare.com/) account

## Instalasi

1. Clone repository ini
2. Instal dependensi:
   ```bash
   pnpm install
   ```

## Konfigurasi

1. Update `wrangler.toml` dengan ID namespace KV Anda:

   ```toml
   [[kv_namespaces]]
   binding = "KV"
   id = "YOUR_KV_NAMESPACE_ID"
   ```

2. Untuk development, Anda bisa menggunakan wrangler untuk membuat namespace KV:
   ```bash
   wrangler kv:namespace create "KV"
   ```

## Menjalankan Development Server

```bash
pnpm run dev
```

Server akan berjalan di `http://localhost:8787`

## API Endpoints

### 1. Health Check

- **URL**: `/health`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "OK",
    "timestamp": "2023-01-01T00:00:00.000Z"
  }
  ```

### 2. Get All Keys

- **URL**: `/api/keys`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "keys": [
      { "name": "key1", "expiration": null },
      { "name": "key2", "expiration": 1672531200 }
    ]
  }
  ```

### 3. Get Data by Key

- **URL**: `/api/data/:key`
- **Method**: `GET`
- **Response** (jika key ditemukan):
  ```json
  {
    "key": "example-key",
    "value": "example-value"
  }
  ```
- **Response** (jika key tidak ditemukan):
  ```json
  {
    "error": "Key not found"
  }
  ```

### 4. Create/Update Data

- **URL**: `/api/data`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "key": "example-key",
    "value": "example-value"
  }
  ```
  atau untuk object:
  ```json
  {
    "key": "user-data",
    "value": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```
- **Response**:
  ```json
  {
    "message": "Data saved successfully",
    "key": "example-key",
    "value": "example-value"
  }
  ```

### 5. Update Data

- **URL**: `/api/data/:key`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "value": "updated-value"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Data updated successfully",
    "key": "example-key",
    "value": "updated-value"
  }
  ```

### 6. Delete Data

- **URL**: `/api/data/:key`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "message": "Data deleted successfully",
    "key": "example-key"
  }
  ```

## API Endpoints untuk Tabel "Berita"

### Struktur Tabel "Berita"

```sql
CREATE TABLE "berita" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "title" varchar(225),
  "tags" varchar(100),
  "author" varchar,
  "headline" varchar,
  "cover" varchar(500),
  "content" text,
  "compiledHash" text,
  "compiledPath" text,
  "dateCreated" datetime,
  "dateUpdated" datetime
)
```

## API Endpoints untuk Tabel "Produk"

### Struktur Tabel "Produk"

```sql
CREATE TABLE "produk" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "title" varchar(225),
  "kategori" varchar,
  "tags" varchar,
  "headline" varchar,
  "cover" varchar(500),
  "content" text,
  "compiledHash" text,
  "compiledPath" text,
  "dateCreated" datetime,
  "dateUpdated" datetime
)

### 1. Get All Berita

- **URL**: `/api/berita`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "berita": [
      {
        "id": 1640995200000,
        "title": "Judul Berita",
        "tags": "tag1,tag2",
        "author": "Penulis",
        "headline": "Headline berita",
        "cover": "https://example.com/image.jpg",
        "content": "Konten berita...",
        "compiledHash": "hash123",
        "compiledPath": "/path/to/compiled",
        "dateCreated": "2022-01-01T00:00:00.000Z",
        "dateUpdated": "2022-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

### 2. Get Berita dengan Pagination

- **URL**: `/api/berita/pager`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional, default: 1) - Nomor halaman
  - `limit` (optional, default: 10, max: 100) - Jumlah item per halaman
- **Response**:
  ```json
  {
    "berita": [
      {
        "id": 1640995200000,
        "title": "Judul Berita",
        "tags": "tag1,tag2",
        "author": "Penulis",
        "headline": "Headline berita",
        "cover": "https://example.com/image.jpg",
        "content": "Konten berita...",
        "compiledHash": "hash123",
        "compiledPath": "/path/to/compiled",
        "dateCreated": "2022-01-01T00:00:00.000Z",
        "dateUpdated": "2022-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
  ```

### 3. Get Berita by ID

- **URL**: `/api/berita/:id`
- **Method**: `GET`
- **Response** (jika berita ditemukan):
  ```json
  {
    "berita": {
      "id": 1640995200000,
      "title": "Judul Berita",
      "tags": "tag1,tag2",
      "author": "Penulis",
      "headline": "Headline berita",
      "cover": "https://example.com/image.jpg",
      "content": "Konten berita...",
      "compiledHash": "hash123",
      "compiledPath": "/path/to/compiled",
      "dateCreated": "2022-01-01T00:00:00.000Z",
      "dateUpdated": "2022-01-01T00:00:00.000Z"
    }
  }
  ```
- **Response** (jika berita tidak ditemukan):
  ```json
  {
    "error": "Berita not found"
  }
  ```

### 4. Create Berita

- **URL**: `/api/berita`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Judul Berita",
    "tags": "tag1,tag2",
    "author": "Penulis",
    "headline": "Headline berita",
    "cover": "https://example.com/image.jpg",
    "content": "Konten berita...",
    "compiledHash": "hash123",
    "compiledPath": "/path/to/compiled"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Berita created successfully",
    "berita": {
      "id": 1640995200000,
      "title": "Judul Berita",
      "tags": "tag1,tag2",
      "author": "Penulis",
      "headline": "Headline berita",
      "cover": "https://example.com/image.jpg",
      "content": "Konten berita...",
      "compiledHash": "hash123",
      "compiledPath": "/path/to/compiled",
      "dateCreated": "2022-01-01T00:00:00.000Z",
      "dateUpdated": "2022-01-01T00:00:00.000Z"
    }
  }
  ```

### 5. Update Berita

- **URL**: `/api/berita/:id`
- **Method**: `PUT`
- **Body** (semua field opsional):
  ```json
  {
    "title": "Judul Berita yang Diperbarui",
    "tags": "tag1,tag3",
    "author": "Penulis Baru",
    "headline": "Headline berita yang diperbarui",
    "cover": "https://example.com/new-image.jpg",
    "content": "Konten berita yang diperbarui...",
    "compiledHash": "hash456",
    "compiledPath": "/path/to/new-compiled"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Berita updated successfully",
    "berita": {
      "id": 1640995200000,
      "title": "Judul Berita yang Diperbarui",
      "tags": "tag1,tag3",
      "author": "Penulis Baru",
      "headline": "Headline berita yang diperbarui",
      "cover": "https://example.com/new-image.jpg",
      "content": "Konten berita yang diperbarui...",
      "compiledHash": "hash456",
      "compiledPath": "/path/to/new-compiled",
      "dateCreated": "2022-01-01T00:00:00.000Z",
      "dateUpdated": "2022-01-02T00:00:00.000Z"
    }
  }
  ```

### 6. Delete Berita

- **URL**: `/api/berita/:id`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "message": "Berita deleted successfully",
    "id": 1640995200000
  }
  ```

## API Endpoints untuk Tabel "Produk"

### 1. Get All Produk

- **URL**: `/api/produk`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "produk": [
      {
        "id": 1640995200000,
        "title": "Judul Produk",
        "kategori": "Kategori Produk",
        "tags": "tag1,tag2",
        "headline": "Headline produk",
        "cover": "https://example.com/image.jpg",
        "content": "Konten produk...",
        "compiledHash": "hash123",
        "compiledPath": "/path/to/compiled",
        "dateCreated": "2022-01-01T00:00:00.000Z",
        "dateUpdated": "2022-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

### 2. Get Produk dengan Pagination

- **URL**: `/api/produk/pager`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional, default: 1) - Nomor halaman
  - `limit` (optional, default: 10, max: 100) - Jumlah item per halaman
  - `kategori` (optional) - Filter berdasarkan kategori
- **Response**:
  ```json
  {
    "produk": [
      {
        "id": 1640995200000,
        "title": "Judul Produk",
        "kategori": "Kategori Produk",
        "tags": "tag1,tag2",
        "headline": "Headline produk",
        "cover": "https://example.com/image.jpg",
        "content": "Konten produk...",
        "compiledHash": "hash123",
        "compiledPath": "/path/to/compiled",
        "dateCreated": "2022-01-01T00:00:00.000Z",
        "dateUpdated": "2022-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
  ```

### 3. Get Produk by ID

- **URL**: `/api/produk/:id`
- **Method**: `GET`
- **Response** (jika produk ditemukan):
  ```json
  {
    "produk": {
      "id": 1640995200000,
      "title": "Judul Produk",
      "kategori": "Kategori Produk",
      "tags": "tag1,tag2",
      "headline": "Headline produk",
      "cover": "https://example.com/image.jpg",
      "content": "Konten produk...",
      "compiledHash": "hash123",
      "compiledPath": "/path/to/compiled",
      "dateCreated": "2022-01-01T00:00:00.000Z",
      "dateUpdated": "2022-01-01T00:00:00.000Z"
    }
  }
  ```
- **Response** (jika produk tidak ditemukan):
  ```json
  {
    "error": "Produk not found"
  }
  ```

### 4. Create Produk

- **URL**: `/api/produk`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Judul Produk",
    "kategori": "Kategori Produk",
    "tags": "tag1,tag2",
    "headline": "Headline produk",
    "cover": "https://example.com/image.jpg",
    "content": "Konten produk...",
    "compiledHash": "hash123",
    "compiledPath": "/path/to/compiled"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Produk created successfully",
    "produk": {
      "id": 1640995200000,
      "title": "Judul Produk",
      "kategori": "Kategori Produk",
      "tags": "tag1,tag2",
      "headline": "Headline produk",
      "cover": "https://example.com/image.jpg",
      "content": "Konten produk...",
      "compiledHash": "hash123",
      "compiledPath": "/path/to/compiled",
      "dateCreated": "2022-01-01T00:00:00.000Z",
      "dateUpdated": "2022-01-01T00:00:00.000Z"
    }
  }
  ```

### 5. Update Produk

- **URL**: `/api/produk/:id`
- **Method**: `PUT`
- **Body** (semua field opsional):
  ```json
  {
    "title": "Judul Produk yang Diperbarui",
    "kategori": "Kategori Produk Baru",
    "tags": "tag1,tag3",
    "headline": "Headline produk yang diperbarui",
    "cover": "https://example.com/new-image.jpg",
    "content": "Konten produk yang diperbarui...",
    "compiledHash": "hash456",
    "compiledPath": "/path/to/new-compiled"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Produk updated successfully",
    "produk": {
      "id": 1640995200000,
      "title": "Judul Produk yang Diperbarui",
      "kategori": "Kategori Produk Baru",
      "tags": "tag1,tag3",
      "headline": "Headline produk yang diperbarui",
      "cover": "https://example.com/new-image.jpg",
      "content": "Konten produk yang diperbarui...",
      "compiledHash": "hash456",
      "compiledPath": "/path/to/new-compiled",
      "dateCreated": "2022-01-01T00:00:00.000Z",
      "dateUpdated": "2022-01-02T00:00:00.000Z"
    }
  }
  ```

### 6. Delete Produk

- **URL**: `/api/produk/:id`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "message": "Produk deleted successfully",
    "id": 1640995200000
  }
  ```

## Pengujian Lokal

Anda dapat menggunakan curl atau alat pengujian API seperti Postman untuk menguji endpoint:

### Health Check

```bash
curl http://localhost:8787/health
```

### Menyimpan Data

```bash
curl -X POST http://localhost:8787/api/data \
  -H "Content-Type: application/json" \
  -d '{"key": "test-key", "value": "test-value"}'
```

### Mendapatkan Data

```bash
curl http://localhost:8787/api/data/test-key
```

### Memperbarui Data

```bash
curl -X PUT http://localhost:8787/api/data/test-key \
  -H "Content-Type: application/json" \
  -d '{"value": "updated-value"}'
```

### Menghapus Data

```bash
curl -X DELETE http://localhost:8787/api/data/test-key
```

### Mendapatkan Semua Keys

```bash
curl http://localhost:8787/api/keys
```

### Menguji Endpoint Berita

#### Membuat Berita

```bash
curl -X POST http://localhost:8787/api/berita \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Berita Terbaru",
    "tags": "news,update",
    "author": "Admin",
    "headline": "Headline berita terbaru",
    "cover": "https://example.com/cover.jpg",
    "content": "Ini adalah konten berita terbaru...",
    "compiledHash": "abc123",
    "compiledPath": "/news/latest"
  }'
```

#### Mendapatkan Semua Berita

```bash
curl http://localhost:8787/api/berita
```

#### Mendapatkan Berita dengan Pagination

```bash
curl http://localhost:8787/api/berita/pager?page=1&limit=5
```

#### Mendapatkan Berita Berdasarkan ID

```bash
curl http://localhost:8787/api/berita/1640995200000
```

#### Memperbarui Berita

```bash
curl -X PUT http://localhost:8787/api/berita/1640995200000 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Berita Terbaru yang Diperbarui",
    "content": "Ini adalah konten berita terbaru yang telah diperbarui..."
  }'
```

#### Menghapus Berita

```bash
curl -X DELETE http://localhost:8787/api/berita/1640995200000
```

### Menguji Endpoint Produk

#### Membuat Produk

```bash
curl -X POST http://localhost:8787/api/produk \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Produk Terbaru",
    "kategori": "Elektronik",
    "tags": "produk,elektronik",
    "headline": "Headline produk terbaru",
    "cover": "https://example.com/cover.jpg",
    "content": "Ini adalah konten produk terbaru...",
    "compiledHash": "abc123",
    "compiledPath": "/products/latest"
  }'
```

#### Mendapatkan Semua Produk

```bash
curl http://localhost:8787/api/produk
```

#### Mendapatkan Produk dengan Pagination

```bash
curl http://localhost:8787/api/produk/pager?page=1&limit=5
```

#### Mendapatkan Produk Berdasarkan ID

```bash
curl http://localhost:8787/api/produk/1640995200000
```

#### Memperbarui Produk

```bash
curl -X PUT http://localhost:8787/api/produk/1640995200000 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Produk Terbaru yang Diperbarui",
    "content": "Ini adalah konten produk terbaru yang telah diperbarui..."
  }'
```

#### Menghapus Produk

```bash
curl -X DELETE http://localhost:8787/api/produk/1640995200000
```

## Deploy ke Cloudflare

```bash
pnpm run deploy
```

## Struktur Proyek

```
├── src/
│   ├── index.ts              # File utama aplikasi
│   ├── models/
│   │   ├── berita.ts         # Model data berita
│   │   └── produk.ts         # Model data produk
│   ├── services/
│   │   └── kvService.ts      # Service untuk operasi KV
│   ├── controllers/
│   │   ├── beritaController.ts # Controller untuk logika berita
│   │   ├── berita/           # Fungsi controller berita
│   │   │   ├── getAllBerita.ts
│   │   │   ├── getBeritaWithPager.ts
│   │   │   ├── getBeritaById.ts
│   │   │   ├── createBerita.ts
│   │   │   ├── updateBerita.ts
│   │   │   └── deleteBerita.ts
│   │   ├── produkController.ts # Controller untuk logika produk
│   │   └── produk/           # Fungsi controller produk
│   │       ├── getAllProduk.ts
│   │       ├── getProdukWithPager.ts
│   │       ├── getProdukById.ts
│   │       ├── createProduk.ts
│   │       ├── updateProduk.ts
│   │       └── deleteProduk.ts
│   ├── handlers/
│   │   ├── berita/           # Handler untuk endpoint berita
│   │   │   ├── getAllBeritaHandler.ts
│   │   │   ├── getBeritaWithPagerHandler.ts
│   │   │   ├── getBeritaByIdHandler.ts
│   │   │   ├── createBeritaHandler.ts
│   │   │   ├── updateBeritaHandler.ts
│   │   │   ├── deleteBeritaHandler.ts
│   │   │   └── validator.ts
│   │   └── produk/           # Handler untuk endpoint produk
│   │       ├── getAllProdukHandler.ts
│   │       ├── getProdukWithPagerHandler.ts
│   │       ├── getProdukByIdHandler.ts
│   │       ├── createProdukHandler.ts
│   │       ├── updateProdukHandler.ts
│   │       ├── deleteProdukHandler.ts
│   │       └── validator.ts
│   ├── routes/
│   │   ├── beritaRoutes.ts   # Route untuk endpoint berita
│   │   ├── produkRoutes.ts   # Route untuk endpoint produk
│   │   └── dataRoutes.ts     # Route untuk endpoint data umum
│   ├── utils/
│   │   └── controllerFactory.ts # Factory untuk membuat controller
│   └── scripts/
│       ├── seedBerita.js     # Script untuk seeding data berita
│       ├── seedProduk.js     # Script untuk seeding data produk
│       ├── clearBerita.js    # Script untuk menghapus data berita
│       └── clearProduk.js    # Script untuk menghapus data produk
├── seeds/
│   ├── berita.jsonl          # Data seed untuk berita
│   └── produk.jsonl          # Data seed untuk produk
├── wrangler.toml             # Konfigurasi Cloudflare Workers
├── tsconfig.json             # Konfigurasi TypeScript
├── package.json              # Dependensi dan script
└── README.md                 # Dokumentasi ini
```

## Teknologi yang Digunakan

- [Hono](https://hono.dev/) - Framework web ringan untuk Cloudflare Workers
- [Cloudflare Workers](https://workers.cloudflare.com/) - Platform serverless
- [Cloudflare KV](https://developers.cloudflare.com/workers/runtime-apis/kv/) - Key-value storage
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## Prinsip SOLID yang Diimplementasikan

- **Single Responsibility Principle (SRP)**: Setiap class memiliki tanggung jawab tunggal
- **Open/Closed Principle (OCP)**: Sistem terbuka untuk ekstensi tapi tertutup untuk modifikasi
- **Dependency Inversion Principle (DIP)**: Modul tingkat tinggi tidak bergantung pada modul tingkat rendah

## Lisensi

MIT
