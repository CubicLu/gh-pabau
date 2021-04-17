import { apiURL } from '../../baseUrl'
import { Notification, NotificationType } from '@pabau/ui'
import { renderToString } from 'react-dom/server'

export const sendEmailService = ({
  email,
  subject,
  bodyContent,
  successMessage = 'Test Email sent',
  failedMessage = 'Test Email failed',
}) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': apiURL,
    },
    body: JSON.stringify({
      bodyContent: `${renderToString(bodyContent)}`,
      email: email,
      subject: subject || 'Test',
    }),
  }
  fetch(`${apiURL}/notification-email`, requestOptions).then((res) => {
    if (res.status === 201) {
      Notification(NotificationType.success, successMessage)
    } else {
      Notification(NotificationType.error, failedMessage)
    }
  })
}
