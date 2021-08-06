export interface SubscriptionQueryInputs {
  searchTerm: string
  offset: number
  limit: number
  status: string
}

export interface SubscriptionDetailsOutput {
  id: string
  created_at: string
  currency: string
  name: string
  interval_unit: string
  status: string
  next_charge_date: string
  next_charge_amount: number
  app_fee: number | string
  amount: number
}

export interface SubscriptionCardDetailsOutput {
  id: string
  created_at: string
  currency: string
  account_number_ending: string
  bank_name: string
  account_holder_name: string
  last4?: string
  exp_year?: string
  exp_month?: string
  branch_code?: string
}
