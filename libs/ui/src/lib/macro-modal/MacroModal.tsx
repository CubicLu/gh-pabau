import {
  Button,
  ButtonTypes,
  MacroItem,
  MacroCreateModal,
  MacroManageModal,
} from '@pabau/ui'
import { Modal, Row, Col } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import { macroList } from './data'
import styles from './MacroModal.module.less'
import { useTranslation } from 'react-i18next'
import { LockOutlined } from '@ant-design/icons'

interface MacroModalProps {
  title?: string
  preMacroItems?: MacroItem[]
  onAdd?: (macro: MacroItem) => void
  onClose?: () => void
  visible?: boolean
  onSaveMacroItems?: (macros: MacroItem[]) => void
}

export const MacroModal: FC<MacroModalProps> = ({
  title = 'Add a Macro',
  preMacroItems = [],
  // preMacroItems = macroList,
  onAdd = (macro: MacroItem) => console.log(),
  onClose = () => console.log(),
  onSaveMacroItems = (macros: MacroItem[]) => console.log(),
  visible = false,
}) => {
  const { t } = useTranslation('common')
  const [showSelfDlg, setShowSelfDlg] = useState(false)
  const [showMacroCreateDlg, setShowMacroCreateDlg] = useState(false)
  const [showMacroManageDlg, setShowMacroManageDlg] = useState(false)
  const [macroItems, setMacroItems] = useState<MacroItem[]>(macroList)
  const [macroMessage, setMacroMessage] = useState('')

  useEffect(() => {
    setShowSelfDlg(visible)
  }, [visible])

  useEffect(() => {
    setMacroItems(preMacroItems)
  }, [preMacroItems])

  const onMouseEnterHandle = (e, macro: MacroItem) => {
    setMacroMessage(macro.message)
  }

  const onMouseOutHandle = (e) => {
    setMacroMessage('')
  }

  const onAddMacro = (e, macro: MacroItem) => {
    setShowSelfDlg(false)
    onAdd?.(macro)
  }

  const MacroList = () => (
    <Row className={styles.macroListWrap}>
      <Col span={8} order={1} className={styles.macroListLeft}>
        <ul className={styles.macroList}>
          {macroItems.map((item, _Index) => (
            <li
              key={'macro-' + _Index}
              className={styles.macroListItem}
              onMouseEnter={(e) => onMouseEnterHandle(e, item)}
              onMouseOut={(e) => onMouseOutHandle(e)}
              onClick={(e) => onAddMacro(e, item)}
            >
              <div className={styles.macroListPadding}></div>
              <div className={styles.macroListMain}>
                <span>{item.title}</span>
                {item.type === 1 && (
                  <span style={{ float: 'right' }}>
                    <LockOutlined />
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Col>
      <Col span={16} order={2} className={styles.macroListRight}>
        <div>
          {macroMessage.split('\n').map((item, key) => {
            return (
              <span key={'message-' + key}>
                {item}
                <br />
              </span>
            )
          })}
        </div>
      </Col>
    </Row>
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
    onSaveMacroItems?.([
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
    onSaveMacroItems?.(newMacroItems)
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
        {/* <TabMenuContent /> */}
        <MacroList />
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
