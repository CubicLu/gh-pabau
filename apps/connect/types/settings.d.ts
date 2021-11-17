export interface BookingSettings {
  email_confirm_id: number
  slot_interval: number
  sms_id: number
}

export interface BookitProGeneral {
  account_deposit: number
  advance_time: string
  allow_cancel: number
  allow_rating: boolean
  consultations_only: boolean
  coupon_active: number
  create_invoice: string
  default_payment: string
  deposit: number
  disable_extra_information: number
  disable_facebook: number
  disable_locations: number
  disable_reviews: number
  enable_bookings: number
  enable_payments: string
  enable_title: number
  fb_code: string
  fb_event: string
  force_new_existing_patient: boolean
  ga_analytics: string
  group_by_region: boolean
  gt_manager: string
  interval: number
  no_vat_prices: boolean
  offline_message: string
  only_existing: boolean
  receive_email: string
  redirect_url: string
  registration_optional: number
  replace_job_titles: number
  show_cat_photos: boolean
  show_description: boolean
  show_duration: string
  show_prices: string
  terms_conditions: string
}
export interface CompanyDetails {
  company_name: string
  website: string
  street: string
  info_email: string
  phone: string
  logo: string
  currency: string
  date_format: string
  week_start_day: string
}

export interface CompanyMeta {
  meta_name: string
  meta_value: string
}

export interface Settings {
  id: number
  image: string
  remote_connect: string
  remote_url: string
  slug: string
  BookingSettings: BookingSettings
  BookitProGeneral: BookitProGeneral
  details: CompanyDetails
  CompanyMeta: CompanyMeta[]
}
