import React, { FC } from 'react'
import { Pagination as AntPagination, Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { PaginationProps as AntPaginationProps } from 'antd/es/pagination'
import styles from './Pagination.module.less'

interface PaginationProps {
  showingRecords: number
  onPageSizeChange?: (pageSize?: number) => void
}
export const Pagination: FC<PaginationProps & AntPaginationProps> = ({
  showingRecords,
  onPageSizeChange,
  ...props
}) => {
  const pageSizes = [10, 25, 50, 100]
  const pageSizesMenu = (
    <Menu>
      {pageSizes.map((pageSize, key) => (
        <Menu.Item
          key={`page-size-${key}`}
          onClick={() => onPageSizeChange?.(pageSize)}
        >
          {pageSize}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div className={styles.tableFooter}>
      <div className={styles.showWrapper}>
        <p className={styles.paginationText}>
          Showing <span>{showingRecords}</span> results from{' '}
          <span>{props.total}</span>
        </p>
        <p className={styles.paginationText}>
          Rows per page <span>{props.pageSize}</span>
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
      <AntPagination {...props} className={styles.tblPagination} />
    </div>
  )
}
