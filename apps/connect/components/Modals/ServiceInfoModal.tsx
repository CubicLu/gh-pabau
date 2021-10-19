import React, { FC } from 'react'
import styles from '../ServicesStep/ServiceSelector.module.less'
import { Modal } from 'antd'
import { Button } from '@pabau/ui'
export interface P {
  closeModalHandler: () => void
}
const ServiceInfoModal: FC<P> = ({ closeModalHandler }) => {
  return (
    <Modal
      className={styles.mainmodal}
      visible={true}
      onCancel={closeModalHandler}
      footer={null}
    >
      <div className={styles.iconDiv}>&nbsp;</div>
      <span className={styles.headerText}>Patch test</span>
      <p className={styles.bodyText}>
        To make sure your skin doesen’t react to the products used in your
        treatment, please book a patch test for at least 48 hours before your
        appointment.
      </p>

      <p className={styles.bodyText}>
        To make sure your skin doesen’t react to the products used in your
        treatment, please book a patch test for at least 48 hours before your
        appointment.
      </p>
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
