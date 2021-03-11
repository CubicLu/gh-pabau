export interface TwoFactorHistory {
  id: number;
  company_id: number;
  passcode: string;
  user_id: number;
  request_date: Date;
  is_confirmed: number;
}

export interface ThirdPartyAcces {
  id: number;
  company_id: number;
  company_name: string;
  email: string;
  passcode: number;
  first_name: string;
  last_name: string;
  logo: string;
  access_id: number;
}

export interface AcceptEmailToken {
  id: number;
  company_id: number;
  email: string;
  token: number;
}

export interface AccountBalance {
  id: number;
  contact_id?: number;
  company_id: number;
  insurance_company_id: number;
  balance: undefined;
  imported: number;
}

export interface AccountBalanceLog {
  id: number;
  company_id: number;
  contact_id: number;
  insurance_company_id: number;
  amount: undefined;
  date_time: number;
  product_id?: number;
  description: string;
  sale_id: number;
  referral_id: number;
  imported: number;
  ref_sale_id: number;
}

export interface AccountManager {
  id: number;
  organisation_name?: string;
  organisation_status: number;
  organisation_type?: number;
  organisation_number?: string;
  organisation_owner?: number;
  address1?: string;
  address2?: string;
  address3?: string;
  town?: string;
  county?: string;
  post_code?: string;
  country?: string;
  tel?: string;
  alt_tel?: string;
  email?: string;
  fax?: string;
  website?: string;
  sla_contract?: number;
  vat_reg_id: string;
  created_date?: Date;
  modified_date?: Date;
  occupier?: number;
  con_per_1: string;
  con_num_1: string;
  con_per_2: string;
  con_num_2: string;
  con_per_3: string;
  con_num_3: string;
}

export interface AcLog {
  id: number;
  url_id: number;
  action_id: number;
  critical: boolean;
  occupier: number;
  user_id: number;
  date: Date;
  humanize?: string;
  user_agent: string;
  ipv4: number;
  row_aff: number;
  row_id: number;
  row_data?: string;
}

export interface AcLogAction {
  id: number;
  pabauid: string;
  action_name: string;
  action_status: boolean;
  command: string;
  table_aff: string;
  row_aff: number;
  row_id: number;
}

export interface AcLogUrl {
  id: number;
  url: string;
  file: string;
  referer: string;
}

export interface Company {
  id: number;
  user: string;
  digit8: number;
  admin: number;
  creation_date: Date;
  image: string;
  slug?: string;
  remote_url?: string;
  remote_connect?: string;
  cron_enabled?: boolean;
  advanced_marketing_free_trials?: advanced_marketing_free_trials[];
  company_migration_details?: company_migration_details;
}

export interface AdvertCampaign {
  id: number;
  advert_name: string;
  advert_type: string;
  campaign_budget: string;
  campaign_interval: string;
  campaign_audience: string;
  campaign_id: number;
  cid: number;
  attach_id: number;
  engagement: string;
  advert_reach: number;
  Clicks: number;
  start: string;
  end: string;
  url: string;
  attached_by: string;
  attach_time: string;
}

export interface ApiDebug {
  id: number;
  data_received: string;
  company_id: number;
  api_code: number;
  created_date: Date;
  data_type: string;
}

export interface ApiKey {
  id: number;
  company_id: number;
  api_key: string;
  app_type: string;
  created_date: Date;
  contacts: number;
  bookings: number;
  invoices: number;
  locations: number;
  services: number;
  staff: number;
  financials: number;
  leads: number;
  medical_forms: number;
  reports: number;
}

export interface AppBeforeAfter {
  id: number;
  company_id: number;
  contact_id: number;
  before_img: string;
  after_img: string;
  pass_key: string;
}

export interface AppPermission {
  id: number;
  company: number;
  appid: string;
}

export interface AppSubscription {
  id: number;
  key_value: string;
  name: string;
  Description: string;
  price: undefined;
}

export interface AppSubscriptionsCompanyPrice {
  id: number;
  occupier: number;
  app_key_value: string;
  price: undefined;
}

export interface AttachmentHelperLite {
  id: number;
  contact_id: number;
  f: string;
  x: string;
  type: number;
}

export interface AtAnswer {
  id: number;
  question_id: number;
  name: string;
  image: string;
}

export interface SecondAtAnswer {
  id: number;
  question_id: number;
  name: string;
}

export interface AtConcern {
  id: number;
  name: string;
  image: string;
  region: string;
}

export interface AtQuestion {
  id: number;
  company_id: number;
  name: string;
  order: number;
  region: string;
}

export interface SecondAtQuestion {
  id: number;
  company_id: number;
  name: string;
  type: string;
}

export interface AtQuestionsRelation {
  company_id: number;
  answer_id: number;
  product_id: number;
}

export interface AtQuizTake {
  id: number;
  company_id: number;
  name: string;
  email: string;
  take_date: Date;
  answers: string;
  concerns: string;
  answers2: string;
  products: string;
}

export interface AtSetting {
  id: number;
  company_id: number;
  logo: string;
  background: string;
  font_family: string;
}

export interface AtTreatment {
  id: number;
  company_id: number;
  name: string;
  image: string;
  description: string;
}

export interface AutomationAction {
  id: number;
  trigger_id: number;
  company: number;
  code: string;
  action_data: string;
  order: number;
}

export interface AutomationDelay {
  id: number;
  action_rows: string;
  data_array: string;
  code: string;
  company: number;
  delay: number;
  date_queued: Date;
  appointment_id?: number;
}

export interface AutomationFolder {
  id: number;
  company_id: number;
  name: string;
  description: string;
}

export interface AutomationLog {
  id: number;
  company: number;
  date_created: Date;
  message: string;
  parent_id?: number;
  uid?: number;
}

export interface AutomationRule {
  id: number;
  name: string;
  company: number;
  active: boolean;
  source: string;
  date_start?: Date;
  date_end?: Date;
  description: string;
  needs_config: number;
  folder_id: number;
}

export interface AutomationTrigger {
  id: number;
  rule_id: number;
  name: string;
  company: number;
  code: string;
  trigger_data: string;
  order: number;
}

export interface AvilableDatesLog {
  id: number;
  occupier: string;
  uid: number;
  date: Date;
  start: Date;
  end: Date;
}

export interface BacsAccount {
  id: number;
  bank_tag: string;
  comp_id: number;
  branch_name: string;
  account_holder: string;
  account_no: number;
  sort_code: string;
}

export interface Batch {
  id: number;
  company_id: number;
  order_id: number;
  order_item_id?: string;
  batch_no: string;
  qty: number;
  uid: number;
  creation_date: Date;
  expiry_date?: Date;
}

export interface BatchItem {
  id: number;
  batch_id: number;
  company_id: number;
  product_id: number;
  usage_date: Date;
  patient_id: number;
  created_by_id: number;
  qty: number;
  appointment_id: number;
  batch_flag: number;
}

export interface BlockReason {
  id: undefined;
  reason_name: string;
  occupier: string;
  is_active: number;
  block_color: string;
  is_paid: number;
  default_time?: string;
  type: number;
  custom_id: number;
}

export interface BnfDrug {
  id: number;
  url: string;
  page: string;
  drug_name: string;
  indications_dosage?: string;
  contra_indications?: string;
  cautions?: string;
  side_effects?: string;
  pregnancy?: string;
  breast_feeding?: string;
  prescribing_info?: string;
  patient_advice?: string;
  directions?: string;
  specific_info?: string;
}

export interface BodyChartTemplate {
  id: number;
  template_name: string;
  template_url: string;
  tags: string;
  occupier: number;
  uid: number;
  creation_date: Date;
  chart_order: number;
  template_type: number;
}

export interface BookingSetting {
  id: number;
  occupier: number;
  email_mode: number;
  sms_mode: number;
  email_id?: number;
  email_confirm_id: number;
  sms_id: number;
  email_reminder_id: number;
  auto_cal?: number;
  auto_email?: number;
  auto_sms?: number;
  auto_con?: number;
  feedback_mode: number;
  feedback_id: number;
  sms_name: string;
  feedback_days_after: number;
  feedback_send_time: Date;
  reminder_mode: number;
  days_before: number;
  send_time: Date;
  sms_days_before: number;
  sms_send_time: Date;
  class_sms_days_before: number;
  class_sms_send_time: Date;
  room_support: number;
  feedback_fromemail: string;
  confirm_fromemail: string;
  sms_from?: string;
  reminder_fromemail: string;
  send_sms: number;
  send_email: number;
  send_reminder: number;
  send_feedback: number;
  attach_invoice: number;
  start_time: string;
  end_time: string;
  booking_emails: string;
  slot_interval: number;
  font_color: string;
  disable_second_cal: number;
  font_size: number;
  disable_time: number;
  lock_timer: number;
  disable_surname: number;
  arrived_color: string;
  complete_color: string;
  cancel_sms_notify: number;
  cancel_email_notify: number;
  reschedule_sms_notify: number;
  reschedule_email_notify: number;
  noshow_email_notify: number;
  class_noshow_email_notify: number;
  class_reschedule_email_notify: number;
  class_reminder_email_notify: number;
  class_noshow_sms_notify: number;
  class_reschedule_sms_notify: number;
  class_reminder_sms_notify: number;
  noshow_sms_notify: number;
  location_support: number;
  noshow_count: number;
  reschedule_sms_from: string;
  reschedule_sms_tmpl: number;
  reschedule_email_from: string;
  reschedule_email_tmpl: number;
  cancel_sms_from: string;
  cancel_sms_tmpl: number;
  cancel_email_from: string;
  cancel_email_tmpl: number;
  sms_confirm_id: number;
  noshow_email_from: string;
  noshow_email_tmpl: number;
  class_noshow_email_tmpl: number;
  class_reschedule_email_tmpl: number;
  class_reminder_email_tmpl: number;
  class_noshow_sms_tmpl: number;
  class_reschedule_sms_tmpl: number;
  class_reminder_sms_tmpl: number;
  noshow_sms_from: string;
  noshow_sms_tmpl: number;
  column_total: number;
  tooltip_head: string;
  tooltip_body: string;
  appt_head: string;
  appt_body: string;
  holiday_reset_date?: number;
  holiday_usual_day?: string;
  holiday_per_month?: string;
  holiday_default?: string;
  group_booking_change_email_enable?: number;
  group_booking_change_template_id?: number;
  group_booking_cancel_email_enable: boolean;
  group_booking_cancel_template_id: number;
  package_used_email_enable: number;
  package_used_template_id: number;
  disable_ics?: number;
  initials: number;
  disable_service_filter: number;
  disable_book_by_package: number;
  allow_overlapping_appts: number;
  modified_by: number;
  modified_date: Date;
  conference_reminder_id?: number;
}

export interface BookingMaster {
  id: number;
  class_id: string;
  user_id: string;
  booking_date?: string;
  payment_status: booking_master_payment_status;
  cancel_status: booking_master_cancel_status;
  cancel_date: string;
  company_id: string;
  class_currency?: string;
  class_price?: string;
  checked_in: number;
  payed_by: string;
  waiting: number;
}

export interface BookingStatus {
  id: number;
  name: string;
  value: string;
  icon: string;
  icon_color: string;
  company_id: number;
  indicator?: booking_statuses_indicator;
  basic_field: boolean;
  ord: number;
  track_time: boolean;
}

export interface BookingStatusChange {
  id: number;
  booking_id: number;
  status: string;
  start_date: Date;
  end_date?: Date;
  company_id: number;
  user_id: number;
}

export interface BookitProGeneral {
  id: number;
  occupier: string;
  advance_time: string;
  enable_payments: string;
  paypal_address: string;
  receive_email: string;
  create_invoice: string;
  deposit: number;
  show_prices: string;
  show_duration: string;
  show_description: boolean;
  header_color: string;
  booking_emails: string;
  online_color: string;
  warning_message: string;
  allow_cancel: number;
  disable_facebook: number;
  interval: number;
  disable_extra_information: number;
  coupon_active: number;
  payment_api_url: string;
  account_deposit: undefined;
  replace_job_titles: number;
  hide_facebook_share: number;
  enable_bookings: number;
  default_payment: string;
  registration_optional: number;
  consultations_only?: boolean;
  only_existing: boolean;
  stripe_reciever: number;
  stripe_public_key: string;
  stripe_private_key: string;
  offline_message: string;
  disable_locations: number;
  theme: string;
  promo_codes: boolean;
  terms_conditions: string;
  ga_analytics: string;
  gt_manager?: string;
  fb_code: string;
  fb_event: string;
  doc_shared_template: number;
  classes_email_confirm: number;
  sage_vendor: string;
  sage_username: string;
  sage_password: string;
  gc_public_key: string;
  gc_private_key: string;
  enable_title?: number;
  group_by_region: boolean;
  use_new_connect: boolean;
  disable_reviews: number;
  allow_rating: boolean;
  show_cat_photos: boolean;
  class_columns: string;
  no_vat_prices: boolean;
  integration_method?: bookitpro_general_integration_method;
  rolling_deposit: number;
  one_touch_book: boolean;
  new_stripe: number;
  enable_master_cat: boolean;
  stripe_fee: undefined;
  reccuring_search_btn: string;
  force_new_existing_patient: boolean;
  redirect_url: string;
  connect_url?: string;
}

export interface BookitProSlider {
  id: number;
  slider1: string;
  slider2: string;
  slider3: string;
  slider4: string;
  occupier: string;
}

export interface BookmarkedPage {
  id: number;
  uid: number;
  link: string;
  companyid: number;
  title: string;
  icon: string;
}

export interface BugLog {
  id: number;
  bug_message: string;
  datetime: number;
  uid: number;
  related_id: number;
}

export interface CalendarView {
  id: number;
  occupier: number;
  user_id: number;
  viewMode: string;
  dayViewMode: string;
  employeesViewMode: string;
  employeeGroupsViewMode: string;
  locationsViewMode: string;
  roomsViewMode: string;
  serviceMastersViewMode: string;
  serviceGroupsViewMode: string;
  servicesViewMode: string;
  appointmentSize: number;
  favorite_name: string;
  favorite_shared: number;
  favorite: number;
  favorite_id: number;
}

export interface CalRangeRequest {
  id: number;
  minutes: undefined;
  company_id: number;
  start_date: Date;
  end_date: Date;
}

export interface CampaignAttachment {
  id: number;
  campaign_id: number;
  occupier: number;
  attach_time: string;
  attach_user_name: string;
  attachment_type: string;
  attach_id: number;
}

export interface CancellationPolicy {
  id: number;
  is_active: number;
  policy_type: number;
  policy_action: number;
  policy_value: undefined;
  policy_notice: string;
  policy_message?: string;
  policy_override: number;
  payment_protection: number;
  advanced_cancellation_fee: number;
  no_show_fee: number;
  occupier: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface MarketingSource {
  id: undefined;
  source_name: string;
  company_id: string;
  custom_id: number;
  public: number;
  imported: number;
}

export interface MediaLlibraryAttachments {
  id: number;
  file_url: string;
  company_id: number;
  contact_id: number;
  communication_id: undefined;
  medical_form_contact_id: number;
  contact_attachment_id: number;
  sales_id: number;
  statement_id: number;
  creation_date: Date;
}

export interface CancelReason {
  id: undefined;
  reason_name: string;
  occupier: string;
  late_cancel: number;
  apply_cancellation_policy: number;
  created_at: Date;
  modified_at: Date;
}

export interface candidate {
  id: number;
  contact_id: number;
  created_date: Date;
  opening_id: number;
  rating: number;
  candidate_status?: string;
  job_references: string;
  how_heard: string;
  referred_by: string;
  cover_letter: string;
  resume: string;
  date_available: Date;
  linkedin: string;
  company_id: number;
}

export interface CardTypes {
  id: number;
  company_id: number;
  mastercard: number;
  visa: number;
  amex: number;
  visa_credit: number;
  maestro: number;
  worldpay: number;
  visa_credit_charge: undefined;
  amex_credit_charge: undefined;
  mastercard_credit_charge: undefined;
  enable_reference: number;
}

export interface CashupReport {
  id: number;
  company_id: number;
  staff_id: number;
  location_id: number;
  float_amount: undefined;
  opening_balance: undefined;
  cash_amount: undefined;
  cash_actual: undefined;
  cash_difference: undefined;
  cheque_amount: undefined;
  cheque_actual: undefined;
  cheque_difference: undefined;
  card_amount: undefined;
  card_actual: undefined;
  card_difference: undefined;
  giftvoucher_amount: undefined;
  giftvoucher_actual: undefined;
  giftvoucher_difference: undefined;
  comments: string;
  cashup_date: Date;
  finance_id: undefined;
}

export interface CashupReportCustom {
  id: undefined;
  company_id: string;
  location_id: number;
  cashup_date: Date;
  custom_type: string;
  custom_amount: undefined;
  custom_actual: undefined;
  custom_difference: undefined;
  card_type: string;
}

export interface CheckinAppt {
  id: number;
  appt_id: number;
  spotify_uri: string;
}

export interface CheckinAverages {
  id: number;
  uid: number;
  product_id: number;
  avg_time_seconds: number;
}

export interface CheckinAveragesIdle {
  id: number;
  username: string;
  uid: number;
  avg?: number;
  retailutilisation_avg?: number;
}

export interface CheckinProduct {
  id: number;
  queue_id: number;
  product_id: number;
  date_start?: Date;
  date_end?: Date;
  inv_product_id: number;
}

export interface CheckinQueue {
  id: number;
  uid: number;
  been_before: boolean;
  date_start: Date;
  accepted: boolean;
  is_lunch: boolean;
  name: string;
  date_accepted?: Date;
  date_end?: Date;
  was_anyone: boolean;
  finalise?: boolean;
  sms_number?: string;
  sms_sent?: Date;
  sms_wanted?: boolean;
  skips: number;
  connect_id?: number;
  order: number;
  spotify_uri?: string;
  date_binned?: Date;
}

export interface ClasstypeMaster {
  ctype_id: number;
  ctype_name?: string;
  ctype_compid: string;
  ctype_date: string;
  ctype_color: string;
  ctype_description: string;
  payment_option_disabled: number;
  credit_option_disabled: number;
}

export interface ClassCategories {
  id: number;
  code: string;
  name: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface ClassGuests {
  id: number;
  guest_name: string;
  signing_date: number;
  class_id: number;
  company_id: number;
  cancel_status: number;
  mobile: string;
}

export interface ClassMaster {
  c_id: number;
  c_companyid?: number;
  c_type?: number;
  c_teacher?: number;
  c_location?: number;
  c_room?: number;
  c_slots?: string;
  c_price?: undefined;
  c_date?: string;
  c_time?: string;
  c_duration?: string;
  c_day?: string;
  c_exptime?: string;
  c_book?: string;
  c_empty?: string;
  c_formattime?: string;
  c_startformattime?: string;
  class_pay?: class_master_class_pay;
  cancel_status: number;
  product_id: number;
  sign_in_type: string;
}

export interface ClassNotes {
  id: number;
  class_id: number;
  note: string;
  author: string;
  public: number;
  avatar: string;
  post_date: string;
}

export interface CompanyDetails {
  details_id: number;
  company_id: number;
  company_name: string;
  subscription: string;
  industry_sector: string;
  employees: string;
  website: string;
  street: string;
  city: string;
  county: string;
  post_code: string;
  country: string;
  phone: string;
  fax: string;
  info_email: string;
  admin: number;
  logo: string;
  currency: string;
  facebook_page: string;
  twitter_page: string;
  head_office: number;
  footer_logo: string;
  header_logo: string;
  vat: string;
  date_format: string;
  week_start_day: string;
  auto_sms: number;
  sms_active: number;
  db_lock: number;
  stock_manager: string;
  company_notes: string;
  timezone_id?: undefined;
  converted_value: undefined;
  enable_2fa: number;
  enable_ad: number;
  enable_ad_code?: string;
  enable_ip_filter?: number;
  demo_mode: number;
  linkedin_page: string;
  youtube_page: string;
  is_surgical: number;
  private_treatment_notes: number;
  accept_insurance: number;
  phone_prefix: number;
  tax_name: company_details_tax_name;
  secure_medical_forms: number;
  debrand_logo: number;
  default_search: string;
  calendar_version: string;
  contact_term_singular: string;
  contact_term_plural: string;
  flag_enabled: number;
  lock_prescription: number;
  show_report_logo: boolean;
  rota_version: string;
  use_google_auth: boolean;
  employee_clock_track: boolean;
  slug?: string;
  default_inv_template_id: number;
  diagnosis_codes_type: string;
  append_client_pref: number;
  capital_surname: boolean;
  disable_prescriptions: number;
  cycles_display: number;
  enable_sens_data: number;
  class_term_singular: string;
  class_term_plural: string;
  sensitive_data_question: number;
  legacy_consultations: boolean;
  class_teacher_singular: string;
  employee_term_singular: string;
  employee_term_plural: string;
  medical_approvals: number;
  new_reports: number;
  merge_bookings_tabs: boolean;
  preferences_sms: number;
  preferences_email: number;
  preferences_post: number;
  preferences_newsletters: number;
  healthcode_live?: boolean;
  lock_export: number;
  language: string;
  completed_setup: boolean;
  timezone?: Timezone;
  company_details_trigger_company_detailsTocompany_details_trigger_company_id?: company_details_trigger[];
  company_details_trigger_company_detailsTocompany_details_trigger_details_id?: company_details_trigger[];
}

export interface CompanySubscription {
  license_id: number;
  company_id: number;
  license_type: number;
  license_expiry: Date;
  active: number;
  code: string;
  max_user_count: number;
  uid: number;
  suspend_sms: number;
  sms_rate: undefined;
  setup_stage: string;
  disable_sms: number;
  payment_id: string;
  warning_level: string;
  subscription_name: string;
  subscription_fee: undefined;
  suspended_on: string;
  demo_account: number;
  suspension_reason: string;
  pabau_score: number;
  gc_email: string;
  payment_bounces: number;
  training_status: number;
  setup_status: number;
  order_sheet: number;
  complete_account: number;
  complete_notes: string;
  details_status: number;
  training_date: string;
  bill_cycle: Date;
  renew_interval: string;
  exclude_reports: number;
  sub_start_date: Date;
  price_range: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  trial: boolean;
  storage: undefined;
  free_users: number;
  gc_customer_id: string;
  low_credit_amount: number;
  low_sms_action: number;
  activity_logs: number;
  account_live: number;
  discount: undefined;
  gc_plan_id: string;
  support_plan: string;
  support_fee: undefined;
  gc_support_plan_id: string;
  enterprise_user_cost: undefined;
  gc_enterprise_plan_id: string;
  enterprise_fee: undefined;
  gc_amount: undefined;
  leave_alert: boolean;
  stripe_fee: undefined;
  stripe_fee_type: string;
  previous_system: string;
  am_group: string;
  phone_support: number;
  slack_support: number;
  whatsapp_support: number;
  multiple_locations: number;
  commission_rate: undefined;
  live_server: string;
  sandbox_server: string;
  server_comp_id: number;
  partner_id: string;
  advanced_marketing_addon: number;
  advanced_marketing_plan_id?: string;
  free_months?: number;
  hide_in_comps?: boolean;
  am_start_date?: Date;
  trainer_id?: number;
  onboarder_id?: number;
  is_referral?: number;
  company_subscription_trigger_company_subscriptionTocompany_subscription_trigger_company_id?: company_subscription_trigger[];
  company_subscription_trigger_company_subscriptionTocompany_subscription_trigger_license_id?: company_subscription_trigger[];
}

export interface Timezone {
  timezone_id: undefined;
  label: string;
  php_format: string;
  db_format: string;
  offset_seconds: number;
  supported: boolean;
  CompanyDetails?: CompanyDetails[];
}

export interface ClassProduct {
  id: number;
  code: string;
  name: string;
  unit?: string;
  size: string;
  product_order?: number;
  um: string;
  cost?: undefined;
  price: undefined;
  alert_quantity: number;
  image?: string;
  category_id: number;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  product_desc: string;
}

export interface ClassSmsHistory {
  id: number;
  class_id: number;
  user_id: number;
  message: string;
  datetime: string;
}

export interface ClassTemplateSetting {
  id: number;
  company_id: number;
  class_wait_list_template_enable?: number;
  class_wait_list_template_id?: number;
  class_wait_list_sms_template_enable: number;
  class_wait_list_sms_template_id: number;
  uid?: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface CleverpinSetting {
  id: number;
  image_url: string;
  company_id: number;
}

export interface ClientFormSetting {
  id: number;
  company_id: number;
  enable_medical: number;
  form_id: number;
  not_seen_months: number;
  enable_new_and_old: number;
  checked_by_default: number;
  new_client_template: number;
  not_seen_template: number;
}

export interface ClinicalSoftware {
  id: number;
  name: string;
  difficulty: number;
  frequency: number;
}

export interface ClockinBreak {
  break_time_id: undefined;
  clock_id: undefined;
  break_time_start: undefined;
  break_time_out: undefined;
}

export interface ClockinLongpoll {
  id: number;
  clocked_out: boolean;
  uid: number;
  occupier: number;
}

export interface ClockinTimesheet {
  clock_id: number;
  staff_uid: number;
  company_id: number;
  clockin: number;
  clockout: number;
  total_break_time: undefined;
  total_working_time: undefined;
  notes: string;
  approved: boolean;
  staff_name: string;
  ip_address: string;
}

export interface CmAccountNote {
  ID: number;
  OwnerID: number;
  AccountID: number;
  Note: string;
  Status: cm_account_notes_Status;
  CreatedDate: Date;
  IpAddress: number;
}

export interface CmAppointmentsCustomImportHelper {
  id: number;
  occupier: number;
  custom_appointment_id: number;
  custom_contact_name: string;
  custom_field_name: string;
  custom_field_value?: string;
  added: number;
  appointment_id: number;
}

export interface CmAppointmentCustom {
  id: number;
  appointment_id: number;
  occupier: number;
  custom_field_id: number;
  custom_field_value: string;
  imported: number;
}

export interface CmAuthorization {
  id: number;
  company_id: number;
  appointment_id: number;
  contact_id: number;
  title: string;
  total_sessions: number;
  diagnosis_code: string;
}

export interface CmBookingNote {
  ID: number;
  OwnerID: number;
  AppointmentID: number;
  Note: string;
  Status: cm_booking_notes_Status;
  CreatedDate: Date;
  IpAddress: number;
}

export interface CmCase {
  id: number;
  case_number: string;
  company_id: number;
  type?: string;
  contact?: string;
  email?: string;
  subject?: string;
  phone?: string;
  request?: string;
  critical?: string;
  description?: string;
  related_to?: number;
  module_type?: number;
  user_id?: number;
  module2_type?: number;
  user2_id?: number;
  ownerid?: number;
  status?: string;
  priority?: string;
  reason?: string;
  reported_by?: string;
  comments?: string;
  CreatedDate?: number;
  IpAddress?: string;
}

export interface CmCaseNote {
  ID: number;
  OwnerID: number;
  CaseID: number;
  Note: string;
  Status: cm_case_notes_Status;
  CreatedDate: Date;
  IpAddress: number;
}

export interface CmCaseReply {
  ID: number;
  OwnerID: number;
  CaseID: number;
  Description: string;
  CreatedDate: Date;
  IpAddress: number;
  CompanyID: number;
}

export interface CmCampaign {
  ID: number;
  OwnerID: string;
  company_id: string;
  CompaignName: string;
  Type: number;
  Status: number;
  StartDate: Date;
  EndDate: Date;
  ExpectedRevenue: string;
  BudgetedCost: string;
  ActualCost: string;
  ExpectedResponse: string;
  NumSent: string;
  Description: string;
  CreatedDate: Date;
  IpAddress: number;
}

export interface CmCampaignNote {
  ID: number;
  OwnerID: number;
  BookingID: number;
  Note: string;
  Status: cm_compaign_notes_Status;
  CreatedDate: Date;
  IpAddress: number;
}

export interface CmContact {
  ID: number;
  Avatar: string;
  OwnerID: number;
  Salutation: string;
  Fname: string;
  Occupier: number;
  location_id: number;
  Email: string;
  Phone: string;
  OtherPhone: string;
  Mobile: string;
  Assistant: string;
  ReportsTo: string;
  LeadSource: string;
  Lname: string;
  Title: string;
  Department: string;
  HomePhone: string;
  Fax: string;
  DOB?: Date;
  AsstPhone: string;
  EmailOptOut: cm_contacts_EmailOptOut;
  SkypeId: string;
  AddToQuickBooks: cm_contacts_AddToQuickBooks;
  SecondaryEmail: string;
  Twitter: string;
  MailingStreet: string;
  OtherStreet: string;
  MailingCity: string;
  OtherCity: string;
  MailingProvince: string;
  OtherProvince: string;
  MailingPostal: string;
  OtherPostal: string;
  MailingCountry: string;
  OtherCountry: string;
  Description: string;
  Status: cm_contacts_Status;
  CreatedDate: Date;
  IpAddress: number;
  fbimg: string;
  MarketingSource: number;
  RefferalSource?: string;
  LeadID: undefined;
  group_tag: string;
  polite_notice: string;
  custom_id: string;
  gender: string;
  MarketingOptInAll?: number;
  MarketingOptInEmail?: number;
  MarketingOptInPhone?: number;
  MarketingOptInPost?: number;
  MarketingOptInText?: number;
  notes_drop: string;
  imported: number;
  alerts_drop: string;
  MarketingSourceRelated: number;
  customer_reference: string;
  MarketingOptInNewsletter: number;
  custom_marketing_source: string;
  insurer_id: number;
  is_active: number;
  xero_contact_id: string;
  is_ambassador: number;
  UpdatedDate: Date;
  xero_updated_date: Date;
  discount_type: number;
  custom_clinic_id: number;
  ambassador_id: number;
  contract_id: number;
  privacy_policy: string;
  need_to_knows: boolean;
  contact_type: number;
}

export interface invPaymentType {
  id: number;
  name?: string;
  epos_display?: number;
  description?: string;
  company_id?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  is_active: number;
  is_money: number;
  type: string;
}

export interface User {
  id: number;
  username?: string;
  full_name: string;
  password?: string;
  password_algor?: number;
  salt?: string;
  created?: Date;
  last_login?: Date;
  company_id: number;
  hash: string;
  email: string;
  admin: number;
  address: string;
  timezone: string;
  locale: string;
  language: string;
  job_title: string;
  department: string;
  division: string;
  super: number;
  default_page: string;
  signature: string;
  image: string;
  position: string;
  location: string;
  deleted: number;
  pass_code: string;
  phone_number: string;
  hide_online_bookings: number;
  passcode: string;
  last_loaded_page: string;
  temporary_password: boolean;
  custom_id: string;
  hide_calendar: number;
  calendar_order: number;
  clocked_in?: Date;
  clocked_out?: Date;
  last_password_reset: number;
  force_password: number;
  limited_user: number;
  can_void: number;
  can_refund: boolean;
  can_report: number;
  can_rota: number;
  staff_read_only: number;
  stock_read_only: number;
  all_reports: number;
  performance_stats: number;
  disable_tutorial: number;
  all_services: number;
  delete_treatment: number;
  admin_tasks: number;
  admin_leads: number;
  imported: number;
  login_fail_count: number;
  can_edit_booking_time: number;
  user_color: string;
  disable_multiple_clinics: number;
  is_hcp: number;
  login_disabled: number;
  can_patient_appoint: number;
  can_patient_communicatons: number;
  can_patient_photos: number;
  can_patient_fiancials: number;
  can_patient_treatments: number;
  can_patient_docs: number;
  can_patient_packages: number;
  can_patient_prescription: number;
  can_patient_consents: number;
  can_patient_giftvoucher: number;
  can_patient_loyalty: number;
  can_patient_recall: number;
  can_patient_memberships: number;
  can_cancel_booking: number;
  notify_on_booking: boolean;
  can_edit_communications: boolean;
  can_delete_communications: boolean;
  can_view_full_cal: boolean;
  permission_last_role: string;
  can_merge: boolean;
  can_discount?: number;
  can_discount_single: boolean;
  restored: number;
  google_auth_secret?: string;
  default_contract_id: number;
  can_see_personal: number;
  appear_on_rota: number;
  can_patient_medical_history: number;
  can_lab_requests: boolean;
  detailed_view: number;
  can_make_blockout: number;
  can_delete_blockout: number;
  can_move_blockout: number;
  main_contact: boolean;
  user_security_questions_answer?: UserSecurityQuestionsAnser[];
}

export interface UserSecurityQuestionsAnser {
  id: number;
  user_id: number;
  question: string;
  question_no: number;
  answer: string;
  users: User;
}

export interface advanced_marketing_free_trials {
  id: number;
  company_id: number;
  created_at: Date;
  updated_at: Date;
  start_date: Date;
  end_date: Date;
  cancelled: number;
  admin: Company;
}

export interface advanced_marketing_pricing_plans {
  id: number;
  subscription_name: string;
  subscription_price: number;
  created_at: Date;
  updated_at: Date;
  start_date: Date;
  end_date: Date;
  gc_plan_id?: string;
  stripe_plan_id?: string;
}

export interface at_concern_choices {
  company_id: number;
  concern_id: number;
}

export interface at_concern_relations {
  company_id: number;
  concern_id: number;
  product_id: number;
}

export interface cm_contacts_alerts_import_helper {
  id: number;
  contact_custom_id: number;
  alert: string;
  date: string;
  custom_user_name: string;
  occupier: string;
  imported: number;
  custom_user_id: number;
  added: number;
}

export interface cm_contacts_backup_hb {
  ID: number;
  Avatar: string;
  OwnerID: number;
  Salutation: string;
  Fname: string;
  Occupier: number;
  Email: string;
  Phone: string;
  OtherPhone: string;
  Mobile: string;
  Assistant: string;
  ReportsTo: string;
  LeadSource: string;
  Lname: string;
  Title: string;
  Department: string;
  HomePhone: string;
  Fax: string;
  DOB?: Date;
  AsstPhone: string;
  EmailOptOut: cm_contacts_backup_hb_EmailOptOut;
  SkypeId: string;
  AddToQuickBooks: cm_contacts_backup_hb_AddToQuickBooks;
  SecondaryEmail: string;
  Twitter: string;
  MailingStreet: string;
  OtherStreet: string;
  MailingCity: string;
  OtherCity: string;
  MailingProvince: string;
  OtherProvince: string;
  MailingPostal: string;
  OtherPostal: string;
  MailingCountry: string;
  OtherCountry: string;
  Description: string;
  Status: cm_contacts_backup_hb_Status;
  CreatedDate: Date;
  IpAddress: number;
  fbimg: string;
  MarketingSource: number;
  RefferalSource?: string;
  LeadID: undefined;
  group_tag: string;
  polite_notice: string;
  custom_id: undefined;
  gender: string;
  MarketingOptInAll?: number;
  MarketingOptInEmail?: number;
  MarketingOptInPhone?: number;
  MarketingOptInPost?: number;
  MarketingOptInText?: number;
  notes_drop: string;
  imported: number;
  alerts_drop: string;
  MarketingSourceRelated: number;
  customer_reference: string;
}

export interface cm_contacts_custom {
  id: number;
  contact_id: number;
  occupier: number;
  custom_field_id: number;
  custom_field_label: string;
  custom_field_value: string;
  imported: number;
  old_value: string;
}

export interface cm_contacts_custom_import_helper {
  id: number;
  occupier: number;
  custom_contact_id: number;
  custom_contact_name: string;
  custom_field_name: string;
  custom_field_value?: string;
  added: number;
  contact_id: number;
}

export interface cm_contacts_import_disabled {
  id: number;
  occupier: number;
  custom_id: number;
  disabled: number;
}

export interface cm_contacts_import_helper {
  id: number;
  contact_name: string;
  Email: string;
  occupier: string;
}

export interface cm_contacts_import_helper2 {
  id: number;
  Salutation: string;
  First_Name: string;
  Last_Name: string;
  Email: string;
  Mobile: string;
  Home: string;
  OtherPhone: string;
  Fax: string;
  Address1: string;
  Address2: string;
  City: string;
  County: string;
  Country: string;
  Postcode: string;
  DOB: string;
  Gender: string;
  Notes: string;
  group_tag: string;
  custom_id: string;
  occupier: string;
  imported: number;
  MarketingOptInAll: number;
  MarketingOptInEmail: number;
  MarketingOptInPhone: number;
  MarketingOptInPost: number;
  MarketingOptInText: number;
  category: string;
  patient_no: string;
  marketing_source: string;
  alerts: string;
  next_of_kin: string;
  CreatedDate: Date;
  UpdatedDate: Date;
  Insurer: string;
  GP_Name: string;
  GP_Address: string;
  clinic_id: number;
  is_active: number;
  custom_user_name: string;
  marketing_source_other: string;
  date_closed: string;
  contact_id: number;
}

export interface cm_contacts_json {
  id: number;
  occupier: number;
  clients_json: string;
  date_updated: Date;
}

export interface cm_contacts_locations {
  id: number;
  company_id: number;
  contact_id: number;
  location_id: number;
}

export interface cm_contacts_notes_import_helper {
  id: number;
  contact_custom_id: number;
  note: string;
  date: string;
  custom_user_name: string;
  occupier: string;
  imported: number;
  custom_user_id: number;
  added: number;
  custom_contact_name: string;
  contact_id: number;
  user_id: number;
}

export interface cm_contacts_search {
  id: number;
  string: string;
  company: number;
  result: number;
}

export interface cm_contacts_travels {
  id: number;
  contact_id: number;
  country_id: number;
  start_date: Date;
  end_date: Date;
  company_id: number;
  duration: string;
  mode: number;
  uid: number;
  medical_record_id: number;
  creation_date: Date;
  modified_date: Date;
}

export interface cm_contacts_viewed {
  id: number;
  contact_id: number;
  user_id: number;
  occupier: string;
  date: Date;
}

export interface cm_contact_alerts {
  ID: number;
  OwnerID: number;
  ContactID: number;
  Note: string;
  Status: cm_contact_alerts_Status;
  CreatedDate: Date;
  IpAddress: number;
  Critical: number;
  medical_conditions_id: number;
}

export interface cm_contact_medical_conditions {
  id: number;
  company_id: number;
  contact_id: number;
  medical_condition_id: number;
  medical_record_id: number;
  is_active: boolean;
}

export interface cm_contact_notes {
  ID: number;
  OwnerID: number;
  ContactID: number;
  Note: string;
  Status: cm_contact_notes_Status;
  CreatedDate: Date;
  IpAddress: string;
  imported: boolean;
}

export interface cm_contact_views {
  id: number;
  company_id: number;
  view_name: string;
  view_data: string;
}

export interface cm_contact_view_staff {
  id: number;
  view_id: number;
  staff_id: number;
  company_id: number;
}

export interface cm_coupons {
  id: number;
  coupon_title: string;
  coupon_details: string;
  coupon_image: string;
  coupon_start_date: string;
  coupon_expiry_date: string;
  coupon_code: string;
  coupon_amount: string;
  coupon_rate_type: string;
  coupon_created_date: Date;
  company: string;
  created_by: number;
  coupon_impressions: undefined;
  coupons_sent: undefined;
  coupon_max_amount: number;
}

export interface cm_coupon_claimed {
  id: number;
  coupon_id: number;
  claim_date: Date;
  claim_full_name: string;
  claim_email: string;
  active: number;
}

export interface cm_coupon_clicks {
  id: undefined;
  coupon_id: undefined;
  click_date: Date;
}

export interface cm_drugs {
  id: number;
  name: string;
  occupier: number;
  dosage: string;
  units: string;
  frequency: string;
  route: string;
  comment: string;
  is_active: boolean;
  product_id: number;
  lot_number: string;
  expiry_date: Date;
  field_order?: number;
  is_vaccine: number;
  is_required: number;
  custom_id: string;
  max_age: number;
  min_age: number;
  nathnac_link: string;
  travax_link: string;
}

export interface cm_extra_gym {
  id: number;
  contact_id: number;
  primary_goal: string;
  intro_class: string;
  age_group: string;
  occupier: number;
  skill_level: string;
  membership: string;
}

export interface cm_extra_patient {
  id: number;
  contact_id: number;
  nhs_number: number;
  gp: string;
  surgeon: string;
  occupier: number;
  date_of_death: string;
  external_clinic: string;
  assigned_clinic: string;
  treatment_group: number;
  assigned_diary: number;
  marketing_source: number;
  referral_source: number;
}

export interface cm_extra_salon {
  id: number;
  contact_id: number;
  primary_service: string;
  hair_length: string;
  hair_texture: string;
  occupier: number;
  skin_type: string;
}

export interface cm_invoice_notes {
  ID: number;
  OwnerID: number;
  InvoiceID: number;
  Note: string;
  Status: cm_invoice_notes_Status;
  CreatedDate: Date;
  IpAddress: number;
}

export interface cm_leads {
  ID: number;
  Avatar: string;
  OwnerID: number;
  ContactID: number;
  Salutation: string;
  Fname: string;
  Lname: string;
  DOB: Date;
  Title: string;
  LeadCompany: string;
  Occupier: number;
  Email: string;
  Phone: string;
  Fax: string;
  Mobile: string;
  Website: string;
  LeadSource: number;
  LeadStatus: number;
  Industry: string;
  NoOfEmp: string;
  AnualRevenue: string;
  Rating: number;
  EmailOptOut: cm_leads_EmailOptOut;
  SkypeId: string;
  SecondaryEmail: string;
  Twitter: string;
  MailingStreet: string;
  MailingCity: string;
  MailingProvince: string;
  MailingPostal: string;
  MailingCountry: string;
  Description: string;
  EnumStatus: cm_leads_EnumStatus;
  Status: cm_leads_Status;
  CreatedDate: Date;
  MarketingOptInAll: number;
  MarketingOptInEmail: number;
  MarketingOptInPhone: number;
  MarketingOptInPost: number;
  MarketingOptInText: number;
  MarketingOptInNewsletter: number;
  IpAddress: string;
  fbimg: string;
  LastUpdated: string;
  custom_tag1: string;
  online_capture: number;
  capture_id: number;
  old_LeadStatus: number;
  custom_id: string;
  imported: number;
  ConvertDate: Date;
  group_id: number;
  first_interaction: Date;
  latest_interaction: Date;
  location_id: number;
  need_to_knows: number;
}

export interface cm_leads_custom {
  id: number;
  lead_id: number;
  occupier: number;
  custom_field_id: number;
  custom_field_label: string;
  custom_field_value: string;
  imported: number;
  old_value: string;
}

export interface cm_leads_fields_order {
  id: number;
  field_id: number;
  field_name: string;
  occupier: number;
  order_id: number;
  is_more: number;
}

export interface cm_leads_groups {
  id: number;
  name: string;
  company_id: number;
  is_default: boolean;
  default_view: number;
  restrict_view: boolean;
  auto_assign_user: number;
}

export interface cm_lead_group_services {
  id: number;
  group_id: number;
  service_name: string;
  company_id: number;
}

export interface cm_lead_group_staff {
  id: number;
  group_id: number;
  staff_id: number;
  company_id: number;
}

export interface cm_lead_notes {
  ID: number;
  OwnerID: number;
  LeadID: number;
  Note: string;
  Status: cm_lead_notes_Status;
  CreatedDate: Date;
  IpAddress: number;
}

export interface cm_linkprw {
  ID: number;
  postId: number;
  url: string;
  video: cm_linkprw_video;
  videoIframe: string;
  title: string;
  content: string;
  thumb: string;
  hrefurl: string;
  imageId: string;
}

export interface cm_locations_custom {
  id: number;
  location_id: number;
  custom_field_id: number;
  custom_field_value: string;
  occupier: number;
}

export interface cm_medical_conditions {
  id: number;
  name: string;
  occupier: number;
  custom_id: string;
  is_common: number;
}

export interface cm_notes_custom {
  id: number;
  contact_id: number;
  occupier: number;
  user: number;
  custom_field_id: number;
  custom_field_label: string;
  custom_field_value: string;
  created_date: Date;
  imported: boolean;
  is_read: boolean;
}

export interface cm_opportunity {
  id: number;
  company_id: number;
  contact_id: number;
  appointment_id: number;
  created_date: Date;
  updated_date: Date;
  created_by: number;
  status: number;
  pipeline_id: number;
  current_stage_id: number;
  closure_id: number;
}

export interface cm_payments_custom {
  id: number;
  payment_id: number;
  occupier: number;
  custom_field_id: number;
  custom_field_value: string;
  imported: number;
}

export interface cm_poll {
  ID: number;
  Question: string;
}

export interface cm_poll_answer {
  cm_poll_answer_id: number;
  pollId: number;
  userId: number;
  optionId: number;
  time: number;
}

export interface cm_poll_option {
  ID: number;
  pollId: number;
  Answer: string;
}

export interface cm_potentials {
  ID: number;
  OwnerID: string;
  Occupier: string;
  PotentialName: string;
  Amount: string;
  ClosingDate: string;
  PotentialCompany: string;
  Stage: number;
  Probability: string;
  Type: string;
  NextStep: string;
  ExpectedRevenue: string;
  LeadSource: number;
  ContactID: number;
  Description: string;
  Status: cm_potentials_Status;
  CreatedDate: Date;
  IpAddress: number;
  LeadID: number;
}

export interface cm_potential_notes {
  ID: number;
  OwnerID: number;
  PotentialID: number;
  Note: string;
  Status: cm_potential_notes_Status;
  CreatedDate: Date;
  IpAddress: number;
}

export interface cm_potential_stages {
  ID: number;
  PotentialID: string;
  Amount: string;
  ClosingDate: string;
  Stage: number;
  Probability: string;
  ExpectedRevenue: string;
  CreatedDate: Date;
  IpAddress: number;
}

export interface cm_products_custom {
  id: number;
  product_id: number;
  occupier: number;
  custom_field_id: number;
  custom_field_value: string;
}

export interface cm_purchase_items {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  cost_price?: number;
  amount_received: number;
}

export interface cm_purchase_order {
  id: number;
  order_no: string;
  date: number;
  status: string;
  company_id: number;
  location_id?: number;
  user_id: number;
  supplier_id: number;
  supplier_status: string;
  delivery_date?: Date;
  notes: string;
  is_hidden: number;
  destination_arrival: string;
  freight_terms: string;
  terms_of_payment: string;
  currency: string;
  tags: string;
  category_id: number;
  lpo_number: string;
  grn_number: string;
}

export interface cm_refs {
  id: number;
  refby: number;
  refto: number;
  date: Date;
  status: string;
  occupier: number;
  sent_to_email: string;
  sent_to_sms: number;
  refferer_thanked_email: number;
  refferer_thanked_sms: number;
  refferer_thanked_voucher: number;
  refferee_thanked_email: number;
  refferee_thanked_sms: number;
  referee_thanked_voucher: number;
  sent_to_name: string;
  referred_by_name: string;
}

export interface cm_rota_custom {
  id: number;
  rota_id: number;
  occupier: number;
  custom_field_id: number;
  custom_field_value: string;
  imported: number;
}

export interface cm_sales_custom {
  id: number;
  sale_id: number;
  occupier: number;
  custom_field_id: number;
  custom_field_value: string;
  imported: number;
}

export interface cm_services_custom {
  id: number;
  service_id: number;
  occupier: number;
  custom_field_id: number;
  custom_field_value: string;
}

export interface cm_solution_notes {
  ID: number;
  OwnerID: number;
  SolutionID: number;
  Note: string;
  Status: cm_solution_notes_Status;
  CreatedDate: Date;
  IpAddress: number;
}

export interface cm_staff_commission {
  id: number;
  company_id: number;
  staff_id: number;
  pabau_id: number;
  employee_name: string;
  commission_type: string;
  tier_1_from: undefined;
  tier_1_to: undefined;
  tier_1_percent: string;
  tier_2_from: undefined;
  tier_2_to: undefined;
  tier_2_percent: string;
  tier_3_from: undefined;
  tier_3_to: undefined;
  tier_3_percent: undefined;
  tier_4_from: undefined;
  tier_4_to: undefined;
  tier_4_percent: string;
  tier_5_from: undefined;
  tier_5_to: undefined;
  tier_5_percent: string;
}

export interface cm_staff_custom {
  id: number;
  staff_id: number;
  occupier: number;
  custom_field_id: number;
  custom_field_label: string;
  custom_field_value: string;
  imported: number;
  old_value: string;
}

export interface cm_staff_documents {
  ID: number;
  StaffID: number;
  Date: Date;
  Name: string;
  Type: number;
  File: string;
}

export interface cm_staff_emergency {
  ID: number;
  StaffID: number;
  ContactName: string;
  Relationship: string;
  Address1: string;
  Address2: string;
  City: string;
  St: string;
  Zip: string;
  HomePhone: string;
  WorkPhone: string;
  CellPhone: string;
  ContactName2: string;
  Relationship2: string;
  Address12: string;
  Address22: string;
  City2: string;
  St2: string;
  Zip2: string;
  HomePhone2: string;
  WorkPhone2: string;
  CellPhone2: string;
  PhysicianName: string;
  Phone: string;
  SpecialNotes: string;
}

export interface cm_staff_evaluations {
  ID: number;
  StaffID: number;
  Date: Date;
  Description: string;
  Initials: string;
  Comments: string;
}

export interface cm_staff_evaluation_cats {
  ID: number;
  EvalID: number;
  EvalCatID: number;
  Comments: string;
  Score: undefined;
}

export interface cm_staff_general {
  ID: number;
  OwnerID: string;
  Occupier: string;
  Avatar: string;
  Fname: string;
  Lname: string;
  MI: string;
  Birthdate?: Date;
  SSN: string;
  Address1: string;
  Address2: string;
  City: string;
  St: string;
  Zip: string;
  Country: string;
  HomePhone: string;
  WorkPhone: string;
  CellPhone: string;
  Fax: string;
  Email: string;
  Status: number;
  EmployeeNumber: string;
  HireDate: Date;
  RenewalDate: Date;
  max_vacation_days?: number;
  Location: string;
  Position: number;
  Department: number;
  Manager: number;
  W4Status: number;
  Exemptions: string;
  Gender: number;
  EEOCode: number;
  EEOCategory: number;
  NextReview: Date;
  EnumStatus: cm_staff_general_EnumStatus;
  CreatedDate: Date;
  IpAddress: number;
  pabau_id: number;
  DefaultLocation: number;
  consultation_fee: undefined;
  deleted_on: string;
  secretary: string;
  secretary_enable: boolean;
  Salutation: string;
  commission_sheet_id: number;
}

export interface cm_staff_incidents {
  ID: number;
  StaffID: number;
  Date: string;
  Type: cm_staff_incidents_Type;
  Title: string;
  late_by?: number;
  Notes: string;
}

export interface cm_staff_notes {
  ID: number;
  StaffID: number;
  Dependents: string;
  Education: string;
  Hobbies: string;
  Training: string;
  Volunteer: string;
  Prescription: string;
}

export interface cm_staff_payrolls {
  ID: number;
  StaffID: number;
  StartDate: Date;
  Transaction: number;
  TransactionRate: undefined;
  TransactionTime: undefined;
  Note: string;
  PostedBy: string;
  NewBalance: undefined;
  AccountType: cm_staff_payrolls_AccountType;
  LengthOfAbsence: string;
  LengthOfAbsenceVal: string;
}

export interface cm_staff_separation {
  ID: number;
  StaffID: number;
  Date: Date;
  Rehire: string;
  SeparationReason: number;
  Comments: string;
  EnrolDate: Date;
  DeclinedDate: Date;
  PaymentAmount: string;
  EndDate: Date;
  Notes: string;
}

export interface cm_staff_trainings {
  ID: number;
  StaffID: number;
  Title: string;
  Category: string;
  Type: string;
  StartDate: string;
  EndDate: string;
  Hours: string;
  Cost: string;
  Note: string;
  Agency: string;
  Location: string;
}

export interface cm_staff_users {
  ID: number;
  StaffID: number;
  Field1: string;
  Value1: string;
  Field2: string;
  Value2: string;
  Field3: string;
  Value3: string;
  Field4: string;
  Value4: string;
  Field5: string;
  Value5: string;
  Field6: string;
  Value6: string;
  Field7: string;
  Value7: string;
  Field8: string;
  Value8: string;
  Field9: string;
  Value9: string;
  Field10: string;
  Value10: string;
  Field11: string;
  Value11: Date;
  Field12: string;
  Value12: Date;
  Field13: string;
  Value13: Date;
  Field14: string;
  Value14: Date;
  Field15: string;
  Value15: Date;
  Field16: string;
  Value16: string;
  Field17: string;
  Value17: string;
  Field18: string;
  Value18: string;
  Field19: string;
  Value19: string;
  Field20: string;
  Value20: string;
}

export interface cm_staff_wages {
  ID: number;
  StaffID: number;
  Date: Date;
  Position: number;
  Rate: string;
  Type: cm_staff_wages_Type;
  Note: string;
}

export interface cm_tagging {
  ID: number;
  postId: number;
  type: string;
  tag_id: number;
}

export interface cm_tasks {
  ID: number;
  occupier: string;
  userid: string;
  title: string;
  description: string;
  attachment: string;
  status: cm_tasks_status;
  CreatedDate: Date;
  EditedDate: Date;
  custom_task_name: string;
}

export interface cm_task_assignment {
  ID: number;
  taskid: number;
  assignedby: string;
  assignedto: string;
  taskStatus: cm_task_assignment_taskStatus;
  CreatedDate: Date;
}

export interface cm_task_notes {
  ID: number;
  OwnerID: number;
  TaskID: number;
  Note: string;
  Status: cm_task_notes_Status;
  CreatedDate: Date;
  IpAddress: number;
}

export interface cm_vaccines {
  id: number;
  cm_drugs_id: number;
  name: string;
  schedule_day: string;
  cover_months: string;
  recall_type_ids: string;
  administration_date: Date;
  last_modified: Date;
  modified_by: number;
  company_id: number;
  field_order: number;
  is_deleted: number;
}

export interface cm_vaccines_types {
  id: number;
  name: string;
  field_order: number;
  company_id: number;
}

export interface cm_vaccine_disease {
  id: number;
  company_id: number;
  vaccine_id: number;
  disease_id: number;
  imported: number;
  is_required: number;
}

export interface cm_vouchers {
  id: number;
  code?: string;
  type?: cm_vouchers_type;
  description: string;
  amount?: undefined;
  valid?: cm_vouchers_valid;
  date_from?: Date;
  date_to?: Date;
  time_from?: Date;
  time_to?: Date;
  expiry_date?: Date;
  every?: cm_vouchers_every;
  occupier?: number;
  purchased_for: string;
  purchased_by?: string;
  status: string;
  remaining_balance: undefined;
  lead_id: number;
  voucher_contact_email: string;
  voucher_contact_mobile: number;
  purchase_date: Date;
  purchaser_contact_id: number;
  purchased_for_id: number;
  imported: number;
  voucher_type: number;
  sales_id: number;
  sms_campaign_id: number;
  template_id: number;
}

export interface cm_vouchers_import_helper {
  id: number;
  occupier: number;
  imported: number;
  custom_contact_id: number;
  custom_contact_name: string;
  custom_id: string;
  date_from: Date;
  date_to: Date;
  custom_user_name: string;
  amount: string;
  remaining: string;
  contact_id: number;
  date_sold: Date;
  code: string;
}

export interface cm_voucher_history {
  id: number;
  voucher_id: number;
  amount_used: undefined;
  sale_id: number;
}

export interface cm_wallposts {
  ID: number;
  userId: number;
  company: number;
  description: string;
  attachment: boolean;
  linkprw: cm_wallposts_linkprw;
  post_time: number;
  status: cm_wallposts_status;
  ipAddress: number;
}

export interface cm_wallpost_comment {
  ID: number;
  activitytId: number;
  userId: number;
  comment: string;
  time: number;
  ipAddress: number;
}

export interface cm_wallpost_files {
  ID: number;
  postId: number;
  filetype: boolean;
  filename: string;
  original: string;
}

export interface cm_wallpost_pinned {
  post_id: number;
  occupier: number;
  user_posted: number;
  user_target: number;
  from_pabau?: string;
  from_source: string;
  title: string;
  message?: string;
  url: string;
  date_expires: Date;
  date_created: Date;
  color_background: string;
  color_text: string;
  icon_image: string;
}

export interface code_set {
  id: number;
  set_name: string;
  company_id: number;
  layers: number;
}

export interface column_filter {
  id: number;
  occupier: number;
  user_id: number;
  filter_type: string;
  filter_data: string;
}

export interface commission_amendment {
  id: number;
  partner_company_id: number;
  from_date: Date;
  to_date: Date;
  amount: undefined;
  description: string;
  company_id: number;
  uid: number;
  creation_date: Date;
  modified_date?: Date;
}

export interface commission_sheet {
  id: number;
  sheet_name: string;
  company_id: number;
  description: string;
  type: number;
}

export interface commission_sheet_settings {
  id: number;
  company_id: number;
  products_col?: string;
  charge_client_col?: string;
  facility_fee_col?: string;
  facility_fee2_col?: string;
  deduct_consum_col?: string;
  payout_emp_col?: string;
  products_active?: number;
  charge_client_active?: number;
  facility_fee_active?: number;
  facility_fee2_active?: number;
  deduct_consum_active?: number;
  payout_emp_active?: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface communications {
  id: number;
  company_id: number;
  from_address: string;
  uid: number;
  location_id: number;
  type: communications_type;
  secure: boolean;
  date: Date;
  communications_content_id: number;
  related_id?: number;
  related_type?: communications_related_type;
  communications_content: communications_content;
  communications_recipients?: communications_recipients[];
}

export interface communications_content {
  id: number;
  company_id: number;
  hash: string;
  subject?: string;
  body: string;
  communications?: communications[];
}

export interface communications_hashes {
  id: number;
  comm_recipient_id: number;
  hash: string;
  communications_recipients: communications_recipients;
}

export interface communications_providers {
  id: number;
  code: string;
  name: string;
  communications_recipients?: communications_recipients[];
}

export interface communications_recipients {
  id: number;
  communications_id: number;
  recipient_id: number;
  recipient_type: communications_recipients_recipient_type;
  remote_key?: string;
  delivered_result?: string;
  read_count: number;
  to_address: string;
  cc: string;
  provider_id: number;
  status?: communications_recipients_status;
  merge_values: string;
  communications: communications;
  communications_providers: communications_providers;
  communications_hashes?: communications_hashes[];
}

export interface communication_id_pairs {
  id: number;
  old_id: number;
  new_id: number;
  type: boolean;
  failed: number;
  call_log_fixed: boolean;
}

export interface communication_log {
  id: number;
  status: string;
  subject: string;
  sentby: string;
  source: string;
  to: string;
  companyid: number;
  email_by: string;
  message: string;
  date: number;
  communication_type: string;
  contact_id: number;
  site_section: string;
  custom_id: number;
  contact_custom_id: number;
  imported: number;
  Practitioner_id: number;
  User_id: number;
  email_read: number;
  result_log: string;
  template_id: number;
  header: string;
  footer: string;
  sms_delivery_status: string;
  mandrill_email_id: string;
  mandril_status: string;
  sensitive_data: boolean;
  cc: string;
  booking_id: number;
}

export interface communication_log_appointments {
  id: number;
  communication_id: number;
  appt_id: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface communication_log_attachments {
  id: number;
  communication_id: number;
  occupier: string;
  contact_id: number;
  file_url: string;
}

export interface communication_log_email {
  id: number;
  from_email_id: number;
  template_id: number;
  contact_id: number;
  company_id: number;
  sent_date: Date;
  status: number;
}

export interface communication_log_fails {
  id: number;
  sql_query: string;
}

export interface communication_log_letter_recipient {
  id: number;
  communication_id: number;
  recipient_type: string;
  recipient: number;
}

export interface communication_receipient {
  id: number;
  communication_id?: number;
  receipient_id?: string;
  creation_date?: Date;
}

export interface company_app_subscriptions {
  id: number;
  occupier: number;
  app_key_value: string;
  gc_app_plan_id: string;
  app_fee: undefined;
}

export interface company_attached_products {
  id: number;
  company_services_id?: number;
  product_id?: number;
}

export interface company_bday_settings {
  bday_id: undefined;
  bday_cid: undefined;
  bday_before: number;
  bday_file: string;
  bday_update: undefined;
  bday_eSender?: number;
  bday_eSubject: string;
  bday_eMessage: string;
  status: company_bday_settings_status;
  email_activated: number;
  sms_activated: number;
  bday_sMessage: string;
  bday_sName: string;
  bday_before_sms: number;
  module: string;
  email_template_id: number;
  sms_template_id: number;
}

export interface company_branches {
  id: number;
  group_id: number;
  company_id: number;
  address: string;
  street: string;
  city: string;
  county: string;
  name: string;
  postcode: string;
  online_bookings: number;
  phone: string;
  website: string;
  is_active: number;
  bookable_online: number;
  calendar_bookable: number;
  is_default: boolean;
  lat: number;
  lng: number;
  custom_id: string;
  email: string;
  send_conf_email: number;
  show_online: number;
  loc_order: number;
  region: string;
  invoice_template_id: number;
  color: string;
  notify_on_lead: boolean;
  notice?: string;
}

export interface company_branches_attachments {
  id: number;
  company_id: number;
  location_id: number;
  type: company_branches_attachments_type;
  url: string;
  description: string;
}

export interface company_branches_merge_tags {
  id: number;
  company_id: number;
  location_id: number;
  tag_name: string;
  tag_value: string;
  tag_type: string;
}

export interface company_branch_groups {
  id: number;
  name?: string;
  shared_data: number;
  company_id: number;
}

export interface company_branch_variables {
  id: number;
  branch_id: number;
  key: string;
  value: string;
  date_created: Date;
  date_updated?: Date;
}

export interface company_departments {
  id: number;
  company: number;
  department: string;
}

export interface company_details_trigger {
  id: number;
  created_at: Date;
  is_synced: number;
  details_id: number;
  company_id: number;
  company_name: string;
  subscription: string;
  industry_sector: string;
  employees: string;
  website: string;
  street: string;
  city: string;
  county: string;
  post_code: string;
  country: string;
  phone: string;
  fax: string;
  info_email: string;
  admin: number;
  logo: string;
  currency: string;
  facebook_page: string;
  twitter_page: string;
  head_office: number;
  footer_logo: string;
  header_logo: string;
  vat: string;
  date_format: string;
  week_start_day: string;
  auto_sms: number;
  sms_active: number;
  db_lock: number;
  stock_manager: string;
  company_notes: string;
  timezone_id?: undefined;
  converted_value: undefined;
  enable_2fa: number;
  enable_ad: number;
  enable_ad_code?: string;
  enable_ip_filter?: number;
  demo_mode: number;
  linkedin_page: string;
  youtube_page: string;
  is_surgical: number;
  private_treatment_notes: number;
  accept_insurance: number;
  phone_prefix: number;
  tax_name: company_details_trigger_tax_name;
  secure_medical_forms: number;
  debrand_logo: number;
  default_search: string;
  calendar_version: string;
  contact_term_singular: string;
  contact_term_plural: string;
  flag_enabled: number;
  lock_prescription: number;
  show_report_logo: boolean;
  rota_version: string;
  use_google_auth: boolean;
  employee_clock_track: boolean;
  slug?: string;
  default_inv_template_id: number;
  diagnosis_codes_type: string;
  append_client_pref: number;
  capital_surname: boolean;
  disable_prescriptions: number;
  cycles_display: number;
  enable_sens_data: number;
  class_term_singular: string;
  class_term_plural: string;
  sensitive_data_question: number;
  legacy_consultations: boolean;
  class_teacher_singular: string;
  employee_term_singular: string;
  employee_term_plural: string;
  medical_approvals: number;
  new_reports: number;
  merge_bookings_tabs: boolean;
  preferences_sms: number;
  preferences_email: number;
  preferences_post: number;
  preferences_newsletters: number;
  healthcode_live?: boolean;
  lock_export: number;
  language: string;
  completed_setup: boolean;
  company_details_company_detailsTocompany_details_trigger_company_id: CompanyDetails;
  company_details_company_detailsTocompany_details_trigger_details_id: CompanyDetails;
}

export interface company_emails {
  company_id: number;
  company_email: string;
  added_by: string;
  email_id: number;
  senders_name: string;
  confirmed: number;
  hash: string;
  default_email: number;
  enterprise_email: number;
  merge_tags: string;
}

export interface company_form_builder_details {
  id: number;
  company_id: number;
  form_name?: string;
  form_dir_name?: number;
  created_by?: number;
  created_date?: Date;
}

export interface company_ga_filtering {
  id: number;
  company_id: number;
  ipv4_range_start: number;
  ipv4_range_end: number;
}

export interface company_groups {
  ID: undefined;
  Name: string;
  occupier: string;
  category_product_id: undefined;
  cat_order: number;
  image: string;
  online_enabled: number;
  group_color: string;
  import_id: number;
  equipment_id: number;
  deposit_amount: undefined;
  tax_id: number;
  master_cat_id: number;
  company_position_id: number;
}

export interface company_hits {
  id: number;
  company_id: number;
  hits: number;
  file: string;
}

export interface company_ip_filtering {
  ip_filtering_id: number;
  company_id: number;
  ipv4_range_start: string;
  ipv4_range_end: string;
}

export interface company_lic_types {
  id: number;
  title: string;
  description: string;
}

export interface company_locations {
  id: number;
  company: number;
  location: string;
}

export interface company_log {
  id: number;
  log_date: Date;
  text: string;
  category: string;
  severe: boolean;
  company: number;
}

export interface company_mailserver {
  id: undefined;
  company_id: undefined;
  host: string;
  port: number;
  secure: string;
  username: string;
  password: string;
}

export interface company_master {
  comp_id: number;
  comp_username?: string;
  comp_password?: string;
  comp_title?: string;
  comp_currency?: string;
  comp_logo?: string;
  comp_paypalemail?: string;
  comp_background?: string;
  login_timeout: number;
  default_page: string;
}

export interface company_meta {
  id: number;
  company_id: number;
  meta_name: string;
  meta_value: string;
}

export interface company_migration_details {
  company_id: number;
  node_name: string;
  node_id: number;
  pod_id: number;
  admin: Company;
}

export interface company_notes {
  id: number;
  company_id: number;
  user_id: number;
  note: string;
  created_date: Date;
  is_alert: boolean;
}

export interface company_permissions {
  id: number;
  companyid: number;
  section: string;
}

export interface company_policies {
  id: number;
  company_id: number;
  privacy_policy: string;
}

export interface company_positions {
  id: number;
  company: number;
  position: string;
}

export interface company_rooms {
  id: number;
  company: number;
  description: string;
  slots: number;
  all_services: number;
  is_active: number;
  all_locations: boolean;
  field_order: number;
  room_fee_type: string;
  room_fee: undefined;
  prod_id: number;
  imported: number;
  custom_id: string;
}

export interface company_rooms_locations {
  id: number;
  room_id: number;
  location_id: number;
}

export interface company_rooms_services {
  id: number;
  room_id: number;
  service_id: number;
  occupier: string;
  priority_order: number;
  imported: number;
}

export interface company_services {
  id: number;
  company: number;
  service: string;
  duration: string;
  description: string;
  price: undefined;
  disabledusers?: string;
  color?: string;
  group_id: undefined;
  online_book: number;
  product_id: undefined;
  imported: number;
  communication_template: number;
  service_order: number;
  sms_mode: number;
  sms_name: string;
  sms_days_after: number;
  sms_send_time: string;
  sms_id: number;
  treatment_group_id: number;
  custom_id: string;
  pos_only: number;
  prep_time: number;
  finish_time: number;
  deposit_amount: undefined;
  friendly_name: string;
  max_clients: number;
  default_room_id: number;
  follow_up_period: number;
  deposit_type: company_services_deposit_type;
  max_models: number;
  availability: company_services_availability;
  force_credit_payment: number;
  disabled_locations: string;
  addon_services: string;
  service_participants?: string;
  with_summary_title?: string;
  online_book_type: company_services_online_book_type;
  proc_code: string;
  duration_day: number;
  invoice_text?: string;
  invoice_item_name?: string;
  online_only_service: number;
}

export interface company_services_backup {
  id: number;
  company: number;
  service: string;
  duration: string;
  description: string;
  price: undefined;
  disabledusers?: string;
  color?: string;
  group_id: undefined;
  online_book: number;
  product_id: undefined;
  imported: number;
  communication_template: number;
  service_order: number;
  sms_mode: number;
  sms_name: string;
  sms_days_after: number;
  sms_send_time: string;
  sms_id: number;
  treatment_group_id: number;
  custom_id: string;
  pos_only: number;
  prep_time: number;
  finish_time: number;
  deposit_amount: undefined;
  friendly_name: string;
  max_clients: number;
  default_room_id: number;
  follow_up_period: number;
  deposit_type: company_services_backup_deposit_type;
  max_models: number;
  availability: company_services_backup_availability;
}

export interface company_services_bundle_items {
  id: number;
  occupier: number;
  service_id: number;
  item_type: string;
  item_id: number;
  item_qty: number;
}

export interface company_services_default_rooms {
  id: number;
  default_rooms?: string;
  occupier?: number;
  group_id?: number;
}

export interface company_services_equipment {
  id: number;
  company_id: string;
  service_id: number;
  equipment_id: number;
  equipment_quantity: number;
  priority_order: number;
}

export interface company_services_import_helper {
  id: number;
  service: string;
  custom_id: string;
  color: string;
  occupier: number;
  imported: number;
}

export interface company_services_medical_forms {
  id: number;
  company_id: number;
  service_id: number;
  form_id: number;
}

export interface company_services_position_price {
  id: number;
  company_services_id?: number;
  position_id?: number;
  position_name?: string;
  price?: undefined;
  occupier?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface company_services_position_timings {
  id: number;
  company_services_id?: number;
  position_id?: number;
  position_name?: string;
  duration?: string;
  occupier?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface company_services_priority_rooms {
  id: number;
  occupier: number;
  service_id: number;
  room_id: number;
  priority_order: number;
}

export interface company_services_retail_products {
  id: number;
  occupier: number;
  service_id: number;
  product_id: number;
  quantity: number;
  consumable_deduction: number;
}

export interface company_services_users_tiers {
  id: number;
  service_id: number;
  user_id: number;
  company_id: number;
  price?: undefined;
  duration: string;
  staff_commission?: undefined;
  participant_commission?: undefined;
}

export interface company_subscription_trigger {
  id: number;
  created_at: Date;
  is_synced: number;
  license_id: number;
  company_id: number;
  license_type: number;
  license_expiry: Date;
  active: number;
  code: string;
  max_user_count: number;
  uid: number;
  suspend_sms: number;
  sms_rate: undefined;
  setup_stage: string;
  disable_sms: number;
  payment_id: string;
  warning_level: string;
  subscription_name: string;
  subscription_fee: undefined;
  suspended_on: string;
  demo_account: number;
  suspension_reason: string;
  pabau_score: number;
  gc_email: string;
  payment_bounces: number;
  training_status: number;
  setup_status: number;
  order_sheet: number;
  complete_account: number;
  complete_notes: string;
  details_status: number;
  training_date: string;
  bill_cycle: Date;
  renew_interval: string;
  exclude_reports: number;
  sub_start_date: Date;
  price_range: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  trial: boolean;
  storage: undefined;
  free_users: number;
  gc_customer_id: string;
  low_credit_amount: number;
  low_sms_action: number;
  activity_logs: number;
  account_live: number;
  discount: undefined;
  gc_plan_id: string;
  support_plan: string;
  support_fee: undefined;
  gc_support_plan_id: string;
  enterprise_user_cost: undefined;
  gc_enterprise_plan_id: string;
  enterprise_fee: undefined;
  gc_amount: undefined;
  leave_alert: boolean;
  stripe_fee: undefined;
  stripe_fee_type: string;
  previous_system: string;
  am_group: string;
  phone_support: number;
  slack_support: number;
  whatsapp_support: number;
  multiple_locations: number;
  commission_rate: undefined;
  live_server: string;
  sandbox_server: string;
  server_comp_id: number;
  partner_id: string;
  advanced_marketing_addon: number;
  advanced_marketing_plan_id?: string;
  free_months?: number;
  hide_in_comps?: boolean;
  am_start_date?: Date;
  trainer_id?: number;
  onboarder_id?: number;
  is_referral?: number;
  company_subscription_company_subscriptionTocompany_subscription_trigger_company_id: CompanySubscription;
  company_subscription_company_subscriptionTocompany_subscription_trigger_license_id: CompanySubscription;
}

export interface company_treatment_products {
  id: number;
  product_id: undefined;
  group_id: undefined;
  occupier: number;
}

export interface company_variables {
  id: number;
  company: number;
  key: string;
  value: string;
  date_created: Date;
}

export interface comp_emails_send_criteria {
  id: number;
  interest_area: comp_emails_send_criteria_interest_area;
  area_item_id: number;
  comm_id: number;
  company_id: number;
}

export interface comp_sms_send_criteria {
  id: number;
  interest_area: comp_sms_send_criteria_interest_area;
  area_item_id: number;
  comm_id: number;
  company_id: number;
}

export interface config {
  id: number;
  name: string;
  value: string;
  occupier: number;
}

export interface configure_voucher_settings {
  id: number;
  value?: undefined;
  expiry_date?: string;
  enable?: number;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface connect_bookings_log {
  id: number;
  appointment_id: number;
  contact_id: number;
  mobile: number;
  browser: string;
  date_tracked: Date;
  company_id: number;
}

export interface connect_card {
  id: number;
  expiry: string;
  name: string;
  cvv: number;
  uid: number;
  company_id: number;
  card: string;
  card_type: string;
}

export interface connect_fields {
  id: number;
  occupier: number;
  first_name: string;
  last_name: string;
  mobile: string;
  address: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
}

export interface connect_general {
  id: number;
  username: string;
  advance: string;
  notify: string;
  login: string;
  employee: string;
  date: string;
  occupier: string;
  paypal_address: string;
  paypal_currency: string;
  template_id: number;
  from_email: string;
  payment_api_url: string;
  signature: string;
  service_order: string;
  sms_template_id: number;
  enable_email_notification: number;
  enable_sms_notification: number;
  password_template_id: number;
  client_template_id: number;
}

export interface connect_registration_fields {
  id: number;
  company_id: number;
  fields_data: string;
}

export interface connect_stats {
  id: number;
  company_id: number;
  user_id: number;
  date: Date;
  ip_address: string;
  step_location: number;
  step_service: number;
  step_employee: number;
  step_date: number;
  step_login: number;
  converted: number;
}

export interface connect_theme {
  id: number;
  occupier: string;
  title: string;
  bgcolor: string;
  bgimage: string;
  logoimage: string;
  customtitle: string;
  customcontent: string;
  headercolor: string;
  footercolor: string;
  buttoncolor: string;
  boxshadowcolor: string;
  timecolor: string;
  fontcolor: string;
  buttontextcolor: string;
  linkcolor: string;
}

export interface connect_user_log {
  id: number;
  contact_id: number;
  date: number;
  company_id: number;
  ip_address: string;
}

export interface consultation_theme {
  id: number;
  company_id: number;
  header_theme: string;
  logo: string;
  button_col: string;
  background_image: string;
  video_url: string;
  intro_message: string;
}

export interface contact_attachment {
  id: number;
  linkref: string;
  contact_id: number;
  company_id: number;
  date: number;
  attach_name: string;
  user_id: number;
  attachment_type: string;
  connect_public: number;
  website_public: number;
  attachment_title: string;
  cloud: boolean;
  custom_id: number;
  original_path: string;
  imported: number;
  booking_id: number;
  photo_type: string;
  attachment_size: string;
  broken: number;
  broken_check: number;
  old_linkref: string;
  in_folder: number;
  custom_contact_id: number;
  album_id: number;
  medical_form_id: number;
  tags: string;
  medical_uniqid: string;
}

export interface contact_attachment_backup {
  id: number;
  linkref: string;
  contact_id: number;
  company_id: number;
  date: number;
  attach_name: string;
  attachment_type: string;
  connect_public: number;
  website_public: number;
  attachment_title: string;
  cloud: boolean;
  custom_id: number;
  original_path: string;
  imported: number;
  booking_id: number;
  photo_type: string;
  attachment_size: string;
  broken: number;
  broken_check: number;
  old_linkref: string;
  in_folder: number;
  added: number;
}

export interface contact_attachment_history_trigger {
  id: number;
  mode: string;
  contact_attachment_id: number;
  linkref: string;
  contact_id: number;
  company_id: number;
  date: number;
  attach_name: string;
  attachment_type: string;
  connect_public: number;
  website_public: number;
  attachment_title: string;
  cloud: boolean;
  custom_id: number;
  original_path: string;
  imported: number;
  booking_id: number;
  photo_type: string;
  attachment_size: string;
  broken: number;
  broken_check: number;
  old_linkref: string;
  in_folder: number;
  date_changed: Date;
}

export interface contact_attachment_missing {
  id: number;
  occupier: number;
  file_name: string;
  date: string;
  missing: number;
}

export interface contact_attachment_restore {
  id: number;
  linkref: string;
  contact_id: number;
  company_id: number;
  date: number;
  attach_name: string;
  attachment_type: string;
  connect_public: number;
  website_public: number;
  attachment_title: string;
  cloud: boolean;
  custom_id: number;
  original_path: string;
  imported: number;
  booking_id: number;
  photo_type: string;
  attachment_size: string;
  broken: number;
  broken_check: number;
  old_linkref: string;
  in_folder: number;
  custom_contact_id: number;
}

export interface contact_images_import_helper {
  id: number;
  custom_contact_id: number;
  Fname: string;
  Lname: string;
  custom_user_name: string;
  image_url: string;
  created_date: Date;
  occupier: number;
  imported: number;
  added: number;
  not_found: number;
}

export interface contact_insurance {
  id: number;
  contact_id: number;
  provider_number: number;
  auth_code: string;
  membership_number: string;
  charge_type: string;
  company_id: number;
  imported: number;
}

export interface contact_insurer {
  id: number;
  contact_id: number;
  company_id: number;
  insurer_id: number;
}

export interface contact_meta {
  id: number;
  contact_id: number;
  meta_name: string;
  meta_value: string;
}

export interface contact_packages {
  id: undefined;
  contact_id: undefined;
  package_id: undefined;
  invoice_id?: undefined;
  activation_date: Date;
  expiration_date: Date;
  occupier: string;
  CreatedDate: Date;
  sold_by: number;
  code: string;
  voided: number;
  voided_by: number;
  custom_status: string;
  imported: number;
  package_code: string;
  old_invoice_id: number;
  custom_id: number;
}

export interface contact_package_used {
  id: undefined;
  contact_package_id: undefined;
  date_created: Date;
  booking_id: undefined;
  status: string;
  book_take: number;
  cancel_take: number;
  occupier: number;
  booking_master_id: undefined;
  old_booking_id: number;
}

export interface contact_relations {
  id: number;
  main_contact_id: number;
  rel_contact_id: number;
  relation_id: number;
  imported: boolean;
}

export interface contact_relations_types {
  id: number;
  reverse_is: number;
  relation_name: string;
  company_id: number;
}

export interface contact_types {
  id: number;
  company_id: number;
  name: string;
  minimal_fields: boolean;
}

export interface contact_zip_files {
  id: number;
  occupier: string;
  contact_id: number;
  file_name: string;
  linkhref: string;
  status: number;
  user_id: number;
  date_added: Date;
  date_processing: Date;
  date_processed: Date;
}

export interface contract_folders {
  id: number;
  company_id: number;
  name: string;
  description: string;
}

export interface converted_balances {
  id: number;
  time: number;
  sale_id: number;
  company_id: number;
}

export interface countries {
  CountryCode: string;
  country_name: string;
  Currency: string;
  Continent: string;
  country_id: number;
  phone_prefix: number;
  sms_base_rate: undefined;
  date_format: string;
  tax_name: string;
  sms_multiplier: undefined;
  general_information: string;
  vaccine_recommendations: string;
  other_risks: string;
  outbreaks: string;
  malaria: string;
  nathnac_url: string;
  travax_url: string;
  gmaps_url: string;
  custom_id: string;
}

export interface country {
  id: undefined;
  name: string;
  iso2: string;
  iso3: string;
  iso3_number: number;
}

export interface country_disease {
  id: number;
  company_id: number;
  country_id: number;
  disease_id: number;
  risk_level: string;
  imported: number;
}

export interface course {
  id: number;
  course_name: string;
  course_description: string;
  section_id: number;
  order: number;
  duration: string;
  video_link: string;
  category_id: number;
  audio: number;
  coming_soon: number;
  created_date: string;
  zendesk_article: string;
}

export interface course_category {
  id: number;
  category_name: string;
  order: number;
  description: string;
  hidden: number;
  course_goal: string;
  coming_soon: number;
  pre_cat: number;
  category_section: string;
}

export interface course_complete {
  id: number;
  uid: number;
  complete_date: number;
  category_id: number;
}

export interface course_section {
  id: number;
  section_name: string;
  order: number;
  category_id: number;
}

export interface course_taken {
  id: number;
  uid: number;
  date_started: number;
}

export interface course_user_seen {
  id: number;
  date_seen: number;
  uid: number;
  company_id: number;
  vid: number;
  cid: number;
}

export interface course_video_watched {
  id: number;
  uid: number;
  complete_date: number;
  video_id: number;
}

export interface cp_pathways {
  id: number;
  pathway_name: string;
  company_id: number;
  description: string;
  is_active: number;
  order?: number;
  cp_pathways_taken?: cp_pathways_taken[];
  cp_steps?: cp_steps[];
}

export interface cp_pathways_taken {
  id: number;
  pathway_id: number;
  contact_id: number;
  booking_id: number;
  started_on: Date;
  status: cp_pathways_taken_status;
  comment: string;
  cp_pathways: cp_pathways;
  cp_steps_taken?: cp_steps_taken[];
}

export interface cp_steps {
  id: number;
  company_id: number;
  name: string;
  created_date: Date;
  step: cp_steps_step;
  order: number;
  item_id: number;
  pathway_id: number;
  can_skip: number;
  display_time: number;
  other_value: string;
  description: string;
  who_does_this?: string;
  cp_pathways: cp_pathways;
  cp_steps_taken?: cp_steps_taken[];
}

export interface cp_steps_taken {
  id: number;
  step_id: number;
  path_taken_id: number;
  contact_id: number;
  date: Date;
  time?: string;
  status: cp_steps_taken_status;
  record_id: number;
  cp_pathways_taken: cp_pathways_taken;
  cp_steps: cp_steps;
}

export interface credit_balance {
  credit_balance_id: number;
  company: string;
  balance: undefined;
  balance_currency: undefined;
  auto: number;
}

export interface credit_note_type {
  id: number;
  company_id: number;
  name: string;
  code: number;
  prefix?: string;
  quick_access: boolean;
  credit_note_type: boolean;
  is_disabled: boolean;
}

export interface credit_tracking {
  ct_id: undefined;
  ct_uid: undefined;
  ct_amount: number;
  ct_date: undefined;
  ct_txid: string;
  status: string;
}

export interface crm_db_logs {
  id: number;
  sql_query: string;
  wait_time: number;
  total_hits: number;
  request_uri: string;
  created_at: Date;
  modified_at: Date;
  company_id: number;
}

export interface cron_jobs {
  id: number;
  company: number;
  user: number;
  settings: string;
  file: string;
  status: cron_jobs_status;
  date_updated?: Date;
  date_created: Date;
}

export interface cron_jobs_log {
  id: number;
  date_updated?: Date;
  date_created: Date;
  company: number;
  text: string;
  severity: number;
  ref: number;
}

export interface cron_logs {
  id: undefined;
  type: string;
  date: Date;
}

export interface currencies {
  ID: number;
  code: string;
  symbol: string;
  name: string;
  plural: string;
  decimaldigits: number;
  rounding: number;
}

export interface customer_users {
  id: undefined;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  date: Date;
  type: string;
  city: string;
  gender: string;
  dob: Date;
  mobile: string;
  active: number;
  country: string;
  uid: number;
  fb_active: number;
  companyid: number;
}

export interface custom_codes {
  id: number;
  company_id: number;
  code_set_id: number;
  code: string;
  layer_1: string;
  layer_2: string;
  layer_3: string;
  layer_4: string;
  layer_5: string;
  description: string;
  icd9: string;
  icd10: string;
  osics10: string;
  is_fav: number;
}

export interface custom_fields_display {
  field_id: number;
  depends_on: number;
  value: string;
  company_id: number;
}

export interface custom_field_actions {
  id: number;
  company_id: number;
  custom_field_id: number;
  action_name: string;
  trigger_value: string;
  template_id: number;
  additional_data: string;
}

export interface cycles {
  id: number;
  occupier: number;
  user_id: number;
  contact_id: number;
  cycle_name: string;
  type: string;
  diagnosis_code_id: number;
  medical_form_contact_id: number;
  status: string;
  quantity: number;
  auth_code: string;
  start_date: Date;
  end_date: Date;
  date_created: Date;
}

export interface cycle_appointment {
  id: number;
  cycle_id: number;
  appt_id: number;
  date_created: Date;
  occupier: number;
}

export interface daily_report_temp {
  id: number;
  company_id: number;
  uid: number;
  type: number;
  date: Date;
}

export interface dashboard {
  userID: number;
  jdashStorage: string;
  page: string;
  id: number;
}

export interface data_debug {
  id: number;
  output?: string;
  cont_format: string;
  event_date: Date;
}

export interface debt_manage_communication {
  id: number;
  invoice_id: number;
  communication_id: number;
  letter_no: number;
  type: number;
  occupier: number;
  uid: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface delete_track {
  id: number;
  details: string;
  user_id: number;
  date: number;
  ip: string;
}

export interface diagnosis_code {
  id: number;
  osics10_code: string;
  osics10_region: string;
  osics10_parent: string;
  oscis10_specific: string;
  osics10_detail: string;
  icd_injury_code: string;
  icd_injury_description: string;
  icd_parent: string;
  icd10: string;
  company_id: number;
  is_favourite: number;
  icd9: string;
}

export interface digest_settings {
  id: number;
  company_id: number;
  enabled: number;
  frequency: string;
  included_users: string;
  LastSent: Date;
  end_week: number;
}

export interface disable_contact_fields {
  id: number;
  company_id: number;
  gender: number;
}

export interface disease {
  id: number;
  company_id: number;
  disease_name: string;
  create_date: Date;
  comments: string;
  deleted: number;
  custom_id: string;
  imported: number;
  travax_link: string;
  nathnac_link: string;
}

export interface dont_birthday_me {
  id: number;
  contact_id: number;
  company_id: number;
}

export interface drinks_settings {
  id: number;
  drink_name: string;
  company_id: number;
}

export interface drugs {
  id: number;
  drug_id?: string;
  dosage?: string;
  legalClass?: string;
  name?: string;
  sortOrder?: number;
  sectionName?: string;
  subSectionName?: string;
  manufacturerName?: string;
  pharmaClass?: string;
  ingredients?: string;
  price?: string;
  quantities?: string;
  generic?: string;
  indications?: string;
  warning?: string;
  interactions?: string;
  contraint?: string;
  sideEffects?: string;
  term?: string;
}

export interface efficiency_report_temp {
  id: number;
  company_id: number;
  uid: number;
  uname: string;
  date: Date;
  total_time: number;
  work_start: Date;
  customers_total: number;
  customers_9_10: number;
  customers_10_11: number;
  customers_11_12: number;
  customers_12_13: number;
  customers_13_14: number;
  customers_14_15: number;
  customers_15_16: number;
  customers_16_17: number;
  customers_17_18: number;
  customers_18_19: number;
  break_9_10: number;
  break_10_11: number;
  break_11_12: number;
  break_12_13: number;
  break_13_14: number;
  break_14_15: number;
  break_15_16: number;
  break_16_17: number;
  break_17_18: number;
  break_18_19: number;
  idle_9_10: number;
  idle_10_11: number;
  idle_11_12: number;
  idle_12_13: number;
  idle_13_14: number;
  idle_14_15: number;
  idle_15_16: number;
  idle_16_17: number;
  idle_17_18: number;
  idle_18_19: number;
  avail_9_10: number;
  avail_10_11: number;
  avail_11_12: number;
  avail_12_13: number;
  avail_13_14: number;
  avail_14_15: number;
  avail_15_16: number;
  avail_16_17: number;
  avail_17_18: number;
  avail_18_19: number;
  work_9_10: number;
  work_10_11: number;
  work_11_12: number;
  work_12_13: number;
  work_13_14: number;
  work_14_15: number;
  work_15_16: number;
  work_16_17: number;
  work_17_18: number;
  work_18_19: number;
  late_9_10: number;
  late_10_11: number;
  late_11_12: number;
  late_12_13: number;
  late_13_14: number;
  late_14_15: number;
  late_15_16: number;
  late_16_17: number;
  late_17_18: number;
  late_18_19: number;
}

export interface emailtemplate_attachments {
  id: undefined;
  template_id: undefined;
  file: string;
}

export interface email_blacklist {
  email_id: number;
  email_address: string;
  email_action: string;
  notify_company: number;
}

export interface engage_closure_services {
  id: number;
  meter_id: number;
  service_id: number;
}

export interface engage_connects {
  id: number;
  contact_id: number;
  group_id: number;
  send_time: Date;
}

export interface engage_connects_followup {
  id: number;
  contact_id: number;
  group_id: number;
  send_time: Date;
}

export interface engage_custom_meters {
  id: number;
  company_id: number;
  name: string;
}

export interface engage_followups {
  id: number;
  service_id: number;
  sms_template: number;
  email_template: number;
  followup_period: number;
  followup_method: string;
  contacts: string;
  created_date: Date;
  completed: boolean;
}

export interface engage_general_settings {
  company_id: number;
  auto_engage: boolean;
  auto_followup: boolean;
  revenue_since: number;
  default_view: string;
}

export interface engage_logs {
  id: number;
  company: number;
  succeeded: number;
  skipped: number;
  type: string;
  event_id: number;
  date: Date;
  test: boolean;
}

export interface engage_meter_services {
  id: number;
  meter_id: number;
  service_id: number;
}

export interface engage_settings {
  service_id: number;
  setting_type: string;
  company_id: number;
  active: boolean;
  sms_template: number;
  email_template: number;
  lost_period: number;
  method: string;
  customer_since: Date;
  negative_feedback: number;
  ignore_sms_optout: boolean;
  no_appts_min: number;
  no_appts_max: number;
  amount_paid_min: number;
  amount_paid_max: number;
  client_status: string;
  last_engaged: number;
  customer_of: number;
  birthday: Date;
  gender: string;
  age_min: number;
  age_max: number;
  notes: string;
  fw_sms_template: number;
  fw_email_template: number;
  fw_period: number;
  fw_method: string;
}

export interface equipment {
  id: number;
  company_id: number;
  equipment_name: string;
  quantity: number;
  is_active: number;
  field_order?: number;
}

export interface events {
  eventid: number;
  brand: string;
  date: Date;
  title: string;
  description: undefined;
  imgid: number;
  featured: number;
  venue: string;
  company: string;
  address: string;
  start: string;
  end: string;
  price: number;
  postcode: string;
  city: string;
  cover_photo: string;
  deleted: number;
}

export interface external_guest {
  id: number;
  company_id: number;
  Name: string;
  Email: string;
}

export interface facebook_pages {
  id: number;
  fb_page_id: number;
  company_id: number;
}

export interface face_body_diagram_settings {
  id: number;
  face_diagram_url?: string;
  body_diagram_url?: string;
  occupier?: number;
  uid?: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface failed_import {
  id: number;
  file_name: string;
  col0: string;
  col1: string;
  col2: string;
  col3: string;
}

export interface file_hits {
  id: number;
  file: string;
  hits: number;
}

export interface finance_accounts {
  id: number;
  company_id: number;
  account_name: string;
  creation_date: Date;
}

export interface finance_history {
  FinanceID: number;
  user_id?: number;
  Record_Type?: string;
  Date: Date;
  Linked_Document?: string;
  Reference?: string;
  Amount: number;
  Company: number;
  tax_id?: number;
  status?: number;
  invoice_id?: number;
  commission_sheet_id?: number;
  staff_id?: number;
  account_id?: number;
  debtor?: string;
  who_expense?: string;
  what_expense?: string;
  location_id: number;
  bank_ref?: string;
  comments?: string;
  matched_with?: string;
  dispute_flag?: number;
}

export interface finance_history_payment {
  id: number;
  amount: undefined;
  payment_type_id: string;
  company_id: number;
  entry_date: Date;
  finance_id: number;
  comments?: string;
}

export interface financial_statements {
  id: number;
  statement_no: number;
  url: string;
  contact_id: number;
  insurer_id: number;
  occupier: number;
  creation_date?: Date;
}

export interface fingerprints_users {
  id: number;
  uid: number;
  fingerprint?: string;
  enrolled?: Date;
  last_scanned?: Date;
}

export interface flagged_items {
  id: number;
  target_id: number;
  type: string;
  description: string;
  raised_by: string;
}

export interface follow_notif {
  id: number;
  user_id: number;
  campaign_id: number;
  type: string;
  follow_date: number;
}

export interface form_builder_detail {
  id: number;
  occupier: number;
  form_id: number;
  field_name?: string;
  field_value?: string;
  input_id: number;
  entrydate: number;
  ref: number;
  ip: string;
  email?: string;
}

export interface gift_card_types {
  id: number;
  company_id: number;
  created_date: number;
  display_name: string;
  start_date: number;
  end_date: number;
  default_price: undefined;
  default_value: undefined;
  template_theme: string;
  is_active: number;
  description: string;
  terms: string;
}

export interface global_meta {
  id: number;
  name: string;
  value: string;
}

export interface gl_codes {
  id: number;
  company_id: number;
  code: string;
  description: gl_codes_description;
  related_to: number;
}

export interface gocardless_bills {
  primary_id: number;
  id: string;
  amount: undefined;
  gocardless_fees: undefined;
  partner_fees: undefined;
  currency: string;
  created_at: string;
  description: string;
  other_id: number;
  name: string;
  paid_at: string;
  status: string;
  merchant_id: string;
  user_id: string;
  source_type: string;
  source_id: string;
  uri: string;
  can_be_retried: string;
  payout_id: string;
  is_setup_fee: string;
  charge_customer_at: string;
}

export interface gocardless_events {
  id: number;
  company_id: number;
  contact_id: number;
  amount: undefined;
  payment_status: string;
  dtime: Date;
  gc_email: string;
  payment_id?: string;
  after_bank_transver: number;
  sale_id: number;
  event_data: string;
}

export interface gocardless_merchants {
  id: number;
  company_id: number;
  access_token?: string;
  merchant_id?: string;
  payment_id: number;
  biller_id: number;
}

export interface gocardless_merchants3 {
  id: number;
  company_id: number;
  uid: number;
  access_token: string;
  merchant_id: string;
  event_log_id?: string;
}

export interface gocardless_payments {
  id: number;
  inv_id: number;
  company_id: number;
  payment_id: string;
  created_date: Date;
}

export interface gocardless_subscriptions {
  id: number;
  subscription_url?: string;
  bills_url?: string;
  contact_id: number;
  plan_id?: number;
  amount: number;
  interval_length: number;
  interval_unit: string;
  interval_count: number;
  name: string;
  description?: string;
  setup_fee: number;
  created_at?: Date;
  currency?: string;
  expires_at?: Date;
  merchant_id: string;
  next_interval_start?: Date;
  start_at?: Date;
  initiated_at?: Date;
  status?: string;
  go_user_id?: string;
  go_subscription_id?: string;
}

export interface gp_details {
  gp_id: number;
  company_id: number;
  gp_name: string;
  gp_surgery?: string;
  gp_address1: string;
  gp_address2: string;
  gp_address3: string;
  gp_address4: string;
  gp_address5: string;
  gp_postcode: string;
  gp_email?: string;
  gp_phone: string;
  gp_ratings?: string;
}

export interface gp_details_old {
  gp_id: number;
  company_id: number;
  gp_name: string;
  gp_address1: string;
  gp_address2: string;
  gp_address3: string;
  gp_address4: string;
  gp_address5: string;
  gp_postcode: string;
  gp_phone: string;
  gp_ratings?: string;
}

export interface gp_details_temp {
  gp_id: number;
  company_id: number;
  gp_name: string;
  gp_address1: string;
  gp_address2: string;
  gp_address3: string;
  gp_address4: string;
  gp_address5: string;
  gp_postcode: string;
  gp_phone: string;
  gp_ratings?: string;
}

export interface groups {
  group_id: number;
  user_id?: number;
  fb_user_id?: undefined;
  fb_group_id?: undefined;
  group_name?: string;
  group_data?: string;
  auth_date?: Date;
  group_postable?: groups_group_postable;
  group_bookmark_order?: undefined;
}

export interface guestlist {
  guestlistid: number;
  name: string;
  nop: number;
  date: Date;
  ip: string;
  occupier: string;
  mobile: string;
  email: string;
  location: string;
  submission_date: Date;
}

export interface guru_settings {
  id: number;
  days: number;
  company_id: number;
}

export interface healthcode_insurers {
  id: number;
  company_id: number;
  code: string;
  name: string;
  edi: boolean;
  me: boolean;
}

export interface healthcode_payee_codes {
  id: number;
  practitioner_id: number;
  insurer_id: number;
  code: string;
  location_id: number;
  company_id: number;
}

export interface healthcode_remittances {
  id: number;
  uid: number;
  company: number;
  Status: string;
  MsgId: string;
  MsgIssueDate: string;
  MsgSender: string;
  MsgRecipient: string;
  Insurer: string;
  ProviderNo: string;
  PaymentReference: string;
  ProcessDate: string;
  PaymentDate: string;
  PaymentMethod: string;
  BankAccountHash: string;
  Cuid: string;
  CHClaimNo: string;
  PayorClaimNo: string;
  InvoiceNo: string;
  InvoiceDate: string;
  ClaimAmt: string;
  PaidAmt: string;
  PrevPaidAmt: string;
  ShortAmt: string;
  InvoiceRef: string;
  RegistrationNo: string;
  PatientInitials: string;
  PatientName_FamilyName: string;
  PatientName_MiddleName?: string;
  PatientName_GivenName?: string;
  BankSortCode?: string;
}

export interface healthcode_submittals {
  id: number;
  company_id: number;
  data_json: string;
  data_xml?: string;
  data_soap?: string;
  date_inserted: Date;
  status: healthcode_submittals_status;
  response_data?: string;
  invoice_id: number;
  date_updated?: Date;
  structured_errors?: string;
  healthcode_id?: string;
}

export interface holiday_requests {
  id: number;
  company_id: number;
  staff_id: number;
  request_id: number;
  holiday_from: Date;
  holiday_to: Date;
  status: string;
  leave_type: string;
  approved_by: number;
  staff_comments: string;
  seen: number;
  rejected_by?: number;
  approve_comments?: string;
  reject_comments?: string;
}

export interface hourly_report_temp {
  id: number;
  company_id: number;
  uid: number;
  uname: string;
  date: Date;
  customers_total: number;
  customers_9_10: number;
  customers_10_11: number;
  customers_11_12: number;
  customers_12_13: number;
  customers_13_14: number;
  customers_14_15: number;
  customers_15_16: number;
  customers_16_17: number;
  customers_17_18: number;
  customers_18_19: number;
  haircuts_total: number;
  haircuts_9_10: number;
  haircuts_10_11: number;
  haircuts_11_12: number;
  haircuts_12_13: number;
  haircuts_13_14: number;
  haircuts_14_15: number;
  haircuts_15_16: number;
  haircuts_16_17: number;
  haircuts_17_18: number;
  haircuts_18_19: number;
  haircuts_p_total: number;
  haircuts_p_9_10: number;
  haircuts_p_10_11: number;
  haircuts_p_11_12: number;
  haircuts_p_12_13: number;
  haircuts_p_13_14: number;
  haircuts_p_14_15: number;
  haircuts_p_15_16: number;
  haircuts_p_16_17: number;
  haircuts_p_17_18: number;
  haircuts_p_18_19: number;
  shaves_total: number;
  shaves_9_10: number;
  shaves_10_11: number;
  shaves_11_12: number;
  shaves_12_13: number;
  shaves_13_14: number;
  shaves_14_15: number;
  shaves_15_16: number;
  shaves_16_17: number;
  shaves_17_18: number;
  shaves_18_19: number;
  beards_total: number;
  beards_9_10: number;
  beards_10_11: number;
  beards_11_12: number;
  beards_12_13: number;
  beards_13_14: number;
  beards_14_15: number;
  beards_15_16: number;
  beards_16_17: number;
  beards_17_18: number;
  beards_18_19: number;
  avg_wait_time_9_10: undefined;
  avg_wait_time_10_11: undefined;
  avg_wait_time_11_12: undefined;
  avg_wait_time_12_13: undefined;
  avg_wait_time_13_14: undefined;
  avg_wait_time_14_15: undefined;
  avg_wait_time_15_16: undefined;
  avg_wait_time_16_17: undefined;
  avg_wait_time_17_18: undefined;
  avg_wait_time_18_19: undefined;
  revenue_total: undefined;
  revenue_9_10: undefined;
  revenue_10_11: undefined;
  revenue_11_12: undefined;
  revenue_12_13: undefined;
  revenue_13_14: undefined;
  revenue_14_15: undefined;
  revenue_15_16: undefined;
  revenue_16_17: undefined;
  revenue_17_18: undefined;
  revenue_18_19: undefined;
}

export interface icd10 {
  id: number;
  code: string;
  description: string;
  full_description: string;
  hf_exclude: string;
}

export interface icd11 {
  id: number;
  code: string;
  layer_1: string;
  layer_2: string;
  layer_3: string;
  description: string;
}

export interface icd9 {
  id: number;
  code: string;
  desc: string;
}

export interface importer_configuration {
  id: number;
  software_name: string;
  client_module: number;
  staff_module: number;
}

export interface import_contacts_hb {
  id: number;
  Fname: string;
  Lname: string;
  Email: string;
  Phone: string;
  Mobile: string;
  OtherPhone: string;
  DOB: Date;
  Note: string;
  gender: string;
  MailingStreet: string;
  custom_id: number;
  inserted: number;
}

export interface import_custom_helper {
  id: number;
  custom_id: string;
  custom_name: string;
  helper_type: string;
  company_id: number;
}

export interface import_details {
  id: number;
  company_id: number;
  import_type: string;
  date: Date;
  file_name: string;
  old_name: string;
  entries: number;
  empty_rows: number;
  key: number;
  linkref: string;
  json_data: string;
  import_status: number;
  start_date: Date;
  end_date: Date;
  ins_match: number;
  con_match: number;
  pro_match: number;
  dob_match: number;
  mem_match: number;
  appt_proc: number;
  treat_match: number;
  appt_issue: number;
  appt_room: number;
  appt_con: number;
  appt_ser: number;
  appt_use: number;
  rota_proc: number;
  rota_use: number;
  rota_loc: number;
  rota_room: number;
  class_proc: number;
  classm_proc: number;
  serv_cat: number;
  prod_cat: number;
  appt_loc: number;
  appt_bookout: number;
  left_to_match: number;
  con_mar: number;
  inv_proc: number;
  inv_loc: number;
  inv_help: number;
  inv_biller: number;
}

export interface import_helper_attachment {
  id: number;
  col0: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
  col8: string;
  company_id: number;
  batch_no: string;
  full_url: string;
  contact_id: number;
  sync: number;
  attach_id: number;
  system_id: number;
  attach_date: Date;
  col15: string;
  col9: string;
  uploader_id: number;
  col16: string;
  col17: string;
  col18: string;
  col19: string;
  col20: string;
  actual_file_name: string;
}

export interface income_track {
  id: number;
  count: number;
  type: string;
  revenue: undefined;
}

export interface indicators {
  id: number;
  name?: string;
  description?: string;
  created_date?: Date;
  updated_date?: Date;
  sql?: string;
}

export interface insurance_cp_amount {
  id: number;
  contract_id: number;
  product_id: number;
  price: undefined;
  price_0: undefined;
  price_1: undefined;
  price_2: undefined;
  price_3: undefined;
  price_4: undefined;
  price_5: undefined;
  price_6: undefined;
  company_id: number;
}

export interface insurance_details {
  id: number;
  company_id: number;
  insurer_name: string;
  phone: string;
  website: string;
  city: string;
  street: string;
  county: string;
  post_code: string;
  email: string;
  is_active: number;
  image: string;
  country: string;
  street2: string;
  provider_no: string;
  imported: number;
  healthcode_id?: number;
  cycle_quantity: number;
  custom_id: number;
  company_type: string;
  hc_identifier: string;
  xero_contact_id?: string;
}

export interface insurer_contracts {
  id: number;
  name: string;
  insurer_id: number;
  company_id: number;
  folder_id: number;
  contract_type: insurer_contracts_contract_type;
  active: boolean;
  show_bank_details: boolean;
  bank_account: string;
  bank_number: string;
  sort_code: string;
  bank_name: string;
  iban: string;
  swift: string;
  vat_number: string;
  imported: number;
  private_contract: boolean;
  employee_id: number;
  full_address: string;
  registered_company_address: string;
  default_address_to: boolean;
  invoice_template_id?: number;
  location_id: number;
  last_update: Date;
  mp_rule_name: string;
  rule_type: number;
  second_service: undefined;
  further_service: undefined;
  action_tax_id: number;
  custom_id_template?: string;
  invoice_prefix?: string;
  invoice_starting_num: number;
  custom_id: number;
}

export interface insurer_validation {
  id: number;
  code: string;
  rule: string;
  regex: string;
  reference: string;
}

export interface intelli_goal_settings {
  id: number;
  staff_id: number;
  occupier: number;
  year: number;
  goal_type: number;
  type_id: number;
  jan?: string;
  feb?: string;
  mar?: string;
  april?: string;
  may?: string;
  june?: string;
  july?: string;
  august?: string;
  sept?: string;
  oct?: string;
  nov?: string;
  dec?: string;
  creation_date?: Date;
  modified_date?: Date;
}

export interface intelli_tiles {
  id: number;
  category_id: number;
  name: string;
  unique_name: string;
  mode: string;
  order_number: number;
  value_type: string;
  icon: string;
  tile_type: string;
  type_data: string;
}

export interface intelli_tiles_category {
  id: number;
  name: string;
  order_number: number;
  is_active: number;
}

export interface intelli_user_tiles {
  id: number;
  tile_id: number;
  occupier: number;
  user_id: number;
  related_id: number;
  order_number: number;
}

export interface inventory_count {
  id: number;
  company_id: number;
  staff_id: number;
  date_started: number;
  date_committed: number;
  date_completed: number;
  notes: string;
  count_type: string;
  count_name: string;
  status: string;
  counting_categories: string;
  location_id: number;
}

export interface inventory_discrepancy {
  id: number;
  company_id: number;
  staff_id: number;
  product_id: number;
  overage: string;
  shortage: string;
  count_id: number;
  draft: number;
  counted: number;
}

export interface invoices {
  id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_address: string;
  client_location: string;
  payment_method: string;
  vat: number;
  total: string;
  currency: string;
  date: number;
  occupier: string;
  ref: number;
  due_date: string;
  deposit: number;
}

export interface invoice_companies {
  id: number;
  company_name: string;
  company_id: number;
  payable_to: string;
  logo: string;
  company_details: string;
  larger_logo: string;
  branch_location_id: number;
  logo_position: string;
}

export interface invoice_distributions {
  id: number;
  name: string;
  description?: string;
  allow_edit: number;
  set_as_default: number;
  occupier: number;
  uid?: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface invoice_distributions_sub_cat {
  id: number;
  distribution_id: number;
  name: string;
  value?: undefined;
  description?: string;
  occupier: number;
  uid?: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface invoice_dist_products {
  id: number;
  cat_id: number;
  dist_id: number;
  product_id?: number;
  tax?: number;
  fee: undefined;
  occupier: number;
  uid?: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface invoice_templates {
  id: number;
  name: string;
  type?: number;
  description: string;
  style: string;
  activity: string;
  appearance: string;
  payment_information: string;
  header: string;
  footer: string;
  date_created: Date;
  date_updated: Date;
  occupier: number;
  stripe_button: number;
}

export interface inv_billers {
  id: number;
  name: string;
  company: string;
  cui: string;
  reg: string;
  cnp: string;
  serie: string;
  account_no: string;
  bank: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  logo: string;
  invoice_footer: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  custom_id: number;
  imported: number;
  qualification: string;
  is_disabled: number;
}

export interface inv_categories {
  id: number;
  code: string;
  name: string;
  order?: number;
  category_type?: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  custom_id: number;
  PriceListGroup_id: number;
  imported: number;
  technical: number;
  image: string;
  disabled: number;
  tax_id: number;
  master_cat_id: number;
}

export interface inv_container {
  id: number;
  reference_no: string;
  container_name: string;
  note: string;
  occupier?: number;
  uid?: number;
  created_by?: number;
  modified_by?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface inv_ins_payments {
  id: number;
  company_id: number;
  insurer_id: number;
  payment_id: number;
  amount: undefined;
  created_by: number;
  created_on: Date;
  payment_type?: string;
  paid_amount?: undefined;
  remaining?: undefined;
  ref_number: string;
}

export interface inv_lots {
  id: number;
  reference_no: string;
  lot_name: string;
  note?: string;
  color?: string;
  category?: number;
  container_id?: number;
  occupier?: number;
  rolls: number;
  uid?: number;
  created_by?: number;
  modified_by?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface inv_movement {
  id: number;
  company_id: number;
  location_id: number;
  date: number;
  type: string;
  quantity: number;
  new_quantity: number;
  entered_by: number;
  product_id: number;
  description: string;
  room_id: number;
  sale_item_id: number;
  contact_id: number;
}

export interface inv_payments {
  id: number;
  from: string;
  date: number;
  amount: undefined;
  invoice: number;
  pmethod: string;
  account_balance?: number;
  contact_id?: number;
  occupier: number;
  order_id?: number;
  uid: number;
  card_type: string;
  charge_amount: undefined;
  card_digits: number;
  datetime: Date;
  note: string;
  new_way2: number;
  new_way3: number;
  ref_num: string;
  custom_pmethod: string;
  xero_payment_id: string;
  is_insurance?: number;
  payment_id?: number;
  custom_id: number;
  imported: number;
  custom_contact_id: number;
  custom_contact_name: string;
  custom_invoice_id: number;
  insurer_id: number;
  is_credit_note: number;
}

export interface inv_payments_helper {
  id: number;
  from: string;
  date: number;
  amount: undefined;
  invoice: number;
  pmethod: string;
  account_balance?: number;
  contact_id?: number;
  occupier: number;
  order_id?: number;
  uid: number;
  card_type: string;
  charge_amount: undefined;
  new_way: number;
  datetime: Date;
  note: string;
  new_way2: number;
  new_way3: number;
  ref_num: string;
  custom_pmethod: string;
  xero_payment_id: string;
  is_insurance?: number;
  payment_id?: number;
  custom_id: number;
  imported: number;
  custom_contact_id: number;
  custom_contact_name: string;
  custom_invoice_id: number;
  insurer_id: number;
}

export interface inv_payments_unallocated {
  id: number;
  occupier: number;
  contact_id: number;
  amount: undefined;
  pmethod: string;
  date: number;
  insurer_id: number;
  custom_id: number;
  custom_contact_id: number;
  custom_insurer_id: number;
  custom_contact_name: string;
  date_time: Date;
  reference: string;
  charge_amount: undefined;
  imported: number;
}

export interface inv_products {
  id: number;
  code: string;
  name: string;
  sku?: string;
  unit?: string;
  size: string;
  product_order?: number;
  um: string;
  cost?: undefined;
  price: undefined;
  alert_quantity: number;
  show_on_website?: string;
  image?: string;
  category_id: number;
  supplier_id?: number;
  note?: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  Description: string;
  custom_id: string;
  category_custom_id: number;
  PriceListGroup_id: number;
  VATRate_id: number;
  imported: number;
  old_barcode: string;
  max_level: number;
  is_active: number;
  product_points: number;
  open_sale: number;
  new_imported: number;
  sage_nominal_code: string;
  procedure_date: Date;
  product_account_code_xero: string;
  allow_negative_qty: boolean;
}

export interface inv_products_import_helper {
  id: number;
  custom_id: number;
  name: string;
  price?: undefined;
  occupier: string;
}

export interface inv_products_test {
  id: number;
  code: string;
  name: string;
  sku?: string;
  unit?: string;
  size: string;
  product_order?: number;
  um: string;
  cost?: undefined;
  price: undefined;
  alert_quantity: number;
  show_on_website?: string;
  image?: string;
  category_id: number;
  supplier_id?: number;
  note?: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  Description: string;
  custom_id: number;
  category_custom_id: number;
  PriceListGroup_id: number;
  VATRate_id: number;
  imported: number;
  old_barcode: string;
  max_level: number;
  is_active: number;
  product_points: number;
  open_sale: number;
  new_imported: number;
  sage_nominal_code: string;
}

export interface inv_purchases {
  id: number;
  reference_no: string;
  warehouse_id: number;
  supplier_id: number;
  supplier_name: string;
  date: Date;
  note: string;
  total: undefined;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface inv_purchase_items {
  id: number;
  purchase_id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  quantity: number;
  unit_price: undefined;
  tax_amount?: undefined;
  gross_total: undefined;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface inv_quotes {
  id: number;
  date?: Date;
  guid: string;
  booking_id: number;
  customer_id: number;
  customer_name?: string;
  location_id: number;
  total: undefined;
  occupier: number;
  uid?: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface inv_quotes_items {
  id: number;
  quote_id: number;
  service_id: number;
  product_id: number;
  product_code?: string;
  product_name?: string;
  product_unit?: string;
  price: undefined;
  qty: number;
  sold_by?: number;
  occupier: number;
}

export interface inv_quote_preview {
  id: number;
  quote_id: number;
  template_id: number;
  distribution_id: number;
  date: Date;
  url: string;
  form_data?: string;
  comments: string;
  company_id: number;
  uid: number;
  creation_date: Date;
  modified_date: Date;
}

export interface inv_rolls {
  id: number;
  lot_id?: number;
  lot_reference_no?: string;
  color?: string;
  weight?: string;
  meters?: string;
  fabric?: number;
  rolls?: number;
  product_code?: string;
  note?: string;
  occupier?: number;
  uid?: number;
  created_by?: number;
  modified_by?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface inv_sales {
  id: number;
  reference_no: string;
  warehouse_id?: number;
  biller_id: number;
  biller_name: string;
  customer_id: number;
  customer_name: string;
  date: Date;
  note?: string;
  inv_total: undefined;
  total_tax: undefined;
  total: undefined;
  paid_amount?: undefined;
  store_discount?: undefined;
  discount_amount: undefined;
  account_amount?: undefined;
  loyalty_card_num?: string;
  loyalty_card_amount?: string;
  voucher_no?: string;
  voucher_amount?: undefined;
  invoice_type: number;
  in_type: string;
  total_tax2: undefined;
  tax_rate2_id: number;
  shipping_rate: undefined;
  shipping_rate_id: number;
  delivery?: number;
  delivery_date?: Date;
  by_email?: number;
  by_sms?: number;
  tip?: undefined;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  paid_by?: string;
  booking_id: number;
  quaser_booking_id: number;
  invoice_bit: number;
  custom_id: string;
  contact_custom_id: string;
  Practitioner_id: number;
  User_id: number;
  Treatment_id: number;
  imported: number;
  VAT_drop: undefined;
  order_id?: number;
  void: boolean;
  guid?: string;
  old_paid_by: string;
  loyalty_points: number;
  xero_invoice_id: string;
  xero_updated_date: Date;
  split_count: number;
  split_guid: string;
  insurer_contract_id: number;
  lock_sale: number;
  location_id: number;
  contract_id: number;
  is_ok: boolean;
  refund_to: number;
  credit_ref_id: number;
  credit_amount: undefined;
  credit_type: number;
  issuer_id?: number;
}

export interface inv_sales_audit {
  id: number;
  mode: string;
  guid?: string;
  sale_id: number;
  customer_id: number;
  date: Date;
  date_deleted: Date;
}

export interface inv_sales_import {
  id: number;
  occupier: string;
  imported: number;
  date: string;
  biller_name: string;
  customer_name: string;
  product_name: string;
  custom_id: string;
  quantity: number;
  total: undefined;
  reference_no: string;
  custom_contact_id: string;
  unit_price: string;
  custom_practitioner_id: number;
  payment_method: string;
  val_tax: undefined;
  discount: undefined;
  custom_id2: number;
  custom_category_name: string;
  payed_amount: undefined;
  description: string;
  added: number;
  note: string;
  product_code: string;
  custom_clinic_id: number;
  contact_id: number;
  invoice_due: string;
  status: string;
  location_name: string;
  location_id: number;
}

export interface inv_sales_import_eclinic {
  id: number;
  occupier: number;
  custom_id: number;
  total: number;
}

export interface inv_sales_part_pay {
  id: number;
  sales_id?: number;
  type?: string;
  amount?: undefined;
  order_id?: number;
  occupier?: number;
}

export interface inv_sales_refund {
  id: number;
  reference_no: string;
  warehouse_id?: number;
  biller_id: number;
  biller_name: string;
  customer_id: number;
  customer_name: string;
  date: Date;
  note?: string;
  refund_note?: string;
  inv_total: undefined;
  total_tax: undefined;
  total: undefined;
  paid_amount?: undefined;
  store_discount?: undefined;
  discount_amount?: string;
  account_amount?: undefined;
  loyalty_card_num?: string;
  loyalty_card_amount?: string;
  voucher_no?: string;
  voucher_amount?: undefined;
  invoice_type: number;
  in_type: string;
  total_tax2: undefined;
  tax_rate2_id: number;
  shipping_rate?: undefined;
  shipping_rate_id?: number;
  delivery?: number;
  delivery_date?: Date;
  tip?: undefined;
  by_email?: number;
  by_sms?: number;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  paid_by?: string;
  refund_by?: number;
  booking_id?: number;
}

export interface inv_sales_refund_product {
  id: number;
  sales_refund_item_id?: number;
  refund_amount?: undefined;
  qty?: string;
  note?: string;
  payment_mode?: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface inv_sale_items {
  id: number;
  sale_id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  product_unit: string;
  tax_rate_id: number;
  tax: string;
  quantity: number;
  unit_price: undefined;
  gross_total: undefined;
  val_tax: undefined;
  occupier?: number;
  uid?: number;
  staff_purchase?: number;
  created_date?: Date;
  modified_date?: Date;
  custom_id: number;
  sale_custom_id: undefined;
  contact_custom_id: number;
  product_custom_id: number;
  Practitioner_id: number;
  Threatment_id: number;
  User_id: number;
  VAT_id: number;
  LineDiscount: undefined;
  imported: number;
  UnitDiscount: undefined;
  discount_reason?: string;
  product_category_id?: number;
  product_category_name?: string;
  product_category_type?: string;
  from_pos: number;
  tax_total: undefined;
  custom_product_name: string;
  booking_id?: number;
}

export interface inv_sale_notes {
  inv_sale_id: number;
  note: string;
  created_by: number;
  created_date: Date;
}

export interface inv_sale_refund_items {
  id: number;
  sale_id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  product_unit: string;
  tax_rate_id: number;
  tax: string;
  quantity: number;
  unit_price: undefined;
  gross_total: undefined;
  val_tax: undefined;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface inv_settings {
  setting_id: number;
  logo: string;
  site_name: string;
  language: string;
  default_warehouse: number;
  currency_prefix: string;
  default_invoice_type: number;
  default_tax_rate: number;
  rows_per_page: number;
  no_of_rows: number;
  total_rows: number;
  order_by?: number;
  product_order_by?: number;
  version: string;
  default_tax_rate2: number;
  calculate_vat?: string;
  vat?: string;
  tab_print?: string;
  tip?: number;
  unpaid_invoice?: number;
  redirect_url?: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  enable_taxes: number;
  enable_online_payment: number;
}

export interface inv_shipping_rates {
  id: number;
  name: string;
  rate: undefined;
  type: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface inv_split_sale {
  id: number;
  occupier: number;
  sale_id: number;
  biller_id: number;
  amount: number;
}

export interface inv_tax_rates {
  id: number;
  name: string;
  rate: undefined;
  type: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  is_active: number;
  description: string;
  date_constrained: boolean;
  start_date: number;
  end_date: number;
  show_on_receipt: number;
  custom_id: number;
}

export interface inv_warehouses {
  id: number;
  code: string;
  name: string;
  address: string;
  city: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface inv_warehouses_products {
  id: number;
  product_id: number;
  warehouse_id: number;
  location_id: number;
  quantity: number;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  expiry_date: Date;
  batch_code: string;
  description: string;
}

export interface ipaddress_vote_map {
  id: number;
  voting_id: number;
  ip_address: string;
  vote_rank: number;
}

export interface ip_admission {
  id: number;
  occupier: number;
  contact_id: number;
  bed_id: number;
  booking_id: number;
  admitted_at: Date;
}

export interface ip_beds {
  id: number;
  bed_name: string;
  location_id: string;
  room_id: number;
  bed_type_id: number;
  speciality_ids: number;
  company_id: number;
  description?: string;
  uid: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface ip_bed_types {
  id: number;
  name: string;
  floor_id?: number;
  location_id: number;
  company_id: number;
  uid: number;
  rmo_uid: number;
  creation_date: Date;
  modified_date: Date;
}

export interface ip_bookings {
  id: number;
  occupier: number;
  code: string;
  patient_id: number;
  eoc_id: number;
  created_at: Date;
  duration: number;
  until: Date;
  admitted_at: Date;
  discharced_at: Date;
  location_id: number;
  note: string;
  status: ip_bookings_status;
  observation_frq: number;
  contract_id: number;
}

export interface ip_crisis_mgmt_config {
  id: number;
  mid: number;
  score: number;
  response_label?: string;
  answer?: string;
  frequency: number;
  color?: string;
  escalation: number;
  company_id: number;
  uid: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface ip_floors {
  id: number;
  name: string;
  floor_url: string;
  floor_thumbnail: string;
  company_id: number;
  floor_order: number;
}

export interface ip_floor_plan {
  id: number;
  floor_id: number;
  bed_id: number;
  plan_info: string;
  company_id: number;
  created_date: Date;
  updated_date: Date;
}

export interface ip_hits {
  id: number;
  ip: string;
  hits: number;
}

export interface ip_patient_configuration {
  id: number;
  company_id: number;
  uid: number;
  creation_date?: Date;
  modified_date?: Date;
  observation_form_id: number;
  admission_form_id: number;
  discharge_form_id: number;
  handover_form_id: number;
}

export interface ip_procedure_booked {
  id: number;
  procedure_id: number;
  salon_booking_id: number;
  ip_booking_id: number;
  site?: string;
  laterality?: string;
  level?: number;
  note?: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  occupier: number;
}

export interface ip_procedure_groups {
  id: number;
  name: string;
  description?: string;
  company_id: number;
  uid: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface ip_service_procedure {
  id: number;
  sid: number;
  name: string;
  sites?: string;
  external_code?: string;
  notes?: string;
  procedure_group_id?: number;
  modality_type?: string;
  company_id: number;
  uid: number;
  creation_date?: Date;
}

export interface ip_specialities {
  id: number;
  name: string;
  description?: string;
  company_id: number;
  uid: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface ip_specialities_members {
  id: number;
  specialities_id: number;
  member_id: number;
}

export interface isc {
  id: number;
  code: string;
  description: string;
  chapter: string;
  category: string;
  status: boolean;
  gender: isc_gender;
}

export interface issuing_companies {
  id: number;
  company_id: number;
  is_active: boolean;
  name: string;
  abbreviation: string;
  address: string;
  address2: string;
  city: string;
  postcode: string;
  website: string;
  email: string;
  phone: string;
  vat_registered: string;
  invoice_template_id: number;
  custom_id: number;
  invoice_prefix?: string;
  invoice_starting_number?: number;
}

export interface iza_appt_matcher {
  id: number;
  invoice_id: number;
  appt_id: number;
  fixed: boolean;
}

export interface iza_credit_notes {
  invoice_id: number;
  total_price: number;
  comments: string;
  raised_by_invoice_id: number;
}

export interface jobs {
  job_id: number;
  create_date: Date;
  created_by_id: number;
  start_date: Date;
  closing_date: Date;
  opening_title: string;
  job_location: string;
  what_you_do: string;
  is_closed: number;
  department: string;
  job_country: string;
  opening_job_blurb: string;
  employment_type: string;
  company_id: number;
  experience: string;
}

export interface job_configuration {
  id: number;
  company_id: number;
  about_us: string;
  color_scheme: string;
  opening_blurb: string;
  page_title: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  cover_letter: string;
  resume: string;
  date_available: string;
  linkedin: string;
  reference: string;
  how_did_hear: string;
  who_referred: string;
  default_reply: string;
}

export interface job_openings {
  openingid: number;
  opening_title: string;
  hiring_manager: string;
  start_date: string;
  end_date: string;
  status: string;
  published: number;
  occupier: number;
  description: string;
  attached_forms: number;
  created_date: string;
}

export interface job_status {
  id: number;
  company_id: number;
  name: string;
  status: number;
  order: number;
}

export interface jw_aesthetic_contacts {
  id: number;
  custom_id: number;
  patient_no: number;
}

export interface kp_setting {
  id: number;
  company_id: number;
  fixed_cost: undefined;
}

export interface label_settings {
  id: number;
  occupier: number;
  user_id: number;
  column_count: number;
  row_count: number;
}

export interface labs {
  id: number;
  company_id: number;
  is_active: number;
  lab_name: string;
  lab_email: string;
  lab_street: string;
  lab_street2: string;
  lab_city: string;
  lab_county: string;
  lab_postal: string;
  lab_phone: string;
  lab_provider_no: string;
}

export interface lab_product_template {
  id: number;
  test_name: string;
  code: string;
  sample_reqs: string;
  tat: string;
}

export interface lab_requests {
  id: number;
  contact_id: number;
  company_id: number;
  request_date: Date;
  last_update: Date;
  request_by_id: number;
  request_status: number;
  request_lab_id: string;
  lab_id: number;
  request_id: number;
  received_id: number;
  communication_id: number;
  send_result?: string;
  receive_result?: string;
  receive_raw?: string;
  receive_date: Date;
  sent_date: Date;
}

export interface lab_requests_pref_delivery {
  id: number;
  lab_requests_id?: number;
  type?: string;
  creation_date?: Date;
}

export interface lab_request_delivery_result {
  id: number;
  lab_requests_id: number;
  result_status: number;
  message?: string;
  delivery_type?: string;
  company_id: number;
  uid: number;
  creation_date: Date;
}

export interface lab_request_inbound {
  id: number;
  company_id: number;
  lab_request_id: number;
  email_from: string;
  pending_review: number;
  email_subject: string;
  attachment_name: string;
  received_date: Date;
  attachment_url: string;
  matched_on: number;
  channel: number;
  matched_by_id: number;
  is_deleted: number;
  tdl_response: string;
}

export interface lab_request_result_followup {
  id: number;
  delivery_id: number;
  lab_request_id: number;
  company_id: number;
  type: number;
}

export interface lab_test_comment {
  id: number;
  test_name: string;
  high_comment: string;
  low_comment: string;
  company_id: number;
  uid: number;
}

export interface languages {
  ID: number;
  code: string;
  name: string;
}

export interface latest_information {
  id: number;
  contact_id: number;
  entry_date: number;
}

export interface lead_attachment {
  id: number;
  company_id: number;
  lead_id: number;
  date: number;
  linkref: string;
}

export interface lead_capture_automated {
  id: number;
  custom_field: number;
  capture_form_id: number;
  from_email: string;
  template_id: number;
  occupier: number;
}

export interface lead_capture_fields {
  id: number;
  lead_capture_id: number;
  first_name: string;
  last_name: string;
  home_phone: string;
  mobile: string;
  email: string;
  address: string;
  post_code: string;
  company_id: number;
  how_heard: number;
  dob: string;
  custom_dropdown: string;
  custom_textarea: string;
  custom_date: string;
  yesorno: string;
  custom_textfield: string;
  custom_textfield2: string;
}

export interface lead_capture_settings {
  id: number;
  company_id: number;
  capture_name: string;
  page_title: string;
  logo: string;
  background_image: string;
  header1: string;
  sub_heading: string;
  submission_counts: undefined;
  impression_counts: undefined;
  right_description: string;
  thanks_message: string;
  CreatedDate: Date;
  from_email: string;
  message_id: number;
  to_email: string;
  facebook_url: string;
  twitter_url: string;
  back_button_url: string;
  top_header: number;
  redirect_link: string;
  tag: string;
  top_header_color: string;
  gym_pass: number;
  default_rating: string;
  default_lead_status: string;
  from_subject: string;
  client_email: number;
  from_email_message: string;
  disable_lead_creation: number;
  disable_duplicates: number;
  disable_spam_filter: number;
  send_business_sms: number;
  send_business_sms_to: string;
  google_tracking_code: string;
  send_business_sms_to_2: string;
  send_business_sms_to_3: string;
  auto_assign_id: number;
  junk_numbers: number;
  junk_long_text: number;
  photo_uploader_hits: number;
}

export interface lead_dropdown_items {
  id: number;
  item_name: string;
  company_id: number;
  capture_id: number;
  price_category_id: number;
}

export interface lead_scoring_acitivity_mode_code {
  id: number;
  activity_mode: string;
  code: string;
  description: string;
}

export interface lead_scoring_settings {
  id: number;
  occupier: string;
  display_name: string;
  code_name: string;
  points: number;
  activity_mode: string;
  date_added: Date;
  user_added: number;
}

export interface lead_status {
  id: number;
  company_id: number;
  status_name: string;
  status_order: number;
  email_template_id: number;
  email_template_from: string;
  is_default: number;
  is_convert: number;
}

export interface lead_status_array {
  id: number;
  status_name: string;
}

export interface lead_status_templates {
  id: number;
  status_id: number;
  keyword: string;
  template_id: number;
  company_id: number;
}

export interface lead_tracking {
  id: number;
  company_id: number;
  ip_address: string;
}

export interface lead_tracking_activities {
  id: number;
  mode: string;
  occupier: string;
  page_url: string;
  ip_address: string;
  date: Date;
  description: string;
  lead_id: number;
  date_updated: Date;
}

export interface lead_trigger {
  id: number;
  trigger_name: string;
  field_id: number;
  field_value: string;
  location_id: number;
  assigned_to_1: number;
  assigned_to_2: number;
  company_id: number;
  round_robin: number;
  source_id: number;
  postcode?: string;
}

export interface lead_views {
  id: number;
  company_id: number;
  view_name: string;
  view_data: string;
}

export interface letter_queue {
  id: number;
  letter_id: number;
  company_id: number;
  appointment_id: number;
  contact_id: number;
  letter_to_id: number;
  communication_id: number;
  status: number;
  queued_by_id: number;
  printed_by_id: number;
  created_date: Date;
  printed_date: Date;
}

export interface letter_recipient_data {
  id: number;
  communication_id: number;
  recipient_data?: string;
  letter_body: string;
  invoice_id: number;
}

export interface letter_saved_merge_tags {
  id: number;
  contact_id: number;
  communication_id: number;
  occupier: number;
  merge_tags?: string;
  merge_tags_val?: string;
  creation_date?: Date;
  modified_date?: Date;
}

export interface levels_indicator {
  id: number;
  indicator_id?: number;
  level?: string;
  level_value?: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  updated_date?: Date;
}

export interface lms_credit_balance_log {
  id: number;
  contact_id: number;
  company_id: number;
  amount: undefined;
  date: Date;
  product_id: number;
  sale_id: number;
  referral_id: number;
  description: string;
  cashable: number;
}

export interface location_master {
  loc_id: number;
  loc_comp_id?: number;
  loc_name?: string;
  loc_date?: string;
}

export interface location_service_price {
  id: number;
  location_id: number;
  service_id: number;
  price: undefined;
}

export interface login_attempts {
  id: number;
  username: string;
  last_attempt: Date;
  count: string;
  phone_attempt_count: number;
  client_ip: string;
}

export interface login_log {
  id: number;
  uid: number;
  occupier: string;
  login_datetime: Date;
  logout_datetime: Date;
  ip_address: string;
  is_mobile: number;
  user_agent: string;
}

export interface log_call {
  id: number;
  subject?: string;
  call_type?: number;
  call_purpose?: number;
  call_from_or_to?: number;
  user_id?: number;
  lead_id?: number;
  related_to?: number;
  reminder_id: number;
  related_to_text?: string;
  call_detail_type?: number;
  call_start_date?: Date;
  call_time_hour?: number;
  call_time_min?: number;
  call_time_format?: number;
  call_duration_hr?: number;
  call_duration_min?: number;
  call_duration_sec?: number;
  description?: string;
  billable?: boolean;
  call_result?: string;
  occupier?: number;
  ownerid?: number;
  created_date?: Date;
  modified_date?: Date;
  site_section: string;
}

export interface loyalty_backend {
  id: number;
  occupier: number;
  logo_image: string;
  page_title: string;
  tab1_title: string;
  tab2_title: string;
  tab3_title: string;
  tab4_title: string;
  tab5_title: string;
  tab1_content: string;
  tab2_content: string;
  tab3_content: string;
  tab4_content: string;
  tab5_content: string;
  privacy_policy: string;
  terms_and_conditions: string;
  faq: string;
  cookies: string;
  bg_color: string;
  bt_bg_color: string;
  foot_bg_color: string;
  main_bg_color: string;
}

export interface loyalty_campaign {
  id: number;
  campaign_name: string;
  company_id: number;
  type: loyalty_campaign_type;
}

export interface loyalty_definitions {
  id: number;
  promotion_type: string;
  promotion_description: string;
  sub_description: string;
  promotion_name: string;
  disabled: number;
  type: loyalty_definitions_type;
}

export interface loyalty_log {
  id: number;
  company_id: number;
  contact_id: number;
  amount: undefined;
  promotion_type: string;
  sale_id: number;
  date: number;
  user_id: number;
  updated_on?: Date;
  description: string;
}

export interface loyalty_points {
  id: number;
  company_id: number;
  points: undefined;
  contact_id: number;
}

export interface loyalty_point_settings {
  id: number;
  occupier?: number;
  user_id?: number;
  status?: number;
  amount?: number;
  created_date?: Date;
  modified_date?: Date;
  points_value: undefined;
  show_on_receipt: number;
}

export interface loyalty_promotion {
  id: number;
  company_id: number;
  promotion_type: string;
  start_date: number;
  end_date: number;
  points: number;
  campaign_id: number;
  is_active: number;
  custom_amount: undefined;
}

export interface loyalty_rewards {
  id: number;
  company_id: number;
  name: string;
  type: loyalty_rewards_type;
  amount: number;
  package_id: number;
  repeat: boolean;
  repeat_every: number;
  email_template: number;
  sms_template: number;
  sms_sender: number;
}

export interface loyalty_rewards_awards {
  id: number;
  contact_id: number;
  reward_id: number;
  company_id: number;
  date_awarded: Date;
}

export interface mailchimp_api {
  id: number;
  occupier: string;
  api_key: string;
  email_type: string;
  status: string;
  autosync_list: string;
}

export interface manage_bills {
  id: number;
  date: Date;
  customer_id: number;
  customer_name?: string;
  biller_id?: number;
  biller_name?: string;
  count: number;
  tax1: number;
  tax2: number;
  total: number;
}

export interface manage_custom_fields {
  id: number;
  field_label?: string;
  field_type?: string;
  occupier?: number;
  uid?: number;
  location_id: number;
  created_date?: Date;
  modified_date?: Date;
  treatment_interest: number;
  show_in_leads: number;
  field_for: manage_custom_fields_field_for;
  flagged: boolean;
  is_required: number;
  disable_app: number;
  is_active: number;
  field_order: number;
  display_in_invoice: number;
  default_in_reports: number;
  category_id: number;
  in_cc_toolbar: boolean;
  favorite: boolean;
  show_in_cal: boolean;
}

export interface manage_custom_fields_categories {
  id: number;
  name: string;
  company_id: number;
}

export interface manage_custom_fields_items {
  id: number;
  field_id: number;
  occupier: string;
  item_label: string;
  item_value: string;
  item_order: number;
}

export interface manage_fields_order {
  id: number;
  field_id: number;
  field_name: string;
  occupier: string;
  order_id: number;
  pinned: number;
  is_more: number;
}

export interface manage_items {
  id: number;
  suspend_id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  product_unit: string;
  tax_rate_id: number;
  tax: string;
  quantity: number;
  unit_price: undefined;
  gross_total: undefined;
  val_tax: undefined;
  staff_purchase?: number;
}

export interface medical_approval_notes {
  id: number;
  company_id: number;
  contact_id: number;
  appointment_id: number;
  actioned_by: number;
  path_taken_id: number;
  note: string;
  response: string;
  created_date: Date;
  status: number;
  requested_by: number;
  response_date: Date;
}

export interface medical_approval_notes_logs {
  id: number;
  medical_approval_id: number;
  company_id: number;
  actioned_by: number;
  status: number;
  response: string;
  date: Date;
}

export interface medical_attr {
  id: number;
  name?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  occupier?: string;
  description: string;
}

export interface medical_contact_attr {
  id: number;
  attr_id?: number;
  contact_id?: number;
  value?: string;
  updated_at?: Date;
  created_at?: Date;
  deleted_at?: Date;
  nhs_locum_id?: number;
  group_label?: string;
  medical_form_contact_id?: number;
  attachment_size: undefined;
  custom_contact_name: string;
  custom_contact_id: number;
}

export interface medical_contra {
  id: number;
  company_id: number;
  user_id: number;
  is_enabled: number;
  condition: string;
  created_date: Date;
  contra_code: string;
  question_label: string;
  question_answer: string;
  product_id: number;
  services_ids: string;
  form_id: number;
  age: number;
  medical_condition: string;
  contra_title: string;
  alert_text: string;
  prevent_forward: number;
  custom_id: string;
  imported: number;
}

export interface medical_custom_fields {
  id: number;
  name: string;
  form_id: number;
  label: string;
  medical_condition: number;
  type?: string;
  active: number;
  occupier: number;
}

export interface medical_form {
  id: number;
  user_deleted: number;
  name?: string;
  data?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  nhs_locum_id?: number;
  nhs_procedure_id?: number;
  locked: number;
  printout: string;
  occupier: number;
  user_created: number;
  encoded: number;
  form_type: string;
  service_id: string;
  ipad_only?: number;
  heading_setting?: number;
  temp_static: number;
  old_data: string;
  form_category: string;
  author: string;
  diagnosis_code: string;
  is_fav: number;
  diagnosis_code_enabled: number;
  lab_id: number;
  is_private: boolean;
}

export interface medical_forms_ios_data {
  id: number;
  ref_id?: number;
  company_id?: number;
  form_id?: number;
  ref_name?: string;
  data?: string;
}

export interface medical_form_access {
  id: number;
  form_id: number;
  contact_id: number;
  company_id: number;
  request_id: string;
  generated_code: number;
  expiry_date: Date;
}

export interface medical_form_contact {
  id: number;
  form_id?: number;
  contact_id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  complete: number;
  locked: number;
  user_created: number;
  user_updated: number;
  related_to: number;
  custom_user_name: string;
  prescriber: number;
  priority: string;
  pharmacy_id: number;
  form_status: number;
  comments?: string;
  urgent?: number;
  imported: number;
  custom_contact_name: string;
  custom_contact_id: number;
  approved_triggers?: string;
  actioned_by?: number;
  form_contact_number: number;
  diagnosis_code: string;
}

export interface medical_form_contact_history {
  id: number;
  mode: string;
  medical_form_contact_id: number;
  user_id: number;
  contact_id: number;
  occupier: string;
  date: Date;
  update_changes?: string;
}

export interface medical_form_contact_restore {
  id: number;
  form_id?: number;
  contact_id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  complete: number;
  locked: number;
  user_created: number;
  user_updated: number;
  related_to: number;
  custom_user_name: string;
  prescriber: number;
  priority: string;
}

export interface medical_form_epaper_images {
  id: number;
  form_id: number;
  fileName: string;
  linkhref: string;
}

export interface medical_form_pinned {
  id: number;
  form_id: number;
  occupier: number;
  user_id: number;
  pinned: number;
}

export interface medical_form_psfs_settings {
  id: number;
  form_id?: number;
  psfs_start?: number;
  interval_mode?: number;
  interval_no?: number;
  psfs_end?: number;
  post_treatment_mode?: number;
  post_treatment_no?: number;
  occupier?: number;
  uid?: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface medical_form_psfs_treat_settings {
  id: number;
  form_id?: number;
  post_interval_mode?: number;
  post_interval_no?: number;
}

export interface medical_form_settings {
  id: number;
  company_id: number;
  prescriptions_email_id: number;
  treatments_email_id: number;
  consents_email_id: number;
  col_drug_name: boolean;
  col_drug_dose: boolean;
  col_drug_units: boolean;
  col_drug_freq: boolean;
  col_drug_lot: boolean;
  col_drug_exp: boolean;
  col_drug_route: boolean;
  col_drug_comm: boolean;
  col_drug_name_label: string;
  col_drug_dose_label: string;
  col_drug_units_label: string;
  col_drug_freq_label: string;
  col_drug_lot_label: string;
  col_drug_exp_label: string;
  col_drug_route_label: string;
  col_drug_comm_label: string;
  delivery_address: string;
  show_delivery_address: boolean;
  headings_on_top: boolean;
  presc_stat_text_ontop?: boolean;
  treatment_plan_email_id: number;
  prepopulate: boolean;
}

export interface medical_form_special_instructions {
  id: number;
  occupier: number;
  instruction?: string;
  creation_date?: Date;
  modified_date?: Date;
}

export interface medical_form_theme_settings {
  id: number;
  medical_form_id?: number;
  formHeadercolor?: string;
  formSectioncolor?: string;
  formCheckboxcolor?: string;
  formButtontext?: string;
  formButtoncolor?: string;
  formFontstyle?: string;
  formFontcolor?: string;
  formDropdowncolor?: string;
  formThankyoumsg?: string;
  formCompanylogo?: number;
  formRedirecturl?: string;
  formBackgroundcolor?: string;
  formResultemail?: string;
  formnotriggers?: string;
  formsubmissiontrigger?: string;
  formformulaetrigger?: number;
  formPullpreviousanswers?: number;
}

export interface medical_form_triggers {
  id: number;
  trigger_name?: string;
  action?: string;
  company_id?: number;
  medical_triggers?: string;
  creation_date: Date;
  form_status?: number;
  form_email?: string;
  form_email_subject?: string;
  form_email_body?: string;
  form_alert_note?: string;
  form_task_name?: string;
  form_task_description?: string;
  form_assigned_to?: number;
  medical_form_prescriber?: string;
  form_task_priority?: number;
  form_sms_no?: string;
  form_sms_body?: string;
  formulae_operation?: number;
  is_active: boolean;
  medical_condition?: string;
}

export interface memberships {
  id: undefined;
  name: string;
  occupier: string;
  autopay_mode: string;
  payment_every: string;
  number_payments: number;
  CreatedDate: Date;
  description: string;
  from_time: string;
  to_time: string;
}

export interface membership_app_users {
  id: number;
  contact_id: number;
  membership_id: number;
  company_id: number;
}

export interface membership_cards {
  memberid: number;
  details_id: number;
}

export interface membership_contact {
  id: undefined;
  contact_id: undefined;
  membership_id: undefined;
  invoice_id?: undefined;
  activation_date: Date;
  expiration_date: Date;
  occupier: string;
  CreatedDate: Date;
  LastUpdated: Date;
  suspended: number;
  first_payment: number;
  UID: number;
}

export interface membership_package {
  id: undefined;
  membership_id: undefined;
  package_id: undefined;
  product_name: string;
  product_price: number;
  type: string;
  membership_total: undefined;
}

export interface message_templates {
  template_id: number;
  company_id: number;
  template_name: string;
  subject: string;
  message: string;
  created_by: number;
  template_type: string;
  created_at: Date;
  date_changed_at?: Date;
  template_sub_type: number;
  template_sub_type_service: number;
  parent_id: number;
  header: string;
  footer: string;
  exclude_margins: number;
  template_group: string;
  subtype_letter: string;
  word_template: string;
  is_default: boolean;
  folder_id: number;
}

export interface message_templates_locale {
  template_id: number;
  company_id: number;
  template_name: string;
  subject: string;
  message: string;
  created_by: number;
  template_type: string;
  created_at: Date;
  date_changed_at?: Date;
}

export interface message_templates_services {
  id: number;
  occupier: number;
  template_id: number;
  service_id: number;
}

export interface metro_reminders {
  id: number;
  uid: number;
  company: number;
  title: string;
  description: string;
  reminder_date: number;
  notification?: number;
  reminder_type?: string;
  item_id?: undefined;
}

export interface mobile_widgets {
  id: number;
  user_id: number;
  company_id: number;
  widget_type: string;
  widget_order: number;
  widget_url: string;
}

export interface multiple_companies {
  id: number;
  head_office_id: number;
  company_id: number;
}

export interface news2_configuration {
  id: number;
  company_id: number;
  medical_form_id: number;
  respirations: string;
  spo2_scale_1: string;
  spo2_scale_2: string;
  air_or_oxygen: string;
  blood_pressure: string;
  pulse: string;
  consciousness: string;
  temperature: string;
}

export interface newsletter_templates {
  id: number;
  template_body: string;
  template_group: string;
  thumbnail: string;
  internal_name: string;
  automated_campaign: number;
}

export interface news_score_configuration {
  id: number;
  mid: number;
  label: string;
  set_class?: string;
  company_id: number;
  uid: number;
  creation_date: Date;
}

export interface news_score_formula {
  id: number;
  news_score_id: number;
  formula: string;
  single_val: undefined;
  from_val: undefined;
  to_val: undefined;
  score: number;
  color?: string;
  alert_rmo_ios: number;
  alert_rmo_email: number;
  alert_rmo_sms: number;
  alert_rmo_web: number;
}

export interface nhs_adjust_attr {
  id: number;
  nhs_attr_id?: number;
  nhs_risk_adjust_id?: number;
  start?: string;
  end?: string;
  value?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  type?: string;
  nhs_locum_id?: number;
}

export interface nhs_attr {
  id: number;
  name?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  nhs_locum_id?: number;
}

export interface nhs_form {
  id: number;
  user_deleted: number;
  name?: string;
  data?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  nhs_locum_id?: number;
  nhs_procedure_id?: number;
  locked: number;
  printout: string;
}

export interface nhs_import {
  id: number;
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  nhs_locum_id?: number;
  name?: string;
}

export interface nhs_locum {
  id: number;
  name?: string;
  date_login?: Date;
}

export interface nhs_outcome_profile_attr {
  id: number;
  nhs_outcome_profile_id?: number;
  nhs_attr_id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface nhs_patient {
  id: number;
  name?: string;
  dob?: Date;
  weight?: undefined;
  created_at?: Date;
  updated_at?: Date;
  nhs_number?: string;
  deleted_at?: Date;
  nhs_locum_id?: number;
  notes?: string;
  nhs_import_id?: number;
  user_created: number;
  user_updated: number;
}

export interface nhs_patient_attr {
  id: number;
  nhs_attr_id?: number;
  nhs_patient_id?: number;
  value?: string;
  updated_at?: Date;
  created_at?: Date;
  deleted_at?: Date;
  nhs_locum_id?: number;
  group_label?: string;
  nhs_patient_record_id?: number;
}

export interface nhs_patient_notes {
  id: number;
  nhs_patient_id?: number;
  note?: string;
  created_at?: Date;
  user_id?: number;
  nhs_locum_id?: number;
  nhs_patient_procedure_id?: number;
  chart?: number;
  updated_at?: Date;
}

export interface nhs_patient_number {
  id: number;
  nhs_patient_id?: number;
  number?: string;
  nhs_hospital_id?: number;
  nhs_locum_id?: number;
}

export interface nhs_patient_procedure {
  id: number;
  nhs_patient_id?: number;
  nhs_procedure_id?: number;
  date?: Date;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  follow_up?: Date;
  nhs_locum_id?: number;
}

export interface nhs_patient_procedure_outcome {
  id: number;
  nhs_patient_procedure_id?: number;
  nhs_procedure_outcome_id?: number;
  actual_outcome?: number;
  predicted_outcome?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  follow_up?: Date;
  nhs_locum_id?: number;
}

export interface nhs_patient_procedure_team {
  id: number;
  nhs_patient_procedure_id?: number;
  user_id?: number;
  name?: string;
  nhs_locum_id?: number;
}

export interface nhs_patient_record {
  id: number;
  nhs_patient_id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  nhs_form_id?: number;
  complete: number;
  locked: number;
  user_created: number;
  user_updated: number;
  related_to: number;
}

export interface nhs_procedure {
  id: number;
  name?: string;
  description?: string;
  nhs_procedure_type_id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  nhs_locum_id?: number;
  nhs_outcome_profile_id?: number;
  subname: string;
}

export interface nhs_procedure_chart {
  id: number;
  nhs_chart_type_id?: number;
  nhs_procedure_id?: number;
  positive?: number;
  negative?: number;
  positive_limit?: number;
  negative_limit?: number;
  reset?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  nhs_locum_id?: number;
  median: number;
  order_by: string;
}

export interface nhs_procedure_outcome {
  id: number;
  nhs_procedure_id?: number;
  name?: string;
  time?: string;
  nhs_risk_adjust_id?: number;
  definition: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  nhs_locum_id?: string;
  type: string;
}

export interface nhs_risk_adjust {
  id: number;
  nhs_procedure_id?: number;
  name?: string;
  formula?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  nhs_locum_id?: number;
  type: string;
}

export interface notification_templates {
  id: number;
  purchase_order_approval_email: number;
}

export interface nws_campaign {
  campaign_id: number;
  campaign_name: string;
  create_date: Date;
  company: number;
}

export interface nws_campaign_member {
  id: number;
  campaign_id: number;
  member_id: number;
  current_newsletter_id: number;
  join_time: number;
  company: number;
}

export interface nws_campaign_newsletter {
  id: number;
  campaign_id: number;
  newsletter_id: number;
  send_time: number;
  company: number;
}

export interface nws_group {
  group_id: number;
  group_name: string;
  public: number;
  company: number;
  temp: number;
}

export interface nws_image {
  image_id: number;
  image_url: string;
  company: number;
}

export interface nws_link {
  link_id: number;
  link_url: string;
  company: number;
}

export interface nws_link_open {
  link_open_id: number;
  link_id: number;
  member_id: number;
  send_id: number;
  timestamp: number;
  company: number;
}

export interface nws_member {
  member_id: number;
  first_name: string;
  last_name: string;
  email: string;
  join_date: Date;
  ip_address: string;
  unsubscribe_date: Date;
  unsubscribe_send_id: number;
  company: number;
  temp: number;
  imported: number;
}

export interface nws_member_group {
  id: number;
  member_id: number;
  group_id: number;
  company: number;
  temp: number;
}

export interface nws_newsletter {
  newsletter_id: number;
  create_date: Date;
  template: string;
  subject: string;
  from_name: string;
  from_email: string;
  content: string;
  bounce_email: string;
  company: number;
  grroup_id: number;
  campaign_type: string;
  groups_recipients: string;
  sent_by: number;
  created_by: number;
  groups_prerecipients: string;
  campaign_status: string;
  send_date: Date;
  finished_date: Date;
  total_recips: number;
  body_content: string;
}

export interface nws_newsletter_backup {
  newsletter_id: number;
  create_date: Date;
  template: string;
  subject: string;
  from_name: string;
  from_email: string;
  content: string;
  bounce_email: string;
  company: number;
  grroup_id: number;
  campaign_type: string;
  groups_recipients: string;
  sent_by: number;
  created_by: number;
  groups_prerecipients: string;
  campaign_status: string;
  send_date: Date;
  finished_date: Date;
  total_recips: number;
  body_content: string;
}

export interface nws_newsletter_images {
  id: number;
  occupier: number;
  linkhref: string;
  date: Date;
  user_id: number;
}

export interface nws_newsletter_member {
  id: number;
  send_id: number;
  member_id: number;
  sent_time: number;
  status: number;
  open_time: number;
  click_time: number;
  bounce_time: number;
  company: number;
  newsletter_id: number;
  communication_log_id: number;
  mandrill_id: string;
}

export interface nws_newsletter_templates {
  id: number;
  newsletter_id: number;
  type: number;
  template_id: number;
}

export interface nws_send {
  send_id: number;
  start_time: number;
  status: number;
  finish_time: number;
  newsletter_id: number;
  campaign_id: number;
  template_html: string;
  full_html: string;
  company: number;
}

export interface nws_settings {
  id: number;
  key: string;
  val: string;
  company: number;
}

export interface old_passwords {
  id: number;
  user_id: number;
  hash: string;
  created_at: Date;
}

export interface online_bookings_payments {
  id: number;
  signature: string;
  json_data: string;
  occupier: string;
}

export interface opportunity_closure_reason {
  id: number;
  name: string;
  is_active: boolean;
  occupier: number;
}

export interface orders {
  orderid: number;
  date: string;
  reference: string;
  name: string;
  email: string;
  p_method: string;
  quantity: number;
  total: number;
  status: string;
  occupier: number;
  eventid: number;
  t_type: string;
}

export interface pabau_care_stats {
  id: number;
  company_id: number;
  entry_date: Date;
  general_clients: number;
  general_leads: number;
  general_financials: number;
  general_emails: number;
  general_sms: number;
  general_total: number;
  marketing_sms: number;
  marketing_newsletter: number;
  marketing_survey: number;
  marketing_birthday: number;
  marketing_total: number;
  paperless_consent: number;
  paperless_medical: number;
  paperless_treatment: number;
  paperless_precare: number;
  paperless_aftercare: number;
  paperless_online: number;
  paperless_photo: number;
  paperless_documents: number;
  paperless_total: number;
  website_leads: number;
  website_online: number;
  stock_inventory: number;
  stock_purchase: number;
  stock_total: number;
  pabau_score: number;
  manual_service_satisfaction: number;
  manual_training_satisfaction: number;
  overall_satisfaction: number;
  green_flags: number;
  red_flags: number;
  amber_flags: number;
  grand_total_score: number;
  money_stripe: number;
  money_recall: number;
  money_sms: number;
  contact_count: number;
  consent_count: number;
  medical_history_count: number;
  treatment_note_count: number;
  precare_count: number;
  aftercare_count: number;
  photos_count: number;
  online_form_count: number;
  documents_count: number;
  bookings_count: number;
  leads_count: number;
  bookings_create_count: number;
  finance_count: number;
  stripe_fees_count: undefined;
  stripe_fees_activity: number;
  full_contact_count: number;
  total_sms_campaign: number;
  total_newsletter_campaign: number;
  total_surveys: number;
  total_recalls: number;
  total_birthdays: number;
  tickets_total_created: number;
  tickets_total_solved: number;
  tickets_total_open: number;
  tickets_01: number;
  tickets_18: number;
  tickets_824: number;
  tickets_24: number;
  survey_hits: number;
  photo_uploader_hits: number;
  sms_refer: number;
  sms_referee: number;
}

export interface pabau_config {
  id: number;
  cal_live: number;
  cal_beta: number;
  pos_beta: number;
  pos_live: number;
  rota_live: number;
  rota_beta: number;
}

export interface pabau_coupons {
  id: number;
  code: string;
  amount: undefined;
  type: string;
  redeemed: number;
  redeem_date: Date;
  produced_by: string;
}

export interface pabau_debug_tue {
  company_id: number;
  filename: string;
  hits: number;
  peak_memory: number;
  cpu_usage_time: number;
  exec_usage_time: number;
  id: number;
}

export interface pabau_feedback_stats {
  id: number;
  company_id: number;
  sent_to_email_sms: string;
  sent_date: number;
  related_id: number;
  converted: number;
}

export interface pabau_news {
  alertid: number;
  cid: undefined;
  uid: number;
  message: string;
  read: boolean;
  entrydate: number;
  type: string;
  owner_id?: string;
  image: string;
  title: string;
  url: string;
}

export interface pabau_order {
  id: number;
  company_id: number;
  training_fee: undefined;
  previous_system: string;
  support_plan: string;
  order_notes: string;
  subscription_fee: undefined;
  support_fee: undefined;
  date_created: Date;
  terms_signed: Date;
  subscription_name: string;
  lead_source: string;
  signed_contract: string;
  proposal_sent: string;
  setup_fee: undefined;
  waive_setup_fee: number;
  training_fee_done?: boolean;
  setup_fee_done?: boolean;
  support_fee_done?: boolean;
  subscription_fee_done?: boolean;
  summary_order: string;
  discounts?: string;
}

export interface pabau_paymentplan {
  id: number;
  company_id: number;
  description: string;
  amount: string;
  interval: string;
  payment_day: string;
  duration: string;
  name: string;
  count: number;
}

export interface pabau_pos_settings {
  id: number;
  company_id: number;
  disable_service: number;
  disable_products: number;
  disable_packages: number;
  disable_giftcards: number;
  disable_account: number;
  disable_price_override: number;
  print_mode: string;
  disable_discount: number;
  email_receipt_text: string;
  theme_col: string;
  bank_account: string;
  bank_number: string;
  sort_code: string;
  bank_name: string;
  iban: string;
  swift: string;
  cashup_settings: number;
  default_payment_type: string;
  disable_loyalty: number;
  email_receipt_template: number;
  enable_bank_details: number;
  vat: string;
  enable_biller_settings: number;
  display_taxes: number;
  use_pabau_id: number;
  starting_invoice_number: number;
  enable_next_appointment: number;
  show_paid_label: number;
  paid_label: string;
  display_quantity: number;
  display_unit_cost: number;
  logo_position: string;
  force_discount_reason: boolean;
  automatic_booking: number;
  gift_msg_template_id: number;
  gift_sms_template_id: number;
  package_use_by_date?: number;
  locked: number;
  cron_day?: number;
  lock_sale_date?: Date;
  stock_mode: number;
  inv_template?: string;
  lock_invoice_edit: number;
}

export interface pabau_shortener {
  id: number;
  redirect_code: string;
  url: string;
  company_id: number;
}

export interface pabau_users {
  id: number;
  user: string;
  password: string;
  is_trainer?: number;
  is_admin?: number;
  is_onboarder?: number;
  slack_id?: string;
}

export interface pages {
  id: number;
  name: string;
  link: string;
  parent: number;
  category: string;
  showcase: number;
  description: string;
  features: string;
  new: number;
  img: string;
  admin: number;
  order: number;
  cover: string;
  tickier_order: number;
  friendly_name: string;
  app_weight: number;
  video_link: string;
  large_thumb: string;
  inactive: number;
  private_key: string;
  new_url: string;
}

export interface page_categories {
  id: number;
  category: string;
  description: string;
  visible: number;
  url: string;
}

export interface page_hits {
  id: number;
  file: string;
  hits: string;
  memory_usage: string;
}

export interface partners_amendment {
  id: number;
  partner_id: number;
  amount: undefined;
  from_date: Date;
  to_date: Date;
}

export interface partners_partner {
  id: number;
  partner_name: string;
  partner_email: string;
  status: number;
  created_date: Date;
  partner_type: string;
  include_sms: number;
  recurring: number;
}

export interface partner_payments {
  id: number;
  company_id: number;
  charge_date: Date;
  amount: undefined;
  description: string;
  partner_id: string;
  status: string;
}

export interface partner_track {
  id: number;
  partner_id: number;
  created_date: Date;
  from_date: Date;
  to_date: Date;
}

export interface password_reset_auth {
  id: number;
  key_code: string;
  username: string;
  old_password: string;
  date: Date;
}

export interface payments {
  id: number;
  from: string;
  date: number;
  amount: string;
  invoice: number;
  pmethod: string;
  occupier: number;
}

export interface payment_protection_stripe {
  id: number;
  stripe_customer_id: string;
  payment_method_id?: string;
  contact_id: number;
  created_at: Date;
  modified_at: Date;
  company_id: number;
}

export interface payroll {
  id: number;
  company_id: number;
  period_type?: number;
  period_from: Date;
  period_to: Date;
  position: number;
  locations?: number;
  total_hours: string;
  wage_pay: undefined;
  salary_pay: undefined;
  commission_pay: undefined;
  total_pay: undefined;
  created_by: number;
  created_date: Date;
  employees: string;
  invoice_ids?: string;
  pending_invoice_ids?: string;
  finance_ids?: string;
}

export interface permission_templates {
  id: number;
  name: string;
  company_id: number;
  app_permissions: string;
  user_permissions: string;
  mobile_permissions: string;
  mobile_widgets: string;
  disabled_services: string;
  alerts: string;
  is_admin: boolean;
  enabled_reports: string;
  all_reports: boolean;
}

export interface petty_cash_types {
  id: number;
  name: string;
  description: string;
  company_id: number;
  default_price: undefined;
  is_active: number;
}

export interface pg_appointment_status {
  id: number;
  company_id: number;
  appointment_id: number;
  patient_details: number;
  medical_history: number;
  patient_consent: number;
  photos: number;
  treatment_notes: number;
  contact_id: number;
  consent_1: number;
  consent_2: number;
  consent_3: number;
  aftercare_sent: number;
  aftercare_template_ids: string;
  created_at?: Date;
}

export interface phi_assesment_entries {
  id: number;
  customer_id: number;
  gender: string;
  interest_area: string;
  interests: string;
  date_taken: Date;
}

export interface photo_album {
  id: number;
  album_name: string;
  contact_id: number;
  occupier: number;
  creation_date: Date;
  modified_date: Date;
}

export interface phpbirthday {
  Name?: string;
  Address?: string;
  City?: string;
  entrydate?: string;
  Postal?: string;
  Country?: string;
  B_Date?: string;
  IP_Address?: string;
  ID: number;
  H_Phone?: string;
  M_Phone?: string;
  Email?: string;
  University?: string;
  Group?: string;
  Occupier?: string;
  fb_id?: string;
  Gender?: string;
  visible: number;
  bday_email: boolean;
  bday_sms: boolean;
  bday_letter: number;
  bday_email_date: string;
}

export interface pipeline {
  id: number;
  company_id: number;
  name: string;
  description: string;
  status: number;
  services_ids: string;
  note: string;
  restrict_stages: boolean;
}

export interface pipeline_stages {
  id: number;
  company_id: number;
  pipeline_id: number;
  name: string;
  stage_order: number;
  custom_field_ids: string;
  note: string;
  created_date: Date;
  updated_date: Date;
}

export interface pipeline_stage_custom_fields {
  id: number;
  company_id: number;
  opportunity_id: number;
  stage_id: number;
  custom_field_id: number;
  custom_field_value: string;
  updated_date: Date;
}

export interface pos2_queries {
  id: number;
  transaction_id: number;
  query: string;
}

export interface pos2_transactions {
  id: number;
  guid: string;
  bill_date: Date;
  php_date: Date;
  uid: number;
  company: number;
  bill: string;
  result?: boolean;
  result_text?: string;
  hold: number;
  booking_id: number;
  receipt?: string;
}

export interface pos_log_guid {
  id: number;
  guid?: string;
  company?: number;
}

export interface pos_settings {
  pos_id: number;
  cat_limit: number;
  pro_limit: number;
  default_category: number;
  default_customer: number;
  default_biller: number;
  display_time: string;
  display_avatar?: number;
  display_account?: number;
  services_filter?: number;
  retail_filter?: number;
  salesbtn_left_disabled?: number;
  cancelbtn_bottom_disabled?: number;
  occupier?: number;
  cashup_settings: number;
}

export interface pract_charge_amount {
  id: number;
  user_id: number;
  company_id: number;
  commission_sheet_id: number;
  product_id: number;
  charge_amount: number;
  facility_fee?: undefined;
  facility_fee2?: undefined;
  deduct_consumables?: number;
  payout_employee?: undefined;
  payout_business: undefined;
  c_deductions: undefined;
}

export interface preview_letter_template {
  id: number;
  occupier: string;
  subject: string;
  message: string;
  header: string;
  footer: string;
  template_id: number;
  exclude_margins: number;
}

export interface price_level_settings {
  id: number;
  day_name?: string;
  day_start_time?: string;
  day_end_time?: string;
  discount_type?: string;
  discount?: undefined;
  discount_mode?: string;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  updated_date?: Date;
}

export interface product_details {
  id: number;
  name: string;
  code: string;
  other_name_1: string;
  other_name: string;
  image: string;
}

export interface profit_loss_report_temp {
  id: number;
  weekdate: number;
  company_id: number;
  uid: number;
  staffId: number;
  employee: string;
  Sunday_Cost_Net: undefined;
  Sunday_Cost_Gross: undefined;
  Sunday_hours: undefined;
  Monday_Cost_Net: undefined;
  Monday_Cost_Gross: undefined;
  Monday_hours: undefined;
  Tuesday_Cost_Net: undefined;
  Tuesday_Cost_Gross: undefined;
  Tuesday_hours: undefined;
  Wednesday_Cost_Net: undefined;
  Wednesday_Cost_Gross: undefined;
  Wednesday_hours: undefined;
  Thursday_Cost_Net: undefined;
  Thursday_Cost_Gross: undefined;
  Thursday_hours: undefined;
  Friday_Cost_Net: undefined;
  Friday_Cost_Gross: undefined;
  Friday_hours: undefined;
  Saturday_Cost_Net: undefined;
  Saturday_Cost_Gross: undefined;
  Saturday_hours: undefined;
  Total_Week_Cost_Net: undefined;
  Total_Week_Cost_Gross: undefined;
  Total_Week_hours: undefined;
  xp: undefined;
  wages: undefined;
  FC: undefined;
  Total_Working_Count: number;
  botw: number;
  botw_level: number;
}

export interface psfs_followup_email_trigger {
  id: number;
  initial_id?: number;
  date_time?: Date;
  type?: number;
  email_type: string;
}

export interface psfs_initial_email_trigger {
  id: number;
  company_id?: number;
  booking_id?: number;
  contact_id?: number;
  cycle_id: number;
  form_id: number;
  date_time?: Date;
  discharge?: number;
  discharge_date?: Date;
}

export interface psfs_settings {
  id: number;
  company_id: number;
  psfs_initial_template_id: number;
  psfs_followup_template_id: number;
  psfs_initial_enable: number;
  psfs_followup_enable: number;
  psfs_form_id: number;
  modified_by?: number;
  modified_date?: Date;
}

export interface purchase {
  p_id: number;
  customer_id: string;
  items: number;
  price: undefined;
  date: string;
  customer_name: string;
  currency: string;
  comp_id: number;
}

export interface quick_tools {
  id: number;
  parentid: number;
  secondaryid: number;
  title: string;
  ordering: number;
  link: string;
}

export interface quotation_users {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  country: string;
  subscription_plan_name?: string;
  subscription_plan_price?: undefined;
  support_plan_name?: string;
  support_price?: undefined;
  education_plan_name?: string;
  education_plan_price?: undefined;
  migration_plan_name?: string;
  migration_plan_price?: undefined;
  upfront_payment?: undefined;
  sub_discount?: number;
  sup_discount?: number;
  edu_discount?: number;
  set_discount?: number;
  previous_system?: string;
}

export interface radio_tracks {
  id: number;
  company: number;
  filename: string;
  title: string;
  is_spotify: boolean;
}

export interface rate_limiter {
  ip: string;
  count: number;
  last_access: Date;
}

export interface recall_schedule {
  id: number;
  company_id: number;
  recall_id: number;
  contact_id: number;
  date: number;
  scheduled_date: Date;
  notes: string;
  sms_sent: number;
  recalled_by: number;
  recalled_on: number;
  email_sent: number;
  deleted: number;
  booking_id: number;
  created_date: Date;
  updated_date: Date;
  error_code?: number;
}

export interface recall_settings {
  id: number;
  company_id: number;
  status: number;
  mandatory: number;
  only_working_day: number;
}

export interface recall_types {
  id: number;
  recall_name: string;
  recall_mode: string;
  recall_period: string;
  company_id: number;
  send_sms: number;
  recall_category_id: number;
  send_email: number;
  auto_recall: boolean;
  auto_recall_products_ids: string;
  auto_recall_trigger: string;
  auto_recall_services_ids: string;
  email_from: number;
  sms_from: number;
}

export interface recent_searches {
  id: number;
  contact_id: number;
  company_id: number;
}

export interface referral_settings {
  id: number;
  company_id: number;
  thanks_msg_id: number;
  auto_reward: number;
  reward_value: undefined;
  voucher_expiry_days: number;
  reward_type: string;
  reward_options: referral_settings_reward_options;
  sms_notify: number;
  email_notify: number;
  connect_wording: string;
  blind_ref_email: string;
  post_buzzfeed: number;
  reward_refee_value: undefined;
  reward_client: number;
  reward_referer: number;
  thanks_msg_id_referee: number;
  email_id_referrer: number;
  email_id_referee: number;
  enable_sms_referee: number;
  enable_email_referee: number;
  voucher_template_id: number;
}

export interface related_services {
  id: undefined;
  service_id: undefined;
  service: string;
  duration: number;
  occupier: string;
}

export interface reminder_contact_log {
  id: undefined;
  occupier: string;
  contact_id: undefined;
  date: Date;
}

export interface reports {
  id: undefined;
  report_category_id: undefined;
  name?: string;
  description?: string;
  occupier?: string;
  group_field?: string;
  link?: string;
  send?: number;
  date_limit: string;
  filter?: string;
  search_result: string;
  column_names: string;
  preview_image: string;
  exc_vat_column: string;
  filter_json: string;
  grand_total: number;
  report_code: string;
  show_hide_columns: string;
  users_mode: number;
  filter_user?: string;
  iframe: number;
  iframe_url: string;
  package_usage: number;
  show_package_usage: number;
  deleted: number;
  marketing: number;
  has_summary: number;
  filter_summary?: number;
  admin_only: number;
  thumbnail_preview: string;
  total_revenue: number;
  show_custom_ids: number;
  show_custom_fields: number;
  custom_fields_defined: string;
  show_in_leads: number;
  other_custom_fields: string;
  custom_fields_group: string;
  custom_filter: string;
  sub_category: string;
  easy_filters: string;
  easy_filters_advanced: string;
  show_accounting: number;
  show_revenue: number;
  support_location_filter: number;
  checks_complete: number;
  custom_ids_checked: number;
  flag_video: string;
  flag_video_2: string;
  checks_complete_2: number;
  companies_included: string;
  checks_complete_3: number;
  flag_video_3: string;
  checks_complete_4: number;
  flag_video_4: string;
  subscribed_filter?: string;
  print_page_size: string;
  sort_columns: string;
  group_column: string;
  mask_client_name: number;
  core_report: number;
  hide_columns: string;
  summary_mode: number;
  graph_mode: number;
  detailed_mode: number;
}

export interface reportschedule_log {
  id: number;
  setting_id: number;
  UID: number;
  reports: string;
  datetime: Date;
  occupier: string;
  message: string;
  is_test: number;
}

export interface reportschedule_settings {
  id: number;
  company_id: number;
  enabled: number;
  frequency: string;
  custom_day: string;
  custom_mode: string;
  last_current_from: string;
  last_current_to: string;
  period_from: string;
  period_to: string;
  reports: string;
  included_users: string;
  LastSent: Date;
  end_week: number;
  time: string;
  report_subject: string;
  sales_summary: number;
}

export interface reports_favourite {
  id: number;
  occupier: string;
  report_id: number;
  stars: number;
}

export interface report_category {
  id: undefined;
  name?: string;
  description?: string;
  occupier?: string;
  type: string;
  colour: string;
}

export interface report_custom_fields {
  id: number;
  field_id: string;
  field_name: string;
  field_type: string;
  is_active: number;
  group_name: string;
  category_id: number;
  order_number: number;
  description: string;
}

export interface report_custom_fields_categories {
  id: number;
  name: string;
  description: string;
  is_active?: number;
}

export interface report_custom_fields_combine {
  id: number;
  name: string;
  field_1: string;
  operator: string;
  field_2: string;
  active: number;
  occupier: number;
}

export interface report_filters {
  id: number;
  column_names: string;
  filter_type: string;
  filter_select_type: string;
}

export interface report_pdf {
  id: number;
  uid: number;
  occupier: string;
  content: string;
  datetime: Date;
  unique_id: number;
  guid: string;
}

export interface report_pdf_messages {
  id: number;
  report_pdf_id: number;
  email: string;
  subject: string;
  body: string;
  occupier: string;
  user_id: number;
}

export interface report_scheduled_csv {
  id: number;
  occupier: number;
  user_id: number;
  unique_key: string;
  get_data: string;
  post_data: string;
  scheduled: number;
  date_created: Date;
  url_link: string;
  file_link: string;
}

export interface request_permission {
  id: number;
  company_id: number;
  uid: number;
  type: string;
  name: string;
  target_id: number;
  approved: number;
  approved_by_id: number;
  approved_on: Date;
  requested_on: Date;
}

export interface rest_bookings {
  id: undefined;
  table_id?: undefined;
  title: string;
  start_date: Date;
  end_date: Date;
  UID: undefined;
  contact_id: undefined;
  guest_count: number;
  occupier: string;
  create_date: Date;
  status: string;
  Online: number;
  invoice_id: undefined;
}

export interface rest_categories {
  ID: undefined;
  Name: string;
  Description?: string;
  Occupier: string;
}

export interface rest_tables {
  ID: number;
  rest_category_id: number;
  Name: string;
  Description?: string;
  Size: number;
  Covers: number;
  Occupier: string;
}

export interface room_master {
  r_id: number;
  r_comp_id?: number;
  r_loc_id?: number;
  r_room?: string;
  r_date?: string;
}

export interface rota_repeats {
  id: number;
  uid: number;
  shift_start: number;
  shift_end: number;
  repeat_start: number;
  repeat_end: number;
  day_sun: boolean;
  day_mon: boolean;
  day_tue: boolean;
  day_wed: boolean;
  day_thu: boolean;
  day_fri: boolean;
  day_sat: boolean;
  every: number;
  unit: string;
}

export interface rota_shifts {
  id: number;
  uid: number;
  start: undefined;
  end: undefined;
  occupier: number;
  notes?: string;
  last_seen?: Date;
  last_modified?: Date;
  last_notified?: Date;
  last_published?: Date;
  first_created: Date;
  user_created: number;
  repeat_id?: number;
  reason_code?: string;
  reason_data?: string;
  holiday_id: number;
  cal_id?: number;
  is_cal: number;
  note_color: string;
  location_id: number;
  request?: number;
  sickness?: number;
  imported: number;
  tag_name: string;
  room_id: number;
  force_created: boolean;
}

export interface rota_templates {
  rota_template_id: number;
  is_active: number;
  template_name: string;
  start_time: string;
  end_time: string;
  days: string;
  company_id: number;
}

export interface sales {
  id: number;
  seller: number;
  date: Date;
  tickets_dispensed: number;
  tickets_returned: number;
  paid_by?: string;
}

export interface sales_meta {
  id: number;
  sales_id: number;
  meta_key: string;
  meta_value?: string;
}

export interface sales_pitches {
  id: number;
  pitch_name: string;
  pitch_description: string;
  pitch_type: string;
  company_id: number;
  created_time: Date;
}

export interface salon_bookings {
  id: number;
  title: string;
  start_date?: undefined;
  end_date?: undefined;
  start_time?: undefined;
  end_time?: undefined;
  service?: string;
  contact_id?: number;
  UID: number;
  occupier: number;
  backgroudcolor?: string;
  create_date?: undefined;
  update_date?: undefined;
  status: string;
  estimated_cost: undefined;
  tips: undefined;
  discounts: undefined;
  where: string;
  room_id?: number;
  unique_id: string;
  reason?: string;
  invoice_id?: number;
  booking_id: number;
  Online?: number;
  package_id: undefined;
  cancel_take: number;
  book_take: number;
  class_master_id: undefined;
  unavailable: number;
  coupon_claim_id: string;
  related_id: undefined;
  service_id: number;
  rebook: number;
  repeat_id: number;
  requested: number;
  sent_sms: number;
  sent_email: number;
  sent_survey: number;
  custom_contact_id: number;
  custom_contact_name?: string;
  custom_user_id: string;
  custom_user_name?: string;
  custom_service_id: string;
  imported: number;
  client_confirmed: number;
  hold_guid: string;
  created_by_uid: number;
  marketing_source: number;
  resource_id: number;
  custom_room_name?: string;
  custom_created_by_user_name: string;
  location_id: number;
  modified_by_uid: number;
  sent_email_reminder: boolean;
  disable_locations: number;
  participant_master_uid: number;
  participant_master_booking_id: number;
  participant_slave_uids: string;
  participant_slave_booking_ids: string;
  private: number;
  external_guest_ids: string;
  description: string;
  issued_to: number;
  contract_id: number;
  all_day: number;
  interlinked_master_uid: number;
  all_day_start_date: undefined;
  all_day_end_date: undefined;
}

export interface salon_bookings_apt_cancel {
  id: number;
  appointment_id?: number;
  type?: string;
  reason_type?: string;
  reason?: string;
  created_date?: Date;
  last_updated_date?: Date;
  cancel_by: number;
  cancel_reason_id: number;
}

export interface salon_bookings_changelog {
  id: number;
  booking_id: number;
  changelog: string;
}

export interface salon_bookings_clinics_settings {
  id: number;
  occupier: number;
  uid: number;
  clinic_id: number;
}

export interface salon_bookings_confirmation {
  id: number;
  booking_id: number;
  confirmation_date: Date;
  is_confirmed: number;
  contact_id: number;
  occupier: string;
  updated_on?: Date;
}

export interface salon_bookings_confirmation2 {
  id: number;
  booking_id: number;
  confirmation_date: Date;
  is_confirmed: number;
  contact_id: number;
  occupier: string;
  updated_on?: Date;
}

export interface salon_bookings_external {
  id: number;
  booking_id: number;
  location: string;
}

export interface salon_bookings_groups {
  id: number;
  booking_id: number;
  occupier: number;
  max_clients: number;
  created_date: Date;
  models_count: number;
  models_req_count: number;
  imported: number;
  delegates: number;
}

export interface salon_bookings_groups_alerts {
  ID: number;
  OwnerID: number;
  CourseID: number;
  Note: string;
  Status: salon_bookings_groups_alerts_Status;
  CreatedDate: Date;
  IpAddress: number;
  Critical: number;
}

export interface salon_bookings_groups_detailed {
  id: number;
  occupier: number;
  group_id: number;
  booking_id: number;
  contact_id: number;
  created_date: Date;
  custom_contact_email: string;
  custom_contact_name: string;
  custom_contact_id: number;
  imported: number;
}

export interface salon_bookings_groups_detailed_backup {
  id: number;
  occupier: number;
  group_id: number;
  booking_id: number;
  contact_id: number;
  created_date: Date;
  custom_contact_email: string;
  custom_contact_name: string;
  custom_contact_id: number;
  imported: number;
}

export interface salon_bookings_groups_notes {
  ID: number;
  OwnerID: number;
  CourseID: number;
  Note: string;
  Status: salon_bookings_groups_notes_Status;
  CreatedDate: Date;
  IpAddress: number;
}

export interface salon_bookings_history {
  id: undefined;
  old_booking_id: undefined;
  new_booking_id: undefined;
  before_startdate: undefined;
  before_enddate: undefined;
  after_startdate: undefined;
  after_enddate: undefined;
  before_status: string;
  after_status: string;
  before_service: string;
  after_service: string;
  CreatedDate: Date;
  UID: number;
  mode: string;
  occupier: string;
}

export interface salon_bookings_history_trigger {
  id: number;
  mode?: string;
  booking_id: number;
  title: string;
  start_date?: undefined;
  end_date?: undefined;
  start_time?: undefined;
  end_time?: undefined;
  service?: string;
  contact_id?: number;
  UID: number;
  occupier: number;
  backgroudcolor?: string;
  create_date?: undefined;
  update_date?: undefined;
  status: string;
  estimated_cost: undefined;
  tips: undefined;
  discounts: undefined;
  where: string;
  room_id?: number;
  unique_id: string;
  reason?: string;
  invoice_id?: number;
  Online?: number;
  package_id: undefined;
  cancel_take: number;
  book_take: number;
  class_master_id: undefined;
  unavailable: number;
  coupon_claim_id: string;
  related_id: undefined;
  service_id: number;
  rebook: number;
  repeat_id: number;
  requested: number;
  sent_sms: number;
  sent_email: number;
  sent_survey: number;
  custom_contact_id: number;
  custom_contact_name?: string;
  custom_user_id: number;
  custom_user_name?: string;
  custom_service_id: number;
  imported: number;
  client_confirmed: number;
  hold_guid: string;
  created_by_uid: number;
  marketing_source: number;
  resource_id: number;
  date_changed?: Date;
  location_id: number;
  modified_by_uid: number;
}

export interface salon_bookings_import_helper {
  id: number;
  start_date: undefined;
  end_date: undefined;
  service: string;
  custom_contact_name: string;
  custom_user_name: string;
  occupier: string;
  imported: number;
  taken: string;
  custom_contact_id: string;
  custom_user_id: number;
  create_date: string;
  custom_room_name: string;
  title: string;
  Atended: string;
  CancellationReq: string;
  ReqReason: string;
  DNA: string;
  custom_created_by_user_name: string;
  status_name: string;
  color: string;
  updated_date: string;
  cancel_date: string;
  noshow_date: string;
  added: number;
  custom_service_id: number;
  custom_id: number;
  sms_confirmation: number;
  sms_reminder: number;
  custom_type_name: string;
  custom_deposit_name: string;
  custom_subject: string;
  custom_body: string;
  custom_title: string;
  custom_title_final: string;
  custom_treatment_id: number;
  contact_id: number;
  custom_treatment_group_id: number;
  custom_treatment_type_id: number;
}

export interface salon_bookings_invitation {
  id: number;
  booking_id: number;
  guest_id: number;
  status: string;
}

export interface salon_bookings_prep_finish {
  id: number;
  occupier: number;
  booking_id: number;
  prep_time: number;
  finish_time: number;
}

export interface salon_bookings_repeats {
  id: number;
  uid: number;
  start: number;
  end: number;
  repeat_start: number;
  repeat_end: number;
  day_sun: boolean;
  day_mon: boolean;
  day_tue: boolean;
  day_wed: boolean;
  day_thu: boolean;
  day_fri: boolean;
  day_sat: boolean;
  every: number;
  unit: string;
  repeat_until: Date;
}

export interface salon_bookings_resources {
  id: number;
  occupier: number;
  booking_id: number;
  resource_id: number;
}

export interface salon_bookings_settings {
  id: number;
  userid?: number;
  name?: string;
  value?: string;
  createdate?: undefined;
  updatedate?: undefined;
}

export interface salutations {
  id: number;
  name: string;
  company_id: number;
}

export interface scanner_batches {
  id: number;
  occupier: number;
  batch_id: string;
  date_created: Date;
  category_card: string;
}

export interface scanner_cards {
  id: number;
  occupier: number;
  card_number: undefined;
  date_created: Date;
  date_activated: Date;
  card_points: number;
  batch_id: string;
  validated: number;
  contact_id: number;
  category_card: string;
}

export interface scanner_history {
  trans_id: number;
  date: Date;
  member_id: number;
  type: string;
  amount: undefined;
  contact_id: number;
  sales_id?: number;
}

export interface scanner_settings {
  occupier: number;
  defaultpoints: number;
  rule1: number;
  rule1occurance: number;
  rule1campaign: string;
  rule2: number;
  rule2occurance: string;
  rule2campaign: string;
  id: number;
}

export interface scheduler {
  id: undefined;
  status: string;
  subject: string;
  sentby: string;
  source: string;
  to: string;
  companyid: number;
  email_by: string;
  message: string;
  date: number;
  communication_type: string;
  contact_id: number;
  site_section: string;
  sch_date: number;
  sch_time: number;
  the_status: string;
  template_id: undefined;
  relate_id: number;
  unique_id: string;
  imported: number;
}

export interface scheduler_backup {
  id: undefined;
  status: string;
  subject: string;
  sentby: string;
  source: string;
  to: string;
  companyid: number;
  email_by: string;
  message: string;
  date: number;
  communication_type: string;
  contact_id: number;
  site_section: string;
  sch_date: number;
  sch_time: number;
  the_status: string;
  template_id: undefined;
  relate_id: number;
  unique_id: string;
  imported: number;
}

export interface schedule_invoice_template {
  id: number;
  sch_inv_temp_dtl_id?: number;
  interval_type?: number;
  day?: string;
  date?: number;
  month?: number;
  year?: number;
  time: number;
  duration?: number;
  occurance?: number;
  end_after_occurrences?: number;
  end_date?: Date;
  occupier?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface schedule_invoice_template_details {
  id: number;
  template_name?: string;
  template_type?: number;
  terms?: number;
  all_amounts_are?: number;
  is_vat?: number;
  discount?: undefined;
  customer_message?: string;
  memo?: string;
  to_be_emailed?: number;
  occupier?: number;
  created_date?: Date;
  modified_date?: Date;
}

export interface schedule_invoice_template_product_details {
  id: number;
  sch_inv_temp_dtl_id?: number;
  invoice_to?: number;
  product_id?: number;
  description?: string;
  qty?: number;
  unite_price?: undefined;
}

export interface selected_profiles_compose_message {
  id: undefined;
  main: string;
  other: string;
  uid: undefined;
  timestamp: Date;
}

export interface seller {
  sellerid: number;
  start: Date;
  name: string;
  halls: string;
  number: string;
  fbid: string;
  Block: string;
  year: number;
  occupier: string;
  university: string;
  visible: number;
  job_title: string;
}

export interface seller_pay {
  id: undefined;
  visible: number;
  uid: undefined;
  amount: number;
  timestampe: undefined;
}

export interface server_urls {
  id: number;
  name: string;
  url: string;
  order: number;
}

export interface services_master_category {
  id: number;
  name: string;
  occupier: number;
  ord: number;
  type: services_master_category_type;
  image: string;
}

export interface service_product_loyalty {
  id: number;
  company_id: number;
  product_id: number;
  points: number;
}

export interface service_reminders {
  id: number;
  service_id: number;
  email_reminder_id: number;
  sms_reminder_id: number;
}

export interface session_packages {
  id: undefined;
  name: string;
  description?: string;
  session_count: string;
  duration: string;
  price: undefined;
  activities: string;
  occupier: string;
  CreatedDate: Date;
  imported: number;
  inactive: boolean;
  deleted: number;
  product_id: number;
  service_product_id: number;
  hard_deleted: number;
  session_package_master_id: number;
  tax_id: number;
  custom_service_name: string;
  custom_price_item: undefined;
  empty_name: number;
  old_price: undefined;
  old_duration: string;
  disabledusers: string;
  sold_online: number;
}

export interface session_packages_master {
  id: number;
  name: string;
  occupier: number;
  created_date: Date;
  deleted: number;
}

export interface share_image {
  id: number;
  photo_url: string;
  passcode: string;
  contact_id: number;
  company_id: number;
  share_date: Date;
}

export interface site_widget_settings {
  id: number;
  company_id: number;
  classes: number;
  online_store: number;
  appointments: number;
  loyalty: number;
  dashboard: number;
  takeaway: number;
  tablebooking: number;
  guestlist: number;
  opening: number;
  callus: number;
  website: number;
  location: number;
  your_cuts: number;
  documents: number;
  refer: number;
  package_history: number;
  lab_history: number;
}

export interface slow_query_raw {
  query_id: number;
  sql_text: string;
  db: string;
  server_host: string;
  request_uri: string;
  get_data: string;
  post_data: string;
  date_time: Date;
  query_time: string;
}

export interface sms_blacklist {
  sms_id: number;
  sms_number: string;
  sms_action: string;
  notify_company: number;
}

export interface sms_campaign {
  sms_id: number;
  sms_campaign_name: string;
  create_date: Date;
  from_name: string;
  content: string;
  company: number;
  list_id: number;
  campaign_type: string;
  groups_recipients: string;
  sent_by: number;
  created_by: number;
  groups_prerecipients: string;
  campaign_status: string;
  send_date: Date;
  gift_voucher: string;
  gift_expiry: number;
  total_recips: number;
  weblink: string;
  campaign_cost: undefined;
  all_products_services: number;
  finished_date: Date;
}

export interface sms_campaign_list {
  id: number;
  sms_campaign_id: number;
  sms_group_id: number;
  occupier: number;
  mobile_number: string;
  contact_id: number;
  communication_log_id: string;
}

export interface sms_campaign_products {
  id: number;
  sms_campaign_id: number;
  product_id: number;
  related_type: string;
  occupier: string;
}

export interface sms_delivery {
  smsd_id: undefined;
  smsd_number: string;
  contact_id: number;
  smsd_status: string;
  smsd_cid: string;
  smsd_customID: string;
  error_code: number;
}

export interface sms_groups {
  sms_id: undefined;
  sms_uid: undefined;
  sms_group: string;
  sms_number: string;
  sms_blank: number;
  sms_dup: number;
  sms_delete: boolean;
}

export interface sms_groups_list {
  id: number;
  sms_group_id: number;
  occupier: number;
  mobile_number: string;
  contact_id: number;
}

export interface sms_group_log {
  smsg_id: undefined;
  smsg_statsid: undefined;
  smsg_groupid: undefined;
}

export interface sms_inbox {
  id: number;
  company_id: number;
  number: string;
  content: string;
  action: string;
}

export interface sms_purchases {
  id: number;
  date: number;
  sms_amount: number;
  cid: number;
  user: number;
  price: undefined;
  profit: undefined;
  purchase_type: string;
  status: number;
}

export interface sms_senders {
  smsd_id: undefined;
  smsd_name: string;
  smsd_cid: undefined;
  smsd_delete: number;
  is_default: boolean;
  merge_tags: string;
}

export interface sms_stats {
  smss_id: undefined;
  smss_uid: undefined;
  smss_camp: string;
  smss_time: string;
  smss_count: undefined;
}

export interface sms_temp_table {
  id: number;
  mobile: string;
  company_id: number;
  sent_sms: number;
  status: number;
}

export interface sms_test {
  id: number;
  response: string;
}

export interface social_survey {
  id: number;
  page_id: undefined;
  company: number;
  twitter_id: undefined;
  disable_email: number;
  disable_sms: number;
  sms_message_id: number;
  from_name: string;
  sms_days_after?: number;
  sms_send_time?: string;
  feedback_title: string;
  feedback_subtitle: string;
  feedback_question: string;
  auto_facebook: number;
  auto_twitter: number;
  after_page: string;
  google_plus_link: string;
  google_review: number;
  google_review_url: string;
  aweber_code: string;
  score_indicator: number;
  add_note: number;
  post_buzzfeed: number;
  post_website: number;
  email_message_id: number;
  redirect_url: string;
  feedback_name: string;
  ty_enable_email: number;
  ty_enable_sms: number;
  ty_email_id: number;
  ty_sms_id: number;
  color_1: string;
  color_2: string;
  google_review_redirect: number;
  show_reviews_above: number;
  logo_position: string;
  logo_height?: number;
  hits: number;
}

export interface social_survey_answers {
  id: number;
  feedback_id: number;
  question: string;
  answer: string;
}

export interface social_survey_feedback {
  id: number;
  rating: number;
  contact_id: number;
  feedback_source: string;
  company: number;
  date: number;
  feedback_comment: string;
  feedback_name: string;
  feedback_status: string;
  related_id: number;
  related_to: string;
  feedback_for: number;
  service: string;
  public_use: number;
  service_id: number;
  owner_response: string;
}

export interface social_survey_questions {
  id: number;
  occupier: string;
  question: string;
  answer: string;
}

export interface solutions {
  id: undefined;
  title?: string;
  status?: string;
  question?: string;
  answer?: string;
  ownerid?: number;
  occupier?: number;
  category?: string;
  CreatedDate?: Date;
  IpAddress?: number;
}

export interface spam_log {
  id: number;
  ip: string;
  reason: string;
  company_id: number;
  date: number;
  data: string;
}

export interface sql_failed_transactions {
  fail_id: number;
  request_uri: string;
  get_data: string;
  post_data: string;
  sql_query: string;
  resp_array: string;
}

export interface staff_application_settings {
  occupier: number;
  staff_rotta_setting_mode: number;
  staff_rotta_setting_password: string;
  staff_clockin_setting_mode: number;
  staff_clockin_setting_password: string;
  staff_clockin_setting_location: string;
  staff_clockin_setting_message: string;
  staff_manager_setting_mode: number;
  staff_manager_setting_password: string;
  staff_manager_setting_location: string;
  staff_manager_setting_message: string;
  staff_clockin_setting_manualt: number;
  staff_clockin_setting_ccontact: number;
  id: number;
}

export interface staff_categories_targets {
  id: number;
  staff_id?: number;
  cat_id?: number;
  value?: string;
  occupier?: number;
  created_date?: Date;
  last_updated_date?: Date;
}

export interface staff_hours_settings {
  id: number;
  day_name?: string;
  opening_hours?: string;
  slider_openning?: number;
  closing_hours?: string;
  slider_closing?: number;
  closed?: number;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  updated_date?: Date;
}

export interface staff_limit_settings {
  id: number;
  day_name?: string;
  min_value?: number;
  max_value?: number;
  occupier?: number;
  uid?: number;
  created_date?: Date;
  updated_date?: Date;
}

export interface staff_meta {
  id: number;
  staff_id: number;
  meta_name: string;
  meta_value: string;
}

export interface staff_performance_settings {
  id: number;
  company_id: number;
  enabled: number;
  frequency: string;
  excluded_users: string;
  LastSent: Date;
  end_week: number;
}

export interface staff_profiles {
  sellerid: number;
  start: Date;
  name: string;
  surname: string;
  number: string;
  photo: string;
  email: string;
  occupier: string;
  visible: number;
  job_title: string;
  birthdate: Date;
  city: string;
  postcode: string;
  country: string;
  homephone: string;
  workphone: string;
  manager: number;
}

export interface staff_service_commission {
  id: number;
  sales_id: number;
  booking_id: number;
  staff_id: number;
  commission: undefined;
  creation_date?: Date;
  service_id: number;
  quote_id: number;
}

export interface staff_shifts {
  ss_uid: undefined;
  ss_sid: undefined;
  ss_sweek: string;
  ss_start: number;
  ss_duration: number;
  ss_rate: number;
  ss_added: number;
  ss_role: undefined;
}

export interface staff_shifts_new {
  id: undefined;
  staff_id: undefined;
  start_date: Date;
  end_date: Date;
  ss_rate: number;
  staff_role_id: undefined;
  CreatedDate: Date;
  occupier: string;
}

export interface staff_shift_roles {
  role_id: undefined;
  role_cid: undefined;
  role_name: string;
  role_colour?: string;
  role_delete: boolean;
}

export interface staff_targets {
  id: number;
  company_id: string;
  retail_sales: undefined;
  service_sales: undefined;
  new_clients: undefined;
  utilization: undefined;
  UID: number;
}

export interface status_page {
  id: number;
  message: string;
}

export interface stencil {
  id: number;
  company_id: number;
  url: string;
  stencil_order: number;
  angle: string;
}

export interface stripe_events {
  id: number;
  company_id: number;
  type: string;
  date: Date;
  event_data: string;
}

export interface stripe_transactions {
  id: number;
  amount: number;
  currency: string;
  company_id: number;
  contact_id: number;
  booking_id: number;
  invoice_id: number;
  location: string;
  date: Date;
  status: boolean;
  amount_after_fee: undefined;
  charge_id?: string;
  payment_intent_id?: string;
  error_code?: string;
  reciever: boolean;
}

export interface supplier_category {
  id: number;
  category_name: string;
  company_id: number;
}

export interface supplier_details {
  id: number;
  name: string;
  other_name_1: string;
  other_name: string;
  image: string;
}

export interface support_guides {
  id: number;
  page: string;
  link: string;
}

export interface suspended_bills {
  id: number;
  date: Date;
  customer_id: number;
  count: number;
  tax1: number;
  tax2: number;
  total: number;
}

export interface suspended_items {
  id: number;
  suspend_id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  product_unit: string;
  tax_rate_id: number;
  tax: string;
  quantity: number;
  unit_price: undefined;
  gross_total: undefined;
  val_tax: undefined;
  staff_purchase?: number;
}

export interface System_Alert {
  alertid: number;
  cid: undefined;
  uid: number;
  message: string;
  read: boolean;
  entrydate: number;
  type: string;
  browser_id: number;
}

export interface System_Notifications {
  alertid: number;
  cid: undefined;
  uid: number;
  message: string;
  read: boolean;
  entrydate: number;
  type: string;
  owner_id?: string;
}

export interface System_Read {
  id: number;
  proper_id: number;
}

export interface table_views {
  id: number;
  company_id: number;
  type: string;
  name: string;
  columns: string;
}

export interface tab_bills {
  id: number;
  date: Date;
  customer_id: number;
  table_no?: string;
  count: number;
  tax1: number;
  tax2: number;
  total: number;
  occupier?: number;
  uid?: number;
}

export interface tab_items {
  id: number;
  suspend_id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  product_unit: string;
  tax_rate_id: number;
  tax: string;
  quantity: number;
  unit_price: undefined;
  gross_total: undefined;
  val_tax: undefined;
  staff_purchase?: number;
}

export interface tanning_history {
  trans_id: number;
  date: number;
  employee_id: number;
  type: string;
  amount: number;
  contact_id: number;
  sales_id?: number;
}

export interface tanning_pro {
  id: number;
  amount: undefined;
  contact_id: number;
  company_id?: number;
}

export interface task_manager {
  id: number;
  task_owner?: number;
  subject?: string;
  due_date?: Date;
  assigned_to?: number;
  module_type?: number;
  contact_id?: number;
  lead_id?: number;
  module2_type?: number;
  user2_id?: number;
  status?: number;
  priority?: number;
  send_notification_email?: string;
  recurring_activity?: string;
  start_date?: Date;
  end_date?: Date;
  repeat_type?: undefined;
  description?: string;
  occupier?: number;
  created_date?: Date;
  modified_date?: Date;
  closed_date: number;
  nhs_patient_id: number;
  list_id: number;
  notify_on_complete: boolean;
  imported: number;
}

export interface task_manager_lists {
  id: number;
  name: string;
  occupier: number;
  by_uid: number;
  uid: string;
}

export interface task_targets {
  id: number;
  target_type: string;
  target_number: number;
  task_id: number;
  target_name: string;
  from_date: string;
  to_date: string;
}

export interface taxes {
  id: number;
  name: string;
  value: string;
  rate: undefined;
  hidden: number;
  default: number;
  occupier: number;
  custom_id: number;
}

export interface tax_disabled_locations {
  id: number;
  tax_id: number;
  location_id: number;
}

export interface tax_disabled_products {
  id: number;
  tax_id: number;
  product_id: number;
}

export interface tax_disabled_services {
  id: number;
  tax_id: number;
  service_id: number;
}

export interface tax_disabled_users {
  id: number;
  tax_id: number;
  user_id: number;
}

export interface tbl_contracts {
  id: number;
  OwnerID: string;
  contract_title: string;
  contract_description: string;
  contract_signature: string;
  create_date_time: Date;
  occupier: string;
  number_signatures: number;
  show_logo: number;
  deleted: number;
  related_items: string;
  custom_id: number;
  imported: number;
}

export interface tbl_contract_images {
  id: number;
  contract_id: number;
  image: string;
  signed_contract_id: number;
  title: string;
}

export interface tbl_contract_signatures {
  id: number;
  contract_id: number;
  signature_title: string;
}

export interface tbl_module_fields {
  id: number;
  module_id?: number;
  field_name?: string;
  field_label?: string;
  is_active?: number;
}

export interface tbl_module_fields_setting {
  id: number;
  module_id?: number;
  field_name?: string;
  field_label?: string;
  is_active?: number;
  is_required: number;
  occupier?: number;
  uid?: number;
  order: number;
  created_date?: Date;
  last_updated_date?: Date;
}

export interface tbl_signed_contracts {
  id: number;
  contract_id: number;
  contract_signature: string;
  contract_status: number;
  update_date_time: Date;
  create_date_time: Date;
  contact_id: number;
  contract_signature2: string;
  booking_id: number;
}

export interface teacher_master {
  teach_id: number;
  teach_name?: string;
  company_id: number;
  user_id: undefined;
}

export interface technical_notes {
  id: number;
  created: number;
  last_edit: number;
  notes: string;
  uid: number;
  contact_id: number;
  company_id: number;
}

export interface templates {
  id: number;
  name?: string;
  content?: string;
  preview?: string;
  fields?: string;
  parse_css: boolean;
  fields_array?: string;
  comment_array: string;
}

export interface template_folders {
  id: number;
  company_id: number;
  folder_name: string;
  folder_description: string;
}

export interface template_sample_templates {
  id: number;
  name: string;
  template_id: number;
  treatment_description: string;
  treatment_category: string;
  form_type: string;
}

export interface template_settings {
  id: number;
  occupier: string;
  template_type: string;
  css_name: string;
  css_value: string;
}

export interface temporary_token {
  id: number;
  company_id: number;
  token: string;
  module: string;
  data: string;
  status: string;
}

export interface temp_ivan {
  id: number;
  first_id: number;
  second_id: number;
}

export interface test_creation_date {
  id: number;
  date: Date;
}

export interface test_notes {
  id: number;
  custom_id: number;
  contact_id: number;
  note: string;
  date: Date;
}

export interface theatre_list {
  id: number;
  contact_id: number;
  user_id: number;
  occupier: number;
  theatre_date: Date;
  tci_datetime: Date;
  admission: string;
  room: string;
  anesthetist: string;
  discharged: Date;
  comments: string;
  session: number;
  episode: string;
  code: string;
  indications: string;
  duration: number;
  ord: number;
}

export interface theatre_list_anesthetists {
  id: number;
  name: string;
  company_id: number;
  theatre_list_date_settings?: theatre_list_date_settings[];
}

export interface theatre_list_date_settings {
  id: number;
  company_id: number;
  date: Date;
  hospital_id: number;
  anesthetist_id: number;
  start_time: string;
  end_time: string;
  notes: string;
  theatre_list_anesthetists: theatre_list_anesthetists;
  theatre_list_hospitals: theatre_list_hospitals;
}

export interface theatre_list_hospitals {
  id: number;
  name: string;
  company_id: number;
  theatre_list_date_settings?: theatre_list_date_settings[];
}

export interface ticket {
  ticketid: number;
  price: number;
  email: string;
  isvalid: string;
  code: string;
  eventid: number;
  purchase_date: Date;
  occupier: string;
  STATUS: string;
  ticket_type: undefined;
}

export interface ticket_events {
  id: number;
  eventid: number;
  ticket_type: number;
  sold: number;
  available_tickets: number;
  deleted: number;
}

export interface ticket_types {
  type_id: number;
  ticket_type_name: string;
  ticket_price: number;
  ticket_description: string;
  tickets_available: number;
  occupier: number;
  brand_id: number;
  event_id: number;
  deleted: number;
}

export interface tiles {
  id: number;
  name: string;
  category: string;
  description: string;
}

export interface tmax_jobs {
  id: number;
  company: number;
  date_added: Date;
  slot: number;
  delay: number;
  time: number;
}

export interface tm_subtasks {
  id: number;
  parent_id: number;
  task_name: string;
  task_description: string;
  delivery_date: number;
  payments: string;
  assigned_to: number;
  status: number;
  company_id: number;
}

export interface tokens {
  uid: number;
  push_token: string;
  deviceos: string;
}

export interface tourbuilder {
  uid: number;
  status: number;
  status1: number;
  status2: number;
  status3: number;
  status4: number;
  status5: number;
  status6: number;
  status7: number;
  status8: number;
  status9: number;
  status10: number;
  status11: number;
  status12: number;
  status13: number;
  status14: number;
  id: number;
}

export interface training_guides {
  id: number;
  name: string;
  link: string;
  category: training_guides_category;
}

export interface training_guides_completion {
  user_id: number;
  training_id: number;
  date_completed: Date;
}

export interface training_prices {
  id: number;
  name?: string;
  price?: number;
  description?: string;
  addon_order: number;
}

export interface training_titles {
  id: number;
  title: string;
  category?: string;
  type?: string;
  occupier: number;
  uid: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface train_course {
  id: number;
  course_name: string;
  course_tag: string;
  custom_field_id: number;
  duration: number;
  description: string;
  premium: number;
  encore: number;
  category?: string;
  difficulty: train_course_difficulty;
}

export interface train_course_bookings {
  id: number;
  course_id: number;
  webinar_id: number;
  course_date: Date;
  trainer: string;
  encore?: number;
}

export interface train_course_dates {
  id: number;
  course_id: number;
  user_id: number;
  company_id: number;
  status: train_course_dates_status;
  course_date: Date;
}

export interface treatment_notes_import_helper {
  id: number;
  custom_id: number;
  custom_contact_id: number;
  custom_appt_id: number;
  custom_contact_email: string;
  Fname: string;
  Lname: string;
  custom_user_name: string;
  Subject: string;
  Note: string;
  created_date: Date;
  occupier: number;
  imported: number;
  added: number;
  old_id: number;
  old_note: string;
}

export interface treatment_plans {
  id: number;
  contact_id: number;
  form_id: number;
  form_contact_id: number;
  company_id: number;
  plan_data: string;
  created_on: Date;
  created_by: number;
  status: treatment_plans_status;
}

export interface treatment_sample_templates {
  id: number;
  name: string;
  treatment_template_id: number;
  treatment_description: string;
  treatment_category: string;
  form_type: string;
}

export interface treatment_summary {
  id: number;
  treatment_id: number;
  product_id: number;
  number_of_measures: undefined;
  numbers_of_injects: number;
  batch_number: string;
  expiry_date: Date;
  other: string;
  company_id: number;
  contact_id: number;
  date_created: Date;
}

export interface trial_mode {
  id: number;
  company_id: number;
  email: string;
  status: number;
  date_tracked: Date;
  trial_tracked: Date;
}

export interface trusted_browser {
  id: number;
  browser_stamp: string;
  country: string;
  region: string;
  city: string;
  ip_address: string;
  company_id: number;
  created_on: Date;
  user_id: number;
  is_authorized: boolean;
  authorization_hash?: string;
  is_admin: boolean;
}

export interface tutorials {
  id: number;
  tutorial_name: string;
  video_id: string;
  section: string;
  tutorial_order: number;
}

export interface tutorial_system {
  id: number;
  user_id: number;
  company_id: number;
  tutorial_section: string;
  tutorial_name: string;
}

export interface uk_city {
  id: number;
  post_prefix: string;
  city_name: string;
  company_id: number;
  nearest_clinic: string;
  assign_to_name: string;
  nearest_clinic_2: string;
}

export interface unit_purchase {
  id: number;
  p_id: number;
  product_id: string;
  product_price: undefined;
  product_quantity: number;
  customer_id?: number;
  currency?: string;
  date?: string;
  comp_id: number;
}

export interface unsubscribe_log {
  id: number;
  contact_id: number;
  company_id: number;
  activity: string;
  activity_date: Date;
  sub_status: number;
  contact_id_type: unsubscribe_log_contact_id_type;
  email?: string;
}

export interface url_shortener {
  id: number;
  shortcode: string;
  full_url: string;
  company_id: number;
  date_created: Date;
  clicks: number;
}

export interface url_tracking {
  id: number;
  url: string;
  company_id: number;
  sms_campaign_id: number;
  hits: number;
}

export interface url_tracking_hits {
  id: number;
  company_id: number;
  sms_campaign_id: number;
  mobile: string;
  date_time: Date;
}

export interface users_hours {
  id: number;
  user_id: number;
  company_id: number;
  clock_in: Date;
  clock_out?: Date;
}

export interface user_activities_likes {
  id: number;
  userid: number;
  actid: number;
  occupier: string;
  date: Date;
}

export interface user_activities_log {
  ID: number;
  userId: number;
  company: number;
  accessId: number;
  type: string;
  template: string;
  time: number;
  status: user_activities_log_status;
  ipAddress: number;
  pabau_annoucement: number;
  location_id: number;
}

export interface user_activities_log_tz {
  ID: number;
  userId: number;
  company: number;
  accessId: number;
  type: string;
  template: string;
  time: number;
  time_tz?: Date;
  status: user_activities_log_tz_status;
  ipAddress: number;
}

export interface user_alerts {
  id: number;
  title: string;
  description: string;
  image: string;
  email_template_id: number;
  ios_message: string;
  sms_message: string;
  pabau_message: string;
}

export interface user_alerts_cc {
  id: number;
  uid: number;
  cc_name: string;
  cc_email: string;
  cc_phone: string;
}

export interface user_alerts_permissions {
  id: number;
  uid: number;
  alert_id: number;
  company_id: number;
  ios_notification: number;
  email_notification: number;
  sms_notification: number;
  pabau_notification: number;
}

export interface user_availability {
  id: undefined;
  user: number;
  day: number;
  start_time: Date;
  end_time: Date;
  break?: number;
  start_break?: Date;
  end_break?: Date;
}

export interface user_available_times {
  id: undefined;
  user: undefined;
  occupier: number;
  date: Date;
  day: number;
  start_time: Date;
  end_time: Date;
  location_id: number;
  imported: number;
  tag_name: string;
}

export interface user_contact_access {
  id: number;
  user_id: number;
  contact_id: number;
  access_date: Date;
}

export interface user_default_views {
  id: number;
  user_id: number;
  company_id: number;
  custom_notes: number;
  appointments: user_default_views_appointments;
  default_cal_user: number;
}

export interface user_detail {
  userId: number;
  about: string;
}

export interface user_failed_login {
  id: number;
  email: string;
  hash: string;
  hash_algor: number;
  attempt_date: Date;
  count: number;
}

export interface user_groups {
  id: number;
  company_id: number;
  group_name: string;
  group_description: string;
  restrict_clients: number;
  restrict_locations: string;
  restrict_calendar: number;
  restrict_data: number;
  limit_contacts: number;
  permission_id: number;
}

export interface user_group_members {
  id: number;
  user_id: number;
  group_id: number;
}

export interface user_leads_access {
  id: number;
  user_id: number;
  lead_id: number;
  access_date: Date;
}

export interface user_main_permissions {
  id: number;
  user_id: number;
  delete_alert_notes: boolean;
}

export interface user_master {
  id: number;
  company_id: number;
  fname: string;
  lname: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
  prefloc: string;
  email: string;
  pass: string;
  oauth_provider: string;
  oauth_id: string;
  timestamp: Date;
  enc_key: string;
  pic: string;
  contact_id: number;
  mobile: string;
  last_login: Date;
  is_suspended: boolean;
  session_hash: string;
}

export interface user_master_password_history {
  id: number;
  company_id: number;
  user_master_id: number;
  pass: string;
  created_at: Date;
}

export interface user_mobile_permissions {
  id: number;
  uid: number;
  company_id: number;
  cal: number;
  reviews: number;
  reports: number;
  contacts: number;
  journey: number;
  register: number;
  dashboard: boolean;
}

export interface user_notes {
  id: number;
  occupier: string;
  user_id: number;
  note: string;
  added_by: number;
  date: Date;
  date_added: Date;
  updated_by: number;
  date_updated: Date;
  rota_id: number;
  note_color: string;
}

export interface user_notes_import_helper {
  id: number;
  custom_user_id: number;
  custom_user_name: string;
  note: string;
  date: Date;
  occupier: number;
  imported: number;
  added: number;
}

export interface user_old_password {
  user_old_password_id: number;
  user_id: number;
  hash: string;
  hash_algor: number;
  salt?: string;
  created_at: Date;
}

export interface user_old_passwords {
  user_id: number;
  password: string;
}

export interface user_permissions {
  id: number;
  user: number;
  page: number;
}

export interface user_products {
  id: number;
  occupier: number;
  user_id: number;
  product_id: number;
  discount_tier: number;
}

export interface user_reports {
  id: number;
  occupier: number;
  user_id: number;
  report_id: number;
}

export interface user_requests {
  id: number;
  email: string;
  date: Date;
  company: number;
  hash: string;
  job_title: string;
  department: string;
  division: string;
  template: number;
  admin: number;
  staff_manager: number;
  first_name: string;
  last_name: string;
}

export interface user_targets {
  id: number;
  user_id: number;
  company_id: number;
  indicator_id: number;
  date: Date;
  value: number;
}

export interface user_tracking {
  id: number;
  entry_date: Date;
  company_id: number;
  user_count: number;
  subscription_name: string;
}

export interface user_variables {
  id: number;
  user_id: number;
  key: string;
  value: string;
  date_created: Date;
  date_updated?: Date;
}

export interface user_xp {
  id: number;
  occupier: number;
  uid: number;
  date: Date;
  xp: number;
  notes: string;
}

export interface user_xp_new {
  id: number;
  company_id: number;
  uid: number;
  level: number;
  xp: number;
  date: string;
}

export interface vaccine_disease_coverage {
  id: number;
  cm_vaccine_id: number;
  disease_id: number;
  data: string;
}

export interface vaccine_schedule {
  id: number;
  contact_id: number;
  company_id: number;
  vaccine_id: number;
  recall_id: number;
  scheduled_admin_date: Date;
  actual_admin_date: Date;
  coverage_end_date: Date;
  schedule_cover_length: number;
  medical_record_id: number;
  disease_id: number;
  is_administered: number;
  batch_no: string;
  source: vaccine_schedule_source;
  created_by: number;
  created_on: Date;
  path_taken_id: number;
}

export interface vaccine_schedule_coverage {
  id: number;
  vaccine_schedule_id: number;
  disease_id: number;
  coverage_end_date: Date;
  cover_length: number;
}

export interface video_call_log {
  id: number;
  company_id: number;
  user_id: number;
  date: Date;
  extra?: string;
  mins_used: number;
}

export interface video_conferencing_tos_acceptance {
  id: number;
  company_id: number;
  user_id: number;
  accepted_date: Date;
}

export interface visit_history {
  id: number;
  contact_id: number;
  datetime: number;
  company_id: number;
  visit_type: string;
}

export interface voided_sales {
  id: number;
  reference_no: string;
  custom_id: string;
  biller_name: string;
  customer_name: string;
  date: number;
  reason?: string;
  inv_total: undefined;
  items: string;
  contact_id: number;
  insurance_company_id: number;
  issuer_id?: number;
  xero_invoice_id: string;
  occupier: number;
  xero_updated_date: Date;
  xero_not_exist: number;
  xero_error: number;
}

export interface voting_comments {
  id: number;
  voting_id: number;
  comment: string;
  occupier: string;
  user_id: number;
  datetime: Date;
}

export interface voting_results {
  id: number;
  occupier: number;
  user_id: number;
  title: string;
  description: string;
  datetime: Date;
  score: number;
  up_vote: number;
  down_vote: number;
  buzz_id: number;
}

export interface voucher_print_app {
  id: number;
  content: string;
  company_id: number;
  subject: string;
}

export interface voucher_settings {
  id: number;
  occupier: number;
  sms_mode: number;
  sms_name: string;
  sms_id: number;
  voucher_color_theme: string;
  terms: string;
}

export interface waiting_finance {
  id: number;
  company: number;
  amount: number;
  date: Date;
}

export interface waiting_list {
  id: number;
  company_id?: number;
  contact_id?: number;
  expires_on?: Date;
  remove_on?: number;
  name?: string;
  appointment?: number;
  monday?: number;
  tuesday?: number;
  wednesday?: number;
  thursday?: number;
  friday?: number;
  saturday?: number;
  sunday?: number;
  comments?: string;
  notify_sms?: number;
  notify_email: boolean;
  created_date?: Date;
  modified_date?: Date;
  available_from: Date;
  available_to: Date;
  preference: number;
  urgent: number;
}

export interface waiting_list_invites {
  id: number;
  contact_id: number;
  company_id: number;
  last_invite: Date;
}

export interface waiting_list_options {
  id: number;
  waiting_list_id: number;
  options?: number;
}

export interface waiting_list_preferences {
  id: number;
  contact_id: number;
  employee_id: number;
  company_id: number;
  waiting_list_id: number;
}

export interface waiting_list_settings {
  id: number;
  company_id: number;
  sms_template_id: number;
  email_template_id: number;
  class_sms_template_id: number;
  class_email_template_id: number;
}

export interface wait_list_notifications {
  id: number;
  waiting_id: number;
  contact_id: number;
  course_id: number;
  company_id: number;
  creation_date?: Date;
  modified_date?: Date;
}

export interface warning_scripts {
  id: number;
  report_date: Date;
  contact_count: number;
  sale_count: number;
  payment_count: number;
  appointment_count: number;
  old_count: number;
  trigger_alert: number;
  inv_sale_item_count: number;
}

export interface webhook_integration {
  id: number;
  company_id: number;
  webhook_url: string;
  module: string;
}

export interface widget_targets {
  id: number;
  company_id: number;
  appointment_target_day: number;
  appointment_target_week: number;
  appointment_target_month: number;
  appointment_target_year: number;
  client_target_day: number;
  client_target_week: number;
  client_target_month: number;
  client_target_year: number;
}

export interface work_category {
  id: undefined;
  name: string;
  parent: undefined;
}

export interface xero_error_logs {
  id: number;
  date?: Date;
  type: string;
  company_id: number;
  error: string;
  status_response: number;
}

export interface xero_integration {
  id: number;
  company_id: number;
  client_id: string;
  tenant_id: string;
  client_secret: string;
  refresh_token: string;
  redirect_uri: string;
  default_tax_method?: string;
  payments_account_code: string;
  items_account_code: string;
  payments_enabled: boolean;
  tracking_categories_enabled: boolean;
  default_invoice_status: string;
  enabled: boolean;
  created_at: Date;
  modified_at?: Date;
}

export interface xero_integration_accounts {
  id: number;
  company_id: number;
  payment_method: string;
  payment_account_code: string;
}

export interface xero_integration_jobs {
  id: number;
  company_id: number;
  invoice_guid: string;
  xero_invoice_id?: string;
  status: number;
  response?: string;
  created_at: Date;
  modified_at: Date;
}

export interface xero_integration_payments {
  id: number;
  company_id: number;
  xero_payment_id: string;
  xero_invoice_id: string;
  status: xero_integration_payments_status;
  created_at: Date;
  modified_at: Date;
}

export interface xero_integration_tracking_categories {
  id: number;
  name: string;
  xero_id: string;
  target: string;
  company_id: number;
  status: boolean;
  created_at: Date;
  modified_at?: Date;
}

export interface xero_invoices_jobs {
  id: number;
  occupier: number;
  xero_manual_job_id: number;
  mode: string;
  invoice_id: number;
  invoice_guid: string;
  xero_synced: number;
  date_created: Date;
  xero_updated_date: Date;
  result_text: string;
  xero_error: number;
  custom_id: number;
  force: number;
  counter: number;
}

export interface xero_jobs {
  id: number;
  occupier: number;
  date_created: Date;
  sales_updated: number;
  result_text: string;
}

export interface xero_manual_jobs {
  id: number;
  occupier: number;
  ref_start_date: Date;
  ref_end_date: Date;
  start_date: Date;
  end_date: Date;
}

export interface xero_settings {
  id: number;
  occupier: number;
  disabled: number;
  consumer_key: string;
  shared_secret: string;
  rsa_private_key: string;
  rsa_public_key: string;
  status_invoice: string;
  invoice_account_code: string;
  payment_account_code: string;
  employee_tracking_category: string;
  location_tracking_category: string;
  employee_tracking_category_name: string;
  location_tracking_category_name: string;
}

export interface xero_settings_invoice_types {
  id: number;
  occupier: number;
  invoice_type: string;
  invoice_account_code: string;
  disabled: number;
}

export interface xero_settings_payment_types {
  id: number;
  occupier: number;
  payment_method: string;
  payment_account_code: string;
  disabled: number;
}

export interface zaesteticyou_contacts {
  id: number;
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  status: string;
  status_client: string;
  contact_name: string;
  service_name: string;
  title: string;
  start_date: string;
  end_date: string;
  custom_user: string;
  custom_user_name2: string;
}

export interface zcosmetica_users {
  id: number;
  custom_id: number;
  full_name: string;
}

export interface zdoctor_invoice_patient {
  id: number;
  invoice_id: string;
  patient_id: string;
  discount: string;
  nettotal: undefined;
  taxtotal: undefined;
  total: undefined;
  occupier: number;
  user_custom_id: string;
}

export interface zdoctor_services_type {
  id: number;
  custom_id: string;
  name: string;
  duration: number;
  occupier: number;
}

export interface zdoctor_users {
  id: number;
  custom_id: string;
  full_name: string;
  occupier: number;
}

export interface zenith_contact_dates {
  id: number;
  custom_id: number;
  date: Date;
  added: number;
}

export interface zenith_contact_marketing {
  id: number;
  custom_contact_id: number;
  custom_contact_name: string;
  custom_marketing_source: number;
  custom_marketing_category: number;
}

export interface zenith_marketing_sources {
  id: number;
  custom_id: number;
  marketing_source: string;
  custom_category_id: number;
}

export interface zenith_treatment_interest {
  id: number;
  custom_id: number;
  treatment_interest: string;
}

export interface zenith_treatment_interest_divided {
  id: number;
  custom_id: number;
  treatment_interest: string;
  added: number;
}

export interface zen_send {
  id: number;
  email: string;
  type: string;
}

export interface zfrances_documents {
  id: number;
  patientId: number;
  dateCreated: string;
  sessionNOtes: string;
  custom_user_name: string;
  added: number;
}

export interface zha_import_services {
  id: number;
  custom_service_id: number;
  service_name: string;
  occupier: number;
}

export interface zimport_account_balance {
  id: number;
  occupier: number;
  custom_contact_name: string;
  amount: undefined;
  custom_user_name: string;
  date: Date;
  description: string;
  item: string;
  contact_id: number;
  added: number;
}

export interface zimport_appts {
  id: number;
  time: string;
  custom_id: string;
  custom_contact_name: string;
  custom_user_name: string;
  custom_category: string;
  custom_service: string;
  custom_room: string;
  custom_type: string;
  added: number;
  title: string;
}

export interface zimport_bookings_omniya {
  id: number;
  occupier: number;
  start_date: string;
  end_date: string;
  date: string;
  user_name: string;
  time: string;
  client_name: string;
  service: string;
  title: string;
}

export interface zimport_bookings_rooms {
  id: number;
  occupier: number;
  custom_booking_id: number;
  custom_room_id: number;
  custom_room_name: string;
}

export interface zimport_bookings_status {
  id: number;
  occupier: number;
  custom_id: number;
  status: string;
  added: number;
}

export interface zimport_bookings_title {
  id: number;
  occupier: number;
  custom_booking_id: number;
  title: string;
}

export interface zimport_communications {
  id: number;
  occupier: number;
  custom_contact_id: number;
  custom_contact_name: string;
  contact_id: number;
  subject?: string;
  content: string;
  date_created: Date;
  email: string;
  communication_type: string;
  custom_user_name: string;
  custom_id: number;
  mobile: string;
  added: number;
  file_name: string;
  status_name: string;
  custom_modified_by: string;
}

export interface zimport_companies_six {
  id: number;
  occupier: number;
  custom_id: number;
  custom_name: string;
}

export interface zimport_compare_bookings {
  id: number;
  date: string;
  thingie: string;
  time: string;
  cust: string;
  service: string;
  imported: number;
  start_date: string;
}

export interface zimport_contact_packages {
  id: number;
  occupier: number;
  imported: number;
  custom_user_name: string;
  custom_contact_id: string;
  custom_contact_name: string;
  contact_id: number;
  package_name: string;
  package_code: string;
  date_created: Date;
  payment_method: string;
  amount: undefined;
  activation_date: Date;
  expiration_date: Date;
  invoice_id: number;
  remaining: number;
  total: number;
  added: number;
  contact_package_id: number;
  service_name: string;
  price_item: undefined;
  custom_id: number;
  custom_status: string;
}

export interface zimport_documents {
  id: number;
  occupier: number;
  orig_filename: string;
  filename: string;
  filetype: string;
  contact_custom_id: string;
  date_created: Date;
  custom_id: number;
  title: string;
  added: number;
  custom_contact_name: string;
  custom_user_name: string;
  contact_id: number;
  old_filename: string;
}

export interface zimport_documents_fix {
  id: number;
  occupier: number;
  file_id: number;
  filename: string;
  extension: string;
  date_time: Date;
  custom_contact_id: number;
  custom_user_name: string;
}

export interface zimport_elixir_invoices {
  id: number;
  occupier: number;
  client_name: string;
  sum_invoice: string;
  mail: string;
  mobile: string;
  company_name: string;
}

export interface zimport_invoices_contracts {
  id: number;
  occupier: number;
  custom_id: number;
  custom_id2: number;
  custom_contract_id: number;
  custom_contract_name: string;
  added: number;
}

export interface zimport_invoice_bookings {
  id: number;
  invoice_no: number;
  patient_id: number;
  booking_id: number;
  occupier: number;
}

export interface zimport_inv_sales_invoice_no {
  id: number;
  occupier: number;
  custom_sale_id: number;
  ref_no: string;
  custom_contact_id: number;
  added: number;
}

export interface zimport_loyalty {
  id: number;
  occupier: number;
  custom_contact_name: string;
  points: undefined;
  contact_id: number;
  email: string;
  added: number;
}

export interface zimport_newsletter_member {
  id: number;
  occupier: number;
  date: string;
  email: string;
  subject: string;
  opens: number;
  added: number;
  newsletter_id: number;
}

export interface zimport_package_used {
  id: number;
  occupier: number;
  custom_contact_id: number;
  custom_contact_package_id: number;
  custom_booking_id: number;
  imported: number;
  added: number;
  created_date: Date;
}

export interface zimport_payments {
  id: number;
  custom_id: number;
  amount: undefined;
  pmethod: string;
  occupier: number;
  imported: number;
  invoice_id: number;
}

export interface zimport_payments_allocation_type {
  id: number;
  occupier: number;
  custom_id: number;
  custom_field_name: string;
  custom_field_value: string;
  payment_id: number;
  from_type: number;
  to_type: number;
}

export interface zimport_payments_custom_fields {
  id: number;
  occupier: number;
  custom_id: number;
  custom_payment_id: number;
  custom_field_name: string;
  custom_value: string;
}

export interface zimport_photos {
  id: number;
  occupier: number;
  linkhref: string;
  contact_custom_id: string;
  contact_custom_name: string;
  contact_custom_email: string;
  custom_consultation_id: number;
  date: Date;
  title: string;
  added: number;
}

export interface zimport_practitioners {
  id: number;
  occupier: number;
  custom_id: number;
  name: string;
}

export interface zimport_rota {
  id: number;
  occupier: number;
  uid: number;
  staff_id: number;
  date: Date;
  start_time: Date;
  end_time: Date;
  break_start: Date;
  break_end: Date;
  start_date: string;
  end_date: string;
  notes: string;
  custom_user_id: number;
  custom_user_name: string;
  custom_location_id: number;
  location_id: number;
  added: number;
}

export interface zimport_rota_milenium {
  id: number;
  occupier: number;
  custom_user_name: string;
  date_week: Date;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  added: number;
}

export interface zimport_sales_clinico {
  id: number;
  occupier: number;
  custom_id: number;
  custom_contact_id: number;
  custom_contact_name: string;
  status_name: string;
  outstanding_amount: undefined;
  issue_date: Date;
  date_closed: Date;
  deleted: string;
  description: string;
}

export interface zimport_sales_custom_fields {
  id: number;
  occupier: number;
  custom_id: number;
  custom_sale_id: number;
  custom_field_name: string;
  custom_value: string;
}

export interface zimport_sales_payments {
  id: number;
  occupier: number;
  custom_sale_id: number;
  custom_user_id: number;
  custom_user_name: string;
  custom_contact_id: number;
  custom_contact_name: string;
  amount: undefined;
  paymentMethod: string;
  paymentDate: string;
  custom_id: number;
  added: number;
  left_amount: undefined;
  contact_id: number;
}

export interface zimport_sales_payments2 {
  id: number;
  occupier: number;
  custom_sale_id: number;
  custom_user_id: number;
  custom_user_name: string;
  custom_contact_id: number;
  custom_contact_name: string;
  amount: undefined;
  paymentMethod: string;
  paymentDate: string;
  custom_id: number;
  added: number;
  left_amount: undefined;
  contact_id: number;
  custom_sale_id2: number;
}

export interface zimport_sales_payments_deleted {
  id: number;
  occupier: number;
  custom_id: number;
  paymentDate: Date;
}

export interface zimport_treatments {
  id: number;
  occupier: number;
  custom_id: number;
  treatment_name: string;
}

export interface zimport_users {
  id: number;
  occupier: number;
  custom_id: number;
  name: string;
  email: string;
  is_active: number;
}

export interface zpatient_dobs {
  id: number;
  custom_contact_id: number;
  dob: string;
  occupier: number;
}

export interface zproducts_barcode {
  id: number;
  product_name: string;
  barcode: string;
  occupier: number;
}

export interface zroom_import_helper {
  id: number;
  custom_id: string;
  room_name: string;
  occupier: number;
}

export interface ztest_db_class {
  id: number;
  name: string;
  description: string;
  number: number;
}

export interface migrations {
  id: number;
  sql_output?: string;
  sql_result?: boolean;
  php_output?: string;
  php_result?: boolean;
  name: string;
  date: Date;
}

export enum booking_master_payment_status {
  is_false = 'is_false',
  is_true = 'is_true',
}

export enum booking_master_cancel_status {
  is_false = 'is_false',
  is_true = 'is_true',
}

export enum booking_statuses_indicator {
  LINE = 'LINE',
  ICON = 'ICON',
  EMPTY_ENUM_VALUE = 'EMPTY_ENUM_VALUE',
}

export enum bookitpro_general_integration_method {
  sagepay = 'sagepay',
  stripe = 'stripe',
  cardsave = 'cardsave',
}

export enum class_master_class_pay {
  is_false = 'is_false',
  is_true = 'is_true',
}

export enum cm_account_notes_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_booking_notes_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_case_notes_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_compaign_notes_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_contacts_EmailOptOut {
  Yes = 'Yes',
  No = 'No',
}

export enum cm_contacts_AddToQuickBooks {
  Yes = 'Yes',
  No = 'No',
}

export enum cm_contacts_Status {
  Enable = 'Enable',
  Disable = 'Disable',
  Delete = 'Delete',
}

export enum cm_contacts_backup_hb_EmailOptOut {
  Yes = 'Yes',
  No = 'No',
}

export enum cm_contacts_backup_hb_AddToQuickBooks {
  Yes = 'Yes',
  No = 'No',
}

export enum cm_contacts_backup_hb_Status {
  Enable = 'Enable',
  Disable = 'Disable',
  Delete = 'Delete',
}

export enum cm_contact_alerts_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_contact_notes_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_invoice_notes_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_leads_EmailOptOut {
  Yes = 'Yes',
  No = 'No',
}

export enum cm_leads_EnumStatus {
  Open = 'Open',
  Converted = 'Converted',
  Junk = 'Junk',
}

export enum cm_leads_Status {
  Enable = 'Enable',
  Disable = 'Disable',
  Delete = 'Delete',
}

export enum cm_lead_notes_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_linkprw_video {
  is_false = 'is_false',
  is_true = 'is_true',
}

export enum cm_potentials_Status {
  Enable = 'Enable',
  Disable = 'Disable',
  Delete = 'Delete',
}

export enum cm_potential_notes_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_solution_notes_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_staff_general_EnumStatus {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_staff_incidents_Type {
  Accident = 'Accident',
  Warning = 'Warning',
  Late = 'Late',
  Sickness = 'Sickness',
  Complaint = 'Complaint',
  Discrepancy = 'Discrepancy',
}

export enum cm_staff_payrolls_AccountType {
  sick = 'sick',
  vacation = 'vacation',
  payroll = 'payroll',
}

export enum cm_staff_wages_Type {
  Hourly = 'Hourly',
  Salary = 'Salary',
  Retail = 'Retail',
  Service = 'Service',
}

export enum cm_tasks_status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_task_assignment_taskStatus {
  Pending = 'Pending',
  Done = 'Done',
}

export enum cm_task_notes_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum cm_vouchers_type {
  amount = 'amount',
  percent = 'percent',
}

export enum cm_vouchers_valid {
  fixed = 'fixed',
  period = 'period',
  recurring = 'recurring',
}

export enum cm_vouchers_every {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

export enum cm_wallposts_linkprw {
  is_false = 'is_false',
  is_true = 'is_true',
}

export enum cm_wallposts_status {
  Enable = 'Enable',
  Disable = 'Disable',
  Delete = 'Delete',
}

export enum communications_type {
  Email = 'Email',
  SMS = 'SMS',
  Letter = 'Letter',
  Comment = 'Comment',
  Reminder = 'Reminder',
  Call = 'Call',
  Voice = 'Voice',
  Call_Reminder = 'Call_Reminder',
}

export enum communications_related_type {
  INVOICE = 'INVOICE',
  APPOINTMENT = 'APPOINTMENT',
  NEWSLETTER = 'NEWSLETTER',
}

export enum communications_recipients_recipient_type {
  CONTACT = 'CONTACT',
  LEAD = 'LEAD',
  USER = 'USER',
}

export enum company_bday_settings_status {
  enabled = 'enabled',
  disabled = 'disabled',
}

export enum company_branches_attachments_type {
  badge = 'badge',
}

export enum company_details_tax_name {
  VAT = 'VAT',
  GST = 'GST',
}

export enum company_services_deposit_type {
  amount = 'amount',
  percent = 'percent',
  free = 'free',
  inherit = 'inherit',
}

export enum company_services_availability {
  ANY = 'ANY',
  BOOK = 'BOOK',
  SELL = 'SELL',
}

export enum company_services_online_book_type {
  ALL = 'ALL',
  NEW = 'NEW',
  EXISTING = 'EXISTING',
}

export enum company_services_backup_deposit_type {
  amount = 'amount',
  percent = 'percent',
  free = 'free',
}

export enum company_services_backup_availability {
  ANY = 'ANY',
  BOOK = 'BOOK',
  SELL = 'SELL',
}

export enum comp_emails_send_criteria_interest_area {
  master_category = 'master_category',
  location_id = 'location_id',
}

export enum comp_sms_send_criteria_interest_area {
  master_category = 'master_category',
  location_id = 'location_id',
}

export enum cp_pathways_taken_status {
  CANCELLED = 'CANCELLED',
  ACTIVE = 'ACTIVE',
}

export enum cp_steps_step {
  questionnaire = 'questionnaire',
  consent = 'consent',
  treatment = 'treatment',
  prescription = 'prescription',
  lab = 'lab',
  recall = 'recall',
  aftercare = 'aftercare',
  timeline = 'timeline',
  summary = 'summary',
  video = 'video',
  photo = 'photo',
  details = 'details',
}

export enum cp_steps_taken_status {
  completed = 'completed',
  skipped = 'skipped',
}

export enum cron_jobs_status {
  Queued = 'Queued',
  Executing = 'Executing',
  Finished = 'Finished',
  Questions = 'Questions',
  Scanning = 'Scanning',
}

export enum gl_codes_description {
  payment_type = 'payment_type',
  discount = 'discount',
  tax_rate = 'tax_rate',
  location_code = 'location_code',
  service_code = 'service_code',
  product_code = 'product_code',
  setup = 'setup',
}

export enum groups_group_postable {
  YES = 'YES',
  NO = 'NO',
}

export enum healthcode_submittals_status {
  Pending = 'Pending',
  Submitted = 'Submitted',
  Submitted_ = 'Submitted_',
  Error = 'Error',
  Remitted = 'Remitted',
  EMPTY_ENUM_VALUE = 'EMPTY_ENUM_VALUE',
}

export enum insurer_contracts_contract_type {
  INSURANCE = 'INSURANCE',
  EMPLOYEE = 'EMPLOYEE',
}

export enum ip_bookings_status {
  waiting = 'waiting',
  arrived = 'arrived',
  admitted = 'admitted',
  discharged = 'discharged',
}

export enum isc_gender {
  Both = 'Both',
  Female = 'Female',
  Male = 'Male',
  EMPTY_ENUM_VALUE = 'EMPTY_ENUM_VALUE',
}

export enum loyalty_campaign_type {
  LOYALTY = 'LOYALTY',
  AMBASSADOR = 'AMBASSADOR',
}

export enum loyalty_definitions_type {
  LOYALTY = 'LOYALTY',
  AMBASSADOR = 'AMBASSADOR',
}

export enum loyalty_rewards_type {
  POINTS = 'POINTS',
  PRODUCT = 'PRODUCT',
}

export enum manage_custom_fields_field_for {
  CONTACT = 'CONTACT',
  LEAD = 'LEAD',
  CONTACTLEAD = 'CONTACTLEAD',
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
  APPOINTMENT = 'APPOINTMENT',
  STAFF = 'STAFF',
  INVOICE = 'INVOICE',
  PAYMENT = 'PAYMENT',
  ROTA = 'ROTA',
  NOTE = 'NOTE',
  INSURANCE = 'INSURANCE',
  STAGE = 'STAGE',
  CONSUMABLEINJECTABLES = 'CONSUMABLEINJECTABLES',
  LOCATION = 'LOCATION',
}

export enum referral_settings_reward_options {
  both = 'both',
  referee = 'referee',
  referrer = 'referrer',
}

export enum salon_bookings_groups_alerts_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum salon_bookings_groups_notes_Status {
  Enable = 'Enable',
  Disable = 'Disable',
}

export enum services_master_category_type {
  SERVICE = 'SERVICE',
  PRODUCT = 'PRODUCT',
}

export enum training_guides_category {
  GETTING_STARTED = 'GETTING_STARTED',
  SETTING = 'SETTING',
  EVERYDAY_USE = 'EVERYDAY_USE',
}

export enum train_course_difficulty {
  Beginner = 'Beginner',
  Advanced = 'Advanced',
  Pro = 'Pro',
}

export enum train_course_dates_status {
  is_false = 'is_false',
  is_true = 'is_true',
}

export enum treatment_plans_status {
  OPEN = 'OPEN',
  COMPLETE = 'COMPLETE',
}

export enum unsubscribe_log_contact_id_type {
  CONTACT = 'CONTACT',
  LEAD = 'LEAD',
}

export enum user_activities_log_status {
  Enable = 'Enable',
  Disable = 'Disable',
  Delete = 'Delete',
}

export enum user_activities_log_tz_status {
  Enable = 'Enable',
  Disable = 'Disable',
  Delete = 'Delete',
}

export enum user_default_views_appointments {
  ALL = 'ALL',
  UPCOMING = 'UPCOMING',
  HISTORY = 'HISTORY',
  CANCELLED = 'CANCELLED',
  NOSHOW = 'NOSHOW',
  CYCLES = 'CYCLES',
}

export enum vaccine_schedule_source {
  Patient_verbal_ = 'Patient_verbal_',
  Patient_record_ = 'Patient_record_',
  Web_submission_by_Patient_unverified_ = 'Web_submission_by_Patient_unverified_',
  Web_submission_by_Patient_verified_ = 'Web_submission_by_Patient_verified_',
  Other_source = 'Other_source',
}

export enum xero_integration_payments_status {
  created = 'created',
  deleted = 'deleted',
}

export enum communications_recipients_status {
  D = 'D',
  queued = 'queued',
  sent = 'sent',
  rejected = 'rejected',
  draft = 'draft',
  HB = 'HB',
  SB = 'SB',
}

export enum company_details_trigger_tax_name {
  VAT = 'VAT',
  GST = 'GST',
}
