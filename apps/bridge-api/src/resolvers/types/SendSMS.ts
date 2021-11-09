import { objectType, extendType, nonNull, stringArg } from 'nexus'
import { Context } from '../../context'
import { SendTextLocalSMS } from '../../app/sms/sms-textlocal-service'
import { SendNexmoSMS } from '../../app/sms/sms-nexmo-service'
import { TextLocalResponse, NexmoResponse } from '../../app/sms/dto'

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
          const international_company = await ctx.prisma.companyDetails.findFirst(
            {
              where: {
                company_id: ctx.authenticated.company,
              },
            }
          )
          const responseData = {
            success: false,
            message_count: 0,
          }
          if (international_company.county === 'United States') {
            const smsResponse: NexmoResponse = await SendNexmoSMS(args)
            if (smsResponse.messages[0].status === '0') {
              responseData.success = true
            }
            responseData.message_count = Number.parseInt(
              smsResponse['message-count']
            )
          } else {
            const smsResponse: TextLocalResponse = await SendTextLocalSMS(args)
            if (smsResponse.status === 'success') {
              responseData.success = true
            }
            responseData.message_count = smsResponse.num_messages
          }
          return responseData
        } catch (error) {
          return error
        }
      },
    })
  },
})
