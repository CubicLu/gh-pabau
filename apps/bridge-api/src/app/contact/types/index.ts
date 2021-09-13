export interface CustomFieldType {
  id: number
  label: string
  value: string
}

export interface LabelType {
  id?: number
  label: string
  color?: string
}

export interface ContactPreferenceType {
  family: number
  emergency_contact: number
  next_of_kin: number
  insurance_provider: number
  gp: number
  company: number
  book_appointments: number
  book_class: number
  loyalty: number
  my_packages: number
  purchase_package: number
  payments: number
  appointments: number
  class: number
  documents: number
  medications: number
  allergies: number
  gp_details: number
  share_link: string
  access_code: string
}

export interface ContactInput {
  Fname: string
  Lname: string
  Email: string
  Salutation: string
  MailingProvince: string
  MailingCity: string
  MailingStreet: string
  MailingPostal: string
  MailingCountry: string
  MarketingOptInEmail: number
  MarketingOptInPhone: number
  MarketingOptInPost: number
  MarketingOptInText: number
  MarketingSource: number
  DOB?: Date
  Mobile: string
  Phone: string
  gender: string
  preferred_language: string
  privacy_policy?: string
  need_to_knows?: boolean
}

export interface ContactType extends ContactInput {
  custom_id: string
  OwnerID: number
  company_id: number
}

export interface CreateContactInput {
  data: ContactInput
  customFields?: CustomFieldType[]
  limitContactLocations?: number[]
  labels?: LabelType[]
  contactPreferences?: ContactPreferenceType
}
