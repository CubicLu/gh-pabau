import { Context } from '../../context'

export const getSenders = async (ctx: Context) => {
  const emails = await getEmails(ctx)
  const smses = await getSmses(ctx)
  const senders = []

  for (const email of emails) {
    senders.push({
      id: email.email_id,
      company_id: email.company_id,
      type: 'email',
      data: email.company_email,
      is_default: email.default_email,
      enterprise_email: email.enterprise_email,
    })
  }

  for (const sms of smses) {
    senders.push({
      id: sms.smsd_id,
      company_id: sms.company_id,
      type: 'sms',
      data: sms.smsd_name,
      is_default: sms.is_default === true ? 1 : 0,
    })
  }

  return senders
}

const getEmails = async (ctx: Context) => {
  return await ctx.prisma.companyEmail.findMany()
}

const getSmses = async (ctx: Context) => {
  return await ctx.prisma.smsSender.findMany()
}