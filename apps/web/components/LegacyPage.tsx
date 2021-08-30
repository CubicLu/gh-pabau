/**
 * Bridge portal to an old page
 */

import React, { FC, HTMLProps } from 'react'
import { useUser } from '../context/UserContext'

interface P extends HTMLProps<HTMLIFrameElement> {
  /**
   * For example: /setup/blah
   */
  urlPath: string

  /**
   * Never use src (IDE's think it's a real path, and show linting error due to file not found)
   */
  src?: never
}

const LegacyPage: FC<P> = ({ urlPath, title, ...rest }) => {
  const user = useUser()
  const host = user.me.remote_url ? user.me.remote_url : 'https://crm.pabau.com'
  return (
    <iframe
      src={host + `${urlPath?.startsWith('/') ? urlPath : `/${urlPath}`}`}
      title={title || 'Pabau'}
      style={{ width: '100%', height: '92vh' }}
      frameBorder={0}
      {...rest}
    />
  )
}

export default LegacyPage
