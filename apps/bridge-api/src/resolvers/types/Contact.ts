import { Context } from '../../context'
import { extendType, nonNull, intArg, stringArg, inputObjectType } from 'nexus'
import {
  getCommunicationScheduled,
  cancelScheduledCommunication,
} from '../../app/contact/communications-scheduled.service'
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

export const CancelScheduledCommunication = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('cancelScheduledCommunication', {
      type: 'Boolean',
      description: 'Cancels scheduled communication',
      args: {
        type: nonNull(stringArg()),
        deleteType: nonNull(
          inputObjectType({
            name: 'CancelScheduledCommunicationDeleteType',
            definition(t) {
              t.nonNull.string('type')
              t.nonNull.int('relatedId')
            },
          })
        ),
      },
      async resolve(parent, args, ctx: Context) {
        return cancelScheduledCommunication(
          args.type.toLowerCase(),
          args.deleteType,
          ctx
        )
      },
    })
  },
})
