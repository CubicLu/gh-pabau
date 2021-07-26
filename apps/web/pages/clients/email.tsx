import React, { FC } from 'react'

import SendMail from '../../components/SendEmail'

export const Index: FC = () => {
  return (
    <div
      style={{
        width: 'calc(100vw - 60px)',

        height: 'calc(100vh - 60px)',

        border: '1px solid var(--border-color-base)',
      }}
    >
      <SendMail />
    </div>
  )
}

export default Index
