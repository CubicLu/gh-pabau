import React, { FC, useEffect } from 'react'

export interface P {
  handleGoogleLogin?: () => void
}
export const Login: FC<P> = ({ handleGoogleLogin }) => {
  const userSignIn = false

  useEffect(() => {
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
  }, [userSignIn, handleGoogleLogin])
  return <div></div>
}

export default Login
