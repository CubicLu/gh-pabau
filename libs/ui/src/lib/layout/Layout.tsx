import React, { FC, useState, MouseEvent } from 'react'
import { ReactComponent as IllustrationSvg } from './example.svg'
import { Card, Layout as AntLayout } from 'antd'
import { Footer, Header, Menu } from '@pabau/ui'
import styles from './Layout.module.less'
import classNames from 'classnames'

const { Content } = AntLayout

interface Notification {
  id: string
  notificationTime: Date
  notificationType: string
  notificationTypeIcon?: string
  title: string
  desc: string
  read: number[]
  users: number[]
}

interface UserProps {
  user: number
  company: number
  fullName: string
}
export interface LayoutProps {
  notifications?: Notification[]
  user?: UserProps
  pageTitle?: string
  newButtonText?: string
  onNewClicked?: string | (() => void)
  onCancelClicked?: true | (() => void)
  card?: true
  searchRender?: (innerComponent: JSX.Element) => JSX.Element
  active?: string
  onCreateChannel?: (
    name: string,
    description: string,
    isPrivate: boolean
  ) => void
  isDisplayingFooter?: boolean
  onMessageType?: (e: MouseEvent<HTMLElement>) => void
  legacyContent?: boolean
}

export const Layout: FC<LayoutProps> = ({
  searchRender,
  onCreateChannel,
  pageTitle,
  newButtonText,
  onNewClicked,
  onCancelClicked,
  isDisplayingFooter = true,
  onMessageType,
  card,
  children,
  active,
  legacyContent = false,
  notifications,
  user,
  ...rest
}) => {
  const [collapsed, setCollapsed] = useState(true)
  const onSideBarCollapsed = (collapsed) => setCollapsed(collapsed)
  return (
    <AntLayout {...rest} className={styles.main}>
      <AntLayout style={{ background: '#F7F7F9' }}>
        <Header
          user={user}
          searchRender={searchRender}
          onCreateChannel={onCreateChannel}
          onMessageType={onMessageType}
          notifications={notifications}
          {...rest}
        />
        <AntLayout className={styles.headerMargin}>
          <Menu onSideBarCollapsed={onSideBarCollapsed} active={active} />
          <Content
            className={classNames(
              !legacyContent ? styles.layoutContent : styles.layoutIframed,
              collapsed ? styles.collapsedSidebarMargin : styles.sidebarMargin
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
  )
}

export default Layout
