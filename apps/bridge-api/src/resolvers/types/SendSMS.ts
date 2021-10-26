import { objectType, extendType, nonNull, stringArg } from 'nexus'
import { SendTextLocalSMS } from '../../app/sms/sms-textlocal-service'

export const SmsTest = objectType({
  name: 'SmsTest',
  definition(t) {
    t.string('name')
  },
})
export const SendSMS = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('SendSmsTest', {
      type: 'SmsTest',
      args: {
        from: nonNull(stringArg()),
        to: nonNull(stringArg()),
        message: nonNull(stringArg()),
      },
      async resolve(parent, args) {
        try {
          console.log(args)
          const sentSMS = SendTextLocalSMS(args)
          //  console.log(sentSMS)
        } catch (error) {
          return error
        }
      },
    })
  },
})
