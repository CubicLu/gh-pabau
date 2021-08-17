/**
 * Bridge portal to an old page
 */

import React, { FC, HTMLProps } from 'react'

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

const Iframe: FC<P> = ({ urlPath, title, ...rest }) => (
  <iframe
    src={urlPath}
    title={title || 'Pabau'}
    style={{ width: '100%', height: '92vh' }}
    frameBorder={0}
    {...rest}
  />
)

export default Iframe
