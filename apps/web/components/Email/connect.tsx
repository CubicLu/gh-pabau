import React, { FC, useEffect } from 'react'
import { gapi } from 'gapi-script'
import { useRouter } from 'next/router'
// import { FindGmailConnectionDocument } from '@pabau/graphql'
// import { useLazyQuery } from '@apollo/client'
// import { useQuery } from '@apollo/client'
// import { useUser } from '../../context/UserContext'

export interface P {
  tableName?: string
}

export const Connect: FC<P> = ({ ...props }) => {
  // const { me } = useUser()

  // const [loadConnection, { data, loading, error }] = useLazyQuery(
  //   FindGmailConnectionDocument,
  //   {
  //     variables: {
  //       companyId: me.company,
  //       userId: me.user,
  //     },
  //     onCompleted: (data) => {
  //       console.log('data', data)
  //       handleClick().then(() => console.log())
  //     },
  //   }
  // )

  const router = useRouter()
  const userSignIn = false
  useEffect(
    //   variables: {
    () => {
      // loadConnection()
      handleClick()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userSignIn]
  )
  // const { data } = useQuery(FindGmailConnectionDocument, {

  //     companyId: me.company,
  //     userId: me.user,
  //   },
  // })
  // console.log('connection data::', data)
  const handleClick = async () => {
    // if (data?.gmail_connection.length) {
    //   console.log('connection data::', data, loading)
    // } else {
    //   gapi.load('client:auth2', initClient)
    // }

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
        function () {
          const authToken = gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse().access_token
          gapi.client.setToken({ access_token: authToken })
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        },
        function (error) {
          console.log(error)
        }
      )
  }
  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      router.push('/setup/gmail/inbox')
    } else {
      handleAuthClick()
    }
  }

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn()
  }

  return <div></div>
}

export default Connect
