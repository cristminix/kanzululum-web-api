# Postman Collection & Environment - Kanzul Ulum Backend API

Folder ini berisi template Postman untuk menguji dan berinteraksi dengan API backend Pondok Pesantren Kanzul Ulum.

---

## 📁 Berkas yang Tersedia

1. **`kanzul-ulum-api.postman_collection.json`**  
   Koleksi Postman versi 2.1.0 yang mencakup seluruh modul dan endpoint API backend (total 85 requests dalam 14 modul).
2. **`kanzul-ulum-local.postman_environment.json`**  
   Template environment untuk pengujian lokal (`http://localhost:8787`).
3. **`generate.js`**  
   Script Node.js untuk meregenerasi berkas template Postman jika terdapat penambahan endpoint baru (`node postman/generate.js`).

---

## 🚀 Cara Import ke Postman

1. Buka aplikasi **Postman**.
2. Klik tombol **Import** di pojok kiri atas (atau tekan `Ctrl + O` / `Cmd + O`).
3. Drag & drop atau pilih kedua berkas berikut dari folder `postman/`:
   - `kanzul-ulum-api.postman_collection.json`
   - `kanzul-ulum-local.postman_environment.json`
4. Di pojok kanan atas Postman, pilih environment aktif: **Kanzul Ulum - Local**.

---

## ⚙️ Konfigurasi Environment Variables

| Variable | Nilai Default | Keterangan |
| :--- | :--- | :--- |
| `baseUrl` | `http://localhost:8787` | URL server backend Cloudflare Worker lokal |
| `apiKey` | *(isi lokal)* | Nilai `API_KEY` dari `.dev.vars` untuk operasi mutasi data. Jangan di-commit. |

> **Catatan Keamanan / Autentikasi:**  
> Sesuai konfigurasi di `src/middlewares/requireApiKey.ts`, seluruh request mutasi data (`POST`, `PUT`, `PATCH`, `DELETE`) di `/api/*` **wajib** menyertakan header:
> ```http
> X-Api-Key: {{apiKey}}
> ```
> Template koleksi ini sudah secara otomatis menyematkan header tersebut pada seluruh request terkait.

---

## 📋 Daftar Modul & Endpoint

| No | Modul | Deskripsi Endpoint |
| :---: | :--- | :--- |
| **00** | **System** | Root (`/`) & Health Check (`/health`) |
| **01** | **Berita** | CRUD & Pagination (`/api/berita`, `/api/berita/pager`, `/api/berita/:id`) |
| **02** | **Produk** | CRUD & Pagination (`/api/produk`, `/api/produk/pager`, `/api/produk/:id`) |
| **03** | **Banner** | CRUD, Pagination & By Slug (`/api/banner`, `/api/banner/slug/:slug`) |
| **04** | **Galery** | CRUD, Pagination & By Slug (`/api/galery`, `/api/galery/slug/:slug`) |
| **05** | **Hero** | CRUD, Pagination & By Slug (`/api/hero`, `/api/hero/slug/:slug`) |
| **06** | **Kegiatan** | CRUD & Pagination (`/api/kegiatan`, `/api/kegiatan/pager`, `/api/kegiatan/:id`) |
| **07** | **Lembaga** | CRUD & Pagination (`/api/lembaga`, `/api/lembaga/pager`, `/api/lembaga/:id`) |
| **08** | **Company & Kontak** | Profil instansi (`/api/company`) & Contact Person (`/api/contact-person`) |
| **09** | **Pendaftaran** | Syarat (`/api/syarat-pendaftaran`) & Biaya (`/api/biaya-pendaftaran`) |
| **10** | **Profile** | Profil konten pesantren (`/api/profile`) |
| **11** | **Template** | Data template page (`/api/template`) |
| **12** | **Navigasi & Media Sosial** | Social links (`/api/social-network-links`) & Navigasi menu (`/api/web-navigation`) |
| **13** | **File Upload** | Upload base64 & manajemen file KV (`/api/files`) |

---

## 🛠️ Menjalankan Server Lokal

Sebelum melakukan request melalui Postman, pastikan server lokal sudah berjalan:

```bash
# Di folder backend
yarn dev
```

Server default akan aktif di port `8787` (`http://localhost:8787`).
