import { MacroItem } from '@pabau/ui'
import { Modal, Input, Radio, Space } from 'antd'
import React, { FC, useState } from 'react'
import styles from './MacroCreateModal.module.less'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

const { TextArea } = Input

interface MacroCreateModalProps {
  title?: string
  visible?: boolean
  onClose?: () => void
  onCreateMacro?: (macro: MacroItem) => void
}
const defaultMacro: MacroItem = {
  id: 0,
  title: '',
  message: '',
  type: 0,
  createdAt: '',
}

export const MacroCreateModal: FC<MacroCreateModalProps> = ({
  title = 'Create a macro',
  visible = true,
  onClose = () => console.log(),
  onCreateMacro = (macro: MacroItem) => console.log(),
}) => {
  const { t } = useTranslation('common')
  const [focusTitle, setFocusTitle] = useState(false)
  const [focusMessage, setFocusMessage] = useState(false)
  const [macro, setMacro] = useState<MacroItem>(defaultMacro)

  const onOk = () => {
    macro.createdAt = dayjs().format('DD MMM YYYY')
    onCreateMacro?.(macro)
    setMacro(defaultMacro)
  }
  const onCancel = () => {
    setMacro(defaultMacro)
    onClose?.()
  }
  const handleChangeTitle = (value) => {
    const tempMacro = { ...macro, title: value }
    setMacro(tempMacro)
  }

  const handleChangeMessage = (value) => {
    const tempMacro = { ...macro, message: value }
    setMacro(tempMacro)
  }

  const handleChangeType = (value) => {
    const tempMacro = { ...macro, type: value }
    setMacro(tempMacro)
  }

  return (
    <div className={styles.macroCreateWrap}>
      <Modal
        title={title}
        visible={visible}
        className={styles.macroCreateModal}
        onCancel={() => onCancel()}
        onOk={() => onOk()}
        okText={t('ui.macro.modal.create.save')}
        cancelText={t('ui.macro.modal.create.cancel')}
      >
        <div className={styles.macroCreateContainer}>
          <div className={styles.titleContainer}>
            {focusTitle && (
              <span className={styles.title}>
                {t('ui.macro.modal.create.placeholder.title')}
              </span>
            )}
            <Input
              placeholder={
                focusTitle ? '' : t('ui.macro.modal.create.placeholder.title')
              }
              onChange={(e) => handleChangeTitle(e.target.value)}
              onFocus={(e) => setFocusTitle(true)}
              onBlur={(e) => setFocusTitle(false)}
              value={macro.title}
            />
          </div>
          <div className={styles.messageContainer}>
            {focusMessage && (
              <span className={styles.message}>
                {t('ui.macro.modal.create.placeholder.message')}
              </span>
            )}
            <TextArea
              placeholder={
                focusMessage
                  ? ''
                  : t('ui.macro.modal.create.placeholder.message')
              }
              onChange={(e) => handleChangeMessage(e.target.value)}
              onFocus={(e) => setFocusMessage(true)}
              onBlur={(e) => setFocusMessage(false)}
              rows={10}
              value={macro.message}
            />
          </div>
          <div className={styles.typeContainer}>
            <Radio.Group
              onChange={(e) => handleChangeType(e.target.value)}
              value={macro.type}
            >
              <Space direction="vertical">
                <Radio value={0}>
                  {t('ui.macro.modal.create.type.everywhere')}
                </Radio>
                <Radio value={1}>
                  {t('ui.macro.modal.create.type.myself')}
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
      </Modal>
    </div>
  )
}
