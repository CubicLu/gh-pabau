import React, { FC, useEffect } from 'react'
import { gapi } from 'gapi-script'
import { P } from './revoke'
import { useMutation } from '@apollo/client'
import { Notification, NotificationType } from '@pabau/ui'
import { DeleteGmailConnectionDocument } from '@pabau/graphql'

export const Revoke: FC<P> = ({ email, companyId, userId }) => {
  useEffect(
    () => {
      handleClick()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const [removeConnection] = useMutation(DeleteGmailConnectionDocument, {
    onCompleted() {
      Notification(
        NotificationType.success,
        'Google connection removed successfully'
      )
    },
    onError(e) {
      console.log(e)
    },
  })

  const handleClick = () => {
    gapi.load('client:auth2', initClient)
  }
  const initClient = () => {
    const scopes =
      'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.labels'
    gapi.client
      .init({
        apiKey: 'AIzaSyDD3dtSDaMm6-UiUKDENugyceobzsd41wI',
        clientId:
          '1006619281478-0ggfmclia2856fnes3640qn7rhq1f2u9.apps.googleusercontent.com',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
        ],
        scope: scopes,
      })
      .then(
        async () => {
          // gapi.auth2.getAuthInstance().signOut()
          // gapi.auth2.getAuthInstance().disconnect()
          gapi.client.setToken(null)
          await removeGmailConnection()
        },
        function (error) {
          console.log(error)
        }
      )
  }
  const removeGmailConnection = async () => {
    gapi.client.setToken(null)
    await removeConnection({
      variables: {
        email: email,
        companyId: companyId,
        userId: userId,
      },
      optimisticResponse: {},
    })
  }

  return <div></div>
}

export default Revoke
