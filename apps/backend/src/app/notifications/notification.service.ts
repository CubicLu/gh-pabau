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

    if (type === notificationType.cancelled_appointment_via_calendar) {
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
    const response = await this.httpService
      .post(
        process.env.HASURA_GRAPHQL_ENDPOINT || 'https://api-v2.pabau.com/',
        data
      )
      .toPromise()

    const notificationId = response.data?.data?.insert_notifications_one?.id
    return { id: notificationId }
  }

  async findUserById(id: number): Promise<{ full_name: string }> {
    const data = {
      query: `query MyQuery {\n  findFirstUser(where: { id: { equals : ${id} } } ){\n    full_name\n  }\n}\n`,
      variables: null,
      operationName: 'MyQuery',
    }

    const response = await this.httpService
      .post(
        process.env.HASURA_GRAPHQL_ENDPOINT || 'https://api-v2.pabau.com/',
        data
      )
      .toPromise()
    const full_name = response.data?.data?.findFirstUser?.full_name
    return { full_name }
  }

  async findStaffMembersByCompany(company: number): Promise<[number]> {
    const data = {
      query: `query findStaffDetails {\n  findManyCmStaffGeneral(where:{ company_id:{ equals: ${company} } }){\n    Fname\n    ID\n  }\n}`,
      variables: null,
      operationName: 'findStaffDetails',
    }

    const response = await this.httpService
      .post(
        process.env.HASURA_GRAPHQL_ENDPOINT || 'https://api-v2.pabau.com/',
        data
      )
      .toPromise()
    const staffMembers = response?.data?.data?.findManyCmStaffGeneral.map(
      (staff) => staff?.ID
    )
    return staffMembers
  }

  async findManagersByCompany(company: number): Promise<[number]> {
    const data = {
      query: `query findCompanyManager{\n  findManyUser(where:{ company_id:{ equals:${company} }, staff_read_only: { equals: false } }){\n    id\n    full_name\n  }\n}`,
      variables: null,
      operationName: 'findCompanyManager',
    }

    const response = await this.httpService
      .post(
        process.env.HASURA_GRAPHQL_ENDPOINT || 'https://api-v2.pabau.com/',
        data
      )
      .toPromise()
    const managers = response?.data?.data?.findManyUser.map(
      (manager) => manager?.id
    )
    return managers
  }
}
