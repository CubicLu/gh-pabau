import React, { FC } from 'react'
import { FullScreenReportModal as FullScreenModal } from '@pabau/ui'
import dayjs from 'dayjs'
import { ReactComponent as SkinHealth } from '../../assets/images/skin-health-logo.svg'
import styles from './Journey.module.less'
import Tile from './Tile'
import { ReactComponent as Waiting } from '../../assets/images/waiting.svg'
import { ReactComponent as InProgress } from '../../assets/images/in-progress.svg'
import { ReactComponent as Arrived } from '../../assets/images/arrived.svg'
import { ReactComponent as Complete } from '../../assets/images/complete.svg'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

interface JourneyP {
  modalVisible?: boolean
  handleClose?: () => void
}

const Journey: FC<JourneyP> = ({ modalVisible = true, handleClose }) => {
  const { t } = useTranslationI18()
  return (
    <FullScreenModal
      visible={modalVisible}
      title={<SkinHealth />}
      hideBackIcon
      center={<div style={{ fontSize: 18 }}>{dayjs().format('MMMM YYYY')}</div>}
      operations={[]}
      onBackClick={() => {
        handleClose()
      }}
      footer={true}
    >
      <div className={styles.journeyContainer}>
        <div className={styles.grid}>
          <div className={styles.gridItems}></div>
          <div className={styles.gridItems}>
            <Tile
              text={t('journey.modal.appointements.status.waiting')}
              count={1}
              icon={<Waiting />}
            />
            <Tile
              text={t('journey.modal.appointements.status.in.progress')}
              count={10}
              icon={<InProgress />}
            />
            <Tile
              text={t('journey.modal.appointements.status.arrived')}
              count={3}
              icon={<Arrived />}
            />
            <Tile
              text={t('journey.modal.appointements.status.complete')}
              count={32}
              icon={<Complete />}
            />
          </div>
        </div>
      </div>
    </FullScreenModal>
  )
}

export default Journey
