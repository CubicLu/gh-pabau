import React, { FC } from 'react'
import { Layout as PabauLayout, LayoutProps, Iframe } from '@pabau/ui'
import Search from '../Search'
import useLogin from '../../hooks/authentication/useLogin'
import Login from '../../pages/login'
import { useRouter } from 'next/router'
import { useDisabledFeaturesQuery } from '@pabau/graphql'

const onMessageType = () => {
  //add mutation for send message textbox
}

const onCreateChannel = (name, description, isPrivate) => {
  //add mutation for create Channel here
  console.log('onCreateChannel-- or another one', name, description, isPrivate)
}

const Layout: FC<LayoutProps> = ({ children, ...props }) => {
  const [authenticated, user] = useLogin(false)
  const router = useRouter()
  const { data, error, loading } = useDisabledFeaturesQuery()

  if (error) {
    return (
      <div>
        {error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
      </div>
    )
  }

  if (typeof window === 'undefined' || !data || loading) {
    return <PabauLayout> Loading animation placeholder </PabauLayout>
  }

  let legacyPage: boolean | string = false
  for (const [, row] of data.feature_flags.entries()) {
    if (router.pathname.substring(1) === row.page_slug) {
      legacyPage = '/' + row.fallback_slug
    }
  }

  if (
    typeof window !== 'undefined' &&
    authenticated &&
    user &&
    localStorage?.getItem('token')
  ) {
    return (
      <PabauLayout
        searchRender={() => <Search />}
        onCreateChannel={onCreateChannel}
        onMessageType={onMessageType}
        legacyContent={!!legacyPage}
        {...props}
      >
        {!legacyPage ? children : <Iframe urlPath={legacyPage} />}
      </PabauLayout>
    )
  }
  return <Login />
}

export default Layout
