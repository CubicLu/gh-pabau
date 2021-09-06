import { Modal, List } from 'antd'
import { MacroItem } from '@pabau/ui'
import React, { FC } from 'react'
import styles from './MacroManageModal.module.less'
import { useTranslation } from 'react-i18next'

export interface MacroManageModalProps {
  title?: string
  visible?: boolean
  onClose?: () => void
  macroItems: MacroItem[]
}

export const MacroManageModal: FC<MacroManageModalProps> = ({
  title = 'Manage macros',
  visible = true,
  onClose = () => console.log(),
  macroItems = [],
}) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.macroMangeWrap}>
      <Modal
        title={title}
        visible={visible}
        className={styles.macroManageModal}
        onCancel={() => onClose()}
        footer={null}
      >
        <List
          dataSource={macroItems}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <div>
                {item.title} - {item.message}
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  )
}
