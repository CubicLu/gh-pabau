import { objectType, enumType, inputObjectType } from 'nexus'

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

export const EmailPrivacyResult = objectType({
  name: 'EmailPrivacyResult',
  definition(t) {
    t.string('email')
    t.string('messageId')
    t.int('privacySetting')
  },
})

export const EmailMessageType = inputObjectType({
  name: 'EmailMessageType',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('messageId')
  },
})
