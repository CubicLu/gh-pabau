export interface MasterCategory {
  id?: number
  name?: string
  image?: string
  type?: string
  Public_ServiceCategories?: Category[]
}

export interface Category {
  id?: number
  name?: string
  cat_order?: number
  image?: string
  group_color?: string
  deposit_amount?: number
  Public_Services?: Service[]
}

export interface Service {
  id?: number
  name?: string
  friendly_name?: string
  duration?: string
  price?: number
  online_book?: number
  online_only_service?: number
  rating?: number
  max_clients?: number
  disabled_locations?: string | null
  disabled_users?: string | null
  is_bundle?: boolean
  Public_SocialSurveyFeedback?: SocialSurveyFeedback[]
  Public_ServiceUserTier?: ServiceUserTier[]
}

export interface SocialSurveyFeedback {
  id?: number
  date?: number
  feedback_comment?: string
  feedback_name?: string
  feedback_status?: string
  rating?: number
}

export interface ServiceUserTier {
  id?: number
  duration?: string
  price?: number
  service_id?: number
  user_id?: number
}
