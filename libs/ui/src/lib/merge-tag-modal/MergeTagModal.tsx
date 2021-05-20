import { TabMenu } from '@pabau/ui'
import { Modal } from 'antd'
import React, { FC } from 'react'
import { tagList, TagModule, TagModuleItems } from './data'
import styles from './MergeTagModal.module.less'

export interface MergeTagModalProps {
  title?: string
  tagModuleItems?: TagModuleItems
  onAdd?: (tag: TagModule, key: string, index: number) => void
  onClose?: () => void
  visible?: boolean
  selectedTag?: string
  activeDefaultKey?: string
  disabledTags: number[]
}

export const MergeTagModal: FC<MergeTagModalProps> = ({
  title = 'Add a Personalization',
  tagModuleItems = tagList,
  onAdd = () => console.log(),
  onClose = () => console.log(),
  visible = true,
  selectedTag = '',
  activeDefaultKey = '0',
  disabledTags = [],
}) => {
  const onClick = (tag: TagModule, key: string, index: number) => {
    onAdd(tag, key, index)
  }

  const menuList = (tagModuleItems: TagModuleItems) => {
    const _temp: string[] = []
    for (let i = 0; i < Object.keys(tagModuleItems).length; i++) {
      _temp.push(tagModuleItems[Object.keys(tagModuleItems)[i]].displayName)
    }
    return _temp
  }

  const TabMenuContent = (args: unknown) => (
    <TabMenu
      {...args}
      activeDefaultKey={activeDefaultKey}
      menuItems={menuList(tagModuleItems)}
      disabledKeys={disabledTags}
    >
      {Object.keys(tagModuleItems).map((key) => (
        <div key={key} className={styles.tagContent}>
          {tagModuleItems[key].items.map((tag, _index) => (
            <div
              className={
                tag.selected || tag.tag === selectedTag
                  ? styles.tagItemContentActive
                  : styles.tagItemContent
              }
              key={_index}
              onClick={() => onClick(tag, key, _index)}
            >
              {tag.name}
              {tag.selected || tag.tag === selectedTag ? ' - clicked' : null}
            </div>
          ))}
        </div>
      ))}
    </TabMenu>
  )

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => onClose()}
      footer={null}
      className={styles.mergeTagModal}
    >
      <TabMenuContent />
    </Modal>
  )
}
