import { objectType } from 'nexus'

export const ClasstypeMaster = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClasstypeMaster',
  definition(t) {
    t.int('ctype_id')
    t.nullable.string('ctype_name')
    t.string('ctype_compid')
    t.string('ctype_date')
    t.string('ctype_color')
    t.string('ctype_description')
    t.int('payment_option_disabled')
    t.int('credit_option_disabled')
  },
})
