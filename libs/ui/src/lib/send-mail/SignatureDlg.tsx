import React, { FC, useState, useRef } from 'react'
import {
  BasicModal as Modal,
  Button,
  InputHtmlWithTags,
  ProposeTime,
} from '@pabau/ui'
import styles from './SignatureDlg.module.less'

export interface SignatureDlgProps {
  visible: boolean
  defautlValue: string
  onChange: (value: string) => void
  onClose: () => void
}

const SignatureDlgComponent: FC<SignatureDlgProps> = ({
  visible,
  defautlValue,
  onChange,
  onClose,
}) => {
  const inputRef = useRef<HTMLDivElement>(null)
  const [signature, setSignature] = useState('')
  return (
    <Modal
      title={'Email Signature'}
      visible={visible}
      centered
      footer={false}
      width={714}
      onCancel={() => onClose()}
    >
      <div className={styles.emailSignatureModal}>
        <div className={styles.description}>
          An email signature is added to the end of email massage. You can
          include your name and job title, contact information, or ever your
          company logo. Changes are applied only to new email messages.
        </div>
        <div className={styles.signInputContainer} ref={inputRef}>
          <InputHtmlWithTags
            placeholder={''}
            onChange={(value) => setSignature(value)}
            value={''}
            valueWithTag={signature}
            disabledTags={[]}
            maxWidth={inputRef.current?.offsetWidth || 0 - 20}
            maxHeight={inputRef.current?.offsetHeight || 0 - 20}
          />
        </div>
        <div className={styles.signInputOpsContainer}>
          <div className={styles.proposeTimeContainer}>
            <ProposeTime
              onSelected={(value) => setSignature(signature + value)}
            />
          </div>
          <Button type="primary" onClick={() => onChange(signature)}>
            Create
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export const SignatureDlg: FC<SignatureDlgProps> = (props) => {
  const { visible } = props
  return visible ? <SignatureDlgComponent {...props} /> : null
}

export default SignatureDlg
