import React, { FC, ReactNode, useEffect, useState } from 'react'
import reactStringReplace from 'react-string-replace'
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
  MailOutlined,
  MobileOutlined,
} from '@ant-design/icons'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
// import { isMobile, isTablet } from 'react-device-detect'

const WAIT_INTERVAL = 400
interface SearchResult {
  id: string
  firstName: string
  lastName: string
  avatarUrl?: string
  mobile?: string
  email?: string
}

interface P {
  searchResults?: SearchResult[]
  onChange?: (newText: string) => void
  changeSearchMode?: (newMode: SearchMode) => void
  resultSelectedHandler?: (id: number) => void
  advancedSearchHandler?: (searchData: []) => void
  children?: ReactNode
  placeHolder?: string
  isHideLead?: boolean
}

enum SearchMode {
  Clients = 'Clients',
  Leads = 'Leads',
}

export const Search: FC<P> = ({
  onChange,
  advancedSearchHandler,
  searchResults,
  children,
  placeHolder,
  changeSearchMode,
  resultSelectedHandler,
  isHideLead = false,
}) => {
  const [searchDrawer, setSearchDrawer] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchPopUp, setSearchPopUp] = useState(false)
  const [searchTab, setSearchTab] = useState(SearchMode.Clients)
  const [advancedSearch, setAdvancedSearch] = useState(false)

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

  const searchResultRow = ({
    id,
    avatarUrl,
    firstName,
    lastName,
    email,
    mobile,
  }: SearchResult) => {
    const full_name = firstName + ' ' + lastName
    return (
      <div
        key={id}
        className={styles.contentAlignProfile}
        onClick={() =>
          resultSelectedHandler
            ? resultSelectedHandler(Number.parseInt(id))
            : null
        }
      >
        <div className={styles.clientProfile}>
          {avatarUrl ? (
            <Avatar
              size={40}
              src={<Image src={'https://crm.pabau.com' + avatarUrl} />}
            />
          ) : (
            <Avatar size={40}>
              {firstName.substr(0, 1) + lastName.substr(0, 1)}
            </Avatar>
          )}
        </div>
        <div className={styles.clientProfileText}>
          <h1>
            {reactStringReplace(full_name, searchTerm, (match, i) => (
              <span key={i} className={styles.highlight}>
                {match}
              </span>
            ))}
          </h1>
          <p>
            {email !== '' ? (
              <>
                <MailOutlined />{' '}
                {reactStringReplace(email, searchTerm, (match, i) => (
                  <span key={i} className={styles.highlight}>
                    {match}
                  </span>
                ))}
              </>
            ) : null}
            {mobile !== '' ? (
              <>
                <MobileOutlined style={{ marginLeft: '5px' }} />{' '}
                {reactStringReplace(mobile, searchTerm, (match, i) => (
                  <span key={i} className={styles.highlight}>
                    {match}
                  </span>
                ))}
              </>
            ) : null}
          </p>
        </div>
      </div>
    )
  }

  const searchMenu = () => {
    return (
      <div className={styles.searchBox}>
        <div className={styles.cusTabs}>
          <button
            className={classNames(
              styles.cusTabDesign,
              searchTab === 'Clients' && styles.activeTabs
            )}
            onClick={() => searchTabChangeHandler(SearchMode.Clients)}
          >
            {t('search.client.label')}
          </button>
          {!isHideLead && (
            <button
              className={classNames(
                styles.cusTabDesign,
                searchTab === 'Leads' && styles.activeTabs
              )}
              onClick={() => searchTabChangeHandler(SearchMode.Leads)}
            >
              {t('search.lead.label')}
            </button>
          )}
        </div>
        <div className={styles.clientsList}>
          {searchResults && searchResults.length > 0 && (
            <>
              <div className={styles.resultText}>
                <h1>{t('search.result.one')}</h1>
              </div>
              {searchResultRow(searchResults[0])}
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
                .map((data) => searchResultRow(data))}
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
        </div>
        <div
          className={styles.advanceSearch}
          onClick={() => {
            setAdvancedSearch(!advancedSearch)
            setSearchPopUp(true)
          }}
        >
          <p>{t('search.advanced.search')}</p>
          <RightOutlined className={styles.rightArrowColor} />
        </div>
      </div>
    )
  }

  const advancedSearchMenu = () => {
    return (
      <div
        className={classNames(styles.advanceSearchModal, styles.advSearchBody)}
      >
        <div className={classNames(styles.backToSearch, styles.mobileViewNone)}>
          <div
            className={styles.basicSearchAlign}
            onClick={() => {
              setAdvancedSearch((e) => !e)
            }}
          >
            <LeftOutlined className={styles.rightArrowColor} />
            <h6>{t('search.basic.search')}</h6>
          </div>
          <div>
            <CloseOutlined
              style={{ color: 'var(--light-grey-color)', fontSize: '12px' }}
              onClick={() => {
                setAdvancedSearch((e) => !e)
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
            onClick={() => searchTabChangeHandler(SearchMode.Clients)}
          >
            {t('search.client.label')}
          </button>
          {!isHideLead && (
            <button
              className={classNames(
                styles.cusTabDesign,
                searchTab === 'Leads' && styles.activeTabs
              )}
              onClick={() => searchTabChangeHandler(SearchMode.Leads)}
            >
              {t('search.lead.label')}
            </button>
          )}
        </div>
        <Form
          form={form}
          onFinish={(data) => {
            if (typeof advancedSearchHandler !== 'undefined') {
              setAdvancedSearch(false)
              window.scrollTo(0, 0)
              advancedSearchHandler(data)
            }
          }}
          requiredMark={false}
          layout="vertical"
          className={classNames(styles.advSearchForm, styles.advSearchTopSpace)}
        >
          <Form.Item
            className={styles.searchForm}
            name="Fname"
            label={t('search.advanced.search.firstname.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.firstname.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            name="Email"
            label={t('search.advanced.search.email.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.email.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            name="DOB"
            label={t('search.advanced.search.birthdate.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.birthdate.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            name="Phone"
            label={t('search.advanced.search.phone.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.phone.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            name="Mobile"
            label={t('search.advanced.search.mobile.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.mobile.placeholder')}
            />
          </Form.Item>
          <Form.Item
            className={styles.searchForm}
            name="MailingPostal"
            label={t('search.advanced.search.postcode.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.postcode.placeholder')}
            />
          </Form.Item>
          {searchTab === SearchMode.Clients && (
            <Form.Item
              className={styles.searchForm}
              name="policyNumber"
              label={t('search.advanced.search.policynumber.label')}
            >
              <Input
                className={styles.advSearchInput}
                placeholder={t(
                  'search.advanced.search.policynumber.placeholder'
                )}
              />
            </Form.Item>
          )}
          <Form.Item
            className={styles.searchForm}
            name="custom_id"
            label={t('search.advanced.search.patientid.label')}
          >
            <Input
              className={styles.advSearchInput}
              placeholder={t('search.advanced.search.patientid.placeholder')}
            />
          </Form.Item>
          {searchTab === SearchMode.Clients && (
            <Form.Item
              className={styles.searchForm}
              name="invoiceNumber"
              label={t('search.advanced.search.invoiceno.label')}
            >
              <Input
                className={styles.advSearchInput}
                placeholder={t('search.advanced.search.invoiceno.placeholder')}
              />
            </Form.Item>
          )}
          {searchTab === SearchMode.Clients && (
            <Form.Item name="is_active" valuePropName="checked">
              <Checkbox>
                <span className={styles.inactiveClientText}>
                  {' '}
                  {t('search.advanced.search.inactiveclients.label')}
                </span>{' '}
              </Checkbox>
            </Form.Item>
          )}
          <div className={classNames(styles.buttonEnd, styles.searchBtnBlock)}>
            <Button
              disabled={false}
              size="large"
              type="primary"
              htmlType="submit"
            >
              {t('search.advanced.search.search')}
            </Button>
          </div>
        </Form>
      </div>
    )
  }

  const searchTabChangeHandler = (searchTab: SearchMode) => {
    setSearchTab(searchTab)
    if (typeof changeSearchMode !== 'undefined') {
      changeSearchMode(searchTab)
    }
  }

  const renderMenu = () => {
    if (advancedSearch) {
      return advancedSearchMenu()
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
              advancedSearch ? styles.advanceSearchModal : styles.searchInput,
              styles.mobileViewNone
            )}
            placement="bottom"
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
                if (advancedSearch) {
                  setAdvancedSearch((e) => !e)
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
        {advancedSearch ? advancedSearchMenu() : searchMenu()}
      </Drawer>
    </div>
  )
}

export default Search
