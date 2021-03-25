import React, { FC, useEffect, useState } from 'react'
import { Button, MobileHeader } from '@pabau/ui'
import styles from './AddButton.module.less'
import {
  FilterOutlined,
  SearchOutlined,
  InboxOutlined,
} from '@ant-design/icons'
import { Drawer, Input, Popover, Radio } from 'antd'
import classNames from 'classnames'
import { useTranslationI18 } from '../hooks/useTranslationI18'
import { useMedia } from 'react-use'
// import { isMobile, isTablet } from 'react-device-detect'
// import { useKeyPressEvent } from 'react-use'

const WAIT_INTERVAL = 400

interface P {
  schema: Partial<Schema>
  onClick?: () => void
  onFilterSource: () => void
  onSearch?: (term: string) => void
  tableSearch?: boolean
  addFilter?: boolean
  needTranslation?: boolean
  isCustomFilter?: boolean
  customFilter?: () => JSX.Element
}

const AddButton: FC<P> = ({
  schema,
  onClick,
  children,
  onFilterSource,
  onSearch,
  tableSearch = true,
  addFilter = true,
  needTranslation,
  isCustomFilter = false,
  customFilter,
}) => {
  const [isActive, setIsActive] = useState<boolean | number>(
    schema?.filter?.primary?.default ?? true
  )
  const [mobFilterDrawer, setMobFilterDrawer] = useState(false)
  const [marketingSourceSearch, setMarketingSourceSearch] = useState('')
  const [isPopOverVisible, setIsPopOverVisible] = useState(false)
  const { t } = useTranslationI18()
  const isMobile = useMedia('(max-width: 768px)', false)

  useEffect(() => {
    if (!isMobile && mobFilterDrawer) {
      setMobFilterDrawer(false)
    }
  }, [isMobile, mobFilterDrawer])

  useEffect(() => {
    console.log(isActive)
    const timer = setTimeout(() => {
      onSearch?.(marketingSourceSearch)
    }, WAIT_INTERVAL)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketingSourceSearch])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onReset = () => {
    if (!isActive) {
      setIsActive(!isActive)
    }
  }

  const handleMobileDrawerApply = () => {
    onFilterSource()
    setMobFilterDrawer((e) => !e)
  }

  const filterContent = (isMobile = false) => (
    <div className={styles.filterContent}>
      {!isMobile && (
        <div className={classNames(styles.filterHeader)}>
          <h6>{t('add-button-filter-header-text-filter')}:</h6>
          <p>{t('add-button-filter-header-text-status')}</p>
        </div>
      )}
      <div className={styles.radioTextStyle}>
        <Radio.Group
          onChange={(e) => {
            console.log('radio group value', e.target.value)
            setIsActive(e.target.value)
            console.log('is active', isActive)
            !isMobile && onFilterSource()
          }}
          value={isActive}
        >
          <Radio value={schema?.filter?.primary?.active ?? true}>
            <span>{t('basic-crud-table-button-active')}</span>
          </Radio>
          <Radio value={schema?.filter?.primary?.inactive ?? false}>
            <span>{t('basic-crud-table-button-inactive')}</span>
          </Radio>
        </Radio.Group>
      </div>
    </div>
  )
  //TODO INVESTIGATE which branch this changes came from and are they needed
  return (
    <>
      {/* Mobile header */}
      {/*{mobileSearch && (*/}
      {/*  <div className={styles.mobileSearchInput}>*/}
      {/*    <Input*/}
      {/*      className={styles.searchMarketingStyle}*/}
      {/*      placeholder={t('basic-crud-table-input-search-placeholder')}*/}
      {/*      onChange={(e) => setMarketingSourceSearch(e.target.value)}*/}
      {/*      suffix={*/}
      {/*        <CloseIcon*/}
      {/*          onClick={() => {*/}
      {/*            setMobileSearch?.()*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      }*/}
      {/*      autoFocus*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{!mobileSearch && (*/}
      {/*  <div*/}
      {/*    className={classNames(styles.marketingIcon, styles.desktopViewNone)}*/}
      {/*  >*/}
      {/*    {tableSearch && (*/}
      {/*      <SearchOutlined*/}
      {/*        onClick={() => {*/}
      {/*          setMobileSearch?.()*/}
      {/*        }}*/}
      {/*        className={styles.marketingIconStyle}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*    {addFilter && (*/}
      {/*      <FilterOutlined*/}
      {/*        className={styles.marketingIconStyle}*/}
      {/*        onClick={() => setMobFilterDrawer((e) => !e)}*/}
      {/*      />*/}
      {/*    )}*/}

      {/*    <PlusSquareFilled*/}
      {/*      className={styles.plusIconStyle}*/}
      {/*      onClick={() => onClick?.()}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}

      <Drawer
        visible={mobFilterDrawer}
        className={styles.mobFilterDrawer}
        closable={false}
      >
        <MobileHeader className={styles.marketingSourceFilterHeader}>
          <div className={styles.allContentAlignMobile}>
            <div className={styles.marketingTextStyle}>
              <span>{t('add-button-filter-reset')}</span>
              <p>{t('add-button-filter')}</p>
              <span
                onClick={() => {
                  setMobFilterDrawer((e) => !e)
                }}
              >
                {t('add-button-filter-cancel')}
              </span>
            </div>
          </div>
        </MobileHeader>
        <div style={{ marginTop: '91px', paddingLeft: '24px' }}>
          {isCustomFilter === false ? filterContent(true) : customFilter()}
        </div>
        <Button
          type="primary"
          className={styles.applyButton}
          onClick={handleMobileDrawerApply}
        >
          Apply
        </Button>
      </Drawer>
      <div
        className={classNames(styles.marketingSource, styles.mobileViewNone)}
      >
        {tableSearch && (
          <Input
            className={styles.searchMarketingStyle}
            placeholder={t('basic-crud-table-input-search-placeholder')}
            value={marketingSourceSearch}
            onChange={(e) => {
              console.log('set marketing search', e.target.value)
              setMarketingSourceSearch(e.target.value)
            }}
            suffix={<SearchOutlined style={{ color: '#8C8C8C' }} />}
            autoFocus
          />
        )}
        <Popover
          trigger="click"
          content={isCustomFilter ? customFilter : filterContent}
          placement="bottomRight"
          visible={isPopOverVisible}
          onVisibleChange={(visible) => setIsPopOverVisible(visible)}
          overlayClassName={
            isCustomFilter === false
              ? styles.filterPopover
              : styles.customFilterPopover
          }
        >
          {addFilter && (
            <Button
              className={styles.filterBtn}
              onClick={() => setIsPopOverVisible(true)}
            >
              <FilterOutlined /> {t('basic-crud-table-button-filter')}
            </Button>
          )}
        </Popover>
        {schema.createButtonLabel && (
          <Button
            className={styles.createSourceBtn}
            type="primary"
            onClick={() => onClick?.()}
          >
            {t(schema.createButtonLabel)}
          </Button>
        )}
        {schema.inboxButton && (
          <Button
            className={styles.inboxSourceBtn}
            type="primary"
            onClick={() => onClick?.()}
          >
            <InboxOutlined /> {t(schema.createButtonLabel) ?? 'Inbox'}
            <span className={styles.inboxMsgNum}> 3</span>
          </Button>
        )}
      </div>
    </>
  )
}

export default AddButton
