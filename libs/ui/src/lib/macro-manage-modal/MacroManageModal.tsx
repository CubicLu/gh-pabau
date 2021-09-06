import { TabMenu } from '@pabau/ui'
import { Modal } from 'antd'
import cn from 'classnames'
import { Button, ButtonTypes } from '@pabau/ui'
import React, { FC } from 'react'
import styles from './MacroManageModal.module.less'
import { useTranslation } from 'react-i18next'

export interface MacroManageModalProps {
  title?: string
  visible?: boolean
  onClose?: () => void
}

export const MacroManageModal: FC<MacroManageModalProps> = ({
  title = 'Manage macros',
  visible = true,
  onClose = () => console.log(),
}) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.macroMangeWrap}>
      <Modal
        title={title}
        visible={visible}
        className={styles.macroManageModal}
        onCancel={() => onClose()}
      >
        {'Manage Macros'}
      </Modal>
    </div>
  )
}
