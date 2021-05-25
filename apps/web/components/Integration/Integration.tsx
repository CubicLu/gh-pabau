import React, { FC, ReactElement, useEffect, useState } from 'react'
import classNames from 'classnames'
import { CheckOutlined } from '@ant-design/icons'
import { Button, InstallationModal } from '@pabau/ui'
import styles from './Integration.module.less'
import logo from './../../assets/images/pabau-badge-1.png'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

import { setupIntegrationData } from '../../mocks/SetupIntegration'

interface ItemsSchema {
  title: string
  subTitle: string
  logoImage: ReactElement | string | any
  installed: number
  categories: Array<string>
}

export interface ModalSchema {
  title: string
  subTitle: string
  logoImage: string
  installed: number
  categories: Array<string>
}

interface P {
  heading?: string
  category?: string
  items: ItemsSchema[]
  limit?: number
  installed?: number
}

const IntegrationHeader: FC = () => {
  const { t } = useTranslationI18()
  const { allCollectionsHeaderCollections } = setupIntegrationData(t)
  return (
    <div>
      <div className={styles.tabMenuWrapper}>
        <div className={styles.collectionWrapper}>
          {allCollectionsHeaderCollections.map((value, key) => (
            <div className={styles.collectionBox} key={key}>
              <h4>{value.title}</h4>
              <Button type="primary" className={styles.btnColl}>
                {t('integration.view.collections')} &#x2192;{' '}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const IntegrationTabBody: FC<P> = ({
  heading,
  category = 'ALL',
  items,
  limit,
  installed = -1,
}) => {
  const { t } = useTranslationI18()
  const {
    worksWith,
    longDescription,
    mobileViewDescription,
    webViewDescription,
  } = setupIntegrationData(t)

  category = category.toUpperCase()
  const [data, setData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [modalData, setModalData] = useState<ModalSchema>({
    title: '',
    subTitle: '',
    installed: 0,
    logoImage: logo,
    categories: [],
  })

  useEffect(() => {
    if (category !== 'ALL') {
      const mapArray = []
      for (const a of items) {
        if (a.categories.indexOf(category) !== -1) {
          mapArray.push(a)
        }
      }
      setData([...mapArray])
      return
    } else if (installed === 1) {
      const mapArray = []
      for (const a of items) {
        if (a.installed === 1) {
          mapArray.push(a)
        }
      }
      setData([...mapArray])
      return
    } else {
      setData([...items])
      return
    }
  }, [items, category, data.length, installed])

  const modalOpen = (key) => {
    setIsModalVisible(true)
    setModalData(key)
  }

  return (
    <>
      {heading && heading.length > 0 && (
        <div className={styles.popularWrapper}>
          <h5>{heading}</h5>
        </div>
      )}
      <div className={styles.itemWrapper}>
        {data.slice(0, limit).map((value, key) => (
          <div
            key={key}
            className={classNames(
              styles.itemBox,
              value.installed === 1 && styles.active
            )}
            onClick={() => modalOpen(value)}
          >
            <span className={styles.checkWrap}>
              <CheckOutlined />
            </span>
            <div className={styles.img}>
              <img src={value.logoImage} alt={value.title} />
            </div>
            <h5>{value.title}</h5>
            <p>{value.subTitle}</p>
          </div>
        ))}
      </div>
      <InstallationModal
        visible={isModalVisible}
        logo={modalData.logoImage}
        title={modalData.title}
        description={modalData.subTitle}
        installed={modalData.installed}
        categories={modalData.categories}
        onCancel={() => setIsModalVisible(false)}
        worksWith={worksWith}
        longDescription={longDescription}
        mobileViewDescription={mobileViewDescription}
        webViewDescription={webViewDescription}
      />
    </>
  )
}

export default IntegrationHeader
