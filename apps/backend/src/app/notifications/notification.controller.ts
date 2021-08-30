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
  sent_to: number[]
  sent_by: number
  destination?: string
  user_name: string
  service_name: string
  client_name: string
  date: string
  time: string
  company_id: number
  cancellation_reason?: string
  client_id?: number
  sent_by_name?: string
}

const requiredFields = [
  'type',
  'sent_by',
  'user_name',
  'service_name',
  'client_id',
  'date',
  'time',
]

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
      cancellation_reason,
    } = data
    if (type === notificationType.cancelled_appointment_via_calendar.type) {
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

    let enableUsers = []
    if (type === notificationType.rescheduled_appointment_via_calendar.type) {
      enableUsers = await this.notificationService.findUserEnabledNotifications(
        company_id,
        notificationType.new_appointment_via_calendar.name
      )
    } else {
      enableUsers = await this.notificationService.findUserEnabledNotifications(
        company_id,
        notificationType[type].name
      )
    }

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
    })

    return {
      success: true,
      message: 'Notification pushed successfully',
      response,
    }
  }
}
