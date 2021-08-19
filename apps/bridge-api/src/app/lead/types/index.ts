export interface LeadInput {
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
  DOB?: Date
  Mobile: string
  Phone: string
  LeadSource: number
  LeadStatus: number
  Description: string
  location_id: number
  OwnerID?: number
  notes?: string
  first_interaction?: Date
  latest_interaction?: Date
}
