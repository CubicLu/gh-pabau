import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as EmojiIcon } from '../../assets/images/emoji-icon.svg'
import { ReactComponent as AttachIcon } from '../../assets/images/attach-icon.svg'
import { ReactComponent as Stroke } from '../../assets/images/stroke.svg'
import { ReactComponent as ActiveStoke } from '../../assets/images/stroke-active.svg'
import styles from './ChatInput.module.less'

interface P {
  onMessageType?: () => void
  onMessageSend?: (message: string) => void
}

const ChatInput = (props: P): JSX.Element => {
  const { onMessageSend, onMessageType } = props
  const { t } = useTranslation('common')
  const [message, setMessage] = useState<string>('')

  //TODO: use Formik
  const handleChange = (e) => {
    setMessage(e.target.value)
    onMessageType?.()
  }

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
      ;(e.target as HTMLInputElement).value = ''
      setMessage('')
    }
  }

  const handleSubmit = () => {
    onMessageSend?.(message)
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  //TODO: teach James why this didn't work:
  // useLayoutEffect(() => {
  //   console.log('SETTING FOCUS', inputRef.current)
  //   inputRef.current?.focus()
  // }, [inputRef]) // tried .current and useEffect

  inputRef.current?.focus()

  return (
    <div className={styles.messageInputContainer}>
      <input
        className={styles.messageInput}
        type="text"
        placeholder={t('message.input.placeholder')}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        ref={inputRef}
      />
      <div className={styles.messageSymbol}>
        <div className={styles.messageEmoji}>
          <EmojiIcon />
        </div>
        <div className={styles.messageAttach}>
          <AttachIcon />
        </div>
        <div className={styles.messageStroke}>
          {message ? <ActiveStoke onClick={handleSubmit} /> : <Stroke />}
        </div>
      </div>
    </div>
  )
}

export default ChatInput
