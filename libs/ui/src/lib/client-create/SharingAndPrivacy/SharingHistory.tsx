import React, { FC, ReactNode } from 'react'
import styles from './SharingPrivacy.module.less'
import { Form as AntForm } from 'formik-antd'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import { sharingHistory } from '../mock'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

export interface SharingHistoryProps {
  id: number
  icon: ReactNode
  description: string
  date: string
  name: string
}
const SharingHistory: FC = () => {
  const { t } = useTranslation('common')
  const sharingHistoryData = sharingHistory(t)

  const getDate = (date) => {
    const currentDate = dayjs()
    const diff = dayjs(date).diff(currentDate, 'day')
    if (diff === 1) {
      return t(
        'create.client.modal.privacy.sharing.history.date.tomorrow.label',
        {
          date: dayjs(date).format('h:mm A'),
        }
      )
    } else if (diff === 0) {
      return t('create.client.modal.privacy.sharing.history.date.today.label', {
        date: dayjs(date).format('h:mm A'),
      })
    } else {
      return t('create.client.modal.privacy.sharing.history.date.label', {
        date: dayjs(date).format('DD MMM'),
        time: dayjs(date).format('h:mm A'),
      })
    }
  }

  return (
    <AntForm
      layout={'vertical'}
      requiredMark={false}
      className={styles.innerMainWrapper}
    >
      <h4>{t('create.client.modal.privacy.sharing.history.title')}</h4>
      <div className={styles.historyWrap}>
        <VerticalTimeline layout={'1-column-left'} animate={false}>
          {sharingHistoryData.map((data) => {
            return (
              <VerticalTimelineElement
                icon={data.icon}
                key={data.id}
                className="vertical-timeline-element--work"
              >
                <div className={styles.textHeader}>
                  <h3>{data.description}</h3>
                  <span>{getDate(data.date)}</span>
                  <span>{data.name}</span>
                </div>
              </VerticalTimelineElement>
            )
          })}
        </VerticalTimeline>
      </div>
    </AntForm>
  )
}

export default SharingHistory
