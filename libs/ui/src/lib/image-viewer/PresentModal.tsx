import React, { FC, useState, useEffect } from 'react'
import cn from 'classnames'
import { useMedia } from 'react-use'
import { toCanvas } from 'html-to-image'
import { Modal as AntModal } from 'antd'
import { ComparingMode } from '@pabau/ui'
import { CloseOutlined } from '@ant-design/icons'
import styles from './PresentModal.module.less'

export interface PresentModalProps {
  visible: boolean
  comparingMode: ComparingMode
  onClose: () => void
}

const PresentModalComponent: FC<PresentModalProps> = ({
  visible,
  onClose,
  comparingMode,
}) => {
  const isMobile = useMedia('(max-width: 767px)', false)
  const [imageData, setImageData] = useState('')
  const [load, setLoad] = useState(false)

  const isWidthFit = () => {
    if (comparingMode === ComparingMode['progress-gallery']) {
      return true
    }
    if (isMobile) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    setLoad(true)
    toCanvas(
      document.querySelector(`#image-viewer-container`) as HTMLElement
    ).then((_) => {
      toCanvas(
        document.querySelector(`#image-viewer-container`) as HTMLElement
      ).then((canvas) => {
        const screenshotData = canvas.toDataURL()
        setImageData(screenshotData)
        setLoad(false)
      })
    })
  }, [])
  return (
    <AntModal
      visible={visible}
      closable={false}
      footer={null}
      width={'100%'}
      wrapClassName={styles.presentModal}
    >
      <div className={styles.presentModalContainer}>
        <div className={styles.closeBtn} onClick={onClose}>
          <CloseOutlined />
        </div>
        {!load && imageData && (
          <div
            className={cn(
              styles.presentView,
              isWidthFit() ? styles.widthFit : styles.heightFit
            )}
            style={{ backgroundImage: `url(${isWidthFit() ? '' : imageData})` }}
          >
            {isWidthFit() && <img src={imageData} alt="present" />}
          </div>
        )}
      </div>
    </AntModal>
  )
}

export const PresentModal: FC<PresentModalProps> = (props) => {
  const { visible } = props

  return visible ? <PresentModalComponent {...props} /> : <div />
}

export default PresentModal
