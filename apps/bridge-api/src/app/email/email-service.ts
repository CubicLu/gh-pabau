import sgMail from '@sendgrid/mail'
import { Context } from '../../context'
import { environment } from '../../environments/environment'
import { EmailInput, EmailWithTagsInput } from './dto'
import { prepareMessage } from './merge-tags.service'
import { EmailTemplates } from './template'

if (process.env.SEND_GRID_ACCESS_KEY) {
  console.log('Initializing sendgrid with an API key...')
  sgMail.setApiKey(process.env.SEND_GRID_ACCESS_KEY)
}

export const sendEmail = async (input: EmailInput) => {
  const { to, subject, text, html, templateType, fields } = input

  const data = fields?.reduce(
    (acc, cur) => ({ ...acc, [cur.key]: cur.value }),
    {}
  )

  return sgMail.send({
    to: to,
    from: environment.FROM_EMAIL,
    subject: subject,
    text: text,
    html: html,
    templateId: EmailTemplates[templateType],
    dynamicTemplateData: data,
  })
}

export const sendEmailWithTags = async (
  { to, subject, html, relations }: EmailWithTagsInput,
  ctx: Context
) =>
  sgMail
    .send({
      to: to,
      from: environment.FROM_EMAIL,
      subject: subject,
      html: relations ? await prepareMessage(html, ctx, relations) : html,
    })
    .then((response) => {
      return true
    })
    .catch((error) => {
      return false
    })

export const sendEmailWithTemplate = async (
  { contact_id, email, booking_id, user_id, template_id },
  ctx: Context
) => {
  if (!email) {
    return {
      Success: false,
      Message: 'client has no E-mail address',
    }
  }
  const { senders_name } = await ctx.prisma.companyEmail.findFirst({
    where: {
      company_id: ctx.authenticated.company,
      default_email: 1,
    },
  })

  const getMessageTemplate = await ctx.prisma.messageTemplate.findFirst({
    where: {
      template_id: template_id,
      template_type: 'email',
    },
  })
  const relations = {
    contact_id: contact_id,
    staff_id: user_id,
    booking_id: booking_id,
  }
  return sgMail
    .send({
      to: email,
      from: {
        name: senders_name ? senders_name : 'Pabau CRM',
        email: environment.FROM_EMAIL, // TO DO with company mail - company_email ? company_email : environment.FROM_EMAIL,
      },
      subject: getMessageTemplate.subject,
      html: await prepareMessage(getMessageTemplate.message, ctx, relations),
    })
    .then((response) => {
      return {
        Success: true,
        Message: '',
      }
    })
    .catch((error) => {
      return {
        Success: false,
        Message: error,
      }
    })
}
