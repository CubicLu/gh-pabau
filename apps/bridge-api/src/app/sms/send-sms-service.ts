import { SendTextLocalSMS } from './sms-textlocal-service'
import { SendNexmoSMS } from './sms-nexmo-service'
import { Context } from '../../context'
import { prepareMessage } from '../email/merge-tags.service'
import { smsResponse } from './dto'

export const sendSmsWithTags = async (args, ctx: Context) => {
  const international_company = await ctx.prisma.companyDetails.findFirst({
    where: {
      company_id: ctx.authenticated.company,
    },
  })
  const relations = {
    contact_id: args.contact_id,
    staff_id: ctx.authenticated.user,
    booking_id: args.booking_id,
  }
  const messageWithTags = await prepareMessage(args.message, ctx, relations)
  let messageCount = 0
  switch (true) {
    case messageWithTags.length <= 160:
      messageCount = 1
      break
    case messageWithTags.length > 160 && messageWithTags.length <= 303:
      messageCount = 2
      break
    case messageWithTags.length > 303 && messageWithTags.length <= 455:
      messageCount = 3
      break
    case messageWithTags.length > 455 && messageWithTags.length <= 607:
      messageCount = 4
      break
    case messageWithTags.length > 612:
      messageCount = 5
      break
  }

  const {
    balance,
    credit_balance_id,
  } = await ctx.prisma.creditBalance.findFirst({
    where: {
      company_id: ctx.authenticated.company,
    },
  })
  if (messageCount > balance) {
    return 'Clinic has no credit to send sms'
  }
  if (args.from === '') {
    const { smsd_name } = await ctx.prisma.smsSender.findFirst({
      where: {
        company_id: ctx.authenticated.company,
        is_default: true,
      },
    })
    args.from = smsd_name
  }

  args.message = messageWithTags

  let smsResponse: smsResponse = {}
  if (international_company.county === 'United States') {
    smsResponse = await SendNexmoSMS(args)
  } else {
    smsResponse = await SendTextLocalSMS(args)
  }
  const newBalance = balance - smsResponse.message_count
  await ctx.prisma.creditBalance.update({
    where: {
      credit_balance_id: credit_balance_id,
    },
    data: {
      balance: {
        set: newBalance,
      },
    },
  })
  return {
    success: true,
    newCreditBalance: newBalance,
    usedMessageCount: smsResponse.message_count,
  }
}
