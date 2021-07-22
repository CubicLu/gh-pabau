import { Controller, Post, Body, Headers } from '@nestjs/common'
import { NotificationServices } from './notification.service'
import { notificationType } from './mock'

interface ResponseType {
  success: boolean
  message?: string | string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response?: any
}

interface BodyData {
  type: string
  sent_to: number[]
  sent_by: number
  destination?: string
  user_name: string
  service_name: string
  client_name: string
  date: string | Date
  time: string | Date
  cancellation_reason?: string
}

const requiredFields = [
  'type',
  'sent_to',
  'sent_by',
  'user_name',
  'service_name',
  'client_name',
  'date',
  'time',
]

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationServices) {}

  @Post('notification')
  async sendNotification(
    @Body() data: BodyData,
    @Headers() headers
  ): Promise<ResponseType> {
    if (data.type === notificationType.cancelled_appointment_via_calendar) {
      requiredFields.push('cancellation_reason')
    }

    const errors: string[] = []
    Object.keys(data).map((key) => {
      if (!data[key] && requiredFields.includes(key)) {
        errors.push(`${key} is required`)
      }
    })

    if (errors.length > 0) {
      return { success: false, message: errors }
    }

    const sentUserData = await this.notificationService.getUserById(
      data.sent_by,
      headers?.authorization
    )
    const clientData = await this.notificationService.getUserById(
      data.sent_to?.[0],
      headers?.authorization
    )

    const response = await this.notificationService.sendNotification(
      data.type,
      data.sent_to,
      data.sent_by,
      data.destination,
      sentUserData?.data?.findFirstUser?.full_name,
      data.service_name,
      clientData?.data?.findFirstUser?.full_name,
      data.date,
      data.time,
      data.cancellation_reason
    )
    return { success: true, response }
  }
}
