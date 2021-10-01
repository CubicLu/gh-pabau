export interface User {
  full_name: string
  id: number
  image: string
  Public_ServiceUserTier: ServiceUserTier[]
}

export interface ServiceUserTier {
  id: number
  duration: string
  price: number
  user_id?: number
  service_id?: number
}

export interface Staff {
  ID: number
  Avatar: string
  Location?: string
  DefaultLocation?: int
  Public_User: User
}
