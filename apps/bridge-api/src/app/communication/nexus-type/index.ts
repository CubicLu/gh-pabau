import { objectType, enumType } from 'nexus'

const TypeEnum = enumType({
  name: 'TypeEnum',
  members: ['email', 'sms'],
})

export const SendersResult = objectType({
  name: 'SendersResult',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.field('type', { type: TypeEnum })
    t.string('data')
    t.int('is_default')
    t.int('enterprise_email')
    t.string('senders_name')
  },
})
