import { Controller, Post, Body } from '@nestjs/common'
import { EmailService } from './email.service'

interface NotificationEmailData {
  email?: string
  bodyContent?: string
  subject?: string
  templateType?: string
}

interface NotificationDynamicTemplateEmailData {
  email?: string
  bodyContent?: {
    name: string
    url: string
  }
  subject?: string
  templateType?: string
}

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('notification-email')
  async sendEmail(
    @Body() data: NotificationEmailData
  ): Promise<{ success: boolean; message?: string }> {
    if (!data.email) {
      throw new Error('Email is required')
    }
    await this.emailService.sendEmail(
      data.email,
      data.bodyContent,
      data.subject
    )
    return { success: true }
  }

  @Post('dynamic-template-email')
  async sendDynamicTemplateEmail(
    @Body() data: NotificationDynamicTemplateEmailData
  ): Promise<{ success: boolean; message?: string }> {
    if (!data.email) {
      throw new Error('Email is required')
    }
    if (!data.templateType) {
      throw new Error('Template type is required')
    }
    await this.emailService.sendDynamicTemplateEmail(
      data.email,
      data.subject,
      data.bodyContent,
      data.templateType
    )
    return { success: true }
  }
}
