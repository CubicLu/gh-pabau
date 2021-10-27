import { ClearOutlined, EditOutlined } from '@ant-design/icons'
import cn from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import styles from './FormComponent.module.less'

enum DrawingButtonType {
  DRAWING = 0,
  ERASE = 1,
}

interface P {
  title: string
  desc: string
  txtInputType: string
  signData: string
  required: boolean
  onChangeTextValue?: (value: string) => void
}
export const FormSignature: FC<P> = ({
  title = '',
  desc = '',
  signData = '',
  txtInputType = 'client',
  required = false,
  onChangeTextValue,
}) => {
  const [activeButton, setActiveButton] = useState(0)
  const sigPad = React.useRef<SignatureCanvas | null>(null)
  const SIGNATURE_PAD_WIDTH = 510
  const SIGNATURE_PAD_HEIGHT = 157

  useEffect(() => {
    sigPad.current.fromDataURL(signData, {
      width: SIGNATURE_PAD_WIDTH,
      height: SIGNATURE_PAD_HEIGHT,
      className: 'sigCanvas',
    })
  }, [signData])

  const handleClear = () => {
    setActiveButton(DrawingButtonType.ERASE)
    onChangeTextValue?.('')
    sigPad.current.clear()
    setActiveButton(DrawingButtonType.DRAWING)
  }

  const handleEnd = () => {
    onChangeTextValue?.(
      sigPad.current.getTrimmedCanvas().toDataURL('image/png', {
        width: SIGNATURE_PAD_WIDTH,
        height: SIGNATURE_PAD_HEIGHT,
      })
    )
  }

  return (
    <div className={`${styles.formSignature} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentChoiceDescription}>{desc}</div>
      )}
      <div className={styles.formSignaturePanel}>
        <div className={styles.formSignatureBody}>
          <div className={styles.formSignatureToolbar}>
            <span
              onClick={() => {
                setActiveButton(DrawingButtonType.DRAWING)
              }}
              className={cn(
                styles.formSignatureToolbarButton,
                activeButton === DrawingButtonType.DRAWING ? styles.active : ''
              )}
            >
              <EditOutlined />
            </span>
            <span
              onClick={handleClear}
              className={cn(
                styles.formSignatureToolbarButton,
                activeButton === DrawingButtonType.ERASE ? styles.active : ''
              )}
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
    </div>
  )
}

export default FormSignature
