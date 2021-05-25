import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Button, Modal, Steps, Typography } from 'antd'
import React, { FC, useState } from 'react'
import styles from './TickerModal.module.less'

const { Step } = Steps

export interface Slide {
  id: number
  title: string
  description?: string
  image?: string
}

export interface TickerModalProps {
  show: boolean
  title: string
  selectedItem?: number
  slides: Slide[]
}

export const TickerModal: FC<TickerModalProps> = ({
  show,
  title,
  selectedItem,
  slides,
}) => {
  const [visible, setVisible] = useState(show)
  const [selectedSlide, setSelectedSlide] = useState(
    selectedItem ? selectedItem : 0
  )
  const { Title } = Typography

  const onChange = (e) => {
    setSelectedSlide(e)
  }

  const onClose = () => {
    setVisible(false)
  }

  const onNext = () => {
    if (selectedSlide === slides.length - 1) {
      onClose()
      return
    }

    setSelectedSlide((e) => (e = e + 1))
  }

  const onPrev = () => {
    if (selectedSlide === 0) return

    setSelectedSlide((e) => (e = e - 1))
  }

  return (
    <Modal visible={visible} title={title} onCancel={onClose} footer={null}>
      <div className={styles.content}>
        <div className={styles.image}>
          <img
            src={slides[selectedSlide].image}
            alt={slides[selectedSlide].title}
          />
        </div>
        <div className={styles.details}>
          <Title level={4}>{slides[selectedSlide].title}</Title>
          <p>{slides[selectedSlide].description}</p>
        </div>
        <div className={styles.slides}>
          <Steps progressDot current={selectedSlide} onChange={onChange}>
            {slides.map((e, i) => {
              return <Step key={i} />
            })}
          </Steps>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          {selectedSlide !== 0 && (
            <Button onClick={onPrev}>
              <ArrowLeftOutlined /> Previous
            </Button>
          )}
        </div>
        <div></div>
        <div>
          <Button onClick={onClose}>Skip Tour</Button>
          <Button style={{ marginLeft: 10 }} type="primary" onClick={onNext}>
            Next
            <ArrowRightOutlined />
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default TickerModal
