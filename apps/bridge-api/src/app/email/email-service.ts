import sgMail from '@sendgrid/mail'
import { Context } from 'vm'
import { environment } from '../../environments/environment'
import { EmailInput, EmailWithTagsInput } from './dto'
import { prepareMessage } from './merge-tags.service'
import { EmailTemplates } from './template'

export default class EmailService {
  public constructor() {
    sgMail.setApiKey(process.env.SEND_GRID_ACCESS_KEY)
  }
  public async sendEmail(input: EmailInput) {
    const { to, subject, text, html, templateType, fields } = input

    const data = fields?.reduce(
      (acc, cur) => ({ ...acc, [cur.key]: cur.value }),
      {}
    )

    const emailOptions = {
      to: to,
      from: environment.FROM_EMAIL,
      subject: subject,
      text: text,
      html: html,
      templateId: EmailTemplates[templateType],
      dynamicTemplateData: data,
    }
    await sgMail.send(emailOptions)
  }

  public async sendEmailWithTags(input: EmailWithTagsInput, ctx: Context) {
    const { to, /*from,*/ subject, html } = input

    let preparedHtml = html

    if (input?.relations) {
      preparedHtml = await prepareMessage(html, ctx, input.relations)
    }

    // console.info('input:', input)
    // console.info('html after:', preparedHtml)
    // return true

    const emailOptions = {
      to: to,
      from: environment.FROM_EMAIL,
      // from: from || environment.FROM_EMAIL,
      subject: subject,
      html: preparedHtml,
    }
    return await sgMail
      .send(emailOptions)
      .then((response) => {
        return true
      })
      .catch((error) => {
        return false
      })
  }
}
