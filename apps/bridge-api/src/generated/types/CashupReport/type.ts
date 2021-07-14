import { objectType } from 'nexus'

export const CashupReport = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CashupReport',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('staff_id')
    t.int('location_id')
    t.float('float_amount')
    t.float('opening_balance')
    t.float('cash_amount')
    t.float('cash_actual')
    t.float('cash_difference')
    t.float('cheque_amount')
    t.float('cheque_actual')
    t.float('cheque_difference')
    t.float('card_amount')
    t.float('card_actual')
    t.float('card_difference')
    t.float('giftvoucher_amount')
    t.float('giftvoucher_actual')
    t.float('giftvoucher_difference')
    t.string('comments')
    t.field('cashup_date', { type: 'DateTime' })
    t.int('finance_id')
  },
})
