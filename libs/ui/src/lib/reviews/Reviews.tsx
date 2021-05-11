import { Skeleton, Table } from 'antd'
import React, { FC, ReactNode } from 'react'
import { PabauPlus } from '../badge/Badge'
import styles from './Reviews.module.less'

export interface ReviewFieldType {
  icon: ReactNode
  score: string
  reviews: number
  mostRecent: string
  isPlus: boolean
  key: number
}

export interface ReviewsProps {
  loading?: boolean
  sourceFieldTitle?: string
  scoreFieldTitle?: string
  reviewFieldTitle?: string
  mostRecentTitle?: string
  fields?: ReviewFieldType[]
}

export const Reviews: FC<ReviewsProps> = ({
  loading,
  sourceFieldTitle,
  scoreFieldTitle,
  reviewFieldTitle,
  mostRecentTitle,
  fields,
}) => {
  const columns = [
    {
      title: sourceFieldTitle,
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: scoreFieldTitle,
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: reviewFieldTitle,
      dataIndex: 'reviews',
      key: 'reviews',
    },
    {
      title: mostRecentTitle,
      dataIndex: 'mostRecent',
      key: 'mostRecent',
    },
    {
      title: '',
      dataIndex: 'isPlus',
      key: 'isPlus',
      // eslint-disable-next-line react/display-name
      render: (text, record) =>
        record.isPlus && <PabauPlus label="Plus" modalType="Marketing" />,
    },
  ]

  return (
    <div className={styles.reviewsWrapper}>
      {loading ? (
        <Table
          rowKey="key"
          pagination={false}
          dataSource={[...Array.from({ length: 3 })].map((_, index) => ({
            key: `key${index}`,
          }))}
          columns={columns.map((column) => {
            return {
              ...column,
              render: function renderPlaceholder() {
                switch (column.dataIndex) {
                  case 'icon':
                    return <Skeleton.Avatar active />
                  case 'score':
                    return <Skeleton.Input active className={styles.input} />
                  case 'reviews':
                    return <Skeleton.Input active className={styles.input} />
                  case 'mostRecent':
                    return <Skeleton.Input active className={styles.input} />
                  default:
                    return <Skeleton.Input active className={styles.input} />
                }
              },
            }
          })}
        />
      ) : (
        <Table columns={columns} dataSource={fields} pagination={false} />
      )}
    </div>
  )
}

export default Reviews
