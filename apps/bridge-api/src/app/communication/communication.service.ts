import { Context } from '../../context'
import { createHash } from 'crypto'
import {
  communications_type,
  communications_related_type,
  communications_recipients_recipient_type,
  communications_recipients_status,
} from '.prisma/client'

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
  return await ctx.prisma.companyEmail.findMany()
}

const getSmses = async (ctx: Context) => {
  return await ctx.prisma.smsSender.findMany()
}

export const createCommunication = async (
  ctx: Context,
  data: {
    company_id: number
    from_address: string
    uid: number
    location_id: number
    type: communications_type
    secure: boolean
    date: Date
    communications_content_id: number
    related_id?: number | null
    related_type?: communications_related_type | null
  }
) => {
  return await ctx.prisma.communication.create({
    data: data,
  })
}

export const addRecipient = async (
  ctx: Context,
  data: {
    communications_id: number
    recipient_id: number
    recipient_type: communications_recipients_recipient_type
    remote_key?: string | null
    delivered_result?: string | null
    read_count: number
    to_address: string
    cc: string
    provider_id: number
    status: communications_recipients_status | null
    merge_values: string
  }
) => {
  return await ctx.prisma.communicationRecipient.create({
    data: data,
  })
}

export const getContent = async (
  ctx: Context,
  subject: string,
  body: string
) => {
  const hash = createHash('sha1').update(`${body}:${subject}`).digest('hex')
  const content = await getContentByHash(ctx, hash)

  if (content) {
    return content
  }

  return await insertContent(ctx, {
    company_id: ctx.authenticated.company,
    hash,
    subject,
    body,
  })
}

const insertContent = async (
  ctx: Context,
  data: {
    company_id: number
    hash: string
    subject?: string | null
    body: string
  }
) => {
  return await ctx.prisma.communicationContent.create({
    data: data,
  })
}

const getContentByHash = async (ctx: Context, hash: string) => {
  return await ctx.prisma.communicationContent.findFirst({
    where: {
      company_id: {
        equals: ctx.authenticated.company,
      },
      hash: {
        equals: hash,
      },
    },
  })
}
