import { MutationFunction } from '@apollo/client'
import { Image } from 'antd'
import classNames from 'classnames'
import React, { FC } from 'react'
import { ProductNews } from './NotificationDrawer'
import styles from './NotificationDrawer.module.less'
import { useTranslation } from 'react-i18next'
import { JwtAuthenticationToken } from '@pabau/yup'

interface NewsProps {
  notify: ProductNews
  user?: JwtAuthenticationToken
  readNewsMutation?: MutationFunction
}

const News: FC<NewsProps> = ({ notify, user, readNewsMutation }) => {
  const { t } = useTranslation('common')

  const getFormattedDate = (date: Date | string) => {
    const today = new Intl.DateTimeFormat('en-US').format(new Date())
    const newsDate = new Intl.DateTimeFormat('en-US').format(new Date(date))

    if (today === newsDate) {
      return t('notifications.today')
    } else {
      const notifyDate = new Date(date)
      const formateDate = notifyDate.toLocaleString('default', {
        month: 'long',
        day: 'numeric',
      })
      return formateDate
    }
  }

  const isReadNews = (users) => {
    return users?.find((user_id) => user_id === user?.user) ? true : false
  }

  const onNewsClick = async () => {
    const { readUsers, link } = notify

    if (!isReadNews(readUsers)) {
      const variables = {
        company: user?.company,
        product_news: notify.id,
        user: user?.user,
      }
      await readNewsMutation?.({
        variables,
        optimisticResponse: {},
      })
    }

    if (link) {
      window.open(notify.link, '_blank')
    }
  }

  return (
    <div>
      <div
        className={classNames(
          styles.notificationAlign,
          styles.todayTextTopSpace
        )}
      >
        <h2>{getFormattedDate(notify.time)}</h2>
      </div>

      <div key={notify.title} className={styles.notificationCard}>
        <div className={styles.notifyAlign}>
          <div className={classNames(styles.logo, styles.flex)}>
            <Image preview={false} height={192} src={notify.img} />
          </div>
        </div>
        <div className={styles.descAlign}>
          <div className={styles.leadTitleDesc}>
            <h1>{notify.title}</h1>
            <p>{notify.description}</p>
          </div>
          <div className={styles.readStatus}>
            {!isReadNews(notify?.readUsers) && <span></span>}
          </div>
        </div>
        <span
          onClick={onNewsClick}
          className={classNames(styles.textMd, styles.learnMore)}
        >
          {t('news.learn')}
        </span>
      </div>
      <div className={styles.cardBorder} />
    </div>
  )
}

export default News
