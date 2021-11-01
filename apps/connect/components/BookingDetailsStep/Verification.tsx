import React, { FC, useContext } from 'react'
import { EditOutlined } from '@ant-design/icons'
import styles from './Verification.module.less'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useSelectedDataStore } from '../../store/selectedData'
import useServices from '../../hooks/useServices'
import { SettingsContext } from '../../context/settings-context'

export interface P {
  backToStep?: (val: number) => void
}

export const Verification: FC<P> = ({ backToStep }) => {
  const { t } = useTranslationI18()
  const { selectedData } = useSelectedDataStore()
  const [getTotalServiceCost] = useServices()
  const settings = useContext(SettingsContext)

  return (
    <div className={styles.appWrapper}>
      <div className={styles.applicationWrap}>
        <div className={styles.confirmBox}>
          <h5>
            {t('connect.onlinebooking.verification.appoitmenttype')}{' '}
            <EditOutlined
              onClick={() => {
                backToStep(1)
              }}
            />
          </h5>

          <p>{selectedData.services.map((s) => s.name).join(', ')}</p>
        </div>
        <div className={styles.confirmBox}>
          <h5>
            {t('connect.onlinebooking.verification.clinic')}{' '}
            <EditOutlined
              onClick={() => {
                backToStep(2)
              }}
            />
          </h5>

          <p>{selectedData.location.name}</p>
        </div>
        <div className={styles.confirmBox}>
          <h5> {t('connect.onlinebooking.verification.address')} </h5>
          <p>{selectedData.location.address}</p>
        </div>
      </div>
      <div className={styles.applicationWrap}>
        <div className={styles.confirmBox}>
          <h5>
            {t('connect.onlinebooking.verification.seeing')}{' '}
            <EditOutlined
              onClick={() => {
                backToStep(3)
              }}
            />
          </h5>
          <div className={styles.imgTag}>
            {selectedData.employee.Avatar !== '' && (
              <img
                src={settings.pod_url + selectedData.employee.Avatar}
                alt={selectedData.employee.Avatar}
              />
            )}
            <p>{selectedData.employee.Public_User.full_name}</p>
          </div>
        </div>
        <div className={styles.confirmBox}>
          <h5>
            {t('connect.onlinebooking.verification.date')}{' '}
            <EditOutlined
              onClick={() => {
                backToStep(4)
              }}
            />
          </h5>
          <p>{selectedData.dateTime.format('dddd, Do MMMM')}</p>
        </div>
        <div className={styles.confirmBox}>
          <h5>
            {t('connect.onlinebooking.verification.time')}{' '}
            <EditOutlined
              onClick={() => {
                backToStep(4)
              }}
            />
          </h5>

          <p>{selectedData.dateTime.format('HH:mm')}</p>
        </div>
        <div className={styles.confirmBox}>
          <h5>{t('connect.onlinebooking.verification.appoitmentprice')}</h5>
          <p>
            £{' '}
            {getTotalServiceCost(
              selectedData.employee.Public_User.Public_ServiceUserTier
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
