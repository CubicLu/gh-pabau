const generalInputOption = [
  {
    key: 1,
    name: 'expiryDays',
    label: 'Expiry Days',
    value: 15,
    helpText: 'Help tooltip',
  },
]

const generalDropdownOption = [
  {
    key: 1,
    id: 'reward',
    label: 'Reward Voucher',
    value: 'Standard Referral Voucher £20.00',
    options: ['None', 'Standard Referral Voucher £20.00'],
    helpText: 'Help tooltip',
  },
  {
    key: 2,
    id: 'refereeReward',
    label: 'Referee reward voucher',
    value: 'Standard Referral Voucher £20.00',
    options: ['None', 'Standard Referral Voucher £20.00'],
    helpText: 'Help tooltip',
  },
]

export const ReferralConfigObj = {
  general: {
    inputList: generalInputOption,
    dropdownList: generalDropdownOption,
  },
}
