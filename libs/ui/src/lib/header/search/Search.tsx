import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Checkbox } from '@pabau/ui'
import styles from './Search.module.less'
import { Input, Popover, Avatar, Image, Form, Button, Drawer } from 'antd'
import {
  SearchOutlined,
  UserAddOutlined,
  RightOutlined,
  LeftOutlined,
  CloseOutlined,
  CloseCircleFilled,
} from '@ant-design/icons'
import User from '../../../assets/images/user.png'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
// import { isMobile, isTablet } from 'react-device-detect'

const WAIT_INTERVAL = 400
interface P {
  searchResults?: {
    id: string
    firstName: string
    lastName: string
    avatarUrl?: string
    mobile?: string
    email?: string
  }[]
  onChange?: (newText: string) => void
  children?: ReactNode
  placeHolder?: string
}

export const Search: FC<P> = ({
  onChange,
  searchResults,
  children,
  placeHolder,
}) => {
  const [searchDrawer, setSearchDrawer] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchPopUp, setSearchPopUp] = useState(false)
  const [searchTab, setSearchTab] = useState('Clients')
  const [advanceSearch, setAdvanceSearch] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        setSearchPopUp(true)
        onChange?.(searchTerm)
      } else setSearchPopUp(false)
    }, WAIT_INTERVAL)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const [form] = Form.useForm()

  const searchMenu = () => {
    return (
      <div className={styles.searchBox}>
        <div className={styles.cusTabs}>
          <button
            className={classNames(
              styles.cusTabDesign,
              searchTab === 'Clients' && styles.activeTabs
            )}
            onClick={() => setSearchTab('Clients')}
          >
            {t('search.client.label')}
          </button>
          <button
            className={classNames(
              styles.cusTabDesign,
              searchTab === 'Leads' && styles.activeTabs
            )}
            onClick={() => setSearchTab('Leads')}
          >
            {t('search.lead.label')}
          </button>
        </div>
        {searchTab === 'Clients' && (
          <div className={styles.clientsList}>
            {searchResults && searchResults.length > 0 && (
              <>
                <div className={styles.resultText}>
                  <h1>{t('search.result.one')}</h1>
                </div>

                <div className={styles.contentAlignProfile}>
                  <div className={styles.clientProfile}>
                    <Avatar size={40} src={<Image src={User} />} />
                  </div>
                  <div className={styles.clientProfileText}>
                    <h1>
                      {searchResults[0].firstName +
                        ' ' +
                        searchResults[0].lastName}
                    </h1>
                    <p>3893312</p>
                  </div>
                </div>
              </>
            )}
            {searchResults && searchResults.length > 1 && (
              <>
                <div
                  className={classNames(
                    styles.resultText,
                    styles.resultTextTopSpace
                  )}
                >
                  <h1>{t('search.result.two')}</h1>
                </div>
                {searchResults
                  .filter((_, i) => i !== 0)
                  .map(
                    ({ id, avatarUrl, firstName, lastName, mobile, email }) => (
                      <div key={id} className={styles.contentAlignProfile}>
                        <div className={styles.clientProfile}>
                          <Avatar
                            size={40}
                            src={
                              <Image
                                src={
                                  'https://crm.pabau.com' + avatarUrl ?? User
                                }
                              />
                            }
                          />
                        </div>
                        <div className={styles.clientProfileText}>
                          <h1>{firstName + ' ' + lastName}</h1>
                          <p>{email}</p>
                        </div>
                      </div>
                    )
                  )}
              </>
            )}
            <div className={styles.contentAlignProfile}>
              <div className={styles.clientProfile}>
                <Avatar
                  size={40}
                  icon={
                    <UserAddOutlined
                      style={{ color: 'var(--grey-text-color)' }}
                    />
                  }
                  className={styles.addNewClient}
                />
              </div>
              <div className={styles.clientProfileText}>
                <span>{t('search.new.client')}</span>
              </div>
            </div>
            <div
              className={styles.advanceSearch}
              onClick={() => {
                setAdvanceSearch(!advanceSearch)
                setSearchPopUp(true)
              }}
            >
              <p>{t('search.advanced.search')}</p>
              <RightOutlined className={styles.rightArrowColor} />
            </div>
          </div>
        )}
      </div>
    )
  }

  const advanceSearchMenu = () => {
    return (
      <div
        className={classNames(styles.advanceSearchModal, styles.advSearchBody)}
      >
        <div className={classNames(styles.backToSearch, styles.mobileViewNone)}>
          <div
            className={styles.basicSearchAlign}
            onClick={() => {
              setAdvanceSearch((e) => !e)
            }}
          >
            <LeftOutlined className={styles.rightArrowColor} />
            <h6>{t('search.basic.search')}</h6>
          </div>
          <div>
            <CloseOutlined
              style={{ color: 'var(--light-grey-color)', fontSize: '12px' }}
              onClick={() => {
                setAdvanceSearch((e) => !e)
              }}
            />
          </div>
        </div>

        <div className={styles.advanceSearchText}>
          <h1>{t('search.advanced.search')}</h1>
        </div>
        <div className={classNames(styles.cusTabs, styles.cusTabsTopSpace)}>
          <button
            className={classNames(
              styles.cusTabDesign,
              searchTab === 'Clients' && styles.activeTabs
            )}
            onClick={() => setSearchTab('Clients')}
          >
            {t('search.client.label')}
          </button>
          <button
            className={classNames(
              styles.cusTabDesign,
              searchTab === 'Leads' && styles.activeTabs
            )}
            onClick={() => setSearchTab('Leads')}
          >
            {t('search.lead.label')}
          </button>
        </div>
        <Form
          form={form}
          requiredMark={false}
          layout="vertical"
          className={classNames(styles.advSearchForm, styles.advSearchTopSpace)}
        >
          <Form.Item
            className={styles.searchForm}
            label={t('search.advanced.search.firstname.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.firstname.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            label={t('search.advanced.search.email.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.email.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            label={t('search.advanced.search.birthdate.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.birthdate.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            label={t('search.advanced.search.phone.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.phone.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            label={t('search.advanced.search.mobile.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.mobile.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            label={t('search.advanced.search.postcode.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.postcode.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            label={t('search.advanced.search.policynumber.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.policynumber.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            label={t('search.advanced.search.patientid.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.patientid.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            label={t('search.advanced.search.invoiceno.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.invoiceno.placeholder')}
            />
          </Form.Item>
          <Checkbox>
            <span className={styles.inactiveClientText}>
              {' '}
              {t('search.advanced.search.inactiveclients.label')}
            </span>{' '}
          </Checkbox>
          <div className={classNames(styles.buttonEnd, styles.searchBtnBlock)}>
            <Button
              className={classNames(
                styles.btnDisableStyle,
                styles.mobileviewBtnSize
              )}
              disabled={true}
              size="large"
            >
              {t('search.advanced.search.search')}
            </Button>
          </div>
        </Form>
      </div>
    )
  }

  const renderMenu = () => {
    if (advanceSearch) {
      return advanceSearchMenu()
    }
    return searchMenu()
  }
  const { t } = useTranslation('common')

  return (
    <div style={{ width: '100%' }}>
      <div className={styles.mobileViewNone}>
        {children ? (
          <div>
            <Input
              className={styles.searchInputStyle}
              placeholder={placeHolder ? placeHolder : t('search.placeholder')}
              value={searchTerm}
              prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
              onChange={(e) => setSearchTerm(e.target.value)}
              suffix={
                searchTerm && (
                  <CloseCircleFilled
                    style={{ color: '#BFBFBF' }}
                    onClick={() => {
                      setSearchPopUp(false)
                      setSearchTerm('')
                    }}
                  />
                )
              }
            />
            <div>{children}</div>
          </div>
        ) : (
          <Popover
            content={children ? children : renderMenu}
            visible={searchPopUp}
            overlayClassName={classNames(
              advanceSearch ? styles.advanceSearchModal : styles.searchInput,
              styles.mobileViewNone
            )}
          >
            <Input
              className={styles.searchInputStyle}
              placeholder={placeHolder ? placeHolder : t('search.placeholder')}
              value={searchTerm}
              prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
              onChange={(e) => setSearchTerm(e.target.value)}
              suffix={
                searchTerm && (
                  <CloseCircleFilled
                    style={{ color: '#BFBFBF' }}
                    onClick={() => {
                      setSearchPopUp(false)
                      setSearchTerm('')
                    }}
                  />
                )
              }
            />
          </Popover>
        )}
      </div>
      <div className={styles.desktopViewNone}>
        <Input
          className={classNames(styles.searchInputStyle)}
          placeholder={t('header-search-text-placeholder')}
          value={searchTerm}
          prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setSearchDrawer((e) => !e)
          }}
        />
      </div>
      <Drawer
        visible={searchDrawer}
        placement="left"
        closable={false}
        className={styles.mobileSearchBar}
      >
        <div className={styles.fixedSearchBar}>
          <div className={styles.searchHeader}>
            <LeftOutlined
              onClick={() => {
                if (advanceSearch) {
                  setAdvanceSearch((e) => !e)
                } else {
                  setSearchDrawer((e) => !e)
                }
              }}
            />
            <Input
              className={classNames(
                styles.searchInputStyle,
                styles.resSearchInputStyle
              )}
              placeholder={placeHolder ? placeHolder : t('search.placeholder')}
              value={searchTerm}
              prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
              onChange={(e) => setSearchTerm(e.target.value)}
              suffix={
                searchTerm && (
                  <CloseCircleFilled
                    style={{ color: '#BFBFBF' }}
                    onClick={() => {
                      setSearchPopUp(false)
                      setSearchTerm('')
                    }}
                  />
                )
              }
              autoFocus
            />
          </div>
          <div className={styles.searchBarBorder} />
        </div>
        {advanceSearch ? advanceSearchMenu() : searchMenu()}
      </Drawer>
    </div>
  )
}

export default Search
