import { Controller, Post, Body } from '@nestjs/common'
import { NotificationServices } from './notification.service'
import { notificationType } from './mock'

interface ResponseType {
  success: boolean
  message?: string | string[]
  response?: {
    id: string
  }
}

interface BodyData {
  type: string
  sent_by: number
  destination?: string
  service_name: string
  client_name: string
  date: string
  time: string
  company_id: number
  cancellation_reason?: string
  sent_by_name?: string
  current_date?: string | Date
  current_time?: string | Date
  appointment_with: number
}

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationServices) {}

  @Post('notification')
  async sendNotification(@Body() data: BodyData): Promise<ResponseType> {
    const {
      type,
      sent_by,
      company_id,
      destination,
      service_name,
      client_name,
      sent_by_name,
      date,
      time,
      current_date,
      current_time,
      appointment_with,
      cancellation_reason,
    } = data

    const requiredFields = [
      'type',
      'sent_by',
      'service_name',
      'date',
      'time',
      'appointment_with',
    ]

    if (type === notificationType.cancelled_appointment_via_calendar.type) {
      requiredFields.push('cancellation_reason')
    }

    const errors: string[] = []
    for (const field of requiredFields) {
      if (!data[field]) {
        errors.push(`${field} is required`)
      }
    }

    if (errors.length > 0) {
      return { success: false, message: errors }
    }

    let enableUsers = []
    enableUsers = await this.notificationService.findUserEnabledNotifications(
      company_id,
      type === notificationType.rescheduled_appointment_via_calendar.type
        ? notificationType.new_appointment_via_calendar.name
        : notificationType[type].name
    )
    enableUsers = enableUsers.filter(
      (user) => user === appointment_with && user !== sent_by
    )

    if (enableUsers?.length > 0) {
      const response = await this.notificationService.sendNotification({
        type,
        sent_to: enableUsers,
        sent_by,
        destination,
        user_name: sent_by_name,
        service_name,
        client_name,
        date,
        time,
        cancellation_reason,
        current_date,
        current_time,
        company_id,
      })
      return {
        success: true,
        message: 'Notification pushed successfully.',
        response,
      }
    } else {
      return {
        success: false,
        message: 'Not found any users to send notification.',
      }
    }
  }
}
