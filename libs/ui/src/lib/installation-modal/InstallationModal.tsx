import React, { FC } from 'react'
import { Modal } from 'antd'
import { Button } from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ModalImage } from '../../assets/images/installationModalImage.svg'
import { ReactComponent as ModalWindowImage } from '../../assets/images/installationModalWindowImage.svg'

import styles from './InstallationModal.module.less'

interface WorksWith {
  key: number
  title: string
  subTitle: string
  logoImage: string
}

export interface InstallationModalProps {
  visible?: boolean
  logo: string
  title: string
  description: string
  longDescription?: string
  mobileViewDescription?: string
  webViewDescription?: string
  installationModalImage?: JSX.Element
  installationModalWindowImage?: JSX.Element
  installed?: number
  onCancel?: () => void
  onSubmit?: () => void
  worksWith?: WorksWith[]
  categories?: string[]
}

export const InstallationModal: FC<InstallationModalProps> = ({
  visible,
  title,
  logo,
  description,
  longDescription,
  mobileViewDescription,
  webViewDescription,
  installationModalImage = <ModalImage />,
  installationModalWindowImage = <ModalWindowImage />,
  installed,
  onCancel,
  onSubmit,
  worksWith,
  categories,
}) => {
  const { t } = useTranslation('common')
  let buttonType = t('integration.installation.modal.install.button')
  if (installed === 1) {
    buttonType = t('integration.installation.modal.uninstall.button')
  }
  return (
    <Modal
      visible={visible}
      footer={null}
      centered={true}
      className={styles.installationModal}
      onCancel={() => onCancel?.()}
    >
      <div className={styles.headerWeb}>
        <img alt={title + '- logo image'} src={logo} />
        <h1>{title}</h1>
      </div>
      <div className={styles.textWrapper}>
        <p>{description}</p>
        <Button type="primary" onClick={onSubmit}>
          {buttonType}
        </Button>
      </div>
      <div className={styles.serviceWrapper}>
        <div className={styles.head}>
          <h3>{t('integration.installation.model.works')}</h3>
          <div className={styles.serviceBoxWrapper}>
            {worksWith?.map((value) => (
              <div className={styles.serviceBox} key={value.key}>
                <span className={styles.circle}>
                  <img src={value.logoImage} alt={value.title} />
                </span>
                <div className={styles.serviceText}>
                  <h4>{value.title}</h4>
                  <p>{value.subTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.categories}>
          <h2>{t('integration.installation.categories')}</h2>
          <div className={styles.catList}>
            {categories?.map((value, key) => (
              <p key={key}>{value}</p>
            ))}
          </div>
          <div className={styles.linkList}>
            <a
              href="https://prelive-crm.new.pabau.com/"
              target="_blank"
              rel="noreferrer"
            >
              {t('integration.term.of.services')}
            </a>
            <a
              href="https://prelive-crm.new.pabau.com/"
              target="_blank"
              rel="noreferrer"
            >
              {t('integration.privacy.policy')}
            </a>
          </div>
        </div>
      </div>
      <div className={styles.testimonialText}>
        <div className={styles.para}>
          <p>{longDescription}</p>
          <a
            href="https://prelive-crm.new.pabau.com/"
            target="_blank"
            rel="noreferrer"
          >
            {t('integration.about.app')}
          </a>
        </div>
      </div>
      <div className={styles.driveWrapper}>
        <div className={styles.conversationWrapper}>
          <div className={styles.imgWrap}>{installationModalImage}</div>
          <div className={styles.imgRightText}>
            <h2>{t('integration.webinar.registration')}</h2>
            <p>{mobileViewDescription}</p>
          </div>
        </div>
        <div className={styles.conversationWrapper}>
          <div className={styles.imgWrap}>{installationModalWindowImage}</div>
          <div className={styles.imgRightText}>
            <h2>{t('integration.webinar.details.conversation')}</h2>
            <p>{webViewDescription}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default InstallationModal
