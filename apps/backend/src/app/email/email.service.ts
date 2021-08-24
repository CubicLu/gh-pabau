import { SendGridService } from '@anchan828/nest-sendgrid'
import { Injectable } from '@nestjs/common'
import { environment } from '../../environments/environment'
import { emailTemplates } from './email-template.types'

@Injectable()
export class EmailService {
  constructor(private readonly sendGrid: SendGridService) {}

  async sendEmail(
    email: string,
    bodyContent: string,
    subject: string
  ): Promise<{ success: boolean; message?: string }> {
    await this.sendGrid.send({
      to: email,
      from: environment.FROM_EMAIL,
      subject: subject,
      html: bodyContent,
    })
    return { success: true }
  }

  async sendDynamicTemplateEmail(
    email: string,
    subject: string,
    bodyContent: { name?: string; url?: string },
    templateType: string
  ): Promise<{ success: boolean; message?: string }> {
    await this.sendGrid.send({
      to: email,
      from: environment.FROM_EMAIL,
      templateId: emailTemplates[templateType],
      dynamicTemplateData: {
        subject: subject,
        name: bodyContent?.name,
        url: bodyContent?.url,
        userEmail: email,
      },
    })
    return { success: true }
  }
}
