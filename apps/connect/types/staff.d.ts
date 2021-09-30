export interface User {
  full_name: string
  id: number
  image: string
}

export interface Staff {
  ID: number
  Avatar: string
  Location?: string
  DefaultLocation?: int
  Public_User: User
}
