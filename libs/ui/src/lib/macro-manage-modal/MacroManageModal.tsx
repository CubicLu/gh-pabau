import { Modal, List, Checkbox, Select } from 'antd'
import { MacroItem } from '@pabau/ui'
import React, { FC, useState, useEffect } from 'react'
import { DeleteOutlined, LockOutlined } from '@ant-design/icons'
import styles from './MacroManageModal.module.less'
import { useTranslation } from 'react-i18next'

const { Option } = Select

interface MacroManageModalProps {
  title?: string
  visible?: boolean
  onClose?: () => void
  macroItems?: MacroItem[]
  onDeleteMacro?: (id: number) => void
}

export const MacroManageModal: FC<MacroManageModalProps> = ({
  title = 'Manage macros',
  visible = false,
  onClose = () => console.log(),
  macroItems = [],
  onDeleteMacro = (id: number) => console.log(),
}) => {
  const { t } = useTranslation('common')
  const [manageMacroItems, setManageMacroItems] = useState<MacroItem[]>([])
  useEffect(() => {
    setManageMacroItems(macroItems)
  }, [macroItems])

  const onHandleChangeType = (type) => {
    if (typeof type === 'undefined') {
      setManageMacroItems(macroItems)
    } else {
      const filteredMacroItems = macroItems.filter(
        (item) => item.type === Number(type)
      )
      setManageMacroItems(filteredMacroItems)
    }
  }

  const onHandeMacroItemDelete = (macroId) => {
    onDeleteMacro?.(macroId)
  }

  return (
    <div className={styles.macroMangeWrap}>
      <Modal
        title={title}
        visible={visible}
        className={styles.macroManageModal}
        onCancel={() => onClose?.()}
        footer={null}
      >
        <List
          dataSource={manageMacroItems}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <div className={styles.macroItemWrap}>
                <div className={styles.macroItemTitle}>
                  <Checkbox>{item.title}</Checkbox>
                </div>
                <div className={styles.macroItemType}>
                  {item.type === 1 && <LockOutlined />}
                </div>
                <div className={styles.macroItemCreated}>{item.createdAt}</div>
                <div
                  className={styles.macroItemDelete}
                  onClick={(e) => onHandeMacroItemDelete(item.id)}
                >
                  <DeleteOutlined />
                </div>
              </div>
            </List.Item>
          )}
        />
        <Select
          className={styles.macroVisibility}
          onChange={onHandleChangeType}
          allowClear
        >
          <Option value="0">
            {t('ui.macro.modal.create.type.everywhere')}
          </Option>
          <Option value="1">{t('ui.macro.modal.create.type.myself')}</Option>
        </Select>
      </Modal>
    </div>
  )
}
