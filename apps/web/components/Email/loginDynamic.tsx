import React, { FC, useEffect } from 'react'
// import { gapi } from 'gapi-script'
// import { useRouter } from 'next/router'

export interface P {
  handleGoogleLogin?: () => void
}
export const Login: FC<P> = ({ handleGoogleLogin }) => {
  // const router = useRouter()
  const userSignIn = false
  useEffect(
    () => {
      handleClick()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userSignIn]
  )
  //

  const handleClick = () => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

    const form = document.createElement('form')
    form.setAttribute('method', 'GET')
    form.setAttribute('action', oauth2Endpoint)

    const params = {
      client_id:
        '1006619281478-0ggfmclia2856fnes3640qn7rhq1f2u9.apps.googleusercontent.com',
      redirect_uri: `${window.location.origin}/setup/senders`,
      access_type: 'offline',
      response_type: 'code',
      scope: 'https://mail.google.com/',
      include_granted_scopes: 'true',
      state: 'state_parameter_passthrough_value',
    }

    for (const p in params) {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', p)
      input.setAttribute('value', params[p])
      form.append(input)
    }

    document.body.append(form)
    form.submit()
    return handleGoogleLogin()
    // gapi.load('client:auth2', initClient)
  }
  //
  // const initClient = () => {
  //   const scopes =
  //     'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.labels'
  //   gapi.client
  //     .init({
  //       apiKey: 'AIzaSyDD3dtSDaMm6-UiUKDENugyceobzsd41wI',
  //       clientId:
  //         '1006619281478-0ggfmclia2856fnes3640qn7rhq1f2u9.apps.googleusercontent.com',
  //       discoveryDocs: [
  //         'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
  //       ],
  //       scope: scopes,
  //     })
  //     .then(function () {
  //       const authToken = gapi.auth2
  //         .getAuthInstance()
  //         .currentUser.get()
  //         .getAuthResponse().access_token
  //       gapi.client.setToken({ access_token: authToken })
  //       gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
  //       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
  //     })
  // }
  // const updateSigninStatus = (isSignedIn) => {
  //   if (isSignedIn) {
  //     return handleGoogleLogin(
  //       gapi.auth2
  //         .getAuthInstance()
  //         .currentUser.get()
  //         .getBasicProfile()
  //         .getEmail(),
  //       gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
  //         .access_token
  //     )
  //   } else {
  //     !checkStatus && handleAuthClick()
  //   }
  // }
  //
  // //
  // const handleAuthClick = () => {
  //   gapi.auth2
  //     .getAuthInstance()
  //     .signIn()
  //     .then(() => {
  //       console.log(
  //         'login data::',
  //         gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(),
  //         gapi.auth2
  //           .getAuthInstance()
  //           .currentUser.get()
  //           .getBasicProfile()
  //           .getId()
  //       )
  //     })
  // }

  return <div></div>
}

export default Login
