import {
  ArrowsAltOutlined,
  CloseOutlined,
  ShrinkOutlined,
} from '@ant-design/icons'
import { Avatar, Modal } from 'antd'
import classNames from 'classnames'
import React, { FC, createRef, RefObject, useEffect, useState } from 'react'
import { ReactComponent as Maximize } from '../../assets/images/popout/maximize.svg'
import { ReactComponent as Minimize } from '../../assets/images/popout/minimize.svg'
import { ReactComponent as TypeEmail } from '../../assets/images/popout/TypeEmail.svg'
import { ReactComponent as TypeForm } from '../../assets/images/popout/TypeForm.svg'
import { ReactComponent as TypeLetter } from '../../assets/images/popout/TypeLetter.svg'
import { ReactComponent as TypeSMS } from '../../assets/images/popout/TypeSMS.svg'
import { SendMail, SendSMS } from '@pabau/ui'
import userAvatar from '../../assets/images/users/austin.png'
import styles from './StickyPopout.module.less'

interface PopoutProps {
  id?: string
  type?: string
  clientId?: string
  title?: string
  ref?: RefObject<HTMLDivElement>
}

export const StickyPopout: FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [popouts, setPopouts] = useState<PopoutProps[]>([])
  const [currentPopout, setCurrentPopout] = useState<PopoutProps>({})
  const expandedClasses = {
    form: styles.expandedForm,
    email: styles.expandedEmail,
    sms: styles.expandedSMS,
    letter: styles.expandedLetter,
  }

  const handleMinimizeHeader = (e, item: PopoutProps) => {
    const { ref } = item
    if (ref?.current && !ref.current.contains(e.target)) {
      handleMinimize(item)
    }
  }

  const handleFullScreenExitHeader = async (e, item: PopoutProps) => {
    const { ref } = item
    if (ref?.current && !ref.current.contains(e.target)) {
      await setCurrentPopout({})
      await window.localStorage.setItem('pabau_popout_item', JSON.stringify({}))
      await setIsFullScreen(false)
    }
  }

  const handleMinimize = async (item: PopoutProps) => {
    if (!currentPopout.id) {
      // maximize
      await setCurrentPopout(item)
      await window.localStorage.setItem(
        'pabau_popout_item',
        JSON.stringify({
          id: item.id,
          type: item.type,
          clientId: item.clientId,
          title: item.title,
        })
      )
    } else {
      // minimize
      await setCurrentPopout({})
      await window.localStorage.setItem('pabau_popout_item', JSON.stringify({}))
    }
  }

  const renderAvatar = (type: string) => {
    return (
      <div>
        <Avatar src={userAvatar} size={24} />
        {type === 'email' && <TypeEmail className={styles.typeIcon} />}
        {type === 'sms' && <TypeSMS className={styles.typeIcon} />}
        {type === 'letter' && <TypeLetter className={styles.typeIcon} />}
        {type === 'form' && <TypeForm className={styles.typeIcon} />}
      </div>
    )
  }

  const handleFullScreen = async (item: PopoutProps) => {
    await setCurrentPopout(item)
    await window.localStorage.setItem(
      'pabau_popout_item',
      JSON.stringify({
        id: item.id,
        type: item.type,
        clientId: item.clientId,
        title: item.title,
      })
    )
    await setIsFullScreen(true)
  }

  const handleClose = async (item: PopoutProps) => {
    const findIndex = popouts.findIndex((el) => {
      const { id } = el
      return id === item.id
    })
    if (item.id === currentPopout?.id) {
      await setCurrentPopout({})
      await window.localStorage.setItem('pabau_popout_item', JSON.stringify({}))
    }
    const items = [...popouts]
    items.splice(findIndex, 1)
    await setPopouts(items)
    await window.localStorage.setItem(
      'pabau_popout_list',
      JSON.stringify(
        items.map((item) => ({
          id: item.id,
          type: item.type,
          clientId: item.clientId,
          title: item.title,
        }))
      )
    )

    // remove content
    const content = window.localStorage.getItem('pabau_content')
    const contentItems = content ? JSON.parse(content) : []
    const findContentIndex = contentItems.findIndex((el) => el.id === item.id)
    if (findContentIndex >= 0) contentItems.splice(findContentIndex, 1)
    await window.localStorage.setItem(
      'pabau_content',
      JSON.stringify(contentItems)
    )
  }

  useEffect(() => {
    const item = JSON.parse(
      window.localStorage.getItem('pabau_popout_item') || '{}'
    )
    const items = JSON.parse(
      window.localStorage.getItem('pabau_popout_list') || '[]'
    )
    setIsFullScreen(false)
    if (!!item && item.id) {
      setCurrentPopout({ ...item, ref: createRef() })
    } else {
      setCurrentPopout({})
    }
    setPopouts(items.map((item) => ({ ...item, ref: createRef() })))
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const item = JSON.parse(
        window.localStorage.getItem('pabau_popout_item') || '{}'
      )
      const items = JSON.parse(
        window.localStorage.getItem('pabau_popout_list') || '[]'
      )
      const fullScreen = JSON.parse(
        window.localStorage.getItem('pabau_popout_fullscreen') || `${false}`
      )
      setIsFullScreen(fullScreen)
      if (!!item && item.id) {
        setCurrentPopout({ ...item, ref: createRef() })
      } else {
        setCurrentPopout({})
      }
      setPopouts(items.map((item) => ({ ...item, ref: createRef() })))
    }

    window.addEventListener('storage', () => handleStorageChange())
    return window.removeEventListener('storage', () => handleStorageChange())
  }, [])

  return (
    <div className={styles.stickyPopoutContainer}>
      {!isFullScreen &&
        popouts.map((item, index) => (
          <div
            key={`sticky-popout-${index}`}
            className={styles.stickyPopoutItem}
          >
            <div
              className={classNames(
                styles.popoutContainer,
                item.id === currentPopout?.id
                  ? expandedClasses[currentPopout.type || '']
                  : null
              )}
            >
              <div
                className={styles.header}
                onClick={(e) => handleMinimizeHeader(e, item)}
              >
                {renderAvatar(item.type || '')}
                <div>{item.title}</div>
                <div ref={item.ref}>
                  <div
                    className={styles.opsIcon}
                    onClick={() => handleMinimize(item)}
                  >
                    {item.id === currentPopout?.id ? (
                      <Maximize />
                    ) : (
                      <Minimize />
                    )}
                  </div>
                  <div
                    className={styles.opsIcon}
                    onClick={() => handleFullScreen(item)}
                  >
                    <ArrowsAltOutlined />
                  </div>
                  <div
                    className={styles.opsIcon}
                    onClick={() => handleClose(item)}
                  >
                    <CloseOutlined />
                  </div>
                </div>
              </div>
              {item.id === currentPopout?.id && (
                <div className={styles.content}>
                  {item.type === 'sms' && (
                    <SendSMS
                      clientId={item.clientId || ''}
                      id={item.id || ''}
                    />
                  )}
                  {item.type === 'email' && (
                    <SendMail
                      clientId={item.clientId || ''}
                      id={item.id || ''}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      {isFullScreen && currentPopout.id && (
        <Modal
          visible={isFullScreen}
          closable={false}
          footer={null}
          centered
          width="95%"
          wrapClassName={styles.fullScreenPopout}
        >
          <div className={styles.fullScreenPopoutContainer}>
            <div
              className={styles.header}
              onClick={(e) => handleFullScreenExitHeader(e, currentPopout)}
            >
              {renderAvatar(currentPopout.type || '')}
              <div>{currentPopout.title}</div>
              <div ref={currentPopout.ref}>
                <div
                  className={styles.opsIcon}
                  onClick={async () => {
                    setIsFullScreen(false)
                    setCurrentPopout({})
                    await window.localStorage.setItem(
                      'pabau_popout_item',
                      JSON.stringify({})
                    )
                  }}
                >
                  <Minimize />
                </div>
                <div
                  className={styles.opsIcon}
                  onClick={() => {
                    setIsFullScreen(false)
                  }}
                >
                  <ShrinkOutlined />
                </div>
                <div
                  className={styles.opsIcon}
                  onClick={() => {
                    setIsFullScreen(false)
                    handleClose(currentPopout)
                  }}
                >
                  <CloseOutlined />
                </div>
              </div>
            </div>
            <div className={styles.content}>
              {currentPopout.type === 'sms' && (
                <SendSMS
                  clientId={currentPopout.clientId || ''}
                  id={currentPopout.id || ''}
                />
              )}
              {currentPopout.type === 'email' && (
                <SendMail
                  clientId={currentPopout.clientId || ''}
                  id={currentPopout.id || ''}
                />
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default StickyPopout
