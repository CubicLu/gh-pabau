import React, { PropsWithChildren } from 'react'
import { Modal, Spin } from 'antd'
import Button from '../button/Button'
import { Checkbox, ButtonTypes } from '@pabau/ui'
import styles from './BasicModal.module.less'
import { ModalProps } from 'antd/lib/modal'
import classNames from 'classnames'
import { LoadingOutlined } from '@ant-design/icons'
export interface BasicModalProps {
  onOk?: () => void
  onCancel?: () => void
  onDelete?: () => void
  visible?: boolean
  newButtonText?: string
  title?: React.ReactNode
  modalWidth?: number
  isValidate?: boolean
  footer?: boolean
  submitting?: boolean

  /**
   * Creates a special tickbox next to the OK button
   */
  onSpecialBooleanClick?: () => void

  /**
   * Creates a special tickbox next to the OK button
   */
  specialBooleanLabel?: string

  /**
   * Creates a special tickbox next to the OK button
   */
  specialBooleanValue?: boolean

  dangerButtonText?: string
  newButtonDisable?: boolean
  btnType?: ButtonTypes
  modalBodyClass?: string
  loading?: boolean
  hasScroll?: boolean
}

export function BasicModal({
  onOk,
  onCancel,
  onDelete,
  visible,
  children,
  title,
  modalWidth,
  specialBooleanLabel,
  specialBooleanValue,
  onSpecialBooleanClick,
  newButtonText,
  newButtonDisable = false,
  dangerButtonText,
  isValidate = true,
  footer = true,
  wrapClassName,
  submitting = false,
  btnType = ButtonTypes.primary,
  modalBodyClass,
  loading,
  hasScroll = false,
  ...props
}: PropsWithChildren<BasicModalProps & ModalProps>): JSX.Element {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={() => onOk?.()}
      onCancel={() => onCancel?.()}
      footer={null}
      cancelText={null}
      width={modalWidth}
      // destroyOnClose={true}
      // modalRender={(E) => E}
      wrapClassName={classNames(styles.modal, wrapClassName)}
      {...props}
    >
      <div
        className={
          hasScroll
            ? classNames(modalBodyClass)
            : classNames(styles.modalContent, modalBodyClass)
        }
      >
        {children}
      </div>
      {footer && (
        <div className={styles.modalFooter}>
          {specialBooleanLabel && onSpecialBooleanClick && (
            <Checkbox
              defaultChecked={specialBooleanValue}
              onClick={onSpecialBooleanClick}
            >
              {specialBooleanLabel}
            </Checkbox>
          )}
          {dangerButtonText && (
            <Button
              type="default"
              className={classNames(styles.deleteBtnStyle, styles.btnStyle)}
              onClick={() => onDelete?.()}
            >
              {dangerButtonText}
            </Button>
          )}
          {newButtonText && (
            <Button
              type={btnType}
              className={classNames(styles.btnStyle, loading && styles.loading)}
              disabled={newButtonDisable || !isValidate || submitting}
              onClick={() => {
                submitting = true
                !loading && onOk?.()
                submitting = false
              }}
            >
              {loading && (
                <Spin spinning={loading} indicator={<LoadingOutlined />} />
              )}{' '}
              {newButtonText}
            </Button>
          )}
        </div>
      )}
    </Modal>
  )
}

export default BasicModal
