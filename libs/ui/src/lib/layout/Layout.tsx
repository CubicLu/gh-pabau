import { MutationFunction } from '@apollo/client'
import { Footer, Header, Menu } from '@pabau/ui'
import { Card, Layout as AntLayout } from 'antd'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { ReactComponent as IllustrationSvg } from './example.svg'
import styles from './Layout.module.less'
import { NotificationDrawerItemType } from '../notification-drawer/NotificationItem'
import { AuthenticatedUser, JwtUser } from '@pabau/yup'
import Head from 'next/head'

const { Content } = AntLayout

interface ProductNews {
  id: string
  img: string
  link: string
  title: string
  description: string
  time: Date | string
  readUsers: number[]
}

export interface ExtraUserData {
  handleCompanySwitch?(companyId): void
}

export interface LayoutProps {
  onLogOut?(): void
  readNewsMutation?: MutationFunction
  updateNotificationState?: MutationFunction
  relativeTime?: (lan: string, date: Date) => string
  notifications?: NotificationDrawerItemType[]
  productNews?: ProductNews[]
  user?: Partial<AuthenticatedUser> & JwtUser & ExtraUserData
  pageTitle?: string
  newButtonText?: string
  onNewClicked?: string | (() => void)
  onCancelClicked?: true | (() => void)
  card?: true
  searchRender?: (innerComponent: JSX.Element) => JSX.Element
  active?: string
  onMessageIconClick?(): void
  isDisplayingFooter?: boolean
  legacyContent?: boolean
  taskManagerIFrameComponent?: JSX.Element
  allowed?: boolean
  requireAdminAccess?: boolean
  clientCreateRender?: (handleClose?: () => void) => JSX.Element
  leadCreateRender?: (handleClose?: () => void) => JSX.Element
  handleSearch?: (searchTerm: string) => void
  badgeCountList?: BadgeCountList
  journeyRender?: (handleClose?: () => void) => JSX.Element
}

interface BadgeCountList {
  [key: string]: number
}

export const Layout: FC<LayoutProps> = ({
  searchRender,
  onMessageIconClick,
  pageTitle,
  newButtonText,
  onNewClicked,
  onCancelClicked,
  isDisplayingFooter = true,
  card,
  children,
  onLogOut,
  active,
  legacyContent = false,
  notifications,
  productNews,
  relativeTime,
  updateNotificationState,
  readNewsMutation,
  taskManagerIFrameComponent,
  clientCreateRender,
  leadCreateRender,
  badgeCountList,
  journeyRender,
  ...rest
}) => {
  let initCollapsed = true
  if (localStorage?.getItem('menu')) {
    initCollapsed = localStorage?.getItem('menu') === '1' ? true : false
  }

  const [collapsed, setCollapsed] = useState(initCollapsed)

  const handleCollapsedChange = (e) => {
    setCollapsed(e)
    localStorage?.setItem('menu', e === true ? '1' : '0')
  }

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>Pabau 2</title>
      </Head>

      <AntLayout {...rest} className={styles.main}>
        <AntLayout style={{ background: '#F7F7F9' }}>
          <Header
            readNewsMutation={readNewsMutation}
            updateNotificationState={updateNotificationState}
            searchRender={searchRender}
            onMessageIconClick={onMessageIconClick}
            onLogOut={onLogOut}
            notifications={notifications}
            productNews={productNews}
            relativeTime={relativeTime}
            taskManagerIFrameComponent={taskManagerIFrameComponent}
            clientCreateRender={clientCreateRender}
            journeyRender={journeyRender}
            leadCreateRender={leadCreateRender}
            sidebarCollapsed={collapsed}
            toggleSidebar={(e) => handleCollapsedChange(e)}
            {...rest}
          />
          <AntLayout className={styles.headerMargin}>
            <Menu
              active={active}
              badgeCountList={badgeCountList}
              collapsedProp={collapsed}
            />
            <Content
              className={classNames(
                !legacyContent ? styles.layoutContent : styles.layoutIframed,
                collapsed ? styles.sidebarMargin : styles.collapsedSidebarMargin
              )}
            >
              <Content
                style={{
                  position: 'relative',
                  minHeight: 'calc(100vh - 146px)',
                  borderRadius: '4px',
                }}
              >
                {card ? (
                  <Card
                    title={pageTitle}
                    style={{ width: '50vmin', margin: '0 auto' }}
                  >
                    {children}
                  </Card>
                ) : (
                  <>
                    {pageTitle && <h1>{pageTitle}</h1>}
                    {children}
                  </>
                )}
              </Content>
              {isDisplayingFooter && <Footer />}
            </Content>

            {onNewClicked && (
              <Content
                style={{
                  padding: '1em',
                  boxShadow: '0 0px 9px -4px rgba(0,0,0,0.8)',
                  borderRadius: '0.5em',
                  backgroundColor: '#f4f4f4',
                  position: 'relative',
                  marginBottom: '0',
                }}
              >
                <h4>Related guides</h4>
                <ul>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>Setting up a Marketing Source</a>
                  </li>
                </ul>
                <div
                  style={{
                    position: 'absolute',
                    top: '-2em',
                    right: '0px',
                    left: '50%',
                    bottom: '0',
                    overflow: 'hidden',
                  }}
                >
                  <IllustrationSvg width={600} height={200} />
                </div>
              </Content>
            )}
          </AntLayout>
        </AntLayout>
      </AntLayout>
    </>
  )
}

export default Layout
