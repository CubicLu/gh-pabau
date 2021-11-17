import { Context } from '../../context'
import { findContactByEmail } from '../contact/contact.service'
import { findLeadByEmail } from '../lead/lead.service'
import {
  getContent,
  createCommunication,
  addRecipient,
} from './communication.service'
import {
  communications_type,
  communications_recipients_status,
  communications_recipients_recipient_type,
} from '.prisma/client'
import moment from 'moment'

export const checkEmailPrivacy = async (ctx: Context, messages) => {
  const communications = await ctx.prisma.communicationRecipient.findMany({
    select: {
      remote_key: true,
    },
    where: {
      Communication: {
        Company: {
          id: {
            equals: ctx.authenticated.company,
          },
        },
      },
      remote_key: {
        in: messages,
      },
    },
  })

  return messages.map((message) => {
    return {
      messageId: message,
      privacySetting:
        communications.find(
          (communication) => communication.remote_key === message
        ) !== undefined
          ? 1
          : 0,
    }
  })
}

export const changeEmailPrivacy = async (
  ctx: Context,
  args: {
    fromAdress: string
    toAddress: string
    subject?: string | ''
    messageBody: string
    date: Date
    messageId: string
  }
) => {
  const recipient =
    (await findContactByEmail(ctx, args.toAddress)) ??
    (await findLeadByEmail(ctx, args.toAddress))

  if (recipient) {
    const content = await getContent(ctx, args.subject, args.messageBody)
    if (content) {
      const communication = await createCommunication(ctx, {
        communications_content_id: content.id,
        company_id: ctx.authenticated.company,
        date: args.date ? moment(args.date).toDate() : moment().toDate(),
        from_address: args.fromAdress,
        location_id: 0,
        secure: false,
        type: communications_type.Email,
        uid: ctx.authenticated.user,
      })
      if (communication) {
        const communicationRecipient = await addRecipient(ctx, {
          cc: '',
          communications_id: communication.id,
          merge_values: '',
          provider_id: 6,
          read_count: 0,
          recipient_id: recipient.ID,
          recipient_type: communications_recipients_recipient_type.CONTACT,
          status: communications_recipients_status.sent,
          to_address: recipient.Email,
          remote_key: args.messageId,
        })
        if (communicationRecipient) {
          return { success: true }
        }
      }
    }
  }

  return {
    success: false,
    error: `Contact/Lead with email ${args.toAddress} does not exist`,
  }
}
