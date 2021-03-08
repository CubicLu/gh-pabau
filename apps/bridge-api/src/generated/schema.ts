export interface TwoFactorHistory {
  id: number;
  companyId: number;
  passcode: string;
  userId: number;
  requestDate: Date;
  isConfirmed: number;
  company: Company;
}

export interface ThirdPartyAccess {
  id: number;
  companyId: number;
  companyName: string;
  email: string;
  passcode: number;
  firstName: string;
  lastName: string;
  logo: string;
  accessId: number;
  company: Company;
}

export interface AcceptEmailToken {
  id: number;
  companyId: number;
  email: string;
  token: number;
  company: Company;
}

export interface AccountBalance {
  id: number;
  contactId?: number;
  companyId: number;
  insuranceCompanyId: number;
  balance: number;
  imported: number;
  company: Company;
}

export interface AccountBalanceLog {
  id: number;
  companyId: number;
  contactId: number;
  insuranceCompanyId: number;
  amount: number;
  dateTime: number;
  productId?: number;
  description: string;
  saleId: number;
  referralId: number;
  imported: number;
  refSaleId: number;
}

export interface AccountManager {
  id: number;
  organisationName?: string;
  organisationStatus: number;
  organisationType?: number;
  organisationNumber?: string;
  organisationOwner?: number;
  address1?: string;
  address2?: string;
  address3?: string;
  town?: string;
  county?: string;
  postCode?: string;
  country?: string;
  tel?: string;
  altTel?: string;
  email?: string;
  fax?: string;
  website?: string;
  slaContract?: number;
  vatRegId: string;
  createdDate?: Date;
  modifiedDate?: Date;
  occupier?: number;
  conPer1: string;
  conNum1: string;
  conPer2: string;
  conNum2: string;
  conPer3: string;
  conNum3: string;
}

export interface AcLog {
  id: number;
  urlId: number;
  actionId: number;
  critical: boolean;
  occupier: number;
  userId: number;
  date: Date;
  humanize?: string;
  userAgent: string;
  ipv4: number;
  rowAff: number;
  rowId: number;
  rowData?: string;
}

export interface AcLogAction {
  id: number;
  pabauid: string;
  actionName: string;
  actionStatus: boolean;
  command: string;
  tableAff: string;
  rowAff: number;
  rowId: number;
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
  creationDate: Date;
  image: string;
  slug: string;
  remoteUrl: string;
  remoteConnect: string;
  cronEnabled: boolean;
  Details?: CompanyDetails;
  Subscription?: CompanySubscription;
  TwoFactorHistory?: TwoFactorHistory[];
  ThirdPartyAccess?: ThirdPartyAccess[];
  AcceptEmailToken?: AcceptEmailToken[];
  AccountBalance?: AccountBalance;
  MarketingSource?: MarketingSource[];
  CmCase?: CmCase[];
  CmCaseReply?: CmCaseReply[];
  CmCampaign?: CmCampaign[];
  User?: User[];
}

export interface AdvertCampaign {
  id: number;
  advertName: string;
  advertType: string;
  campaignBudget: string;
  campaignInterval: string;
  campaignAudience: string;
  campaignId: number;
  cid: number;
  attachId: number;
  engagement: string;
  advertReach: number;
  Clicks: number;
  start: string;
  end: string;
  url: string;
  attachedBy: string;
  attachTime: string;
}

export interface ApiDebug {
  id: number;
  dataReceived: string;
  companyId: number;
  apiCode: number;
  createdDate: Date;
  dataType: string;
}

export interface ApiKey {
  id: number;
  companyId: number;
  apiKey: string;
  appType: string;
  createdDate: Date;
  contacts: number;
  bookings: number;
  invoices: number;
  locations: number;
  services: number;
  staff: number;
  financials: number;
  leads: number;
  medicalForms: number;
  reports: number;
}

export interface AppBeforeAfter {
  id: number;
  companyId: number;
  contactId: number;
  beforeImg: string;
  afterImg: string;
  passKey: string;
}

export interface AppPermission {
  id: number;
  company: number;
  appid: string;
}

export interface AppSubscription {
  id: number;
  keyValue: string;
  name: string;
  Description: string;
  price: number;
}

export interface AppSubscriptionsCompanyPrice {
  id: number;
  occupier: number;
  appKeyValue: string;
  price: number;
}

export interface AttachmentHelperLite {
  id: number;
  contactId: number;
  f: string;
  x: string;
  type: number;
}

export interface AtAnswer {
  id: number;
  questionId: number;
  name: string;
  image: string;
}

export interface SecondAtAnswer {
  id: number;
  questionId: number;
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
  companyId: number;
  name: string;
  order: number;
  region: string;
}

export interface SecondAtQuestion {
  id: number;
  companyId: number;
  name: string;
  type: string;
}

export interface AtQuestionsRelation {
  companyId: number;
  answerId: number;
  productId: number;
}

export interface AtQuizTake {
  id: number;
  companyId: number;
  name: string;
  email: string;
  takeDate: Date;
  answers: string;
  concerns: string;
  answers2: string;
  products: string;
}

export interface AtSetting {
  id: number;
  companyId: number;
  logo: string;
  background: string;
  fontFamily: string;
}

export interface AtTreatment {
  id: number;
  companyId: number;
  name: string;
  image: string;
  description: string;
}

export interface AutomationAction {
  id: number;
  triggerId: number;
  company: number;
  code: string;
  actionData: string;
  order: number;
}

export interface AutomationDelay {
  id: number;
  actionRows: string;
  dataArray: string;
  code: string;
  company: number;
  delay: number;
  dateQueued: Date;
  appointmentId?: number;
}

export interface AutomationFolder {
  id: number;
  companyId: number;
  name: string;
  description: string;
}

export interface AutomationLog {
  id: number;
  company: number;
  dateCreated: Date;
  message: string;
  parentId?: number;
  uid?: number;
}

export interface AutomationRule {
  id: number;
  name: string;
  company: number;
  active: boolean;
  source: string;
  dateStart?: Date;
  dateEnd?: Date;
  description: string;
  needsConfig: number;
  folderId: number;
}

export interface AutomationTrigger {
  id: number;
  ruleId: number;
  name: string;
  company: number;
  code: string;
  triggerData: string;
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
  bankTag: string;
  compId: number;
  branchName: string;
  accountHolder: string;
  accountNo: number;
  sortCode: string;
}

export interface Batch {
  id: number;
  companyId: number;
  orderId: number;
  orderItemId?: string;
  batchNo: string;
  qty: number;
  uid: number;
  creationDate: Date;
  expiryDate?: Date;
}

export interface BatchItem {
  id: number;
  batchId: number;
  companyId: number;
  productId: number;
  usageDate: Date;
  patientId: number;
  createdById: number;
  qty: number;
  appointmentId: number;
  batchFlag: number;
}

export interface BlockReason {
  id: number;
  reasonName: string;
  occupier: string;
  isActive: number;
  blockColor: string;
  isPaid: number;
  defaultTime?: string;
  type: number;
  customId: number;
}

export interface BnfDrug {
  id: number;
  url: string;
  page: string;
  drugName: string;
  indicationsDosage?: string;
  contraIndications?: string;
  cautions?: string;
  sideEffects?: string;
  pregnancy?: string;
  breastFeeding?: string;
  prescribingInfo?: string;
  patientAdvice?: string;
  directions?: string;
  specificInfo?: string;
}

export interface BodyChartTemplate {
  id: number;
  templateName: string;
  templateUrl: string;
  tags: string;
  occupier: number;
  uid: number;
  creationDate: Date;
  chartOrder: number;
  templateType: number;
}

export interface BookingSetting {
  id: number;
  occupier: number;
  emailMode: number;
  smsMode: number;
  emailId?: number;
  emailConfirmId: number;
  smsId: number;
  emailReminderId: number;
  autoCal?: number;
  autoEmail?: number;
  autoSms?: number;
  autoCon?: number;
  feedbackMode: number;
  feedbackId: number;
  smsName: string;
  feedbackDaysAfter: number;
  feedbackSendTime: Date;
  reminderMode: number;
  daysBefore: number;
  sendTime: Date;
  smsDaysBefore: number;
  smsSendTime: Date;
  classSmsDaysBefore: number;
  classSmsSendTime: Date;
  roomSupport: number;
  feedbackFromemail: string;
  confirmFromemail: string;
  smsFrom?: string;
  reminderFromemail: string;
  sendSms: number;
  sendEmail: number;
  sendReminder: number;
  sendFeedback: number;
  attachInvoice: number;
  startTime: string;
  endTime: string;
  bookingEmails: string;
  slotInterval: number;
  fontColor: string;
  disableSecondCal: number;
  fontSize: number;
  disableTime: number;
  lockTimer: number;
  disableSurname: number;
  arrivedColor: string;
  completeColor: string;
  cancelSmsNotify: number;
  cancelEmailNotify: number;
  rescheduleSmsNotify: number;
  rescheduleEmailNotify: number;
  noshowEmailNotify: number;
  classNoshowEmailNotify: number;
  classRescheduleEmailNotify: number;
  classReminderEmailNotify: number;
  classNoshowSmsNotify: number;
  classRescheduleSmsNotify: number;
  classReminderSmsNotify: number;
  noshowSmsNotify: number;
  locationSupport: number;
  noshowCount: number;
  rescheduleSmsFrom: string;
  rescheduleSmsTmpl: number;
  rescheduleEmailFrom: string;
  rescheduleEmailTmpl: number;
  cancelSmsFrom: string;
  cancelSmsTmpl: number;
  cancelEmailFrom: string;
  cancelEmailTmpl: number;
  smsConfirmId: number;
  noshowEmailFrom: string;
  noshowEmailTmpl: number;
  classNoshowEmailTmpl: number;
  classRescheduleEmailTmpl: number;
  classReminderEmailTmpl: number;
  classNoshowSmsTmpl: number;
  classRescheduleSmsTmpl: number;
  classReminderSmsTmpl: number;
  noshowSmsFrom: string;
  noshowSmsTmpl: number;
  columnTotal: number;
  tooltipHead: string;
  tooltipBody: string;
  apptHead: string;
  apptBody: string;
  holidayResetDate?: number;
  holidayUsualDay?: string;
  holidayPerMonth?: string;
  holidayDefault?: string;
  groupBookingChangeEmailEnable?: number;
  groupBookingChangeTemplateId?: number;
  groupBookingCancelEmailEnable: boolean;
  groupBookingCancelTemplateId: number;
  packageUsedEmailEnable: number;
  packageUsedTemplateId: number;
  disableIcs?: number;
  initials: number;
  disableServiceFilter: number;
  disableBookByPackage: number;
  allowOverlappingAppts: number;
  modifiedBy: number;
  modifiedDate: Date;
  conferenceReminderId?: number;
}

export interface BookingMaster {
  id: number;
  classId: string;
  userId: string;
  bookingDate?: string;
  paymentStatus: booking_master_payment_status;
  cancelStatus: booking_master_cancel_status;
  cancelDate: string;
  companyId: string;
  classCurrency?: string;
  classPrice?: string;
  checkedIn: number;
  payedBy: string;
  waiting: number;
}

export interface BookingStatus {
  id: number;
  name: string;
  value: string;
  icon: string;
  iconColor: string;
  companyId: number;
  indicator?: booking_statuses_indicator;
  basicField: boolean;
  ord: number;
  trackTime: boolean;
}

export interface BookingStatusChange {
  id: number;
  bookingId: number;
  status: string;
  startDate: Date;
  endDate?: Date;
  companyId: number;
  userId: number;
}

export interface BookitProGeneral {
  id: number;
  occupier: string;
  advanceTime: string;
  enablePayments: string;
  paypalAddress: string;
  receiveEmail: string;
  createInvoice: string;
  deposit: number;
  showPrices: string;
  showDuration: string;
  showDescription: boolean;
  headerColor: string;
  bookingEmails: string;
  onlineColor: string;
  warningMessage: string;
  allowCancel: number;
  disableFacebook: number;
  interval: number;
  disableExtraInformation: number;
  couponActive: number;
  paymentApiUrl: string;
  accountDeposit: number;
  replaceJobTitles: number;
  hideFacebookShare: number;
  enableBookings: number;
  defaultPayment: string;
  registrationOptional: number;
  consultationsOnly?: boolean;
  onlyExisting: boolean;
  stripeReciever: number;
  stripePublicKey: string;
  stripePrivateKey: string;
  offlineMessage: string;
  disableLocations: number;
  theme: string;
  promoCodes: boolean;
  termsConditions: string;
  gaAnalytics: string;
  gtManager?: string;
  fbCode: string;
  fbEvent: string;
  docSharedTemplate: number;
  classesEmailConfirm: number;
  sageVendor: string;
  sageUsername: string;
  sagePassword: string;
  gcPublicKey: string;
  gcPrivateKey: string;
  enableTitle?: number;
  groupByRegion: boolean;
  useNewConnect: boolean;
  disableReviews: number;
  allowRating: boolean;
  showCatPhotos: boolean;
  classColumns: string;
  noVatPrices: boolean;
  integrationMethod?: bookitpro_general_integration_method;
  rollingDeposit: number;
  oneTouchBook: boolean;
  newStripe: number;
  enableMasterCat: boolean;
  stripeFee: number;
  reccuringSearchBtn: string;
  forceNewExistingPatient: boolean;
  redirectUrl: string;
  connectUrl?: string;
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
  bugMessage: string;
  datetime: number;
  uid: number;
  relatedId: number;
}

export interface CalendarView {
  id: number;
  occupier: number;
  userId: number;
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
  favoriteName: string;
  favoriteShared: number;
  favorite: number;
  favoriteId: number;
}

export interface CalRangeRequest {
  id: number;
  minutes: number;
  companyId: number;
  startDate: Date;
  endDate: Date;
}

export interface CampaignAttachment {
  id: number;
  campaignId: number;
  occupier: number;
  attachTime: string;
  attachUserName: string;
  attachmentType: string;
  attachId: number;
}

export interface CancellationPolicy {
  id: number;
  isActive: number;
  policyType: number;
  policyAction: number;
  policyValue: number;
  policyNotice: string;
  policyMessage?: string;
  policyOverride: number;
  paymentProtection: number;
  advancedCancellationFee: number;
  noShowFee: number;
  occupier: number;
  creationDate?: Date;
  modifiedDate?: Date;
}

export interface MarketingSource {
  id: number;
  name: string;
  companyId: number;
  customId: number;
  isActive: number;
  imported: number;
  company: Company;
}

export interface MediaLlibraryAttachments {
  id: number;
  fileUrl: string;
  companyId: number;
  contactId: number;
  communicationId: number;
  medicalFormContactId: number;
  contactAttachmentId: number;
  salesId: number;
  statementId: number;
  creationDate: Date;
}

export interface CancelReason {
  id: number;
  reasonName: string;
  occupier: string;
  lateCancel: number;
  applyCancellationPolicy: number;
  createdAt: Date;
  modifiedAt: Date;
}

export interface candidate {
  id: number;
  contactId: number;
  createdDate: Date;
  openingId: number;
  rating: number;
  candidateStatus?: string;
  jobReferences: string;
  howHeard: string;
  referredBy: string;
  coverLetter: string;
  resume: string;
  dateAvailable: Date;
  linkedin: string;
  companyId: number;
}

export interface CardTypes {
  id: number;
  companyId: number;
  mastercard: number;
  visa: number;
  amex: number;
  visaCredit: number;
  maestro: number;
  worldpay: number;
  visaCreditCharge: number;
  amexCreditCharge: number;
  mastercardCreditCharge: number;
  enableReference: number;
}

export interface CashupReport {
  id: number;
  companyId: number;
  staffId: number;
  locationId: number;
  floatAmount: number;
  openingBalance: number;
  cashAmount: number;
  cashActual: number;
  cashDifference: number;
  chequeAmount: number;
  chequeActual: number;
  chequeDifference: number;
  cardAmount: number;
  cardActual: number;
  cardDifference: number;
  giftvoucherAmount: number;
  giftvoucherActual: number;
  giftvoucherDifference: number;
  comments: string;
  cashupDate: Date;
  financeId: number;
}

export interface CashupReportCustom {
  id: number;
  companyId: string;
  locationId: number;
  cashupDate: Date;
  customType: string;
  customAmount: number;
  customActual: number;
  customDifference: number;
  cardType: string;
}

export interface CheckinAppt {
  id: number;
  apptId: number;
  spotifyUri: string;
}

export interface CheckinAverages {
  id: number;
  uid: number;
  productId: number;
  avgTimeSeconds: number;
}

export interface CheckinAveragesIdle {
  id: number;
  username: string;
  uid: number;
  avg?: number;
  retailutilisationAvg?: number;
}

export interface CheckinProduct {
  id: number;
  queueId: number;
  productId: number;
  dateStart?: Date;
  dateEnd?: Date;
  invProductId: number;
}

export interface CheckinQueue {
  id: number;
  uid: number;
  beenBefore: boolean;
  dateStart: Date;
  accepted: boolean;
  isLunch: boolean;
  name: string;
  dateAccepted?: Date;
  dateEnd?: Date;
  wasAnyone: boolean;
  finalise?: boolean;
  smsNumber?: string;
  smsSent?: Date;
  smsWanted?: boolean;
  skips: number;
  connectId?: number;
  order: number;
  spotifyUri?: string;
  dateBinned?: Date;
}

export interface ClasstypeMaster {
  ctypeId: number;
  ctypeName?: string;
  ctypeCompid: string;
  ctypeDate: string;
  ctypeColor: string;
  ctypeDescription: string;
  paymentOptionDisabled: number;
  creditOptionDisabled: number;
}

export interface ClassCategories {
  id: number;
  code: string;
  name: string;
  occupier?: number;
  uid?: number;
  createdDate?: Date;
  modifiedDate?: Date;
}

export interface ClassGuests {
  id: number;
  guestName: string;
  signingDate: number;
  classId: number;
  companyId: number;
  cancelStatus: number;
  mobile: string;
}

export interface ClassMaster {
  cId: number;
  cCompanyid?: number;
  cType?: number;
  cTeacher?: number;
  cLocation?: number;
  cRoom?: number;
  cSlots?: string;
  cPrice?: number;
  cDate?: string;
  cTime?: string;
  cDuration?: string;
  cDay?: string;
  cExptime?: string;
  cBook?: string;
  cEmpty?: string;
  cFormattime?: string;
  cStartformattime?: string;
  classPay?: class_master_class_pay;
  cancelStatus: number;
  productId: number;
  signInType: string;
}

export interface ClassNotes {
  id: number;
  classId: number;
  note: string;
  author: string;
  public: number;
  avatar: string;
  postDate: string;
}

export interface CompanyDetails {
  detailsId: number;
  companyId: number;
  companyName: string;
  subscription: string;
  industrySector: string;
  employees: string;
  website: string;
  street: string;
  city: string;
  county: string;
  postCode: string;
  country: string;
  phone: string;
  fax: string;
  infoEmail: string;
  admin: number;
  logo: string;
  currency: string;
  facebookPage: string;
  twitterPage: string;
  headOffice: number;
  footerLogo: string;
  headerLogo: string;
  vat: string;
  dateFormat: string;
  weekStartDay: string;
  autoSms: number;
  smsActive: number;
  dbLock: number;
  stockManager: string;
  companyNotes: string;
  timezoneId: number;
  convertedValue: number;
  enable2fa: number;
  enableAd: number;
  enableAdCode?: string;
  enableIpFilter?: number;
  demoMode: number;
  linkedinPage: string;
  youtubePage: string;
  isSurgical: number;
  privateTreatmentNotes: number;
  acceptInsurance: number;
  phonePrefix: number;
  taxName: company_details_tax_name;
  secureMedicalForms: number;
  debrandLogo: number;
  defaultSearch: string;
  calendarVersion: string;
  contactTermSingular: string;
  contactTermPlural: string;
  flagEnabled: number;
  lockPrescription: number;
  showReportLogo: boolean;
  rotaVersion: string;
  useGoogleAuth: boolean;
  employeeClockTrack: boolean;
  slug?: string;
  defaultInvTemplateId: number;
  diagnosisCodesType: string;
  appendClientPref: number;
  capitalSurname: boolean;
  disablePrescriptions: number;
  cyclesDisplay: number;
  enableSensData: number;
  classTermSingular: string;
  classTermPlural: string;
  sensitiveDataQuestion: number;
  legacyConsultations: boolean;
  classTeacherSingular: string;
  employeeTermSingular: string;
  employeeTermPlural: string;
  medicalApprovals: number;
  newReports: number;
  mergeBookingsTabs: boolean;
  preferencesSms: number;
  preferencesEmail: number;
  preferencesPost: number;
  preferencesNewsletters: number;
  healthcodeLive?: boolean;
  lockExport: number;
  language: string;
  completedSetup: boolean;
  timezone: Timezone;
  company: Company;
}

export interface CompanySubscription {
  licenseId: number;
  companyId: number;
  company: Company;
  licenseType: number;
  licenseExpiry: Date;
  active: number;
  code: string;
  maxUserCount: number;
  uid: number;
  suspendSms: number;
  smsRate: number;
  setupStage: string;
  disableSms: number;
  paymentId: string;
  warningLevel: string;
  subscriptionName: string;
  subscriptionFee: number;
  suspendedOn: string;
  demoAccount: number;
  suspensionReason: string;
  pabauScore: number;
  gcEmail: string;
  paymentBounces: number;
  trainingStatus: number;
  setupStatus: number;
  orderSheet: number;
  completeAccount: number;
  completeNotes: string;
  detailsStatus: number;
  trainingDate: string;
  billCycle: Date;
  renewInterval: string;
  excludeReports: number;
  subStartDate: Date;
  priceRange: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  trial: boolean;
  storage: number;
  freeUsers: number;
  gcCustomerId: string;
  lowCreditAmount: number;
  lowSmsAction: number;
  activityLogs: number;
  accountLive: number;
  discount: number;
  gcPlanId: string;
  supportPlan: string;
  supportFee: number;
  gcSupportPlanId: string;
  enterpriseUserCost: number;
  gcEnterprisePlanId: string;
  enterpriseFee: number;
  gcAmount: number;
  leaveAlert: boolean;
  stripeFee: number;
  stripeFeeType: string;
  previousSystem: string;
  amGroup: string;
  phoneSupport: number;
  slackSupport: number;
  whatsappSupport: number;
  multipleLocations: number;
  commissionRate: number;
  liveServer: string;
  sandboxServer: string;
  serverCompId: number;
  partnerId: string;
  advancedMarketingAddon: number;
  freeMonths?: number;
  hideInComps?: boolean;
  amStartDate?: Date;
  trainerId?: number;
  onboarderId?: number;
  isReferral?: number;
}

export interface Timezone {
  timezoneId: number;
  label: string;
  phpFormat: string;
  dbFormat: string;
  offsetSeconds: number;
  supported: boolean;
  CompanyDetails?: CompanyDetails[];
}

export interface ClassProduct {
  id: number;
  code: string;
  name: string;
  unit?: string;
  size: string;
  productOrder?: number;
  um: string;
  cost?: number;
  price: number;
  alertQuantity: number;
  image?: string;
  categoryId: number;
  occupier?: number;
  uid?: number;
  createdDate?: Date;
  modifiedDate?: Date;
  productDesc: string;
}

export interface ClassSmsHistory {
  id: number;
  classId: number;
  userId: number;
  message: string;
  datetime: string;
}

export interface ClassTemplateSetting {
  id: number;
  companyId: number;
  classWaitListTemplateEnable?: number;
  classWaitListTemplateId?: number;
  classWaitListSmsTemplateEnable: number;
  classWaitListSmsTemplateId: number;
  uid?: number;
  creationDate?: Date;
  modifiedDate?: Date;
}

export interface CleverpinSetting {
  id: number;
  imageUrl: string;
  companyId: number;
}

export interface ClientFormSetting {
  id: number;
  companyId: number;
  enableMedical: number;
  formId: number;
  notSeenMonths: number;
  enableNewAndOld: number;
  checkedByDefault: number;
  newClientTemplate: number;
  notSeenTemplate: number;
}

export interface ClinicalSoftware {
  id: number;
  name: string;
  difficulty: number;
  frequency: number;
}

export interface ClockinBreak {
  breakTimeId: number;
  clockId: number;
  breakTimeStart: number;
  breakTimeOut: number;
}

export interface ClockinLongpoll {
  id: number;
  clockedOut: boolean;
  uid: number;
  occupier: number;
}

export interface ClockinTimesheet {
  clockId: number;
  staffUid: number;
  companyId: number;
  clockin: number;
  clockout: number;
  totalBreakTime: number;
  totalWorkingTime: number;
  notes: string;
  approved: boolean;
  staffName: string;
  ipAddress: string;
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
  customAppointmentId: number;
  customContactName: string;
  customFieldName: string;
  customFieldValue?: string;
  added: number;
  appointmentId: number;
}

export interface CmAppointmentCustom {
  id: number;
  appointmentId: number;
  occupier: number;
  customFieldId: number;
  customFieldValue: string;
  imported: number;
}

export interface CmAuthorization {
  id: number;
  companyId: number;
  appointmentId: number;
  contactId: number;
  title: string;
  totalSessions: number;
  diagnosisCode: string;
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
  caseNumber: string;
  type?: string;
  contact?: string;
  email?: string;
  subject?: string;
  phone?: string;
  request?: string;
  critical?: string;
  description?: string;
  relatedTo?: number;
  moduleType?: number;
  userId?: number;
  module2Type?: number;
  user2Id?: number;
  ownerid?: number;
  status?: string;
  priority?: string;
  reason?: string;
  reportedBy?: string;
  comments?: string;
  CreatedDate?: number;
  IpAddress?: string;
  companyId: number;
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
  companyId: number;
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
  Occupier: number;
  locationId: number;
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
  groupTag: string;
  politeNotice: string;
  customId: string;
  gender: string;
  MarketingOptInAll?: number;
  MarketingOptInEmail?: number;
  MarketingOptInPhone?: number;
  MarketingOptInPost?: number;
  MarketingOptInText?: number;
  notesDrop: string;
  imported: number;
  alertsDrop: string;
  MarketingSourceRelated: number;
  customerReference: string;
  MarketingOptInNewsletter: number;
  customMarketingSource: string;
  insurerId: number;
  isActive: number;
  xeroContactId: string;
  isAmbassador: number;
  UpdatedDate: Date;
  xeroUpdatedDate: Date;
  discountType: number;
  customClinicId: number;
  ambassadorId: number;
  contractId: number;
  privacyPolicy: string;
  needToKnows: boolean;
  contactType: number;
}

export interface User {
  id: number;
  username?: string;
  fullName: string;
  password?: string;
  passwordAlgor?: number;
  salt?: string;
  created?: Date;
  lastLogin?: Date;
  companyId?: number;
  hash: string;
  email: string;
  admin: number;
  address: string;
  timezone: string;
  locale: string;
  language: string;
  jobTitle: string;
  department: string;
  division: string;
  super: number;
  defaultPage: string;
  signature: string;
  image: string;
  position: string;
  location: string;
  deleted: number;
  passCode: string;
  phoneNumber: string;
  hideOnlineBookings: number;
  passcode: string;
  lastLoadedPage: string;
  temporaryPassword: boolean;
  customId: string;
  hideCalendar: number;
  calendarOrder: number;
  clockedIn?: Date;
  clockedOut?: Date;
  lastPasswordReset: number;
  forcePassword: number;
  limitedUser: number;
  canVoid: number;
  canRefund: boolean;
  canReport: number;
  canRota: number;
  staffReadOnly: number;
  stockReadOnly: number;
  allReports: number;
  performanceStats: number;
  disableTutorial: number;
  allServices: number;
  deleteTreatment: number;
  adminTasks: number;
  adminLeads: number;
  imported: number;
  loginFailCount: number;
  canEditBookingTime: number;
  userColor: string;
  disableMultipleClinics: number;
  isHcp: number;
  loginDisabled: number;
  canPatientAppoint: number;
  canPatientCommunicatons: number;
  canPatientPhotos: number;
  canPatientFiancials: number;
  canPatientTreatments: number;
  canPatientDocs: number;
  canPatientPackages: number;
  canPatientPrescription: number;
  canPatientConsents: number;
  canPatientGiftvoucher: number;
  canPatientLoyalty: number;
  canPatientRecall: number;
  canPatientMemberships: number;
  canCancelBooking: number;
  notifyOnBooking: boolean;
  canEditCommunications: boolean;
  canDeleteCommunications: boolean;
  canViewFullCal: boolean;
  permissionLastRole: string;
  canMerge: boolean;
  canDiscount?: number;
  canDiscountSingle: boolean;
  restored: number;
  googleAuthSecret?: string;
  defaultContractId: number;
  canSeePersonal: number;
  appearOnRota: number;
  canPatientMedicalHistory: number;
  canLabRequests: boolean;
  detailedView: number;
  canMakeBlockout: number;
  canDeleteBlockout: number;
  canMoveBlockout: number;
  mainContact: boolean;
  company?: Company;
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
