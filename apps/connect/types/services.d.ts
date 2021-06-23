export interface MasterCategory {
  id: number
  name: string
  active: boolean
  icon: JSX.Element
  addonIcon?: JSX.Element
  categories: Category[]
}

export interface Category {
  id: number
  name: string
  icon: JSX.Element
  video: boolean
  rdmValue: number
  active: boolean
  services: Service[]
}

export interface Service {
  id: number
  name: string
  rating: number
  duration: string
  price: string
  online_only_service?: boolean
  selected: boolean
  review: number
  is_bundle: boolean
}
