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
  OtherStreet: string
  OtherCity: string
  OtherProvince: string
  OtherPostal: string
  OtherCountry: string
  preferred_language: string
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
  otherCompanyIds?: number[]
  labels?: LabelType[]
}
