import {
  Button,
  ButtonTypes,
  TabMenu,
  MacroItem,
  MacroCreateModal,
  MacroManageModal,
} from '@pabau/ui'
import { Modal } from 'antd'
import React, { FC, ReactNode, useState, useEffect } from 'react'
import { macroList } from './data'
import styles from './MacroModal.module.less'
import { useTranslation } from 'react-i18next'
import { LockOutlined } from '@ant-design/icons'

export interface MacroModalProps {
  title?: string
  preMacroItems?: MacroItem[]
  onAdd?: (macro: string) => void
  onClose?: () => void
  visible?: boolean
}

export const MacroModal: FC<MacroModalProps> = ({
  title = 'Add a Macro',
  preMacroItems = [],
  onAdd = () => console.log(),
  onClose = () => console.log(),
  visible = true,
}) => {
  const { t } = useTranslation('common')
  const [showSelfDlg, setShowSelfDlg] = useState(false)
  const [showMacroCreateDlg, setShowMacroCreateDlg] = useState(false)
  const [showMacroManageDlg, setShowMacroManageDlg] = useState(false)
  const [macroItems, setMacroItems] = useState<MacroItem[]>([])

  useEffect(() => {
    setShowSelfDlg(visible)
  }, [visible])

  useEffect(() => {
    setMacroItems(preMacroItems)
  }, [preMacroItems])

  const menuListItem = (macroItem: MacroItem) => {
    return (
      <>
        <span style={{ float: 'left' }}>{macroItem.title}</span>
        {macroItem.type === 1 && (
          <span style={{ float: 'right' }}>
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
        <div key={_index}>{macro.message}</div>
      ))}
    </TabMenu>
  )

  const onClickMacro = () => {
    setShowMacroManageDlg(false)
    setShowSelfDlg(false)
    setShowMacroCreateDlg(true)
  }

  const onClickManage = () => {
    setShowSelfDlg(false)
    setShowMacroCreateDlg(false)
    setShowMacroManageDlg(true)
  }

  const onHideMacroCreateDlg = () => {
    setShowMacroCreateDlg(false)
    setShowMacroManageDlg(false)
    setShowSelfDlg(true)
  }

  const onHideMacroManageDlg = () => {
    setShowMacroCreateDlg(false)
    setShowMacroManageDlg(false)
    setShowSelfDlg(true)
  }

  const onCreateMacro = (macro: MacroItem) => {
    setMacroItems([
      ...macroItems,
      {
        id: macroItems.length + 1,
        title: macro.title,
        message: macro.message,
        type: macro.type,
        createdAt: macro.createdAt,
      },
    ])
    onHideMacroCreateDlg()
    // onAdd?.(macro.title)
  }

  const onDeleteMacro = (macroId: number) => {
    const macroIndex = macroItems.findIndex((item) => item.id === macroId)
    macroIndex !== -1 && macroItems.splice(macroIndex, 1)
    const newMacroItems = macroItems.map((item, _Index) => {
      return {
        id: _Index + 1,
        title: item.title,
        message: item.message,
        type: item.type,
        createdAt: item.createdAt,
      }
    })
    setMacroItems(newMacroItems)
  }

  return (
    <div className={styles.macroWrap}>
      <Modal
        title={title}
        visible={showSelfDlg}
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
      <MacroCreateModal
        title={t('ui.macro.modal.create.title')}
        onClose={onHideMacroCreateDlg}
        onCreateMacro={onCreateMacro}
        visible={showMacroCreateDlg}
      />
      <MacroManageModal
        title={t('ui.macro.modal.manage.title')}
        onClose={onHideMacroManageDlg}
        visible={showMacroManageDlg}
        macroItems={macroItems}
        onDeleteMacro={onDeleteMacro}
      />
    </div>
  )
}
