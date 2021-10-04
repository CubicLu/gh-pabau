import React, { FC } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import AddButton from '../../components/AddButton'
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
  const size = useWindowSize()
  return (
    <div className={styles.clientWrapper}>
      {size.width > 767 && (
        <div className={styles.displayMobileNone}>
          <div className={styles.header}>{t('clients.commonHeader')}</div>
        </div>
      )}
      <div className={styles.clientWrapperRight}>
        <AddButton
          onClick={toggleCreateClientModal}
          onFilterSource={() => false}
          onSearch={(searchTerm) => setSearchText(searchTerm)}
          addFilter={true}
          schema={{
            createButtonLabel: t('clients.header.createClient'),
            searchPlaceholder: t('clients.header.search.placeHolder'),
          }}
          tableSearch={true}
          needTranslation={true}
        />
      </div>
    </div>
  )
}

export default ClientsHeader
