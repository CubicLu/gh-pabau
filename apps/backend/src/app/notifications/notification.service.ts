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
    time: string
  ): Promise<{ success: boolean; message?: string }> {
    const data = {
      query:
        ' mutation insert_notifications_one(\n    $type: uuid!\n    $sent_to: jsonb\n    $variables: jsonb\n    $destination: String!\n    $sent_by: Int # $loop: Int\n  ) {\n    insert_notifications_one(\n      object: {\n        type: $type\n        destination: $destination\n        sent_to: $sent_to\n        variables: $variables\n        sent_by: $sent_by\n        # loop: $loop\n      }\n    ) {\n      id\n    }\n  }',
      variables: {
        type,
        sent_to,
        variables: {
          who,
          service_name,
          client_name,
          date,
          time,
        },
        destination: destination,
        sent_by: sent_by,
      },
      operationName: 'insert_notifications_one',
    }
    this.httpService
      .post('https://api.new.pabau.com/v1/graphql', data)
      .subscribe((response: any) => {
        console.log(response)
      })
    return { success: true }
  }
}
