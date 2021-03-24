interface Input {
  key: number
  name: string
  label?: string
  value?: number
  helpText?: string
  showCurrency?: boolean
}

interface Dropdown {
  key: number
  id: string
  label: string
  value?: string
  options: Array<string>
  helpText?: string
}

export interface GeneralReferralConfig {
  inputList: Array<Input>
  dropdownList: Array<Dropdown>
}

export interface ReferralObjProp {
  reward: string
  refereeReward: string
  expiryDays: number
}
