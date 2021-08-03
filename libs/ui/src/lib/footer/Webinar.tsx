import React, { FC, useState } from 'react'
import styles from './Footer.module.less'
import { Button, WebinarModal, WebinarModalProps } from '@pabau/ui'
import { PlayCircleOutlined } from '@ant-design/icons'
import BackgroundImage from '../../assets/images/footer.png'
import { useTranslation } from 'react-i18next'

export const Webinar: FC = () => {
  const { t } = useTranslation('common')
  const [isOpenModal, setIsOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<WebinarModalProps>()

  const handleOpenModal = () => {
    const selectedData: WebinarModalProps = {
      id: 34324,
      description:
        'This training session is to kick start your Pabau jorney, suitable for anyone starting off with the system, fron desh, practioers and anyone who nneds to know how to book. It covers all the core features you will need on a daily basisss, to ensure you are able to work at ease with the system.',
      course_id: 32,
      webinar_id: 546,
      name: 'Alexander Turner ',
      title: 'Stock Management',
      duration: 60,
      time: 'Tuesday, 15 10:00 AM',
      backgroundImage: BackgroundImage,
      buttonType: 'join',
      registered_id: 0,
    }
    setModalData(selectedData)
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className={styles.webinarBannerEnd}>
        <div>
          <div className={styles.footerHeading}>
            <h1>{t('webinar-header-recomended-webinar')}</h1>
          </div>
          <div className={styles.webinarBox} style={{ marginTop: '12px' }}>
            <div className={styles.webinarBanner}> </div>
            <div className={styles.webinarText}>
              <p>Stock Management</p>
              <h6>
                Alexander Turner <br /> Getting Started
              </h6>
              <h5>Tuesday, 15 10:00 AM</h5>
              <h4> 18:28 elapsed </h4>
              <div className={styles.joinBtnTopSpace}>
                <Button
                  className={styles.joinBtn}
                  icon={<PlayCircleOutlined />}
                  onClick={() => handleOpenModal()}
                >
                  Join class
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WebinarModal
        visible={isOpenModal}
        id={modalData?.id || 0}
        name={modalData?.name || ''}
        description={modalData?.description || ''}
        time={modalData?.time || ''}
        registered_id={modalData?.registered_id}
        buttonType={
          modalData?.buttonType ||
          (modalData?.registered_id ? 'join' : 'register')
        }
        course_id={modalData?.course_id || 0}
        webinar_id={modalData?.webinar_id || 0}
        title={modalData?.title || ''}
        duration={modalData?.duration || 0}
        onCancel={handleCloseModal}
      />
    </>
  )
}

export default Webinar
