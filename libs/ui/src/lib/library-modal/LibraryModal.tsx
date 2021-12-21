import {
  AliwangwangOutlined,
  AliyunOutlined,
  CheckCircleFilled,
  FieldTimeOutlined,
  FileImageOutlined,
  FileProtectOutlined,
  ForkOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons'
import { BasicModal as LibraryInstallerModal, Button } from '@pabau/ui'
import { Col, Row } from 'antd'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { ReactComponent as Consent } from '../../assets/images/form-type/consent.svg'
import { ReactComponent as EPaper } from '../../assets/images/form-type/file-pdf.svg'
import { ReactComponent as Lab } from '../../assets/images/form-type/lab-form.svg'
import { ReactComponent as Prescription } from '../../assets/images/form-type/prescription.svg'
import { ReactComponent as Treatment } from '../../assets/images/form-type/treatment.svg'
import AfterCare from './assets/AfterCare'
import BeforeCare from './assets/BeforeCare'
import { useTranslation } from 'react-i18next'
import styles from './LibraryModal.module.less'

interface DefaultBundleType {
  [key: string]: {
    selected: boolean
    title: string
    icon: ReactNode
  }
}

const defaultBundleTypes: DefaultBundleType = {
  ConsentForm: {
    selected: false,
    title: 'Consent Form',
    icon: <FileProtectOutlined />,
  },
  MedicalForm: {
    selected: false,
    title: 'Medical Form',
    icon: <Consent />,
  },
  TreatmentForm: {
    selected: false,
    title: 'Treatment Form',
    icon: <Lab />,
  },
  PrescriptionForm: {
    selected: false,
    title: 'Prescription Form',
    icon: <Prescription />,
  },
  Service: {
    selected: false,
    title: 'Service',
    icon: <MedicineBoxOutlined />,
  },
  ServiceImage: {
    selected: false,
    title: 'Service Image',
    icon: <EPaper />,
  },
  ProductImage: {
    selected: false,
    title: 'Product Image',
    icon: <FileImageOutlined />,
  },
  Precare: {
    selected: false,
    title: 'Pre Care',
    icon: <BeforeCare />,
  },
  Aftercare: {
    selected: false,
    title: 'After Care',
    icon: <AfterCare />,
  },
  Stencil: {
    selected: false,
    title: 'Stencil',
    icon: <AliwangwangOutlined />,
  },
  Drugs: {
    selected: false,
    title: 'Drugs',
    icon: <Treatment />,
  },
  Contraindication: {
    selected: false,
    title: 'Contraindication',
    icon: <ForkOutlined />,
  },
  Recall: {
    selected: false,
    title: 'Recall',
    icon: <FieldTimeOutlined />,
  },
  Codes: {
    selected: false,
    title: 'Codes',
    icon: <AliyunOutlined />,
  },
}

interface BType {
  ID?: string
  title: string
  bundleType: string
}

export interface LibraryModalProps {
  image?: string
  title: string
  modalWidth?: number
  subTitle: string
  visible: boolean
  bundleTypes?: BType[]
  onClose?: () => void
  onInstall?: () => void
}

export const LibraryModal: FC<LibraryModalProps> = ({
  image,
  title,
  subTitle,
  visible,
  bundleTypes = [],
  modalWidth = 500,
  onClose,
  onInstall,
  ...rest
}) => {
  const { t } = useTranslation('common')
  const aligns = [
    styles.paddingRight,
    styles.paddingCenter,
    styles.paddingCenter,
    styles.paddingLeft,
  ]
  const [bundleTypesObject, setBundleTypes] = useState<DefaultBundleType>(
    defaultBundleTypes
  )
  const [selected, setSelected] = useState(0)

  const handleClickItem = (type) => {
    const bundles = { ...bundleTypesObject }
    bundles[type].selected = !bundles[type].selected
    setBundleTypes({ ...bundles })
    const selected = Object.keys(bundles).filter((el) => bundles[el].selected)
    setSelected(selected?.length)
  }

  useEffect(() => {
    const bundles = { ...defaultBundleTypes }
    const propsBundles = {}
    for (const key of bundleTypes) {
      propsBundles[key.bundleType] = { ...bundles[key.bundleType], ...key }
    }
    setBundleTypes({ ...propsBundles })
  }, [bundleTypes])

  return (
    <div className={styles.mainLibraryInstallerModal}>
      <LibraryInstallerModal
        className={styles.mainLibraryInstallerModal}
        title={title}
        visible={visible}
        onCancel={() => onClose?.()}
        modalWidth={modalWidth}
      >
        <div className={styles.body}>
          <h4 className={styles.subTitle}>{subTitle}</h4>
          <div className={styles.image}>
            <div
              style={{
                backgroundImage: `url(${image})`,
                height: `${modalWidth / 2}px`,
              }}
            ></div>
          </div>
          <div>
            <Row>
              {Object.keys(bundleTypesObject).map((key, index) => (
                <Col key={key} span={6} className={aligns[index % 4]}>
                  <div className={styles.bundleTypeDiv}>
                    {bundleTypesObject[key].selected && (
                      <CheckCircleFilled className={styles.bundleTypeChecked} />
                    )}
                    <div
                      className={
                        bundleTypesObject[key].selected
                          ? styles.bundleTypeSelected
                          : ''
                      }
                    >
                      <Button
                        className={styles.bundleTypeButton}
                        onClick={() => handleClickItem(key)}
                      >
                        {bundleTypesObject[key].icon}
                      </Button>
                      <p className={styles.formTypeLabel}>
                        {bundleTypesObject[key].title}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <div className={styles.footer}>
          <Button type="default" size="large" onClick={() => onClose?.()}>
            {t('common-label-cancel')}
          </Button>
          <Button type="primary" size="large">
            {t('ui.libraryinstallermodal.install')}
            {selected > 0 && (
              <span className={styles.bundlesCount}>{selected}</span>
            )}
          </Button>
        </div>
      </LibraryInstallerModal>
    </div>
  )
}

export default LibraryModal
