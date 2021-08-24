import { Tooltip, Modal } from 'antd'
import React, { FC } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface P {
  title: string
  tooltip: string
  visible: boolean
  children?: React.ReactNode
  loading?: boolean
  onClose: () => void
  onSubmit: (state: boolean) => void
}

export const ConfirmationDialog: FC<P> = ({
  visible,
  title,
  loading = false,
  tooltip,
  children,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation('common')
  return (
    <Modal
      width={682}
      centered={true}
      onCancel={() => {
        onClose?.()
      }}
      onOk={() => {
        onSubmit(true)
      }}
      visible={visible}
      title={
        <span>
          {title}
          <Tooltip placement="top" title={tooltip}>
            <QuestionCircleOutlined style={{ marginLeft: 10, fontSize: 16 }} />
          </Tooltip>
        </span>
      }
      okText={t('common-label-confirm')}
      confirmLoading={loading}
      destroyOnClose={true}
      cancelText={t('common-label-cancel')}
    >
      {children}
    </Modal>
  )
}
