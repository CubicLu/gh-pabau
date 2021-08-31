import React, { FC } from 'react'
import { Button } from '@pabau/ui'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import {
  EyeOutlined,
  PrinterOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import { PrescriptionListProps } from './ClientPrescriptionsLayout'
import styles from './ClientPrescriptionsLayout.module.less'

interface PrescriptionActionProps {
  prescription: PrescriptionListProps
  onPreviewClick: (e: PrescriptionListProps) => Promise<boolean>
  onPrintClick: (e: PrescriptionListProps) => Promise<boolean>
  onShareClick: (e: PrescriptionListProps) => Promise<boolean>
}
const PrescriptionAction: FC<PrescriptionActionProps> = ({
  prescription,
  onPreviewClick,
  onPrintClick,
  onShareClick,
}) => {
  const isMobile = useMedia('(max-width: 767px)', false)
  const { t } = useTranslation('common')
  return (
    <div className={styles.prescriptionActionsContainer}>
      {!isMobile && (
        <>
          <Button
            icon={<EyeOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              onPreviewClick(prescription)
            }}
          >
            <span className={styles.btnText}>
              {t('ui.clientcard-prescriptions.options.preview')}
            </span>
          </Button>
          <Button
            icon={<PrinterOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              onPrintClick(prescription)
            }}
          >
            <span className={styles.btnText}>
              {t('ui.clientcard-prescriptions.options.print')}
            </span>
          </Button>
          <Button
            icon={<ShareAltOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              onShareClick(prescription)
            }}
          >
            <span className={styles.btnText}>
              {t('ui.clientcard-prescriptions.options.share')}
            </span>
          </Button>
        </>
      )}
    </div>
  )
}

export default PrescriptionAction
