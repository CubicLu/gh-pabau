import React, { FC, useState } from 'react'
import { Service } from '../../types/services'
import styles from '../ServicesStep/ServiceSelector.module.less'
import { ReactComponent as SkinHealth } from '../../assets/images/skin-health-logo.svg'
import { Badge, Modal, Popover } from 'antd'
import ClassNames from 'classnames'
import { CheckOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { ReactComponent as LogoSvg } from '../../../../libs/ui/src/lib/logo/logo.svg'
import { useMedia } from 'react-use'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
export interface P {
  service: Service
  closeModalHandler: () => void
}
const ServiceReviewsModal: FC<P> = ({ service, closeModalHandler }) => {
  const [visible, setvisible] = useState(false)
  const [popover, setpopover] = useState(true)
  const isMobile = useMedia('(max-width: 768px)', false)
  const { t } = useTranslationI18()

  return (
    <Modal
      className={styles.consultationModal}
      visible={true}
      footer={null}
      width={682}
      onCancel={closeModalHandler}
    >
      <>
        <div className={styles.logoHeader}> {isMobile && <SkinHealth />}</div>
        <h5 className={styles.modalHeader}>
          {service.name + ' ' + t('connect.onlinebooking.selector.review')}
        </h5>
        <div className={styles.modalSubHeader}>
          <h5>
            {service.Public_SocialSurveyFeedback.length +
              ' ' +
              t('connect.onlinebooking.selector.modal.review')}
          </h5>
          <div className={styles.rightBar}>
            <p>{t('connect.onlinebooking.selector.modal.sort')}:</p>
            <Popover
              overlayClassName={styles.dropMenu}
              content={
                <div
                  className={styles.menu}
                  onClick={() => setvisible(!visible)}
                >
                  <span
                    onClick={() => setpopover(true)}
                    className={ClassNames(
                      styles.list,
                      popover && styles.active
                    )}
                  >
                    <CheckOutlined />{' '}
                    <p>
                      {t('connect.onlinebooking.selector.modal.relevent.first')}
                    </p>
                  </span>
                  <span
                    onClick={() => setpopover(false)}
                    className={ClassNames(
                      styles.list,
                      !popover && styles.active
                    )}
                  >
                    <CheckOutlined />{' '}
                    <p>
                      {t(
                        'connect.onlinebooking.selector.modal.relevent.second'
                      )}
                    </p>
                  </span>
                </div>
              }
              placement="bottomRight"
              trigger="click"
              visible={visible}
            >
              <h6 onClick={() => setvisible(!visible)}>
                {t('connect.onlinebooking.selector.modal.relevent.first')}
                {visible ? <UpOutlined /> : <DownOutlined />}
              </h6>
            </Popover>
          </div>
        </div>

        <div className={styles.modalBody}>
          {service.Public_SocialSurveyFeedback.map((val) => (
            <div className={styles.cardReview} key={val.id}>
              <div className={styles.reviewHeader}>
                {/*<img src={null} className={styles.reviewImg} alt={'nothing'} />*/}
                <span className={styles.reviewName}>{val.feedback_name}</span>
                <div className={styles.reviewRate}>
                  <Badge dot className={styles.dot} />
                  <span
                    className={
                      val.rating === 5
                        ? styles.reviewRateName
                        : val.rating < 2
                        ? styles.reviewRateValue
                        : styles.reviewRatePrice
                    }
                  >
                    {val.rating}/5
                  </span>
                  <Badge dot className={styles.dot} />
                </div>
                <span className={styles.reviewRateMonth}>
                  {val.date} {t('connect.onlinebooking.selector.modal.month')}
                </span>
              </div>
              <p className={styles.reviewDescption}>{val.feedback_comment}</p>
            </div>
          ))}
        </div>
        {isMobile && (
          <div className={styles.footerModal}>
            <p>{t('connect.onlinebooking.footer.data')}</p>
            <LogoSvg style={{ height: '15px', width: '60px' }} />
          </div>
        )}
      </>
    </Modal>
  )
}

export default ServiceReviewsModal
