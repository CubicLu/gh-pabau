import React, { FC, useEffect, useState, ReactNode } from 'react'
import { useMedia } from 'react-use'
import { Button, TabMenu } from '@pabau/ui'
import { Modal, Switch, Popover } from 'antd'
import { LeftOutlined, MoreOutlined } from '@ant-design/icons'
import styles from './FullScreenReportModal.module.less'

export enum OperationType {
  vat = 'vat',
  active = 'active',
  reset = 'reset',
  save = 'save',
  delete = 'delete',
  create = 'create',
  cancel = 'cancel',
}

export interface FullScreenReportModalProps {
  title: ReactNode
  visible: boolean
  operations: Array<OperationType>
  onVatRegistered?: (val: boolean) => void
  onActivated?: (val: boolean) => void
  onBackClick?: () => void
  onSave?: () => void
  onCreate?: () => void
  onCancel?: () => void
  onReset?: () => void
  onDelete?: () => void
  deleteBtnText?: string
  createBtnText?: string
  saveBtnText?: string
  cancelBtnText?: string
  resetBtnText?: string
  enableCreateBtn?: boolean
  activated?: boolean
  vatRegistered?: boolean
  subMenu?: Array<ReactNode>
}

export const FullScreenReportModal: FC<FullScreenReportModalProps> = ({
  title,
  visible,
  operations = [],
  onBackClick,
  onVatRegistered,
  onActivated,
  onSave,
  onCreate,
  onCancel,
  onReset,
  onDelete,
  deleteBtnText,
  createBtnText,
  saveBtnText,
  cancelBtnText,
  resetBtnText,
  enableCreateBtn,
  activated,
  vatRegistered,
  subMenu = [],
  children,
}) => {
  const isMobile = useMedia('(max-width: 767px)', false)
  const [vat, setVat] = useState(true)
  const [active, setActive] = useState(true)
  const handleChangeVat = (checked) => {
    setVat(checked)
    onVatRegistered?.(checked)
  }
  const handleChangeActive = (checked) => {
    setActive(checked)
    onActivated?.(checked)
  }
  const mobileVersionOperations = () => (
    <div className={styles.mobileVersionOperations}>
      {operations.map((operation) => (
        <React.Fragment key={operation}>
          {operation === OperationType.vat && (
            <div
              className={styles.operationSwitch}
              style={{ marginBottom: '8px' }}
            >
              VAT registered{' '}
              <Switch
                size="small"
                checked={vat}
                onChange={(checked) => handleChangeVat(checked)}
                style={{ marginLeft: '12px' }}
              />
            </div>
          )}
          {operation === OperationType.active && (
            <div
              className={styles.operationSwitch}
              style={{ marginBottom: '8px' }}
            >
              Active{' '}
              <Switch
                size="small"
                checked={active}
                onChange={(checked) => handleChangeActive(checked)}
                style={{ marginLeft: '12px' }}
              />
            </div>
          )}
          {operation === OperationType.reset && (
            <Button onClick={() => onReset?.()} style={{ marginBottom: '8px' }}>
              {resetBtnText || 'Reset'}
            </Button>
          )}
          {operation === OperationType.delete && (
            <Button
              onClick={() => onDelete?.()}
              style={{ marginBottom: '8px' }}
            >
              {deleteBtnText || 'Delete'}
            </Button>
          )}
          {operation === OperationType.save && (
            <Button onClick={() => onSave?.()} style={{ marginBottom: '8px' }}>
              {saveBtnText || 'Save'}
            </Button>
          )}
          {operation === OperationType.cancel && (
            <Button
              onClick={() => onCancel?.()}
              style={{ marginBottom: '8px' }}
            >
              {cancelBtnText || 'Cancel'}
            </Button>
          )}
          {operation === OperationType.create && (
            <Button
              type="primary"
              disabled={!enableCreateBtn}
              onClick={() => onCreate?.()}
            >
              {createBtnText || 'Create'}
            </Button>
          )}
        </React.Fragment>
      ))}
    </div>
  )
  useEffect(() => {
    setVat(vatRegistered || false)
    setActive(activated || false)
  }, [activated, vatRegistered])
  return visible ? (
    <Modal
      visible={visible}
      closable={false}
      footer={null}
      width={'100%'}
      wrapClassName={styles.fullScreenModal}
    >
      <>
        <div className={styles.fullScreenModalHeader}>
          <div>
            <LeftOutlined
              onClick={() => onBackClick?.()}
              style={{
                color: 'var(--light-grey-color)',
                marginRight: '24px',
                fontSize: '24px',
              }}
            />
            {title}
          </div>
          <div className={styles.fullScreenModalOps}>
            {!isMobile &&
              operations.map((operation) => (
                <React.Fragment key={operation}>
                  {operation === OperationType.vat && (
                    <div className={styles.operationSwitch}>
                      VAT registered{' '}
                      <Switch
                        size="small"
                        checked={vat}
                        onChange={(checked) => handleChangeVat(checked)}
                        style={{ marginLeft: '12px' }}
                      />
                    </div>
                  )}
                  {operation === OperationType.active && (
                    <div className={styles.operationSwitch}>
                      Active{' '}
                      <Switch
                        size="small"
                        checked={active}
                        onChange={(checked) => handleChangeActive(checked)}
                        style={{ marginLeft: '12px' }}
                      />
                    </div>
                  )}
                  {operation === OperationType.reset && (
                    <Button
                      onClick={() => onReset?.()}
                      style={{ marginRight: '1rem' }}
                    >
                      {resetBtnText || 'Reset'}
                    </Button>
                  )}
                  {operation === OperationType.delete && (
                    <Button
                      onClick={() => onDelete?.()}
                      style={{ marginRight: '1rem' }}
                    >
                      {deleteBtnText || 'Delete'}
                    </Button>
                  )}
                  {operation === OperationType.save && (
                    <Button
                      onClick={() => onSave?.()}
                      style={{ marginRight: '1rem' }}
                    >
                      {saveBtnText || 'Save'}
                    </Button>
                  )}
                  {operation === OperationType.cancel && (
                    <Button
                      onClick={() => onCancel?.()}
                      style={{ marginRight: '1rem' }}
                    >
                      {cancelBtnText || 'Cancel'}
                    </Button>
                  )}
                  {operation === OperationType.create && (
                    <Button
                      type="primary"
                      disabled={!enableCreateBtn}
                      onClick={() => onCreate?.()}
                    >
                      {createBtnText || 'Create'}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            {isMobile && (
              <Popover
                content={mobileVersionOperations}
                placement="bottomRight"
              >
                <div className={styles.moreButton}>
                  <MoreOutlined />
                </div>
              </Popover>
            )}
          </div>
        </div>
        <div className={styles.fullScreenModalBody}>
          {subMenu.length > 0 && Array.isArray(children) ? (
            <TabMenu menuItems={subMenu} tabPosition="top" minHeight="1px">
              {children
                ? children.map((child, i) => (
                    <div className={styles.tabPaneItem} key={i}>
                      {child}
                    </div>
                  ))
                : subMenu.map((menu, i) => (
                    <div className={styles.tabPaneItem} key={i}>
                      {menu}
                    </div>
                  ))}
            </TabMenu>
          ) : (
            children
          )}
        </div>
      </>
    </Modal>
  ) : (
    <div />
  )
}

export default FullScreenReportModal
