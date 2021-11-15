import { Context } from '../../context'
import { extendType, nonNull, intArg } from 'nexus'
import { getCommunicationScheduled } from '../../app/contact/communications-scheduled.service'
import { ContactCommunicationScheduledType } from '../../app/contact/nexus-type'

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
