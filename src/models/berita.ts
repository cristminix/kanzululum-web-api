// Interface untuk struktur data berita
export interface Berita {
  id?: number
  title?: string
  tags?: string
  author?: string
  headline?: string
  cover?: string
  content?: string
  compiledHash?: string
  compiledPath?: string
  dateCreated?: string
  dateUpdated?: string
}
