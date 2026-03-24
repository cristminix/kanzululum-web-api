// Interface untuk struktur data hero
export interface HeroBlock {
  id: string
  type: string
  data: {
    text: string
  }
}

export interface Hero {
  id?: number
  slug?: string
  title?: HeroBlock[]
  description?: HeroBlock[]
  image?: string
  imageUrl?: string
  linkText?: string
  link?: string
  dateCreated?: string
  dateUpdated?: string
}