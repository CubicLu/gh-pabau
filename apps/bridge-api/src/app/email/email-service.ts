import sgMail from '@sendgrid/mail'
import { environment } from '../../environments/environment'
import { EmailInput } from './dto'
import { EmailTemplates } from './template'

export default class EmailService {
  public constructor() {
    sgMail.setApiKey(process.env.SEND_GRID_ACCESS_KEY)
  }
  public async sendEmail(input: EmailInput) {
    const { to, subject, text, html, templateType, fields } = input

    const data = fields.reduce(
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
}
