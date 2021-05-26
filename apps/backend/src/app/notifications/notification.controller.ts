/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, Body } from '@nestjs/common'
import { NotificationServices } from './notification.service'

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationServices) {}

  @Post('notification')
  async sendNotification(
    @Body() data: any
  ): Promise<{ success: boolean; message?: string }> {
    await this.notificationService.sendNotification(
      data.type,
      data.sent_to,
      data.sent_by,
      data.destination,
      data.who,
      data.service_name,
      data.client_name,
      data.date,
      data.time
    )
    console.log('body', data)
    return { success: true }
  }
}
