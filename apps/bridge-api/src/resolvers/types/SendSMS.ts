import { objectType, extendType, nonNull, stringArg } from 'nexus'
import { Context } from '../../context'
import { sendSmsWithTags } from '../../app/sms/send-sms-service'

export const SendSmsType = objectType({
  name: 'SendSmsType',
  definition(t) {
    t.boolean('success')
    t.int('message_count')
  },
})

export const SendSMS = extendType({
  type: 'Query',
  definition(t) {
    t.field('SendSms', {
      type: 'SendSmsType',
      args: {
        from: nonNull(stringArg()),
        to: nonNull(stringArg()),
        message: nonNull(stringArg()),
      },
      async resolve(parent: any, args, ctx: Context) {
        try {
          return await sendSmsWithTags(args, ctx)
        } catch (error) {
          return error
        }
      },
    })
  },
})
