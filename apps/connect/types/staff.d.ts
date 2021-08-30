export interface User {
  email: string
  full_name: string
  id: number
  image: string
}

export interface Staff {
  ID: number
  Fname?: string
  Lname?: string
  Avatar: string
  User: User
  charges?: number
  description?: string
}
