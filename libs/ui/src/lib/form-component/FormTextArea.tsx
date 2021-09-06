import { Input } from 'antd'
import React, { FC, useState } from 'react'
import {
  MacroModal,
  MacroCreateModal,
  MacroManageModal,
  MacroItem,
} from '@pabau/ui'
import { BookOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styles from './FormComponent.module.less'

const { TextArea } = Input

interface P {
  title: string
  desc: string
  placeHolder: string
  defaultValue: string
  required: boolean
  macro?: boolean
  onChangeTextValue?: (value: string) => void
}

export const FormTextArea: FC<P> = ({
  title = '',
  desc = '',
  placeHolder = '',
  defaultValue = '',
  required = false,
  macro = false,
  onChangeTextValue,
}) => {
  const [text, setText] = useState(defaultValue)
  const [showMacroDlg, setShowMacroDlg] = useState(false)
  const [showMacroCreateDlg, setShowMacroCreateDlg] = useState(false)
  const [showMacroManageDlg, setShowMacroManageDlg] = useState(false)

  const { t } = useTranslation('common')

  const onTextChange = (e) => {
    setText?.(e.target.value)
    onChangeTextValue?.(e.target.value)
  }

  const onShowMacroDlg = () => {
    setShowMacroCreateDlg(false)
    setShowMacroManageDlg(false)
    setShowMacroDlg(true)
  }

  const onHideMacroDlg = () => {
    setShowMacroDlg(false)
  }

  const onAddMacro = (macro) => {
    console.log('macro', macro)
  }

  const onShowMacroCreate = () => {
    setShowMacroDlg(false)
    setShowMacroManageDlg(false)
    setShowMacroCreateDlg(true)
  }

  const onHideMacroCreateDlg = () => {
    onShowMacroDlg()
  }

  const onShowMacroManage = () => {
    setShowMacroDlg(false)
    setShowMacroCreateDlg(false)
    setShowMacroManageDlg(true)
  }

  const onHideMacroManageDlg = () => {
    onShowMacroDlg()
  }

  const onCreateMacro = (macro: MacroItem) => {
    console.log('create macro =', macro)
  }

  return (
    <div className={`${styles.formTextArea} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentDescription}>{desc}</div>
      )}
      <div className={styles.formTextAreaValue}>
        <TextArea
          placeholder={placeHolder}
          onChange={onTextChange}
          value={text}
          rows={4}
          className={macro === true ? styles.customTextArea : ''}
        />
        {macro === true && (
          <div className={styles.macroBtn} onClick={onShowMacroDlg}>
            <BookOutlined />
          </div>
        )}
      </div>
      <MacroModal
        title={t('ui.macro.modal.title')}
        onAdd={onAddMacro}
        onClose={onHideMacroDlg}
        onShowMacroCreate={onShowMacroCreate}
        onShowMacroManage={onShowMacroManage}
        visible={showMacroDlg}
      />
      <MacroCreateModal
        title={t('ui.macro.modal.create')}
        onClose={onHideMacroCreateDlg}
        onCreateMacro={onCreateMacro}
        visible={showMacroCreateDlg}
      />
      <MacroManageModal
        title={t('ui.macro.modal.manage')}
        onClose={onHideMacroManageDlg}
        visible={showMacroManageDlg}
      />
    </div>
  )
}

export default FormTextArea
