import React, { FC } from 'react'
import { Pagination as AntPagination, Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { PaginationProps as AntPaginationProps } from 'antd/es/pagination'
import styles from './Pagination.module.less'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

interface PaginationProps {
  showingRecords: number
  pageSizeOptions?: string[]
  onPageSizeChange?: (pageSize?: number) => void
  customClass?: string
}
export const Pagination: FC<PaginationProps & AntPaginationProps> = ({
  showingRecords,
  pageSizeOptions,
  onPageSizeChange,
  customClass = '',
  ...props
}) => {
  const { t } = useTranslation('common')
  const pageSizesMenu = (
    <Menu>
      {pageSizeOptions?.map((pageSize, key) => (
        <Menu.Item
          key={`page-size-${key}`}
          onClick={() => onPageSizeChange?.(Number(pageSize))}
        >
          {pageSize}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div className={classNames(styles.tableFooter, customClass)}>
      <div className={styles.showWrapper}>
        <p className={styles.paginationText}>
          {t('crud-table-pagination-text-showing')}{' '}
          <span>{showingRecords}</span>
          {t('crud-table-pagination-text-results')} <span>{props.total}</span>
        </p>
        <p className={styles.paginationText}>
          {t('crud-table-pagination-test-displaying')}{' '}
          <span>{props.pageSize}</span>
          <Dropdown
            overlay={pageSizesMenu}
            trigger={['click']}
            placement="bottomCenter"
            arrow
          >
            <DownOutlined />
          </Dropdown>
        </p>
      </div>
      <AntPagination
        {...props}
        className={styles.tblPagination}
        showSizeChanger={false}
      />
    </div>
  )
}
