import React, { FC, useState, useEffect } from 'react'
import { Layout } from '@pabau/ui'
import CommonHeader from '../../components/CommonHeader'
import HeaderChip from '../../components/Setup/HeaderChip'
import Grid from '../../components/Setup/Grid'
import WebinarCard from '../../components/Setup/Webinar'
import SearchResults from '../../components/Setup/SearchResults'
import GridMobile from '../../components/Setup/Grid/gridMobile'
import GridSubMenuMobile from '../../components/Setup/Grid/gridSubTitleMobile'
import { SetupSearchInput, SetupGridProps } from '@pabau/ui'
import styles from './Setup.module.less'
import { useRouter } from 'next/router'
import { setupGridData } from '../../mocks/SetupGridData'
import { useMedia } from 'react-use'

const Index: FC = (props) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [title, setTitle] = useState<string>('Setup')
  const [searchData, setSearchData] = useState([])
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false)
  const [selectedMenuData, setMenuData] = useState<SetupGridProps[]>([])
  const router = useRouter()
  const isMobile = useMedia('(max-width: 768px)', false)

  useEffect(() => {
    if (router.query?.menu) {
      const menu = router.query.menu
      const selectedMenuData = setupGridData.filter(
        (thread) => thread.title === menu
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
      setTitle('Search Results')
      const searchDataArray = []

      setupGridData.map((data: SetupGridProps) => {
        const titles = data.expandTitle ? data.expandTitle : data.subDataTitles
        if (titles.length > 0) {
          titles.map((subTitle) => {
            if (
              subTitle.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              searchDataArray.push({
                subTitle: subTitle.title,
                title: data.title,
              })
            }
            return searchDataArray
          })
        }
        return data
      })

      setSearchData(searchDataArray)
    } else {
      setTitle('Setup')
    }
  }

  const handleShowSubMenuMobile = (title: string) => {
    router.push({
      pathname: '/setup',
      query: { menu: title },
    })
  }

  const handleBack = () => {
    setShowSubMenu(false)
    router.push('/setup', undefined, { shallow: true })
  }

  return (
    <div>
      <CommonHeader handleSearch={handleSearch} />
      <Layout active={'setup'}>
        <div className={styles.cardWrapper}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>{title}</span>
            <div className={styles.search}>
              <SetupSearchInput onChange={handleSearch} />
            </div>
          </div>
          {!searchValue ? (
            <>
              {showSubMenu ? (
                <GridSubMenuMobile
                  data={selectedMenuData}
                  handleBack={handleBack}
                />
              ) : (
                <GridMobile
                  data={setupGridData}
                  handleShowSubMenuMobile={handleShowSubMenuMobile}
                />
              )}
              {!showSubMenu && <HeaderChip />}
              <div className={styles.mainWrap}>
                <Grid data={setupGridData} />
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
            <SearchResults data={searchData} searchTerm={searchValue} />
          )}
        </div>
      </Layout>
    </div>
  )
}

export default Index
