import { Input } from 'antd'
import React, { FC, useState } from 'react'
import { MacroModal, MacroItem } from '@pabau/ui'
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
  macroItems?: MacroItem[]
}

export const FormTextArea: FC<P> = ({
  title = '',
  desc = '',
  placeHolder = '',
  defaultValue = '',
  required = false,
  macro = false,
  onChangeTextValue,
  macroItems = [],
}) => {
  const [text, setText] = useState(defaultValue)
  const [showMacroDlg, setShowMacroDlg] = useState(false)

  const { t } = useTranslation('common')

  const onTextChange = (e) => {
    setText?.(e.target.value)
    onChangeTextValue?.(e.target.value)
  }

  const onShowMacroDlg = () => {
    setShowMacroDlg(true)
  }

  const onHideMacroDlg = () => {
    setShowMacroDlg(false)
  }

  const onAddMacro = (macro) => {
    console.log('macro', macro)
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
        visible={showMacroDlg}
        preMacroItems={macroItems}
      />
    </div>
  )
}

export default FormTextArea
