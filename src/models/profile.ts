// Interface untuk struktur data profile
export interface ProfileContent {
  id?: string
  type?: string
  data?: {
    text?: string
  }
}

export interface Profile {
  heading?: string
  title?: string
  image?: string
  kind?: string
  contents?: ProfileContent[]
  linkText?: string
}