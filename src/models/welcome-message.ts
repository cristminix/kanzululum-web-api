// Interface untuk struktur data block welcome message
export interface WelcomeMessageBlock {
  id?: string
  type?: string
  data?: {
    text?: string
    [key: string]: any
  }
}

// Interface untuk struktur data welcome message
export interface WelcomeMessage {
  id?: number
  title?: string
  content?: WelcomeMessageBlock[] | string | any[]
  dateCreated?: string
  dateUpdated?: string
}
