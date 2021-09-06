import { DatePicker, Input, InputNumber } from 'antd'
import { BookOutlined } from '@ant-design/icons'
import React, { FC, useState } from 'react'
import {
  MacroModal,
  MacroCreateModal,
  MacroManageModal,
  MacroItem,
} from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import styles from './FormComponent.module.less'

interface P {
  title?: string
  desc?: string
  placeHolder?: string
  defaultValue?: string
  txtInputType?: string
  required?: boolean
  macro?: boolean
  onChangeTextValue?: (value: string) => void
}

export const FormTextField: FC<P> = ({
  title = '',
  desc = '',
  placeHolder = '',
  defaultValue = '',
  txtInputType = '',
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

  const onNumberChange = (e) => {
    setText?.(e)
    onChangeTextValue?.(e)
  }

  function onDateChange(date, dateString) {
    onChangeTextValue?.(dateString)
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
    <div className={`${styles.formTextField} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentDescription}>{desc}</div>
      )}
      <div className={styles.textFieldValue}>
        {(txtInputType === '' ||
          txtInputType === 'email' ||
          txtInputType === 'text') && (
          <Input
            placeholder={placeHolder}
            onChange={onTextChange}
            value={text}
            prefix={
              macro === true ? <BookOutlined onClick={onShowMacroDlg} /> : ''
            }
          />
        )}
        {txtInputType === 'number' && (
          <InputNumber
            placeholder={placeHolder}
            onChange={onNumberChange}
            value={Number(text)}
          />
        )}
        {txtInputType === 'date' && (
          <DatePicker style={{ width: '100%' }} onChange={onDateChange} />
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
        title={t('ui.macro.modal.create.title')}
        onClose={onHideMacroCreateDlg}
        onCreateMacro={onCreateMacro}
        visible={showMacroCreateDlg}
      />
      <MacroManageModal
        title={t('ui.macro.modal.manage.title')}
        onClose={onHideMacroManageDlg}
        visible={showMacroManageDlg}
      />
    </div>
  )
}

export default FormTextField
