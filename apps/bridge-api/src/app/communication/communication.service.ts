import { Context } from '../../context'
import { createHash } from 'crypto'

export const getSenders = async (ctx: Context) => {
  const emails = await getEmails(ctx)
  const smses = await getSmses(ctx)
  const senders = []
  let count = 0

  for (const email of emails) {
    senders.push({
      id: count,
      emailId: email.email_id,
      company_id: email.company_id,
      type: 'email',
      data: email.company_email,
      is_default: email.default_email,
      enterprise_email: email.enterprise_email,
      senders_name: email.senders_name,
    })
    count++
  }

  for (const sms of smses) {
    senders.push({
      id: count,
      smsId: sms.smsd_id,
      company_id: sms.company_id,
      type: 'sms',
      data: sms.smsd_name,
      is_default: sms.is_default === true ? 1 : 0,
    })
    count++
  }

  return senders
}

const getEmails = async (ctx: Context) => {
  return await ctx.prisma.companyEmail.findMany({
    where: {
      company_id: {
        equals: ctx.authenticated.company,
      },
    },
  })
}

const getSmses = async (ctx: Context) => {
  return await ctx.prisma.smsSender.findMany({
    where: {
      company_id: {
        equals: ctx.authenticated.company,
      },
    },
  })
}

export const getContent = async (
  ctx: Context,
  subject: string,
  body: string
) => {
  const hash = createHash('sha1').update(`${body}:${subject}`).digest('hex')
  const content = await ctx.prisma.communicationContent.findFirst({
    where: {
      company_id: {
        equals: ctx.authenticated.company,
      },
      hash: {
        equals: hash,
      },
    },
  })

  if (content) {
    return content
  }

  return await ctx.prisma.communicationContent.create({
    data: {
      company_id: ctx.authenticated.company,
      hash,
      subject,
      body,
    },
  })
}
