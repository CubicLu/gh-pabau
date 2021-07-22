import { HttpService, Injectable } from '@nestjs/common'
import { notificationType } from './mock'

@Injectable()
export class NotificationServices {
  constructor(private httpService: HttpService) {}
  async sendNotification(
    type: string,
    sent_to: number[],
    sent_by: number,
    destination: string,
    user_name: string,
    service_name: string,
    client_name: string,
    date: string | Date,
    time: string | Date,
    cancellation_reason: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const variables = {
      who: user_name,
      service_name,
      client_name,
      date,
      time,
    }

    if (type === notificationType.cancelled_appointment_via_calendar) {
      variables['cancellation_reason'] = cancellation_reason
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

    return response.data
  }

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getUserById(id: number, authorization: string): Promise<any> {
    const data = {
      query: `query MyQuery {\n  findFirstUser(where: { id: { equals : ${id} } } ){\n    full_name\n  }\n}\n`,
      variables: null,
      operationName: 'MyQuery',
    }

    const headers = {
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      authorization: authorization,
    }
    const response = await this.httpService
      .post(
        process.env.HASURA_GRAPHQL_ENDPOINT || 'https://api-v2.pabau.com/',
        data,
        { headers }
      )
      .toPromise()
    return response.data
  }
}
