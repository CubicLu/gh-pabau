import { objectType, enumType } from 'nexus'

const ContactCommunicationScheduledTypeEnum = enumType({
  name: 'ClientCommunicationTypeEnum',
  members: ['Email', 'SMS'],
})

const ContactCommunicationScheduledRecipientType = objectType({
  name: 'ContactCommunicationScheduledRecipientType',
  definition(t) {
    t.int('recipientId')
    t.string('firstName')
    t.string('lastName')
    t.string('email')
    t.string('mobile')
  },
})

export const ContactCommunicationScheduledType = objectType({
  name: 'ContactCommunicationScheduledType',
  definition(t) {
    t.field('type', { type: ContactCommunicationScheduledTypeEnum })
    t.date('date')
    t.field('recipient', { type: ContactCommunicationScheduledRecipientType })
    t.string('from')
    t.string('subject')
    t.string('message')
  },
})
