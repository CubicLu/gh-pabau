import React, { FC } from 'react'
import { Layout as PabauLayout, LayoutProps } from '@pabau/ui'
import Search from '../Search'
import Login from '../../pages/login'
import useLogin from '../../hooks/authentication/useLogin'

const onMessageType = () => {
  //add mutation for send message textbox
}

const onCreateChannel = (name, description, isPrivate) => {
  //add mutation for create Channel here
  console.log('onCreateChannel--', name, description, isPrivate)
}

const Layout: FC<LayoutProps> = ({ children, ...props }) => {
  const [authenticated] = useLogin(false)
  return authenticated ? (
    <PabauLayout
      searchRender={() => <Search />}
      onCreateChannel={onCreateChannel}
      onMessageType={onMessageType}
      {...props}
    >
      {children}
    </PabauLayout>
  ) : (
    <Login />
  )
}

export default Layout
