import React, { FC } from 'react'
import { Input } from 'antd'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { Button } from '@pabau/ui'
import styles from '../../pages/clients/clients.module.less'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

interface ClientsHeaderProps {
  searchText?: string
  setSearchText?: (term: string) => void
  toggleCreateClientModal: () => void
}

export const ClientsHeader: FC<ClientsHeaderProps> = ({
  searchText,
  setSearchText,
  toggleCreateClientModal,
}) => {
  const { t } = useTranslationI18()

  return (
    <div className={styles.clientWrapper}>
      <div className={styles.displayMobileNone}>
        <div className={styles.header}>{t('clients.commonHeader')}</div>
      </div>
      <div className={styles.clientWrapperRight}>
        <Input
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          addonAfter={<SearchOutlined />}
          placeholder={t('clients.header.search.placeHolder')}
        />
        <Button className={styles.filterButton} icon={<FilterOutlined />}>
          {t('clients.header.filter')}
        </Button>
        <Button
          className={styles.btnCreateClient}
          type={'primary'}
          onClick={toggleCreateClientModal}
        >
          {t('clients.header.createClient')}
        </Button>
      </div>
    </div>
  )
}

export default ClientsHeader
