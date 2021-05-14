import { gql, useMutation, useQuery } from '@apollo/client'
import { notificationTypes } from '../mocks/Notifications'

const LIST_QUERY = gql`
  query notification_types {
    notification_types {
      type
      id
      notification_type
    }
  }
`
const ADD_MUTATION = gql`
  mutation insert_notifications_one(
    $type: uuid!
    $sent_to: jsonb
    $variables: jsonb
    $destination: String!
    $sent_by: Int # $loop: Int
  ) {
    insert_notifications_one(
      object: {
        type: $type
        destination: $destination
        sent_to: $sent_to
        variables: $variables
        sent_by: $sent_by
        # loop: $loop
      }
    ) {
      id
    }
  }
`

export function useNotification() {
  const [addMutation] = useMutation(ADD_MUTATION)
  const { data: types } = useQuery(LIST_QUERY)

  const pushNotification = async ({ type, sentTo, destination, variable }) => {
    const notificationType = types?.notification_types.find(
      (_type) => _type.notification_type === type
    )
    const variables = {
      type: notificationType.id,
      sent_to: sentTo,
      destination: destination,
      sent_by: 83247,
      // Will set dynamically sent_by
      variables: variable,
    }
    await addMutation({ variables })
  }

  return { pushNotification, notificationTypes }
}
