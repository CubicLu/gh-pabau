import React, { FC, useState, useEffect } from 'react'
import { Layout } from '@pabau/ui'
import CommonHeader from './common-header'
import HeaderChip from './headerChip'
import Grid from './grid'
import WebinarCard from './webinar'
import SearchResults from './searchResults'
import GridMobile from './grid/grid-mobile'
import GridSubMenuMobile from './grid/grid-sub-title-mobile'
import { SetupSearchInput, SetupGridProps } from '@pabau/ui'
import styles from './Setup.module.less'
import { useHistory } from '../../components/HistoryWrapper'

import clinicImage from '../../assets/images/our-clinic.png'
import servicesImage from '../../assets/images/services.png'
import clinicalImage from '../../assets/images/clinical.png'
import marketingImage from '../../assets/images/marketing.png'
import financialImage from '../../assets/images/financial.png'
import developerImage from '../../assets/images/developer.png'

const Index: FC = (props) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [title, setTitle] = useState<string>('Setup')
  const [searchData, setSearchData] = useState([])
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false)
  const [selectedMenuData, setMenuData] = useState<SetupGridProps[]>([])

  const { history } = useHistory()

  const setupGridData = [
    {
      title: 'Our clinic',
      subDataTitles: [
        { title: 'Business Details', data: [] },
        { title: 'Users', data: ['Users', 'User Groups'] },
        { title: 'Locations', data: [] },
        {
          title: 'General settings',
          data: [
            'Calendar',
            'Loyalty',
            'Performance',
            'Point of Sale',
            'Referral',
          ],
        },
        { title: 'Integrations', data: [] },
        { title: 'Data', data: ['Custom Fields', 'Data Imports'] },
        { title: 'Pabau Subscription', data: ['Billing Activity', 'Addons'] },
      ],
      image: clinicImage,
    },
    {
      title: 'Services',
      subDataTitles: [
        { title: 'Services', data: [], href: '/setup/services' },
        { title: 'Products', data: [], href: '/setup/products' },
        { title: 'Packages', data: [], href: '/setup/packages' },
        { title: 'Resources', data: ['Rooms', 'Equipment'] },
        { title: 'Online Booking', data: [] },
      ],
      image: servicesImage,
    },
    {
      title: 'Clinical',
      subDataTitles: [
        { title: 'Care Pathways', data: [] },
        { title: 'Medical form templates', data: [] },
        { title: 'Diagnostic Codes', data: [] },
        { title: 'Labs', data: [] },
        { title: 'Drugs', data: [] },
        {
          title: 'Medical Conditions',
          data: ['Contraindication', 'Medical Conditions'],
        },
        {
          title: 'Vaccine',
          data: [' Vaccines', 'Diseases', 'Vaccine Schedules'],
        },
        { title: 'Body Charts', data: [] },
      ],
      image: clinicalImage,
    },
    {
      title: 'Marketing & Communication',
      subDataTitles: [
        {
          title: 'Communications',
          data: [
            'Client Notifications',
            'Sender Addresses',
            'Templates',
            'SMS Bundles & Settings',
          ],
        },
        { title: 'Client Portal', data: [] },
        { title: 'Feedback Survey', data: [] },
        { title: 'Lead Forms', data: [] },
        {
          title: 'Marketing Sources',
          data: [],
          href: '/setup/marketing-sources',
        },
      ],
      image: marketingImage,
    },
    {
      title: 'Financials',
      subDataTitles: [
        {
          title: 'Payment Processing',
          data: [],
          href: '/setup/payment-processing',
        },
        { title: 'Discounts', data: [], href: '/setup/discounts' },
        { title: 'Taxes', data: [] },
        { title: 'Invoice Templates', data: [] },
        { title: 'Payment Types', data: [], href: '/setup/payment-types' },
        { title: 'Contract Pricing', data: [] },
        { title: 'Cancellation Policy', data: [] },
      ],
      image: financialImage,
    },
    {
      title: 'Developer & Other',
      subDataTitles: [
        { title: 'Webhooks', data: [] },
        { title: 'API keys', data: [] },
        { title: 'Credit Note Types', data: [] },
        { title: 'Departments', data: [] },
        { title: 'Field Capture Labels', data: [] },
        { title: 'Block Out Options', data: [] },
        { title: 'Appointment Statuses', data: [] },
        { title: 'Lead Groups', data: [] },
        { title: 'Petty Cash Types', data: [] },
      ],
      expandTitle: [
        { title: 'Webhooks', data: [] },
        { title: 'API keys', data: [] },
        { title: 'Credit Note Types', data: [] },
        { title: 'Salutations', data: [] },
        { title: 'Training titles', data: [] },
        { title: 'Titles', data: [] },
        { title: 'Photo Uploader', data: [] },
        { title: 'Cancellation Reasons', data: [] },
        { title: 'Lead views', data: [] },
        { title: 'Lead groups', data: [] },
        { title: 'Lead assignment rules', data: [] },
        { title: 'Family relationships', data: [] },
        { title: 'Doc label manager', data: [] },
        { title: 'Departments', data: [] },
        { title: 'Invoice distribution', data: [] },
        { title: 'Issuing companies', data: [] },
        { title: 'Job statues', data: [] },
        { title: 'Supplier categories', data: [] },
      ],
      isExpand: true,
      image: developerImage,
    },
  ]

  useEffect(() => {
    if (history.length > 0) {
      const previousRoute = history[history.length - 1]
      const selectedMenuData = setupGridData.filter((thread) =>
        thread.subDataTitles.some((x) => x.href === previousRoute)
      )
      if (selectedMenuData.length > 0) {
        setMenuData(selectedMenuData)
        setShowSubMenu((value) => !value)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    const data = setupGridData.filter((thread) => thread.title === title)
    setShowSubMenu(true)
    setMenuData(data)
    console.log('data', data)
  }

  const handleBack = () => {
    setShowSubMenu(false)
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
                {!showSubMenu && <WebinarCard />}
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
