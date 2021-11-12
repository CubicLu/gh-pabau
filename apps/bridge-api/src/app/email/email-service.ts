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

export const sendEmailWithTemplate = async (args, ctx: Context) => {
  const contact = await ctx.prisma.cmContact.findFirst({
    where: {
      ID: args.contact_id,
    },
  })

  if (contact.Email) {
    const { senders_name } = await ctx.prisma.companyEmail.findFirst({
      where: {
        company_id: ctx.authenticated.company,
        default_email: 1,
      },
    })

    const getMessageTemplate = await ctx.prisma.messageTemplate.findFirst({
      where: {
        template_id: args.template_id,
        template_type: 'email',
      },
    })
    const relations = {
      contact_id: args.contact_id,
      staff_id: ctx.authenticated.user,
      booking_id: args.booking_id,
    }
    return sgMail
      .send({
        to: contact.Email,
        from: {
          name: senders_name ? senders_name : 'Pabau CRM',
          email: environment.FROM_EMAIL, // TO DO with company mail - company_email ? company_email : environment.FROM_EMAIL,
        },
        subject: getMessageTemplate.subject,
        html: relations
          ? await prepareMessage(getMessageTemplate.message, ctx, relations)
          : getMessageTemplate.message,
      })
      .then((response) => {
        return true
      })
      .catch((error) => {
        return false
      })
  } else {
    return 'client has no E-mail address'
  }
}
