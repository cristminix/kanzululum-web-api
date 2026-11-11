const fs = require("fs");
const path = require("path");

const postmanDir = __dirname;
if (!fs.existsSync(postmanDir)) {
  fs.mkdirSync(postmanDir, { recursive: true });
}

function createUrl(rawPath, queryParams = [], pathVars = []) {
  const parts = rawPath.replace(/^\//, "").split("/");
  const urlObj = {
    raw: `{{baseUrl}}${rawPath}` + (queryParams.length > 0 ? "?" + queryParams.map(q => `${q.key}=${q.value}`).join("&") : ""),
    host: ["{{baseUrl}}"],
    path: parts
  };
  if (queryParams.length > 0) {
    urlObj.query = queryParams;
  }
  if (pathVars.length > 0) {
    urlObj.variable = pathVars;
  }
  return urlObj;
}

function createRequest(name, method, urlPath, options = {}) {
  const headers = [];

  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    headers.push({
      key: "X-Api-Key",
      value: "{{apiKey}}",
      type: "text",
      description: "Header API Key wajib untuk mutasi data (POST/PUT/PATCH/DELETE)"
    });
  }

  const req = {
    name,
    request: {
      method,
      header: headers,
      url: createUrl(urlPath, options.query || [], options.pathVars || [])
    }
  };

  if (options.description) {
    req.request.description = options.description;
  }

  if (options.body) {
    headers.unshift({
      key: "Content-Type",
      value: "application/json",
      type: "text"
    });
    req.request.body = {
      mode: "raw",
      raw: JSON.stringify(options.body, null, 2),
      options: {
        raw: {
          language: "json"
        }
      }
    };
  }

  return req;
}

const collection = {
  info: {
    _postman_id: "c18a24db-6be5-4d78-b118-8f81efc9b291",
    name: "Kanzul Ulum Backend API",
    description: "Koleksi Postman resmi untuk API Backend Pondok Pesantren Kanzul Ulum berbasis Cloudflare Workers & Hono KV REST API.\n\nCatatan Penting:\n- Seluruh request mutasi (POST, PUT, PATCH, DELETE) di bawah `/api/*` membutuhkan header `X-Api-Key`.\n- Base URL default: `http://localhost:8787` (jalankan dengan `yarn dev`).",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    {
      key: "baseUrl",
      value: "http://localhost:8787",
      type: "string"
    },
    {
      key: "apiKey",
      value: "",
      type: "string"
    }
  ],
  item: [
    {
      name: "00. System",
      item: [
        createRequest("Root Welcome", "GET", "/", { description: "Pesan selamat datang dan timestamp" }),
        createRequest("Health Check", "GET", "/health", { description: "Cek kesehatan status server (status: OK)" })
      ]
    },
    {
      name: "01. Berita",
      item: [
        createRequest("Get All Berita", "GET", "/api/berita", { description: "Mendapatkan daftar semua berita" }),
        createRequest("Get Berita with Pagination", "GET", "/api/berita/pager", {
          description: "Mendapatkan data berita dengan pagination dan filter opsional",
          query: [
            { key: "page", value: "1", description: "Nomor halaman (default: 1)" },
            { key: "limit", value: "10", description: "Jumlah item per halaman (default: 10)" },
            { key: "category", value: "", description: "Filter berdasarkan kategori/tag (opsional)", disabled: true },
            { key: "author", value: "", description: "Filter berdasarkan author (opsional)", disabled: true }
          ]
        }),
        createRequest("Get Berita by ID", "GET", "/api/berita/:id", {
          description: "Mendapatkan detail berita berdasarkan ID",
          pathVars: [{ key: "id", value: "1", description: "ID berita (timestamp/number)" }]
        }),
        createRequest("Create Berita", "POST", "/api/berita", {
          description: "Membuat data berita baru (Wajib X-Api-Key)",
          body: {
            title: "Peringatan Hari Santri Nasional di Ponpes Kanzul Ulum",
            tags: "santri,kegiatan,hari-santri",
            author: "Redaksi Kanzul Ulum",
            headline: "Ratusan santri mengikuti upacara peringatan Hari Santri Nasional dengan khidmat.",
            cover: "hari-santri.jpg",
            coverUrl: "https://example.com/images/hari-santri.jpg",
            content: "Pondok Pesantren Kanzul Ulum menggelar upacara dan berbagai perlombaan dalam memperingati Hari Santri Nasional...",
            compiledHash: "abc123hash",
            compiledPath: "/compiled/abc123hash"
          }
        }),
        createRequest("Update Berita", "PUT", "/api/berita/:id", {
          description: "Memperbarui data berita berdasarkan ID (Wajib X-Api-Key)",
          pathVars: [{ key: "id", value: "1", description: "ID berita yang ingin diperbarui" }],
          body: {
            title: "Peringatan Hari Santri Nasional di Ponpes Kanzul Ulum (Updated)",
            tags: "santri,kegiatan,update",
            author: "Redaksi Kanzul Ulum",
            headline: "Ratusan santri mengikuti upacara dengan khidmat.",
            cover: "hari-santri-updated.jpg",
            coverUrl: "https://example.com/images/hari-santri-updated.jpg",
            content: "Pembaruan isi artikel peringatan Hari Santri Nasional..."
          }
        }),
        createRequest("Delete Berita", "DELETE", "/api/berita/:id", {
          description: "Menghapus data berita berdasarkan ID (Wajib X-Api-Key)",
          pathVars: [{ key: "id", value: "1", description: "ID berita yang ingin dihapus" }]
        })
      ]
    },
    {
      name: "02. Produk",
      item: [
        createRequest("Get All Produk", "GET", "/api/produk", { description: "Mendapatkan semua produk" }),
        createRequest("Get Produk with Pagination", "GET", "/api/produk/pager", {
          description: "Mendapatkan data produk dengan pagination",
          query: [
            { key: "page", value: "1", description: "Nomor halaman" },
            { key: "limit", value: "10", description: "Batas item per halaman" },
            { key: "kategori", value: "", description: "Filter kategori (opsional)", disabled: true }
          ]
        }),
        createRequest("Get Produk by ID", "GET", "/api/produk/:id", {
          pathVars: [{ key: "id", value: "1", description: "ID produk" }]
        }),
        createRequest("Create Produk", "POST", "/api/produk", {
          description: "Menambahkan produk baru (Wajib X-Api-Key)",
          body: {
            title: "Madu Murni Kanzul Ulum 500ml",
            kategori: "herbal",
            tags: "madu,herbal,kesehatan",
            headline: "Madu murni alami budidaya santri",
            cover: "madu-500ml.jpg",
            coverUrl: "https://example.com/images/madu.jpg",
            content: "Madu murni alami kaya khasiat hasil olahan mandiri pesantren."
          }
        }),
        createRequest("Update Produk", "PUT", "/api/produk/:id", {
          pathVars: [{ key: "id", value: "1", description: "ID produk" }],
          body: {
            title: "Madu Murni Kanzul Ulum 500ml (Kemasan Baru)",
            kategori: "herbal",
            tags: "madu,herbal,kesehatan",
            headline: "Madu murni alami dalam kemasan higienis",
            cover: "madu-500ml-new.jpg",
            content: "Madu murni alami dengan botol tersegel rapi."
          }
        }),
        createRequest("Delete Produk", "DELETE", "/api/produk/:id", {
          pathVars: [{ key: "id", value: "1", description: "ID produk" }]
        })
      ]
    },
    {
      name: "03. Banner",
      item: [
        createRequest("Get All Banner", "GET", "/api/banner"),
        createRequest("Get Banner with Pagination", "GET", "/api/banner/pager", {
          query: [
            { key: "page", value: "1" },
            { key: "limit", value: "10" }
          ]
        }),
        createRequest("Get Banner by ID", "GET", "/api/banner/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Get Banner by Slug", "GET", "/api/banner/slug/:slug", {
          description: "Mendapatkan banner berdasarkan slug halaman (misal: kontak, galery, pendaftaran)",
          pathVars: [{ key: "slug", value: "kontak", description: "Slug halaman banner" }]
        }),
        createRequest("Create Banner", "POST", "/api/banner", {
          body: {
            title: "Pendaftaran Santri Baru Kanzul Ulum",
            slug: "pendaftaran",
            image: "pendaftaran-banner.jpg",
            imageUrl: "https://example.com/images/pendaftaran-banner.jpg",
            page: "pendaftaran"
          }
        }),
        createRequest("Update Banner", "PUT", "/api/banner/:id", {
          pathVars: [{ key: "id", value: "1" }],
          body: {
            title: "Pendaftaran Santri Baru Gelombang 2",
            slug: "pendaftaran",
            image: "pendaftaran-banner-g2.jpg",
            imageUrl: "https://example.com/images/pendaftaran-banner-g2.jpg",
            page: "pendaftaran"
          }
        }),
        createRequest("Delete Banner", "DELETE", "/api/banner/:id", {
          pathVars: [{ key: "id", value: "1" }]
        })
      ]
    },
    {
      name: "04. Galery",
      item: [
        createRequest("Get All Galery", "GET", "/api/galery"),
        createRequest("Get Galery with Pagination", "GET", "/api/galery/pager", {
          query: [
            { key: "page", value: "1" },
            { key: "limit", value: "10" }
          ]
        }),
        createRequest("Get Galery by ID", "GET", "/api/galery/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Get Galery by Slug", "GET", "/api/galery/slug/:slug", {
          pathVars: [{ key: "slug", value: "kegiatan-santri" }]
        }),
        createRequest("Create Galery", "POST", "/api/galery", {
          body: {
            title: "Dokumentasi Kajian Kitab Kuning",
            slug: "kajian-kitab-kuning",
            description: "Kajian rutin santri setiap bakda Subuh",
            image: "kajian-kitab.jpg",
            imageUrl: "https://example.com/images/kajian-kitab.jpg"
          }
        }),
        createRequest("Update Galery", "PUT", "/api/galery/:id", {
          pathVars: [{ key: "id", value: "1" }],
          body: {
            title: "Dokumentasi Kajian Rutin Santri",
            slug: "kajian-kitab-kuning",
            description: "Kajian santri putra dan putri",
            image: "kajian-kitab-update.jpg"
          }
        }),
        createRequest("Delete Galery", "DELETE", "/api/galery/:id", {
          pathVars: [{ key: "id", value: "1" }]
        })
      ]
    },
    {
      name: "05. Hero",
      item: [
        createRequest("Get All Hero", "GET", "/api/hero"),
        createRequest("Get Hero with Pagination", "GET", "/api/hero/pager", {
          query: [
            { key: "page", value: "1" },
            { key: "limit", value: "10" }
          ]
        }),
        createRequest("Get Hero by ID", "GET", "/api/hero/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Get Hero by Slug", "GET", "/api/hero/slug/:slug", {
          pathVars: [{ key: "slug", value: "home" }]
        }),
        createRequest("Create Hero", "POST", "/api/hero", {
          body: {
            slug: "home",
            title: [
              { id: "1", type: "text", data: { text: "Selamat Datang di Pondok Pesantren Kanzul Ulum" } }
            ],
            description: [
              { id: "2", type: "text", data: { text: "Membina Generasi Qurani, Berakhlakul Karimah dan Berwawasan Global" } }
            ],
            image: "hero-home.jpg",
            imageUrl: "https://example.com/images/hero-home.jpg",
            linkText: "Daftar Sekarang",
            link: "/pendaftaran"
          }
        }),
        createRequest("Update Hero", "PUT", "/api/hero/:id", {
          pathVars: [{ key: "id", value: "1" }],
          body: {
            slug: "home",
            title: [
              { id: "1", type: "text", data: { text: "Pondok Pesantren Kanzul Ulum Cirebon" } }
            ],
            description: [
              { id: "2", type: "text", data: { text: "Pendidikan Agama Islam Terpadu dan Berkarakter" } }
            ],
            image: "hero-home.jpg",
            linkText: "Pelajari Lebih Lanjut",
            link: "/profile"
          }
        }),
        createRequest("Delete Hero", "DELETE", "/api/hero/:id", {
          pathVars: [{ key: "id", value: "1" }]
        })
      ]
    },
    {
      name: "06. Kegiatan",
      item: [
        createRequest("Get All Kegiatan", "GET", "/api/kegiatan"),
        createRequest("Get Kegiatan with Pagination", "GET", "/api/kegiatan/pager", {
          query: [
            { key: "page", value: "1" },
            { key: "limit", value: "10" }
          ]
        }),
        createRequest("Get Kegiatan by ID", "GET", "/api/kegiatan/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Create Kegiatan", "POST", "/api/kegiatan", {
          body: {
            waktu: "04:30 - 06:00 WIB",
            kegiatan: "Shalat Subuh Berjamaah & Kajian Al-Quran"
          }
        }),
        createRequest("Update Kegiatan", "PUT", "/api/kegiatan/:id", {
          pathVars: [{ key: "id", value: "1" }],
          body: {
            waktu: "04:30 - 06:30 WIB",
            kegiatan: "Shalat Subuh Berjamaah & Tahfidz Quran"
          }
        }),
        createRequest("Delete Kegiatan", "DELETE", "/api/kegiatan/:id", {
          pathVars: [{ key: "id", value: "1" }]
        })
      ]
    },
    {
      name: "07. Lembaga",
      item: [
        createRequest("Get All Lembaga", "GET", "/api/lembaga"),
        createRequest("Get Lembaga with Pagination", "GET", "/api/lembaga/pager", {
          query: [
            { key: "page", value: "1" },
            { key: "limit", value: "10" }
          ]
        }),
        createRequest("Get Lembaga by ID", "GET", "/api/lembaga/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Create Lembaga", "POST", "/api/lembaga", {
          body: {
            name: "Madrasah Tsanawiyah (MTs) Kanzul Ulum",
            image: "mts-kanzul-ulum.jpg",
            imageUrl: "https://example.com/images/mts.jpg",
            description: "Jenjang pendidikan formal menengah pertama yang memadukan kurikulum Kemenag dan kurikulum pesantren."
          }
        }),
        createRequest("Update Lembaga", "PUT", "/api/lembaga/:id", {
          pathVars: [{ key: "id", value: "1" }],
          body: {
            name: "Madrasah Tsanawiyah Terpadu Kanzul Ulum",
            image: "mts-kanzul-ulum.jpg",
            description: "Pendidikan tingkat MTs dengan akreditasi A dan kurikulum unggulan."
          }
        }),
        createRequest("Delete Lembaga", "DELETE", "/api/lembaga/:id", {
          pathVars: [{ key: "id", value: "1" }]
        })
      ]
    },
    {
      name: "08. Company & Kontak",
      item: [
        createRequest("Get All Company", "GET", "/api/company"),
        createRequest("Get Company with Pagination", "GET", "/api/company/pager", {
          query: [
            { key: "page", value: "1" },
            { key: "limit", value: "10" }
          ]
        }),
        createRequest("Get Company by ID", "GET", "/api/company/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Create Company", "POST", "/api/company", {
          body: {
            name: "Pondok Pesantren Kanzul Ulum Cirebon",
            shortAddress: "Cirebon, Jawa Barat",
            address: "Jl. Pesantren No. 12, Cirebon, Jawa Barat 45153",
            whatsapp: "081234567890",
            phone: "0231-123456",
            email: "info@ponpeskanzululumcirebon.com",
            googleMapEmbedUrl: "https://maps.google.com/embed?pb=...",
            googleMapUrl: "https://maps.app.goo.gl/..."
          }
        }),
        createRequest("Update Company", "PUT", "/api/company/:id", {
          pathVars: [{ key: "id", value: "1" }],
          body: {
            name: "Pondok Pesantren Kanzul Ulum",
            shortAddress: "Cirebon, Jawa Barat",
            address: "Jl. Pesantren No. 12, Cirebon, Jawa Barat",
            whatsapp: "081234567890",
            phone: "0231-123456",
            email: "kontak@ponpeskanzululumcirebon.com"
          }
        }),
        createRequest("Delete Company", "DELETE", "/api/company/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Get All Contact Person", "GET", "/api/contact-person"),
        createRequest("Get Contact Person with Pagination", "GET", "/api/contact-person/pager", {
          query: [
            { key: "page", value: "1" },
            { key: "limit", value: "10" }
          ]
        }),
        createRequest("Get Contact Person by ID", "GET", "/api/contact-person/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Create Contact Person", "POST", "/api/contact-person", {
          body: {
            name: "Ust. Ahmad Syafi'i (Humas)",
            phone: "+628123456789"
          }
        }),
        createRequest("Update Contact Person", "PUT", "/api/contact-person/:id", {
          pathVars: [{ key: "id", value: "1" }],
          body: {
            name: "Ust. Ahmad Syafi'i (Sekretariat)",
            phone: "+628123456789"
          }
        }),
        createRequest("Delete Contact Person", "DELETE", "/api/contact-person/:id", {
          pathVars: [{ key: "id", value: "1" }]
        })
      ]
    },
    {
      name: "09. Pendaftaran",
      item: [
        createRequest("Get All Syarat Pendaftaran", "GET", "/api/syarat-pendaftaran"),
        createRequest("Get Syarat Pendaftaran with Pagination", "GET", "/api/syarat-pendaftaran/pager", {
          query: [
            { key: "page", value: "1" },
            { key: "limit", value: "10" }
          ]
        }),
        createRequest("Get Syarat Pendaftaran by ID", "GET", "/api/syarat-pendaftaran/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Create Syarat Pendaftaran", "POST", "/api/syarat-pendaftaran", {
          body: {
            categorySlug: "santri-baru",
            content: "Mengisi formulir pendaftaran serta melampirkan fotokopi Kartu Keluarga dan Akta Kelahiran."
          }
        }),
        createRequest("Update Syarat Pendaftaran", "PUT", "/api/syarat-pendaftaran/:id", {
          pathVars: [{ key: "id", value: "1" }],
          body: {
            categorySlug: "santri-baru",
            content: "Mengisi formulir pendaftaran online dan menyerahkan dokumen fisik ke sekretariat."
          }
        }),
        createRequest("Delete Syarat Pendaftaran", "DELETE", "/api/syarat-pendaftaran/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Get All Biaya Pendaftaran", "GET", "/api/biaya-pendaftaran"),
        createRequest("Get Biaya Pendaftaran with Pagination", "GET", "/api/biaya-pendaftaran/pager", {
          query: [
            { key: "page", value: "1" },
            { key: "limit", value: "10" }
          ]
        }),
        createRequest("Get Biaya Pendaftaran by ID", "GET", "/api/biaya-pendaftaran/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Create Biaya Pendaftaran", "POST", "/api/biaya-pendaftaran", {
          body: {
            categorySlug: "santri-baru",
            legend: "Uang Pendaftaran & Infaq Gedung",
            keterangan: "Dibayarkan sekali saat calon santri dinyatakan diterima",
            biaya: "Rp 1.500.000"
          }
        }),
        createRequest("Update Biaya Pendaftaran", "PUT", "/api/biaya-pendaftaran/:id", {
          pathVars: [{ key: "id", value: "1" }],
          body: {
            categorySlug: "santri-baru",
            legend: "Uang Pendaftaran & Infaq Gedung",
            keterangan: "Dapat diangsur maksimal 3 kali",
            biaya: "Rp 1.500.000"
          }
        }),
        createRequest("Delete Biaya Pendaftaran", "DELETE", "/api/biaya-pendaftaran/:id", {
          pathVars: [{ key: "id", value: "1" }]
        })
      ]
    },
    {
      name: "10. Profile",
      item: [
        createRequest("Get All Profile", "GET", "/api/profile"),
        createRequest("Get Profile with Pagination", "GET", "/api/profile/pager", {
          query: [
            { key: "page", value: "1" },
            { key: "limit", value: "10" }
          ]
        }),
        createRequest("Get Profile by ID", "GET", "/api/profile/:id", {
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Create Profile", "POST", "/api/profile", {
          body: {
            heading: "Visi & Misi",
            title: "Membina Generasi Rabbani Berakhlak Al-Qur'an",
            image: "visi-misi.jpg",
            imageUrl: "https://example.com/images/visi-misi.jpg",
            kind: "visi-misi",
            contents: [
              { id: "1", type: "paragraph", data: { text: "Menjadi pondok pesantren rujukan dalam pembinaan adab dan ilmu kepesantrenan." } }
            ],
            linkText: "Baca Selengkapnya"
          }
        }),
        createRequest("Update Profile", "PUT", "/api/profile/:id", {
          pathVars: [{ key: "id", value: "1" }],
          body: {
            heading: "Visi & Misi Pesantren",
            title: "Membina Generasi Rabbani Berakhlak Al-Qur'an",
            image: "visi-misi.jpg",
            kind: "visi-misi"
          }
        }),
        createRequest("Delete Profile", "DELETE", "/api/profile/:id", {
          pathVars: [{ key: "id", value: "1" }]
        })
      ]
    },
    {
      name: "11. Template",
      item: [
        createRequest("Get All Template", "GET", "/api/template"),
        createRequest("Get Template by ID", "GET", "/api/template/:id", {
          pathVars: [{ key: "id", value: "1" }]
        })
      ]
    },
    {
      name: "12. Navigasi & Media Sosial",
      item: [
        createRequest("Get Social Network Links", "GET", "/api/social-network-links", {
          description: "Mendapatkan tautan sosial media pondok (Facebook, Instagram, YouTube, TikTok, dll.)"
        }),
        createRequest("Get Web Navigation", "GET", "/api/web-navigation", {
          description: "Mendapatkan struktur menu dan navigasi website ponpes"
        })
      ]
    },
    {
      name: "13. File Upload",
      item: [
        createRequest("List Files", "GET", "/api/files", { description: "Mendapatkan daftar file yang telah tersimpan di KV" }),
        createRequest("Get File by ID", "GET", "/api/files/:id", {
          pathVars: [{ key: "id", value: "sample-file-id", description: "ID file (misal key file)" }]
        }),
        createRequest("Upload File (Base64)", "POST", "/api/files", {
          description: "Mengunggah file (payload JSON dengan base64 content)",
          body: {
            filename: "brosur-pendaftaran.pdf",
            content: "JVBERi0xLjQKJcTl8uXrCg==",
            contentType: "application/pdf"
          }
        }),
        createRequest("Delete File", "DELETE", "/api/files/:id", {
          pathVars: [{ key: "id", value: "sample-file-id", description: "ID file yang akan dihapus" }]
        })
      ]
    },
    {
      name: "14. Welcome Message",
      item: [
        createRequest("Get All Welcome Message", "GET", "/api/welcome-message", {
          description: "Mendapatkan semua data welcome message"
        }),
        createRequest("Get Welcome Message with Pagination", "GET", "/api/welcome-message/pager", {
          description: "Mendapatkan welcome message dengan pagination",
          query: [
            { key: "page", value: "1" },
            { key: "limit", value: "10" }
          ]
        }),
        createRequest("Get Welcome Message by ID", "GET", "/api/welcome-message/:id", {
          description: "Mendapatkan welcome message berdasarkan ID",
          pathVars: [{ key: "id", value: "1" }]
        }),
        createRequest("Create Welcome Message", "POST", "/api/welcome-message", {
          description: "Membuat data welcome message baru",
          body: {
            title: "Selamat Datang di Pondok Pesantren Kanzululum Cirebon",
            content: [
              {
                id: "42EhpkWXEQ",
                type: "paragraph",
                data: {
                  text: "Kami berkomitmen untuk memberikan pendidikan Al-Quran yang berkualitas, mengembangkan sektor pertanian, perkebunan, dan peternakan, serta menyediakan pengajaran holistik yang menggabungkan pendidikan agama dan umum. Selamat bergabung dengan kami dalam mencapai tujuan mulia kami."
                }
              }
            ]
          }
        }),
        createRequest("Update Welcome Message", "PUT", "/api/welcome-message/:id", {
          description: "Memperbarui data welcome message berdasarkan ID",
          pathVars: [{ key: "id", value: "1" }],
          body: {
            title: "Selamat Datang di Pondok Pesantren Kanzululum Cirebon",
            content: [
              {
                id: "42EhpkWXEQ",
                type: "paragraph",
                data: {
                  text: "Kami berkomitmen untuk memberikan pendidikan Al-Quran yang berkualitas, mengembangkan sektor pertanian, perkebunan, dan peternakan, serta menyediakan pengajaran holistik yang menggabungkan pendidikan agama dan umum. Selamat bergabung dengan kami dalam mencapai tujuan mulia kami."
                }
              }
            ]
          }
        }),
        createRequest("Delete Welcome Message", "DELETE", "/api/welcome-message/:id", {
          description: "Menghapus welcome message berdasarkan ID",
          pathVars: [{ key: "id", value: "1" }]
        })
      ]
    }
  ]
};

const environment = {
  id: "2c76a524-7eb3-40e8-8b98-6bb7552945d8",
  name: "Kanzul Ulum - Local",
  values: [
    {
      key: "baseUrl",
      value: "http://localhost:8787",
      type: "default",
      enabled: true
    },
    {
      key: "apiKey",
      value: "",
      type: "secret",
      enabled: true
    }
  ],
  _postman_variable_scope: "environment"
};

const collectionPath = path.join(postmanDir, "kanzul-ulum-api.postman_collection.json");
const envPath = path.join(postmanDir, "kanzul-ulum-local.postman_environment.json");

fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2), "utf8");
fs.writeFileSync(envPath, JSON.stringify(environment, null, 2), "utf8");

console.log("Collection successfully written to: " + collectionPath);
console.log("Environment successfully written to: " + envPath);
