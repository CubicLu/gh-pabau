import { TabMenu } from '@pabau/ui'
import { Modal } from 'antd'
import cn from 'classnames'
import { Button, ButtonTypes } from '@pabau/ui'
import React, { FC } from 'react'
import styles from './MacroCreateModal.module.less'
import { useTranslation } from 'react-i18next'

export interface MacroCreateModalProps {
  title?: string
  visible?: boolean
  onClose?: () => void
}

export const MacroCreateModal: FC<MacroCreateModalProps> = ({
  title = 'Create a macro',
  visible = true,
  onClose = () => console.log(),
}) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.macroCreateWrap}>
      <Modal
        title={title}
        visible={visible}
        footer={null}
        className={styles.macroCreateModal}
        onCancel={() => onClose()}
      >
        {'Create Macro'}
      </Modal>
    </div>
  )
}
