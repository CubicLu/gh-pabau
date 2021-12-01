import { Context } from '../../../context'
import { extendType } from 'nexus'
import { prepareMessage } from '../../email/merge-tags.service'

export const ContactCommunicationExtended = extendType({
  type: 'Communication',
  definition(t) {
    t.nullable.field('messageBody', {
      type: 'String',
      async resolve(parent: any, args, ctx: Context) {
        if (!parent.Content?.body) {
          return ''
        }

        return await prepareMessage(parent.Content.body, ctx, {
          contact_id: parent.CommunicationRecipient.recipient_id,
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
