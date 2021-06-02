import { ClearOutlined } from '@ant-design/icons'
import React, { FC, useEffect } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import styles from './Setting.module.less'

interface P {
  signData: string
  onChangeSign: (value: string) => void
}

const SettingElementSignature: FC<P> = ({ signData, onChangeSign }) => {
  const sigPad = React.useRef<SignatureCanvas | null>(null)
  const SIGNATURE_PAD_WIDTH = 334
  const SIGNATURE_PAD_HEIGHT = 157
  useEffect(() => {
    sigPad.current.clear()
    sigPad.current.fromDataURL(signData, {
      width: SIGNATURE_PAD_WIDTH,
      height: SIGNATURE_PAD_HEIGHT,
      className: 'sigCanvas',
    })
  }, [signData])

  const handleClear = () => {
    onChangeSign?.('')
    sigPad.current.clear()
  }

  const handleEnd = () => {
    onChangeSign?.(
      sigPad.current.getTrimmedCanvas().toDataURL('image/png', {
        width: SIGNATURE_PAD_WIDTH,
        height: SIGNATURE_PAD_HEIGHT,
      })
    )
  }

  return (
    <div className={styles.formSignaturePanel}>
      <div className={styles.formSignatureBody}>
        <div className={styles.formSignatureToolbar}>
          <span
            onClick={handleClear}
            className={styles.formSignatureToolbarButton}
          >
            <ClearOutlined />
          </span>
        </div>
        <div className={styles.formSignatureArea}>
          <SignatureCanvas
            ref={sigPad}
            penColor="black"
            canvasProps={{
              width: SIGNATURE_PAD_WIDTH,
              height: SIGNATURE_PAD_HEIGHT,
              className: 'sigCanvas',
            }}
            onEnd={handleEnd}
          />
        </div>
      </div>
    </div>
  )
}

export default SettingElementSignature
