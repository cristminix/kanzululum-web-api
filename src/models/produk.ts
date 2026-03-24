// Interface untuk struktur data produk
export interface Produk {
  id?: number
  title?: string
  kategori?: string
  tags?: string
  headline?: string
  cover?: string
  coverUrl?: string
  content?: string | any[]
  compiledHash?: string
  compiledPath?: string
  dateCreated?: string
  dateUpdated?: string
}