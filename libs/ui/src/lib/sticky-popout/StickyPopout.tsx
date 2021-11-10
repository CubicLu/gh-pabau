import {
  ArrowsAltOutlined,
  CloseOutlined,
  ShrinkOutlined,
} from '@ant-design/icons'
import { Avatar, Modal } from 'antd'
import classNames from 'classnames'
import { useMedia } from 'react-use'
import React, { FC, createRef, RefObject, useEffect, useState } from 'react'
import { ReactComponent as Maximize } from '../../assets/images/popout/maximize.svg'
import { ReactComponent as Minimize } from '../../assets/images/popout/minimize.svg'
import { ReactComponent as TypeEmail } from '../../assets/images/popout/TypeEmail.svg'
import { ReactComponent as TypeForm } from '../../assets/images/popout/TypeForm.svg'
import { ReactComponent as TypeLetter } from '../../assets/images/popout/TypeLetter.svg'
import { ReactComponent as TypeSMS } from '../../assets/images/popout/TypeSMS.svg'
import { ReactComponent as TypeCall } from '../../assets/images/popout/TypeCall.svg'
import { ReactComponent as TypePrescription } from '../../assets/images/popout/TypePrescription.svg'
import { ReactComponent as TypeVoiceNote } from '../../assets/images/popout/TypeVoiceNote.svg'
import { SendMail, SendSMS, SelectForm, CreatePrescription } from '@pabau/ui'
import userAvatar from '../../assets/images/users/austin.png'
import styles from './StickyPopout.module.less'
import CreateCall from '../create-call/CreateCall'
// import CreateVoiceNote from '../create-voice-note/CreateVoiceNote'

interface PopoutProps {
  receiverData?: string
  type?: string
  client?: {
    id: string
    name: string
    email: string
  }
  title?: string
  ref?: RefObject<HTMLDivElement>
}

const defaultClient = {
  id: '',
  name: 'Bruno Ballardin',
  email: 'bruno.ballardin@example.com',
}

export const StickyPopout: FC = () => {
  const isMobile = useMedia('(max-width: 767px)', false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [popouts, setPopouts] = useState<PopoutProps[]>([])
  const [currentPopout, setCurrentPopout] = useState<PopoutProps>({})
  const [currentStep, setCurrentStep] = useState(1)
  const expandedClasses = {
    prescription: styles.expandedPrescription,
    treatment: styles.expandedForm,
    consent: styles.expandedForm,
    form: styles.expandedForm,
    email: styles.expandedEmail,
    sms: styles.expandedSMS,
    letter: styles.expandedLetter,
    call: styles.expandedCall,
    voiceNote: styles.expandedVoiceNote,
  }

  const handleMinimizeHeader = (e, item: PopoutProps) => {
    const { ref } = item
    if (ref?.current && !ref.current.contains(e.target)) {
      handleMinimize(item)
    }
  }

  const handleFullScreenExitHeader = async (e, item: PopoutProps) => {
    const { ref } = item
    if (!isMobile && ref?.current && !ref.current.contains(e.target)) {
      await setCurrentPopout({})
      await window.localStorage.setItem('pabau_popout_item', JSON.stringify({}))
      await setIsFullScreen(false)
    }
  }

  const handleMinimize = async (item: PopoutProps) => {
    if (!currentPopout.receiverData) {
      // maximize
      await setCurrentPopout(item)
      await window.localStorage.setItem(
        'pabau_popout_item',
        JSON.stringify({
          receiverData: item.receiverData,
          type: item.type,
          client: item.client,
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
        {type === 'call' && <TypeCall className={styles.typeIcon} />}
        {type === 'prescription' && (
          <TypePrescription className={styles.typeIcon} />
        )}
        {type === 'voiceNote' && <TypeVoiceNote className={styles.typeIcon} />}
      </div>
    )
  }

  const handleFullScreen = async (item: PopoutProps) => {
    await setCurrentPopout(item)
    await window.localStorage.setItem(
      'pabau_popout_item',
      JSON.stringify({
        receiverData: item.receiverData,
        type: item.type,
        client: item.client,
        title: item.title,
      })
    )
    await setIsFullScreen(true)
  }

  const handleClose = async (item: PopoutProps) => {
    setCurrentStep(1)
    const findIndex = popouts.findIndex((el) => {
      const { receiverData } = el
      return receiverData === item.receiverData
    })
    if (item.receiverData === currentPopout?.receiverData) {
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
          recieverData: item.receiverData,
          type: item.type,
          client: item.client,
          title: item.title,
        }))
      )
    )

    // remove content
    const content = window.localStorage.getItem('pabau_content')
    const contentItems = content ? JSON.parse(content) : []
    const findContentIndex = contentItems.findIndex(
      (el) => el.receiverData === item.receiverData
    )
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
    if (!!item && item.receiverData) {
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
      // const fullScreen = JSON.parse(
      //   window.localStorage.getItem('pabau_popout_fullscreen') || `${false}`
      // )
      // setIsFullScreen(fullScreen)
      if (!!item && item.type === 'treatment') {
        setIsFullScreen(true)
      }
      if (!!item && item.receiverData) {
        setCurrentPopout({ ...item, ref: createRef() })
      } else {
        setCurrentPopout({})
      }
      setPopouts(items.map((item) => ({ ...item, ref: createRef() })))
    }

    window.addEventListener('storage', () => handleStorageChange())
    // eslint-disable-next-line unicorn/no-invalid-remove-event-listener
    return window.removeEventListener('storage', () => handleStorageChange())
  }, [])

  return (
    <div className={styles.stickyPopoutContainer}>
      {!isMobile &&
        !isFullScreen &&
        popouts.map((item, index) => (
          <div
            key={`sticky-popout-${index}`}
            className={styles.stickyPopoutItem}
          >
            <div
              className={classNames(
                styles.popoutContainer,
                item.receiverData === currentPopout?.receiverData
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
                    {item.receiverData === currentPopout?.receiverData ? (
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
              {item.receiverData === currentPopout?.receiverData && (
                <div className={styles.content}>
                  {item.type === 'sms' && (
                    <SendSMS
                      client={item.client || defaultClient}
                      receiverData={item.receiverData || ''}
                    />
                  )}
                  {item.type === 'email' && (
                    <SendMail
                      client={item.client || defaultClient}
                      receiverData={item.receiverData || ''}
                      onSend={() => handleClose(item)}
                    />
                  )}
                  {item.type === 'call' && (
                    <CreateCall
                      currentStep={currentStep}
                      setCurrentStep={setCurrentStep}
                    />
                  )}
                  {item.type === 'treatment' && (
                    <SelectForm
                      client={item.client || defaultClient}
                      receiverData={item.receiverData || ''}
                      type={item.type}
                    />
                  )}
                  {item.type === 'consent' && (
                    <SelectForm
                      client={item.client || defaultClient}
                      receiverData={item.receiverData || ''}
                      type={item.type}
                    />
                  )}
                  {item.type === 'prescription' && (
                    <CreatePrescription
                      client={item.client || defaultClient}
                      receiverData={item.receiverData || ''}
                    />
                  )}
                  {/* {item.type === 'voiceNote' && <CreateVoiceNote />} */}
                </div>
              )}
            </div>
          </div>
        ))}
      {(isFullScreen || isMobile) && currentPopout.receiverData && (
        <Modal
          visible={isFullScreen || isMobile}
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
                {!isMobile && (
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
                )}
                {!isMobile && (
                  <div
                    className={styles.opsIcon}
                    onClick={() => {
                      setIsFullScreen(false)
                    }}
                  >
                    <ShrinkOutlined />
                  </div>
                )}
                <div
                  className={styles.opsIcon}
                  onClick={() => {
                    setCurrentStep(1)
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
                  client={currentPopout.client || defaultClient}
                  receiverData={currentPopout.receiverData || ''}
                />
              )}
              {currentPopout.type === 'email' && (
                <SendMail
                  client={currentPopout.client || defaultClient}
                  receiverData={currentPopout.receiverData || ''}
                  onSend={() => {
                    setIsFullScreen(false)
                    handleClose(currentPopout)
                  }}
                />
              )}
              {currentPopout.type === 'treatment' && (
                <SelectForm
                  client={currentPopout.client || defaultClient}
                  receiverData={currentPopout.receiverData || ''}
                  type={currentPopout.type}
                />
              )}
              {currentPopout.type === 'consent' && (
                <SelectForm
                  client={currentPopout.client || defaultClient}
                  receiverData={currentPopout.receiverData || ''}
                  type={currentPopout.type}
                />
              )}
              {currentPopout.type === 'prescription' && (
                <CreatePrescription
                  client={currentPopout.client || defaultClient}
                  receiverData={currentPopout.receiverData || ''}
                />
              )}
              {/* {currentPopout.type === 'voiceNote' && <CreateVoiceNote />} */}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default StickyPopout
