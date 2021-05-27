/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, Body } from '@nestjs/common'
import { NotificationServices } from './notification.service'

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationServices) {}

  @Post('notification')
  async sendNotification(
    @Body() data: any
  ): Promise<{ success: boolean; message?: string; response?: any }> {
    const res = await this.notificationService.sendNotification(
      data.type,
      data.sent_to,
      data.sent_by,
      data.destination,
      data.who,
      data.service_name,
      data.client_name,
      data.date,
      data.time,
      data.cancellation_reason
    )
    console.log('response', res)
    return { success: true, response: res }
  }
}
