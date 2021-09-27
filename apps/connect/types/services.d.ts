export interface MasterCategory {
  id: number
  name: string
  active: boolean
  image: string
  addonIcon?: JSX.Element
  Public_ServiceCategories: Category[]
}

export interface Category {
  id: number
  name: string
  image: string
  video?: boolean
  active: boolean
  Public_Services: Service[]
}

export interface Service {
  id: number
  name: string
  rating: number
  duration: string
  price: string
  online_only_service?: number
  review: number
  is_bundle?: boolean
  Public_SocialSurveyFeedback: SocialSurveyFeedback[]
}

export interface SocialSurveyFeedback {
  id: number
  date: number
  feedback_comment: string
  feedback_name: string
  feedback_status: string
  rating: number
}
