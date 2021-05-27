import { HttpService, Injectable } from '@nestjs/common'
import { environment } from '../../environments/environment'

@Injectable()
export class NotificationServices {
  constructor(private httpService: HttpService) {}
  async sendNotification(
    type: string,
    sent_to: number[],
    sent_by: number,
    destination: string,
    who: string,
    service_name: string,
    client_name: string,
    date: string,
    time: string,
    cancellation_reason: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const variables = {
      who,
      service_name,
      client_name,
      date,
      time,
    }

    if (type === 'cancelled_appointment_via_calendar') {
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
      .post(environment.HASURA_GRAPHQL_ENDPOINT, data)
      .toPromise()

    return response.data
  }
}
