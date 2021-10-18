import { Context } from '../../context'
import { extendType } from 'nexus'
import { SendersResult } from '../../app/communication/nexus-type'
import { getSenders } from '../../app/communication/communication.service'

export const Senders = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getSenders', {
      type: SendersResult,
      description: 'Returns all senders (email, sms)',
      async resolve(_root, args, ctx: Context) {
        return await getSenders(ctx)
      },
    })
  },
})
