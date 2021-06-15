import React, { FC, ReactNode } from 'react'
import { Popover, Checkbox } from 'antd'
import styles from '../../pages/clients/clients.module.less'
import { CustomScrollbar } from '../CustomScrollbar/Index'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

interface ManageColumnsPopoverProps {
  children?: ReactNode
  selectedPrimaryColumn?: string[]
  setSelectedPrimaryColumn?: (val: string[]) => void
  selectedSecondaryColumn?: string[]
  setSelectedSecondaryColumn?: (val: string[]) => void
}

export const ManageColumnsPopover: FC<ManageColumnsPopoverProps> = ({
  children,
  selectedPrimaryColumn,
  setSelectedPrimaryColumn,
  selectedSecondaryColumn,
  setSelectedSecondaryColumn,
}) => {
  const { t } = useTranslationI18()
  const primaryOptions = [
    { label: t('clients.content.column.avatar'), value: 'Avatar' },
    { label: t('clients.content.column.name'), value: 'Name' },
    { label: t('clients.content.column.email'), value: 'Email' },
    { label: t('clients.content.column.mobileNumber'), value: 'Mobile Number' },
    { label: t('clients.content.column.label'), value: 'Label' },
    { label: t('clients.content.column.dob'), value: 'Date of Birth' },
    { label: t('clients.content.column.postal'), value: 'Postal' },
    { label: t('clients.content.column.city'), value: 'City' },
  ]

  const secondaryOptions = [
    { label: t('clients.content.column.priceQuote'), value: 'Price Quote' },
    { label: t('clients.content.column.orderNotes'), value: 'Order Notes' },
    { label: t('clients.content.column.setupFee'), value: 'Setup Fee' },
  ]

  const content = () => {
    return (
      <CustomScrollbar autoHide={true} className={styles.customScrollbar}>
        <div className={styles.manageColumns}>
          <h5>{t('clients.content.manageColumns.primaryColumns')}</h5>
          <div className={styles.subColumns}>
            <Checkbox.Group
              options={primaryOptions}
              defaultValue={selectedPrimaryColumn}
              onChange={setSelectedPrimaryColumn}
            />
          </div>
          <h5>{t('clients.content.manageColumns.secondColumns')}</h5>
          <div className={styles.subColumns}>
            <Checkbox.Group
              options={secondaryOptions}
              defaultValue={selectedSecondaryColumn}
              onChange={setSelectedSecondaryColumn}
            />
          </div>
        </div>
      </CustomScrollbar>
    )
  }

  return (
    <Popover
      content={content}
      title={t('clients.content.button.manageColumns')}
      trigger={'click'}
      placement={'bottom'}
      overlayClassName={styles.manageColumnsModal}
    >
      {children}
    </Popover>
  )
}

export default ManageColumnsPopover
