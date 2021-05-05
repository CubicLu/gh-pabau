import { CheckCircleOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import React, { FC, useEffect, useState } from 'react'

import styles from './TagPanel.module.less'

export interface TagItem {
  name: string
  label: string
  icon: unknown
  color: string
  enable: boolean
}

const tempTagItems = [
  {
    name: 'success',
    label: 'success',
    icon: <CheckCircleOutlined />,
    color: 'success',
    enable: true,
  },
  {
    name: 'processing',
    label: 'processing',
    icon: <CheckCircleOutlined />,
    color: 'processing',
    enable: true,
  },
  {
    name: 'error',
    label: 'error',
    icon: <CheckCircleOutlined spin />,
    color: 'error',
    enable: true,
  },
]
export interface TagPanelProps {
  _tagItems?: TagItem[]
}

export const TagPanel: FC<TagPanelProps> = ({ _tagItems = tempTagItems }) => {
  const [tagItems, setTagItems] = useState(_tagItems)
  useEffect(() => {
    console.log('items', _tagItems)
    setTagItems(_tagItems)
  }, [_tagItems])

  const DocTag = (_tag, key) => {
    const tag = _tag.tag
    return (
      <Tag icon={tag.icon} color={tag.color}>
        {tag.label}
      </Tag>
    )
  }

  return (
    <div className={styles.tagContainer}>
      {tagItems.length > 0 ? (
        <div className={styles.tagLabel}>{'Merge tags'}</div>
      ) : null}
      <div className={styles.tagList}>
        {tagItems.map((tag, key) =>
          key < 5 ? <DocTag tag={tag} key={key} /> : null
        )}
      </div>
      {tagItems.length > 0 ? (
        <div className={styles.tagSubtitle}>
          {'We found ' + tagItems.length + ' merge tags'}
        </div>
      ) : null}
    </div>
  )
}

export default TagPanel
