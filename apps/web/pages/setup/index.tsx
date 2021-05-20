import React, { FC, useState, useEffect, useContext } from 'react'
import Layout from '../../components/Layout/Layout'
import CommonHeader from '../../components/CommonHeader'
import HeaderChip from '../../components/Setup/HeaderChip'
import Grid from '../../components/Setup/Grid'
import WebinarCard from '../../components/Setup/Webinar'
import SearchResults from '../../components/Setup/SearchResults'
import GridMobile from '../../components/Setup/Grid/gridMobile'
import GridSubMenuMobile from '../../components/Setup/Grid/gridSubTitleMobile'
import { SetupSearchInput, SetupGridProps, SMSPurchaseModal } from '@pabau/ui'
import styles from './Setup.module.less'
import { useRouter } from 'next/router'
import { useMedia } from 'react-use'
import { useGridData } from '../../hooks/useGridData'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { UserContext } from '../../context/UserContext'

export interface LoadingType {
  videoLoader: boolean
  communityLoader: boolean
}
const Index: FC = (props) => {
  const { t } = useTranslationI18()
  const [searchValue, setSearchValue] = useState<string>('')
  const [title, setTitle] = useState<string>(t('setup.page.title'))
  const [searchData, setSearchData] = useState([])
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false)
  const [selectedMenuData, setMenuData] = useState<SetupGridProps[]>([])
  const [isSMSModalVisible, setSMSModalVisible] = useState<boolean>(false)
  const router = useRouter()
  const isMobile = useMedia('(max-width: 768px)', false)
  const { setupGridData } = useGridData(t)
  const user = useContext(UserContext)

  useEffect(() => {
    if (router.query?.menu) {
      const menu = router.query.menu
      const selectedMenuData = setupGridData.filter(
        (thread) => thread.keyValue === menu
      )
      if (selectedMenuData.length > 0) {
        setMenuData(selectedMenuData)
        setShowSubMenu((value) => !value)
      }
    } else {
      setShowSubMenu(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.menu])

  const handleSearch = (searchTerm: string) => {
    setSearchValue(searchTerm)
    if (searchTerm) {
      setTitle(t('setup.page.search.result.title'))
      const searchDataArray = []

      setupGridData.map((data: SetupGridProps) => {
        const titles = data.expandTitle
          ? [...data.expandTitle, ...data.subDataTitles]
          : data.subDataTitles
        if (titles.length > 0) {
          titles.map((subTitle) => {
            const subTitleData =
              subTitle.data.length > 0
                ? subTitle.data
                : [{ title: subTitle.title, href: subTitle.href }]
            subTitleData.map((record) => {
              if (
                record.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                searchDataArray.push({
                  subTitle: record.title,
                  href: record.href,
                  title: data.title,
                  isModal: record.isModal,
                })
              }
              return searchDataArray
            })
            return subTitle
          })
        }
        return data
      })

      setSearchData(searchDataArray)
    } else {
      setTitle(t('setup.page.title'))
    }
  }

  const handleShowSubMenuMobile = (key: string) => {
    router.push({
      pathname: '/setup',
      query: { menu: key },
    })
  }

  const handleBack = () => {
    setShowSubMenu(false)
    router.push('/setup', undefined, { shallow: true })
  }

  const smsModalOnComplete = () => {
    console.log('Completed')
  }

  const setModalVisible = () => {
    setSMSModalVisible(true)
  }

  return (
    <div>
      <CommonHeader
        handleSearch={handleSearch}
        title={t('setup.page.title')}
        isShowSearch={true}
      />
      <Layout active={'setup'} isDisplayingFooter={false} {...user}>
        <div className={styles.cardWrapper}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>{title}</span>
            <div className={styles.search}>
              <SetupSearchInput
                onChange={handleSearch}
                placeholder={t('setup.page.search.placeholder')}
              />
            </div>
          </div>
          {!searchValue ? (
            <>
              {showSubMenu ? (
                <GridSubMenuMobile
                  data={selectedMenuData}
                  handleBack={handleBack}
                  setSMSModalVisible={setModalVisible}
                />
              ) : (
                <GridMobile
                  data={setupGridData}
                  handleShowSubMenuMobile={handleShowSubMenuMobile}
                />
              )}
              {!showSubMenu && <HeaderChip />}
              <div className={styles.mainWrap}>
                <Grid
                  data={setupGridData}
                  setSMSModalVisible={setModalVisible}
                />
                {isMobile ? (
                  !showSubMenu ? (
                    <WebinarCard />
                  ) : null
                ) : (
                  <WebinarCard />
                )}
              </div>
            </>
          ) : (
            <SearchResults
              data={searchData}
              searchTerm={searchValue}
              setSMSModalVisible={setModalVisible}
            />
          )}
        </div>
        <SMSPurchaseModal
          visible={isSMSModalVisible}
          onClose={() => setSMSModalVisible(false)}
          numberFormatter={new Intl.NumberFormat('en-US')}
          onComplete={smsModalOnComplete}
        />
      </Layout>
    </div>
  )
}

export default Index
