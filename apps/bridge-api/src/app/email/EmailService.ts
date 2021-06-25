import sgMail from '@sendgrid/mail'
import { environment } from '../../environments/environment'
import { EmailInput } from './dto'
import { EmailTemplates } from './email-templates'

export default class EmailService {
  public constructor() {
    sgMail.setApiKey(process.env.SEND_GRID_ACCESS_KEY)
  }

  public async sendEmail(input: EmailInput) {
    const { to, subject, text, html, templateType } = input
    const emailOptions = {
      to: to,
      from: environment.FROM_EMAIL,
      subject: subject,
      text: text,
      html: html,
      templateId: EmailTemplates[templateType],
      ...this.getTemplateEmailData(input),
    }
    await sgMail.send(emailOptions)
  }

  private getTemplateEmailData(input: EmailInput) {
    const { templateType, subject, url, name, to } = input
    switch (EmailTemplates[templateType]) {
      case EmailTemplates['password-reset-confirm']:
        return {
          dynamicTemplateData: {
            subject: subject,
            name: name,
            url: url,
            userEmail: to,
          },
        }
        break
      default:
        return
    }
  }
}
