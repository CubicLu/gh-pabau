import { HttpService, Injectable } from '@nestjs/common'
import { notificationType } from './mock'

interface Notification {
  type: string
  sent_to: number[]
  sent_by: number
  destination: string
  user_name: string
  service_name: string
  client_name: string
  date: string | Date
  time: string | Date
  cancellation_reason?: string
}

@Injectable()
export class NotificationServices {
  constructor(private httpService: HttpService) {}
  private GRAPHQL_ENDPOINT: string =
    process.env.HASURA_GRAPHQL_ENDPOINT || 'https://api-v2.pabau.com/'
  async sendNotification(notification: Notification): Promise<{ id: string }> {
    const {
      user_name,
      service_name,
      client_name,
      date,
      time,
      type,
      sent_to,
      destination,
      sent_by,
    } = notification
    const variables = {
      who: user_name,
      service_name,
      client_name,
      date,
      time,
    }

    if (type === notificationType.cancelled_appointment_via_calendar.type) {
      variables['cancellation_reason'] = notification.cancellation_reason
    }

    const data = {
      query:
        ' mutation insert_notifications_one(\n    $type: String!\n    $sent_to: jsonb\n    $variables: jsonb\n    $destination: String!\n    $sent_by: Int # $loop: Int\n  ) {\n    insert_notifications_one(\n      object: {\n        type: $type\n        destination: $destination\n        sent_to: $sent_to\n        variables: $variables\n        sent_by: $sent_by\n        # loop: $loop\n      }\n    ) {\n      id\n    }\n  }',
      variables: {
        type,
        sent_to,
        variables,
        destination,
        sent_by,
      },
      operationName: 'insert_notifications_one',
    }
    const headers = {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    }
    const response = await this.httpService
      .post(this.GRAPHQL_ENDPOINT, data, { headers })
      .toPromise()

    const notificationId = response.data?.data?.insert_notifications_one?.id
    return { id: notificationId }
  }

  async findUserEnabledNotifications(
    company: number,
    type: string
  ): Promise<[number]> {
    const data = {
      query: `query findUserEnabledNotification {\n  notification_toggle( where: { _and: {  notificationTypeByNotificationType:{ type : { _eq: "${type}" }  } enabled:{  _eq : true } company:{ _eq: ${company} }} }) {\n    user\n  }\n}`,
      variables: null,
      operationName: 'findUserEnabledNotification',
    }
    const headers = {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    }

    const response = await this.httpService
      .post(this.GRAPHQL_ENDPOINT, data, { headers })
      .toPromise()
    const users = response.data?.data?.notification_toggle?.map(
      (notification) => notification.user
    )
    return users
  }
}
