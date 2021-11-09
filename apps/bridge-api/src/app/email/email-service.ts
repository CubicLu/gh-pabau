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
      console.log(error)
      console.log(error.response.body)
      return false
    })
