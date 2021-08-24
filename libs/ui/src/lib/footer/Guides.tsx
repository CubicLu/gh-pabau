import React, { FC } from 'react'
import styles from './Footer.module.less'
import classNames from 'classnames'
import { ReactComponent as BookSvg } from '../../assets/images/book.svg'
import { PlaySquareOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

export const Guides: FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const guides = [
    {
      guideName: t('intercom-article-title-setting-up-a-marketing-source'),
      type: t('intercom-title-type-article'),
      url: 'https://intercom.help/pabau/en/articles/3847686-marketing-sources',
      icon: <BookSvg />,
    },
    {
      guideName: 'Creating a Marketing Source',
      type: t('webinar-body-type-video'),
      icon: <PlaySquareOutlined />,
    },
  ]

  return (
    <div className={styles.relatedGuides}>
      {guides.map((guide, index) => {
        return (
          <div key={index} className={styles.boxDirection}>
            <div className={classNames(styles.footerBox, styles.rightSpace)}>
              <div className={styles.iconTextAlign}>
                <div>{guide.icon}</div>
                <div
                  onClick={() =>
                    router.push(
                      guide.url ?? 'https://www.intercom.com/articles'
                    )
                  }
                  className={styles.boxText}
                >
                  <p>{guide.guideName}</p>
                  <h6>{guide.type}</h6>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Guides
