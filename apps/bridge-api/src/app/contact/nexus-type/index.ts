import { objectType, enumType } from 'nexus'

const ContactCommunicationScheduledTypeEnum = enumType({
  name: 'ContactCommunicationScheduledTypeEnum',
  members: ['Email', 'SMS'],
})

const ContactCommunicationScheduledDeleteTypeEnum = enumType({
  name: 'ContactCommunicationScheduledDeleteTypeEnum',
  members: ['reminder', 'survey', 'recall'],
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

const ContactCommunicationScheduledDeleteType = objectType({
  name: 'ContactCommunicationScheduledDeleteType',
  definition(t) {
    t.field('type', { type: ContactCommunicationScheduledDeleteTypeEnum })
    t.int('relatedId')
  },
})

export const ContactCommunicationScheduledType = objectType({
  name: 'ContactCommunicationScheduledType',
  definition(t) {
    t.field('type', { type: ContactCommunicationScheduledTypeEnum })
    t.field('deleteType', { type: ContactCommunicationScheduledDeleteType })
    t.date('date')
    t.field('recipient', { type: ContactCommunicationScheduledRecipientType })
    t.string('from')
    t.string('subject')
    t.string('message')
    t.nullable.list.field('attachment', {
      type: objectType({
        name: 'ContactCommunicationScheduledAttachmentType',
        definition(t) {
          t.string('file_url')
        },
      }),
    })
  },
})
