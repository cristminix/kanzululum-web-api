// Interface untuk struktur data web navigation
export interface WebNavigationChild {
  title?: string
  path?: string
}

export interface WebNavigation {
  id?: number
  title?: string
  path?: string
  children?: WebNavigationChild[]
}