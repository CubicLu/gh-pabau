import {
  ArrowsAltOutlined,
  CloseOutlined,
  PlusOutlined,
  ShrinkOutlined,
} from '@ant-design/icons'
import { Button } from '@pabau/ui'
import { Avatar, Modal, Popover } from 'antd'
import classNames from 'classnames'
import React, { createRef, RefObject, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as Maximize } from '../../assets/images/popout/maximize.svg'
import { ReactComponent as Minimize } from '../../assets/images/popout/minimize.svg'
import { ReactComponent as TypeEmail } from '../../assets/images/popout/TypeEmail.svg'
import { ReactComponent as TypeForm } from '../../assets/images/popout/TypeForm.svg'
import { ReactComponent as TypeLetter } from '../../assets/images/popout/TypeLetter.svg'
import { ReactComponent as TypeSMS } from '../../assets/images/popout/TypeSMS.svg'
import SendMail from '../PopoutInnerComponents/SendMail'
import SendSMS from '../PopoutInnerComponents/SendSMS'
import styles from './StickyPopout.module.less'

interface PopoutProps {
  id: string
  type: string
  clientId: string
  title: string
  ref: RefObject<HTMLDivElement>
}

const StickyPopout = (props) => {
  const [popouts, setPopouts] = useState<PopoutProps[]>([])
  const [currentPopout, setCurrentPopout] = useState<PopoutProps>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const expandedClasses = {
    form: styles.expandedForm,
    email: styles.expandedEmail,
    sms: styles.expandedSMS,
    letter: styles.expandedLetter,
  }
  const plusButtonContent = (
    <div className={styles.plusContentItems}>
      <div
        className={styles.plusContentItem}
        onClick={() => handleCreatePopout('email')}
      >
        Email
      </div>
      <div
        className={styles.plusContentItem}
        onClick={() => handleCreatePopout('form')}
      >
        Form
      </div>
      <div
        className={styles.plusContentItem}
        onClick={() => handleCreatePopout('sms')}
      >
        SMS
      </div>
      <div
        className={styles.plusContentItem}
        onClick={() => handleCreatePopout('email')}
      >
        Letter
      </div>
    </div>
  )

  const handleCreatePopout = (type) => {
    let item: PopoutProps = null
    switch (type) {
      case 'sms': {
        item = {
          type,
          title: 'Create an SMS',
          id: uuidv4(),
          clientId: '',
          ref: createRef(),
        }
        break
      }
      case 'email': {
        item = {
          type,
          title: 'New mail',
          id: uuidv4(),
          clientId: '',
          ref: createRef(),
        }
        break
      }
      case 'letter': {
        item = {
          type,
          title: 'Create a letter',
          id: uuidv4(),
          clientId: '',
          ref: createRef(),
        }
        break
      }
      case 'form': {
        item = {
          type,
          title: 'Create a form',
          id: uuidv4(),
          clientId: '',
          ref: createRef(),
        }
        break
      }
    }
    const items = [...popouts, item]
    setPopouts(items)
    setCurrentPopout(item)
    setIsFullScreen(false)
    window.localStorage.setItem(
      'pabau_popouts',
      JSON.stringify(
        items.map((item) => ({
          id: item.id,
          type: item.type,
          clientId: item.clientId,
          title: item.title,
        }))
      )
    )
    window.localStorage.setItem(
      'pabau_popout',
      JSON.stringify({
        id: item.id,
        type: item.type,
        clientId: item.clientId,
        title: item.title,
      })
    )
  }

  const handleMinimizeHeader = (e, item: PopoutProps) => {
    const { ref } = item
    if (ref?.current && !ref.current.contains(e.target)) {
      handleMinimize(item)
    }
  }

  const handleFullScreenExitHeader = (e, item: PopoutProps) => {
    const { ref } = item
    if (ref?.current && !ref.current.contains(e.target)) {
      setCurrentPopout(null)
      setIsFullScreen(false)
    }
  }

  const handleMinimize = (item: PopoutProps) => {
    if (!currentPopout) {
      setCurrentPopout(item)
      window.localStorage.setItem(
        'pabau_popout',
        JSON.stringify({
          id: item.id,
          type: item.type,
          clientId: item.clientId,
          title: item.title,
        })
      )
    } else {
      setCurrentPopout(null)
      window.localStorage.removeItem('pabau_popout')
    }
  }

  const handleFullScreen = (item: PopoutProps) => {
    setCurrentPopout(item)
    setIsFullScreen(true)
  }

  const handleClose = (item: PopoutProps) => {
    const findIndex = popouts.findIndex((el) => {
      const { id } = el
      return id === item.id
    })
    if (item.id === currentPopout?.id) {
      setCurrentPopout(null)
      window.localStorage.removeItem('pabau_popout')
    }
    const items = [...popouts]
    items.splice(findIndex, 1)
    setPopouts(items)
    window.localStorage.setItem(
      'pabau_popouts',
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
    window.localStorage.setItem('pabau_content', JSON.stringify(contentItems))
  }

  useEffect(() => {
    const items = window.localStorage.getItem('pabau_popouts')
    const item = window.localStorage.getItem('pabau_popout')
    if (items) {
      const popouts = JSON.parse(items).map((item) => ({
        ...item,
        ref: createRef(),
      }))
      setPopouts(popouts)
    } else {
      setPopouts([])
    }
    if (item) {
      const popout = JSON.parse(item)
      setCurrentPopout({ ...popout, ref: createRef() })
    } else {
      setCurrentPopout(null)
    }
  }, [])

  return (
    <div className={styles.stickyPopoutContainer}>
      {!isFullScreen &&
        popouts?.map((item, index) => (
          <div
            key={`sticky-popout-${index}`}
            className={styles.stickyPopoutItem}
          >
            <div
              className={classNames(
                styles.popoutContainer,
                item.id === currentPopout?.id
                  ? expandedClasses[currentPopout.type]
                  : null
              )}
            >
              <div
                className={styles.header}
                onClick={(e) => handleMinimizeHeader(e, item)}
              >
                <div>
                  <Avatar
                    src="https://s3-alpha-sig.figma.com/img/17e2/36e7/792198289a82e561e94182d98c766598?Expires=1619395200&Signature=T1UEfxtSEhkbefmOTqgK9JAL5RMOzUxuxNyFIYdmAA~kndYNlFpKh5Y9xmm5wzhP-ccfFfe7Hyjds8g8GOr1W4nn0vNI5vwUEprGlk4qSuP90Jy0HuEh9xhIMKkZ2QatwF0I0K9sg8fIO4tyqgSYSwFoA-KQjLgvpupSuXmYJ1cytd9HIrD7xptirfJFA2lj726VgDDPitAz1nX7eqm0lyNGj52ecle~OtPD1bXqR~CPGoAI3tjd8CNYYYfojB5mUgamLxWp1bG8enN43lYUQCWBrjkQB6Y~Ot~6n8b605a6ntIpDUFuF3P7Oc5Xw~GnHTvvfjMv0yC5InZnS~KaPA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                    size={24}
                  />
                  {item.type === 'email' && (
                    <TypeEmail className={styles.typeIcon} />
                  )}
                  {item.type === 'sms' && (
                    <TypeSMS className={styles.typeIcon} />
                  )}
                  {item.type === 'letter' && (
                    <TypeLetter className={styles.typeIcon} />
                  )}
                  {item.type === 'form' && (
                    <TypeForm className={styles.typeIcon} />
                  )}
                </div>
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
                    <SendSMS clientId={item.clientId} id={item.id} />
                  )}
                  {item.type === 'email' && (
                    <SendMail clientId={item.clientId} id={item.id} />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      {isFullScreen && currentPopout && (
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
              <div>
                <Avatar
                  src="https://s3-alpha-sig.figma.com/img/17e2/36e7/792198289a82e561e94182d98c766598?Expires=1619395200&Signature=T1UEfxtSEhkbefmOTqgK9JAL5RMOzUxuxNyFIYdmAA~kndYNlFpKh5Y9xmm5wzhP-ccfFfe7Hyjds8g8GOr1W4nn0vNI5vwUEprGlk4qSuP90Jy0HuEh9xhIMKkZ2QatwF0I0K9sg8fIO4tyqgSYSwFoA-KQjLgvpupSuXmYJ1cytd9HIrD7xptirfJFA2lj726VgDDPitAz1nX7eqm0lyNGj52ecle~OtPD1bXqR~CPGoAI3tjd8CNYYYfojB5mUgamLxWp1bG8enN43lYUQCWBrjkQB6Y~Ot~6n8b605a6ntIpDUFuF3P7Oc5Xw~GnHTvvfjMv0yC5InZnS~KaPA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                  size={24}
                />
                {currentPopout.type === 'email' && (
                  <TypeEmail className={styles.typeIcon} />
                )}
                {currentPopout.type === 'sms' && (
                  <TypeSMS className={styles.typeIcon} />
                )}
                {currentPopout.type === 'letter' && (
                  <TypeLetter className={styles.typeIcon} />
                )}
                {currentPopout.type === 'form' && (
                  <TypeForm className={styles.typeIcon} />
                )}
              </div>
              <div>{currentPopout.title}</div>
              <div ref={currentPopout.ref}>
                <div
                  className={styles.opsIcon}
                  onClick={() => {
                    setIsFullScreen(false)
                    setCurrentPopout(null)
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
                  clientId={currentPopout.clientId}
                  id={currentPopout.id}
                />
              )}
              {currentPopout.type === 'email' && (
                <SendMail
                  clientId={currentPopout.clientId}
                  id={currentPopout.id}
                />
              )}
            </div>
          </div>
        </Modal>
      )}
      <div className={styles.stickyPopoutItem}>
        <Popover
          placement="topRight"
          content={plusButtonContent}
          overlayClassName={styles.plusButtonContent}
          trigger="click"
        >
          <Button type="primary" className={styles.createButton}>
            <PlusOutlined />
          </Button>
        </Popover>
      </div>
    </div>
  )
}

export default StickyPopout
