import { Button, ButtonTypes, TabMenu, MacroItem } from '@pabau/ui'
import { Modal } from 'antd'
import React, { FC, ReactNode } from 'react'
import { macroList } from './data'
import styles from './MacroModal.module.less'
import { useTranslation } from 'react-i18next'
import { LockOutlined } from '@ant-design/icons'

export interface MacroModalProps {
  title?: string
  macroItems?: MacroItem[]
  onAdd?: (macroItem: MacroItem) => void
  onShowMacroCreate?: () => void
  onShowMacroManage?: () => void
  onClose?: () => void
  visible?: boolean
}

export const MacroModal: FC<MacroModalProps> = ({
  title = 'Add a Macro',
  macroItems = macroList,
  onAdd = () => console.log(),
  onShowMacroCreate = () => console.log(),
  onShowMacroManage = () => console.log(),
  onClose = () => console.log(),
  visible = true,
}) => {
  const { t } = useTranslation('common')

  const onClick = (macro: MacroItem) => {
    onAdd?.(macro)
  }

  const menuListItem = (macroItem: MacroItem) => {
    return (
      <>
        <span className={styles.macroMenuListTitle}>{macroItem.title}</span>
        {macroItem.type === 1 && (
          <span className={styles.macroMenuListLock}>
            <LockOutlined />
          </span>
        )}
      </>
    )
  }

  const menuList = (macroItems: MacroItem[]) => {
    const _temp: Array<ReactNode> = []
    for (const macroItem of macroItems) {
      _temp.push(menuListItem(macroItem))
    }
    return _temp
  }

  const TabMenuContent = (args: unknown) => (
    <TabMenu {...args} menuItems={menuList(macroItems)}>
      {macroItems.map((macro, _index) => (
        <div key={_index} onClick={() => onClick(macro)}>
          {macro.message}
        </div>
      ))}
    </TabMenu>
  )

  const onClickMacro = () => {
    onShowMacroCreate?.()
  }

  const onClickManage = () => {
    onShowMacroManage?.()
  }

  return (
    <div className={styles.macroWrap}>
      <Modal
        title={title}
        visible={visible}
        onCancel={() => onClose()}
        footer={null}
        className={styles.macroModal}
      >
        <TabMenuContent />
        <Button
          type={ButtonTypes.primary}
          className={styles.createButton}
          onClick={onClickMacro}
        >
          {t('ui.macro.modal.create')}
        </Button>
        <Button
          type={ButtonTypes.default}
          className={styles.manageButton}
          onClick={onClickManage}
        >
          {t('ui.macro.modal.manage')}
        </Button>
      </Modal>
    </div>
  )
}
