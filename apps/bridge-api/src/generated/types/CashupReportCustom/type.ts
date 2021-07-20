import { objectType } from 'nexus'

export const CashupReportCustom = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CashupReportCustom',
  definition(t) {
    t.int('id')
    t.string('company_id')
    t.int('location_id')
    t.field('cashup_date', { type: 'DateTime' })
    t.string('custom_type')
    t.float('custom_amount')
    t.float('custom_actual')
    t.float('custom_difference')
    t.string('card_type')
  },
})
