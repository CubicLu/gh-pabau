import React, { FC } from 'react'
import { Button, BasicModal } from '@pabau/ui'
import styles from './GpSearch.module.less'
import { ReactComponent as SuccessIcon } from '../../assets/images/success-mark.svg'
import { CheckOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

export interface SuccessModalModalProps {
  onCancel?: () => void
  visible?: boolean
}

export const SuccessModal: FC<SuccessModalModalProps> = ({
  onCancel,
  visible,
}) => {
  const { t } = useTranslation('common')

  return (
    <div>
      <BasicModal
        onCancel={onCancel}
        visible={visible}
        className={styles.successModal}
        width={416}
        footer={false}
        closable={false}
      >
        <div className={styles.successForm}>
          <div className={styles.successIcon}>
            <SuccessIcon />
          </div>
          <h6>{t('ui.gp-search.sucessModal.sucessHeading')}</h6>
          <div className={styles.successMsg}>
            {t('ui.gp-search.sucessModal.sucessMessage')}
          </div>
          <div className={styles.successApproval}>
            <div className={styles.successApprovalMsg}>
              {t('ui.gp-search.sucessModal.successApprovalMsg')}
            </div>
            <ul>
              <li>
                <CheckOutlined />
                {t('ui.gp-search.sucessModal.messageYourGP')}
              </li>
              <li>
                <CheckOutlined />
                {t('ui.gp-search.sucessModal.SharemedicalRecord')}
              </li>
              <li>
                <CheckOutlined />
                {t('ui.gp-search.sucessModal.bookGpAppointments')}
              </li>
              <li>
                <CheckOutlined />
                {t('Refer')}
              </li>
            </ul>
          </div>
          <Button
            type={'primary'}
            size="large"
            className={styles.successBtnGreat}
            onClick={onCancel}
          >
            {t('ui.gp-search.sucessModal.great')}
          </Button>
        </div>
      </BasicModal>
    </div>
  )
}

export default SuccessModal
