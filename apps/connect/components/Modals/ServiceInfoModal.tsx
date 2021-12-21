import React, { FC } from 'react'
import styles from '../ServicesStep/ServiceSelector.module.less'
import { Modal } from 'antd'
import { Button } from '@pabau/ui'
export interface P {
  closeModalHandler: () => void
  info: string
}
const ServiceInfoModal: FC<P> = ({ closeModalHandler, info }) => {
  return (
    <Modal
      className={styles.mainmodal}
      visible={true}
      onCancel={closeModalHandler}
      footer={null}
    >
      <div className={styles.iconDiv}>&nbsp;</div>
      <p className={styles.bodyText}>{info}</p>
      <Button
        className={styles.footerBtn}
        type={'primary'}
        onClick={closeModalHandler}
      >
        I understand
      </Button>
    </Modal>
  )
}

export default ServiceInfoModal
