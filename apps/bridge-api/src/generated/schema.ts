export interface TwoFactorHistory {
  id: number;
  company_id: number;
  passcode: string;
  user_id: number;
  request_date: Date;
  is_confirmed: number;
  company: Company;
}

export interface ThirdPartyAccess {
  id: number;
  company_id: number;
  company_name: string;
  email: string;
  passcode: number;
  first_name: string;
  last_name: string;
  logo: string;
  access_id: number;
  Company: Company;
}

export interface AcceptEmailToken {
  id: number;
  company_id: number;
  email: string;
  token: number;
  Company: Company;
}

export interface AccountBalance {
  id: number;
  contact_id?: number;
  company_id: number;
  insurance_company_id: number;
  balance: number;
  imported: number;
  Company: Company;
  CmContact?: CmContact;
}

export interface AccountBalanceLog {
  id: number;
  company_id: number;
  contact_id: number;
  insurance_company_id: number;
  amount: number;
  date_time: number;
  product_id?: number;
  description: string;
  sale_id: number;
  referral_id: number;
  imported: number;
  ref_sale_id: number;
  Company: Company;
  CmContact: CmContact;
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
  company_id?: number;
  Company?: Company;
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
  company_id: number;
  Company: Company;
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
  details?: CompanyDetails;
  subscription?: CompanySubscription;
  TwoFactorHistory?: TwoFactorHistory[];
  ThirdPartyAccess?: ThirdPartyAccess[];
  AcceptEmailToken?: AcceptEmailToken[];
  AccountBalance?: AccountBalance[];
  MarketingSource?: MarketingSource[];
  CmCase?: CmCase[];
  CmCaseReply?: CmCaseReply[];
  CmCampaign?: CmCampaign[];
  User?: User[];
  Candidate?: Candidate[];
  BookingStatus?: BookingStatus[];
  UserSalutation?: UserSalutation[];
  CompanyBranch?: CompanyBranch[];
  CompanyLocation?: CompanyLocation[];
  CompanyRoom?: CompanyRoom[];
  CompanyRoomService?: CompanyRoomService[];
  CompanyService?: CompanyService[];
  CompanyDepartment?: CompanyDepartment[];
  Job?: Job[];
  JobConfiguration?: JobConfiguration[];
  JobOpening?: JobOpening[];
  JobStatus?: JobStatus[];
  PointOfSaleSetting?: PointOfSaleSetting[];
  BookingSetting?: BookingSetting[];
  AccountManager?: AccountManager[];
  AcLog?: AcLog[];
  AppSubscriptionsCompanyPrice?: AppSubscriptionsCompanyPrice[];
  AvilableDatesLog?: AvilableDatesLog[];
  BlockReason?: BlockReason[];
  BodyChartTemplate?: BodyChartTemplate[];
  BookitProSlider?: BookitProSlider[];
  CalendarView?: CalendarView[];
  CampaignAttachment?: CampaignAttachment[];
  CancellationPolicy?: CancellationPolicy[];
  CancelReason?: CancelReason[];
  ClassCategory?: ClassCategory[];
  ClassProduct?: ClassProduct[];
  ClockinLongpoll?: ClockinLongpoll[];
  CmAppointmentsCustomImportHelper?: CmAppointmentsCustomImportHelper[];
  CmAppointmentCustom?: CmAppointmentCustom[];
  CmContact?: CmContact[];
  CompanyMeta?: CompanyMeta[];
  RotaShift?: RotaShift[];
  PermissionTemplate?: PermissionTemplate[];
  UserGroup?: UserGroup[];
  UserMaster?: UserMaster[];
  UserMobilePermission?: UserMobilePermission[];
  GroupPermission?: GroupPermission[];
  UserReport?: UserReport[];
  InvBiller?: InvBiller[];
  UserAlertPermission?: UserAlertPermission[];
  SocialSurvey?: SocialSurvey[];
  SocialSurveyFeedback?: SocialSurveyFeedback[];
  SocialSurveyQuestion?: SocialSurveyQuestion[];
  CmStaffGeneral?: CmStaffGeneral[];
  HolidayRequest?: HolidayRequest[];
  CompanyNote?: CompanyNote[];
  AccountBalanceLog?: AccountBalanceLog[];
  HealthcodeInsurer?: HealthcodeInsurer[];
  InsuranceDetail?: InsuranceDetail[];
  CompanyPosition?: CompanyPosition[];
  TrainCourseDate?: TrainCourseDate[];
  XeroIntegration?: XeroIntegration[];
  CmLead?: CmLead[];
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
  price: number;
}

export interface AppSubscriptionsCompanyPrice {
  id: number;
  company_id: number;
  Company: Company;
  app_key_value: string;
  price: number;
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
  company_id: number;
  Company: Company;
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
  id: number;
  reason_name: string;
  company_id: number;
  Company: Company;
  is_active: boolean;
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
  company_id: number;
  Company: Company;
  uid: number;
  creation_date: Date;
  chart_order: number;
  template_type: number;
}

export interface BookingSetting {
  id: number;
  company_id: number;
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
  Company: Company;
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
  ord?: number;
  track_time: number;
  Company: Company;
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
  company_id: number;
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
  account_deposit: number;
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
  stripe_fee: number;
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
  company_id: number;
  Company: Company;
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
  company_id: number;
  Company: Company;
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
  minutes: number;
  company_id: number;
  start_date: Date;
  end_date: Date;
}

export interface CampaignAttachment {
  id: number;
  campaign_id: number;
  company_id: number;
  Company: Company;
  attach_time: string;
  attach_user_name: string;
  attachment_type: string;
  attach_id: number;
}

export interface CancellationPolicy {
  id: number;
  is_active: boolean;
  policy_type: number;
  policy_action: number;
  policy_value: number;
  policy_notice: string;
  policy_message?: string;
  policy_override: number;
  payment_protection: number;
  advanced_cancellation_fee: number;
  no_show_fee: number;
  company_id: number;
  Company: Company;
  creation_date?: Date;
  modified_date?: Date;
}

export interface MarketingSource {
  id: number;
  name: string;
  company_id: number;
  custom_id: number;
  public: boolean;
  imported: number;
  company: Company;
}

export interface MediaLlibraryAttachment {
  id: number;
  file_url: string;
  company_id: number;
  contact_id: number;
  communication_id: number;
  medical_form_contact_id: number;
  contact_attachment_id: number;
  sales_id: number;
  statement_id: number;
  creation_date: Date;
}

export interface CancelReason {
  id: number;
  reason_name: string;
  company_id: number;
  Company: Company;
  late_cancel: number;
  apply_cancellation_policy: number;
  created_at: Date;
  modified_at: Date;
}

export interface Candidate {
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
  company_id?: number;
  company?: Company;
}

export interface CardType {
  id: number;
  company_id: number;
  mastercard: number;
  visa: number;
  amex: number;
  visa_credit: number;
  maestro: number;
  worldpay: number;
  visa_credit_charge: number;
  amex_credit_charge: number;
  mastercard_credit_charge: number;
  enable_reference: number;
}

export interface CashupReport {
  id: number;
  company_id: number;
  staff_id: number;
  location_id: number;
  float_amount: number;
  opening_balance: number;
  cash_amount: number;
  cash_actual: number;
  cash_difference: number;
  cheque_amount: number;
  cheque_actual: number;
  cheque_difference: number;
  card_amount: number;
  card_actual: number;
  card_difference: number;
  giftvoucher_amount: number;
  giftvoucher_actual: number;
  giftvoucher_difference: number;
  comments: string;
  cashup_date: Date;
  finance_id: number;
}

export interface CashupReportCustom {
  id: number;
  company_id: string;
  location_id: number;
  cashup_date: Date;
  custom_type: string;
  custom_amount: number;
  custom_actual: number;
  custom_difference: number;
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

export interface ClassCategory {
  id: number;
  code: string;
  name: string;
  company_id: number;
  Company: Company;
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
  c_price?: number;
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
  public: boolean;
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
  timezone_id: number;
  converted_value: number;
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
  timezone: Timezone;
  company: Company;
}

export interface CompanySubscription {
  license_id: number;
  company_id: number;
  company: Company;
  license_type: number;
  license_expiry: Date;
  active: number;
  code: string;
  max_user_count: number;
  uid: number;
  suspend_sms: number;
  sms_rate: number;
  setup_stage: string;
  disable_sms: number;
  payment_id: string;
  warning_level: string;
  subscription_name: string;
  subscription_fee: number;
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
  storage: number;
  free_users: number;
  gc_customer_id: string;
  low_credit_amount: number;
  low_sms_action: number;
  activity_logs: number;
  account_live: number;
  discount: number;
  gc_plan_id: string;
  support_plan: string;
  support_fee: number;
  gc_support_plan_id: string;
  enterprise_user_cost: number;
  gc_enterprise_plan_id: string;
  enterprise_fee: number;
  gc_amount: number;
  leave_alert: boolean;
  stripe_fee: number;
  stripe_fee_type: string;
  previous_system: string;
  am_group: string;
  phone_support: number;
  slack_support: number;
  whatsapp_support: number;
  multiple_locations: number;
  commission_rate: number;
  live_server: string;
  sandbox_server: string;
  server_comp_id: number;
  partner_id: string;
  advanced_marketing_addon: number;
  free_months?: number;
  hide_in_comps?: boolean;
  am_start_date?: Date;
  trainer_id?: number;
  onboarder_id?: number;
  is_referral?: number;
}

export interface Timezone {
  timezone_id: number;
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
  cost?: number;
  price: number;
  alert_quantity: number;
  image?: string;
  category_id: number;
  company_id: number;
  Company: Company;
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
  break_time_id: number;
  clock_id: number;
  break_time_start: number;
  break_time_out: number;
}

export interface ClockinLongpoll {
  id: number;
  clocked_out: boolean;
  uid: number;
  company_id: number;
  Company: Company;
}

export interface ClockinTimesheet {
  clock_id: number;
  staff_uid: number;
  company_id: number;
  clockin: number;
  clockout: number;
  total_break_time: number;
  total_working_time: number;
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
  company_id: number;
  Company: Company;
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
  company_id: number;
  Company: Company;
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
  company_id: number;
  company: Company;
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
  company: Company;
}

export interface CmCampaign {
  ID: number;
  OwnerID: string;
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
  company_id: number;
  company: Company;
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
  company_id: number;
  Company: Company;
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
  LeadID: number;
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
  UpdatedDate?: Date;
  xero_updated_date?: Date;
  discount_type: number;
  custom_clinic_id: number;
  ambassador_id: number;
  contract_id: number;
  privacy_policy: string;
  need_to_knows: boolean;
  contact_type: number;
  SocialSurveyFeedback?: SocialSurveyFeedback;
  CmContactAlert?: CmContactAlert[];
  AccountBalance?: AccountBalance[];
  AccountBalanceLog?: AccountBalanceLog[];
}

export interface CmContactAlert {
  ID: number;
  OwnerID: number;
  ContactID: number;
  Note: string;
  Status: cm_contact_alerts_Status;
  CreatedDate: Date;
  IpAddress: number;
  Critical: number;
  medical_conditions_id: number;
  User: User;
  CmContact: CmContact;
  MedicalCondition: MedicalCondition;
}

export interface CmLead {
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
  company_id: number;
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
  Company: Company;
}

export interface MedicalCondition {
  id: number;
  name: string;
  company_id: number;
  custom_id: string;
  is_common: number;
  CmContactAlert?: CmContactAlert[];
}

export interface CmStaffGeneral {
  ID: number;
  OwnerID?: string;
  company_id: number;
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
  Position?: number;
  Department: number;
  Manager: number;
  W4Status: number;
  Exemptions: string;
  Gender: number;
  EEOCode: number;
  EEOCategory: number;
  NextReview?: Date;
  EnumStatus: cm_staff_general_EnumStatus;
  CreatedDate: Date;
  IpAddress: number;
  pabau_id: number;
  DefaultLocation?: number;
  consultation_fee: number;
  deleted_on: string;
  secretary: string;
  secretary_enable: boolean;
  Salutation: string;
  commission_sheet_id: number;
  User: User;
  Company: Company;
  CompanyBranch?: CompanyBranch;
  CompanyPosition?: CompanyPosition;
  HolidayRequest?: HolidayRequest[];
}

export interface CompanyBranch {
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
  Company: Company;
  CompanyRoomLocation?: CompanyRoomLocation[];
  RotaShift?: RotaShift[];
  CmStaffGeneral?: CmStaffGeneral[];
}

export interface CompanyDepartment {
  id: number;
  company_id: number;
  department: string;
  Company: Company;
}

export interface CompanyLocation {
  id: number;
  company_id: number;
  location: string;
  Company: Company;
}

export interface CompanyMeta {
  id: number;
  company_id: number;
  meta_name: string;
  meta_value: string;
  Company: Company;
}

export interface CompanyNote {
  id: number;
  company_id: number;
  user_id: number;
  note: string;
  created_date: Date;
  is_alert: boolean;
  Company: Company;
  User: User;
}

export interface CompanyPosition {
  id: number;
  company_id: number;
  position: string;
  CmStaffGeneral?: CmStaffGeneral[];
  Company: Company;
}

export interface CompanyRoom {
  id: number;
  company_id: number;
  description: string;
  slots: number;
  all_services: number;
  is_active: number;
  all_locations: boolean;
  field_order: number;
  room_fee_type: string;
  room_fee: number;
  prod_id: number;
  imported: number;
  custom_id: string;
  Company: Company;
  CompanyRoomLocation?: CompanyRoomLocation[];
  CompanyRoomService?: CompanyRoomService[];
  RotaShift?: RotaShift[];
}

export interface CompanyRoomLocation {
  id: number;
  room_id: number;
  location_id: number;
  CompanyRoom: CompanyRoom;
  Location: CompanyBranch;
}

export interface CompanyRoomService {
  id: number;
  room_id: number;
  service_id: number;
  company_id: number;
  priority_order: number;
  imported: number;
  Company: Company;
  Room: CompanyRoom;
  Service: CompanyService;
}

export interface CompanyService {
  id: number;
  company_id: number;
  service: string;
  duration: string;
  description: string;
  price: number;
  disabledusers?: string;
  color?: string;
  group_id: number;
  online_book: number;
  product_id: number;
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
  deposit_amount: number;
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
  Company: Company;
  CompanyRoomService?: CompanyRoomService[];
}

export interface GlCode {
  id: number;
  company_id: number;
  code: string;
  description: gl_codes_description;
  related_to?: number;
  InvPaymentType?: InvPaymentType;
}

export interface HealthcodeInsurer {
  id: number;
  company_id: number;
  code: string;
  name: string;
  edi: boolean;
  me: boolean;
  Company: Company;
  InsuranceDetail?: InsuranceDetail[];
}

export interface HolidayRequest {
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
  Company: Company;
  CmStaffGeneral: CmStaffGeneral;
  RotaShift?: RotaShift[];
}

export interface InsuranceDetail {
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
  Company: Company;
  HealthcodeInsurer?: HealthcodeInsurer;
}

export interface InvBiller {
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
  company_id?: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  custom_id: number;
  imported: number;
  qualification: string;
  is_disabled: number;
  User?: User;
  Company?: Company;
}

export interface InvPaymentType {
  id: number;
  name?: string;
  epos_display?: number;
  description?: string;
  company_id: number;
  uid?: number;
  created_date?: Date;
  modified_date?: Date;
  is_active: number;
  is_money: number;
  type: string;
  GlCode?: GlCode;
}

export interface Job {
  job_id: number;
  create_date: Date;
  created_by_id: number;
  start_date: Date;
  closing_date: Date;
  opening_title: string;
  job_location: string;
  what_you_do: string;
  is_closed: boolean;
  department: string;
  job_country: string;
  opening_job_blurb: string;
  employment_type: string;
  company_id: number;
  experience: string;
  Company: Company;
}

export interface JobConfiguration {
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
  Company: Company;
}

export interface JobOpening {
  openingid: number;
  opening_title: string;
  hiring_manager: string;
  start_date: string;
  end_date: string;
  status: string;
  published: number;
  company_id: number;
  description: string;
  attached_forms: number;
  created_date: string;
  Company: Company;
}

export interface JobStatus {
  id: number;
  company_id: number;
  name: string;
  status: boolean;
  order: number;
  Company: Company;
}

export interface PointOfSaleSetting {
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
  Company: Company;
}

export interface Page {
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
  UserPermission?: UserPermission[];
}

export interface PermissionTemplate {
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
  Company: Company;
  UserGroup?: UserGroup[];
}

export interface Report {
  id: number;
  report_category_id: number;
  name?: string;
  description?: string;
  company_id: number;
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
  ReportCategory: ReportCategory;
  UserReport?: UserReport[];
}

export interface ReportCategory {
  id: number;
  name?: string;
  description?: string;
  company_id?: number;
  type: string;
  colour: string;
  Report?: Report[];
}

export interface RotaShift {
  id: number;
  uid: number;
  User: User;
  start: undefined;
  end: undefined;
  company_id: number;
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
  Company: Company;
  Location: CompanyBranch;
  CompanyRoom: CompanyRoom;
  HolidayRequest: HolidayRequest;
}

export interface UserSalutation {
  id: number;
  name: string;
  company_id?: number;
  Company?: Company;
}

export interface SocialSurvey {
  id: number;
  page_id: number;
  company_id: number;
  twitter_id: number;
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
  Company: Company;
}

export interface SocialSurveyAnswer {
  id: number;
  feedback_id: number;
  question: string;
  answer: string;
  SocialSurveyFeedback: SocialSurveyFeedback;
}

export interface SocialSurveyFeedback {
  id: number;
  rating: number;
  contact_id: number;
  feedback_source: string;
  company_id: number;
  date: undefined;
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
  CmContact: CmContact;
  Company: Company;
  SocialSurveyAnswer?: SocialSurveyAnswer[];
}

export interface SocialSurveyQuestion {
  id: number;
  company_id: number;
  question: string;
  answer: string;
  Company: Company;
}

export interface TrainingCourse {
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
  TrainingCourseBooking?: TrainingCourseBooking[];
  TrainCourseDate?: TrainCourseDate[];
}

export interface TrainingCourseBooking {
  id: number;
  course_id: number;
  webinar_id: number;
  course_date: Date;
  trainer: string;
  encore?: number;
  TrainingCourse: TrainingCourse;
}

export interface TrainCourseDate {
  id: number;
  course_id: number;
  user_id: number;
  company_id: number;
  status: train_course_dates_status;
  course_date: Date;
  TrainingCourse: TrainingCourse;
  User: User;
  Company: Company;
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
  company_id?: number;
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
  UserSecurityQuestionsAnswer?: UserSecurityQuestionsAnswer[];
  company?: Company;
  RotaShift?: RotaShift[];
  UserGroupMember?: UserGroupMember[];
  UserMainPermission?: UserMainPermission[];
  UserMobilePermission?: UserMobilePermission[];
  UserPermission?: UserPermission[];
  UserReport?: UserReport[];
  InvBiller?: InvBiller[];
  UserAlertType?: UserAlertType;
  UserAlertPermission?: UserAlertPermission[];
  CmContactAlert?: CmContactAlert[];
  CmStaffGeneral?: CmStaffGeneral[];
  CompanyNote?: CompanyNote[];
  TrainCourseDate?: TrainCourseDate[];
}

export interface UserAlert {
  id: number;
  title: string;
  description: string;
  image: string;
  email_template_id: number;
  ios_message: string;
  sms_message: string;
  pabau_message: string;
  UserAlertPermission?: UserAlertPermission[];
}

export interface UserAlertType {
  id: number;
  uid: number;
  cc_name: string;
  cc_email: string;
  cc_phone: string;
  User: User;
}

export interface UserAlertPermission {
  id: number;
  uid: number;
  alert_id: number;
  company_id: number;
  ios_notification: number;
  email_notification: number;
  sms_notification: number;
  pabau_notification: number;
  User: User;
  Company: Company;
  UserAlert: UserAlert;
}

export interface UserGroup {
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
  Company: Company;
  Permission: PermissionTemplate;
  UserGroupMember?: UserGroupMember[];
  GroupPermission?: GroupPermission[];
}

export interface UserGroupMember {
  id: number;
  user_id: number;
  group_id: number;
  User: User;
  UserGroup: UserGroup;
}

export interface UserMainPermission {
  id: number;
  user_id: number;
  delete_alert_notes: boolean;
  User: User;
}

export interface UserMaster {
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
  Company: Company;
}

export interface UserMobilePermission {
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
  User: User;
  Company: Company;
}

export interface UserPermission {
  id: number;
  user?: number;
  page?: number;
  User?: User;
  Page?: Page;
}

export interface UserReport {
  id: number;
  company_id: number;
  user_id: number;
  report_id: number;
  User: User;
  Company: Company;
  Report: Report;
}

export interface UserSecurityQuestionsAnswer {
  id: number;
  user_id: number;
  question: string;
  question_no: number;
  answer: string;
  users: User;
}

export interface XeroIntegration {
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
  Company: Company;
}

export interface GroupPermission {
  id: number;
  company_id: number;
  group_id: number;
  module_permissions: string;
  feature_permissions: string;
  report_permissions: string;
  UserGroup: UserGroup;
  Company: Company;
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
