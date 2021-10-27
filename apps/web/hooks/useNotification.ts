import { notificationTypes } from '../mocks/Notifications'
import { useInsert_Notifications_OneMutation } from '@pabau/graphql'
import { useUser } from '../context/UserContext'

export function useNotification() {
  const authenticateUser = useUser()
  const [insertNotificationsOneMutation] = useInsert_Notifications_OneMutation()

  const pushNotification = async ({ type, destination, variable }) => {
    const variables = {
      template: type,
      destination,
      sent_by: authenticateUser?.me?.user,
      variables: variable,
    }
    await insertNotificationsOneMutation({ variables })
  }

  return { pushNotification, notificationTypes }
}
