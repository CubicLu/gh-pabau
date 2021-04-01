import React, { FC, useEffect, useState, ReactNode, useRef } from 'react'
import { useMedia } from 'react-use'
import className from 'classnames'
import { Button, TabMenu } from '@pabau/ui'
import { Switch, Modal } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import styles from './FullScreenReportModal.module.less'

export enum OperationType {
  active = 'active',
  reset = 'reset',
  save = 'save',
  delete = 'delete',
  create = 'create',
}

export interface FullScreenReportModalProps {
  title: ReactNode
  visible: boolean
  operations: Array<OperationType>
  onActivated?: (val: boolean) => void
  onBackClick?: () => void
  onSave?: () => void
  onCreate?: () => void
  onReset?: () => void
  onDelete?: () => void
  activeBtnText?: string
  deleteBtnText?: string
  createBtnText?: string
  saveBtnText?: string
  resetBtnText?: string
  enableCreateBtn?: boolean
  activated?: boolean
  subMenu?: Array<ReactNode>
  footer?: boolean
}

export const FullScreenReportModal: FC<FullScreenReportModalProps> = ({
  title,
  visible,
  operations = [],
  onBackClick,
  onActivated,
  onSave,
  onCreate,
  onReset,
  onDelete,
  deleteBtnText,
  createBtnText,
  saveBtnText,
  resetBtnText,
  activeBtnText,
  enableCreateBtn,
  activated,
  subMenu = [],
  children,
  ...props
}) => {
  const ref = useRef(null)
  const isMobile = useMedia('(max-width: 767px)', false)
  const [active, setActive] = useState(true)
  const handleChangeActive = (checked) => {
    setActive(checked)
    onActivated?.(checked)
  }
  const handleClickBack = () => {
    onBackClick?.()
  }
  useEffect(() => {
    setActive(activated || false)
  }, [activated])
  return visible ? (
    <Modal
      visible={visible}
      closable={false}
      footer={null}
      width={'100%'}
      className={className(styles.fullScreenModal, 'fullScreenModal')}
    >
      <div className={styles.fullScreenModalContainer} ref={ref}>
        <div className={styles.fullScreenModalHeader}>
          <div>
            <LeftOutlined
              onClick={() => handleClickBack()}
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
                  {operation === OperationType.active && (
                    <div className={styles.operationSwitch}>
                      {activeBtnText || 'Active'}
                      <Switch
                        size="small"
                        checked={active}
                        onChange={(checked) => handleChangeActive(checked)}
                        style={{ marginLeft: '12px' }}
                      />
                    </div>
                  )}
                  {!active && operation === OperationType.reset && (
                    <Button
                      onClick={() => onReset?.()}
                      style={{ marginRight: '1rem' }}
                    >
                      {resetBtnText || 'Reset'}
                    </Button>
                  )}
                  {!active && operation === OperationType.delete && (
                    <Button
                      onClick={() => onDelete?.()}
                      style={{ marginRight: '1rem' }}
                      type="text"
                      danger
                    >
                      {deleteBtnText || 'Delete'}
                    </Button>
                  )}
                  {!active && operation === OperationType.save && (
                    <Button
                      onClick={() => onSave?.()}
                      style={{ marginRight: '1rem' }}
                    >
                      {saveBtnText || 'Save'}
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
            {isMobile && operations.includes(OperationType.active) && (
              <div className={styles.operationSwitch}>
                {activeBtnText || 'Active'}
                <Switch
                  size="small"
                  checked={active}
                  onChange={(checked) => handleChangeActive(checked)}
                  style={{ marginLeft: '12px' }}
                />
              </div>
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

        {isMobile && (
          <div
            className={styles.fullScreenModalFooter}
            style={{
              gridTemplateColumns: `repeat(${
                active ? 1 : operations.length - 1
              }, 1fr)`,
            }}
          >
            {!active &&
              operations.map((operation) => {
                if (operation !== OperationType.active) {
                  return (
                    <div key={operation}>
                      {operation === OperationType.reset && (
                        <Button
                          type="default"
                          onClick={() => onReset?.()}
                          block
                        >
                          {resetBtnText || 'Reset'}
                        </Button>
                      )}
                      {operation === OperationType.delete && (
                        <Button
                          onClick={() => onDelete?.()}
                          type="text"
                          danger
                          block
                        >
                          {deleteBtnText || 'Delete'}
                        </Button>
                      )}
                      {operation === OperationType.save && (
                        <Button onClick={() => onSave?.()} block>
                          {saveBtnText || 'Save'}
                        </Button>
                      )}
                      {operation === OperationType.create && (
                        <Button
                          type="primary"
                          disabled={!enableCreateBtn}
                          onClick={() => onCreate?.()}
                          block
                        >
                          {createBtnText || 'Create'}
                        </Button>
                      )}
                    </div>
                  )
                }
                return null
              })}
            {active && (
              <div>
                <Button
                  type="primary"
                  disabled={!enableCreateBtn}
                  onClick={() => onCreate?.()}
                  block
                >
                  {createBtnText || 'Create'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  ) : (
    <div />
  )
}

export default FullScreenReportModal
