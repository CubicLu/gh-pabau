import { gql, useMutation } from '@apollo/client'
import { notificationTypes } from '../mocks/Notifications'

const ADD_MUTATION = gql`
  mutation insert_notifications_one(
    $type: String
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

  const pushNotification = async ({ type, sentTo, destination, variable }) => {
    const variables = {
      type,
      sent_to: sentTo,
      destination,
      sent_by: 83247,
      // Will set dynamically sent_by
      variables: variable,
    }
    await addMutation({ variables })
  }

  return { pushNotification, notificationTypes }
}
