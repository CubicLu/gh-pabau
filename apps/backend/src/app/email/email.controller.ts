import { Body, Controller, Post } from '@nestjs/common'
import { EmailService } from './email.service'

interface NotificationEmailData {
  email?: string
  bodyContent?: string
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
}
