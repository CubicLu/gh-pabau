import { Context } from '../../context'
import { extendType, nonNull, intArg } from 'nexus'
import { prepareMessage } from '../../app/email/merge-tags.service'
import { getCommunicationScheduled } from '../../app/contact/contact.service'
import { ContactCommunicationScheduledType } from '../../app/contact/nexus-type'

export const ContactCommunicationExtended = extendType({
  type: 'Communication',
  definition(t) {
    t.field('messageBody', {
      type: 'String',
      async resolve(parent: any, args, ctx: Context) {
        if (!parent.Content.body) {
          return ''
        }

        return await prepareMessage(parent.Content.body, ctx, {
          contact_id: parent.Recipient.recipient_id,
          booking_id:
            parent.related_type === 'APPOINTMENT' && parent.related_id
              ? parent.related_id
              : 0,
          invoice_id:
            parent.related_type === 'INVOICE' && parent.related_id
              ? parent.related_id
              : 0,
        })
      },
    })
  },
})

export const ContactCommunicationScheduled = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getContactCommunicationScheduled', {
      type: ContactCommunicationScheduledType,
      args: {
        contactId: nonNull(intArg()),
      },
      async resolve(_root, args, ctx: Context) {
        return await getCommunicationScheduled(args.contactId, ctx)
      },
    })
  },
})
