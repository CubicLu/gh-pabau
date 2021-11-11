import { Feedback } from './feedback'

export interface User {
  full_name?: string
  id?: number
  image?: string
  Public_ServiceUserTier?: ServiceUserTier[]
  Public_SocialSurveyFeedback?: Feedback[]
}

export interface ServiceUserTier {
  id?: number
  duration?: string
  price?: number
  user_id?: number
  service_id?: number
}

export interface StaffNote {
  ID?: number
  Dependents?: string
}

export interface Staff {
  ID?: number
  Avatar?: string
  Location?: string
  DefaultLocation?: int
  Position?: string
  Public_User?: User
  Public_StaffNotes?: StaffNote
}
