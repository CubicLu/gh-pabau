import { CloseOutlined, LeftOutlined } from '@ant-design/icons'
import { Avatar, Button, TabMenu } from '@pabau/ui'
import { Modal, Switch, ConfigProvider } from 'antd'
import classnames from 'classnames'
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { useMedia } from 'react-use'
import styles from './FullScreenReportModal.module.less'

export enum OperationType {
  active = 'active',
  reset = 'reset',
  save = 'save',
  delete = 'delete',
  create = 'create',
  close = 'close',
  cancel = 'cancel',
  assignee = 'assignee',
}

export interface FullScreenReportModalProps {
  title: ReactNode
  visible: boolean
  operations?: Array<OperationType>
  onActivated?: (val: boolean) => void
  onBackClick?: (e?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  onSave?: () => void
  onCreate?: () => void
  onReset?: () => void
  onDelete?: () => void
  onClose?: () => void
  onCancel?: () => void
  onTabChange?: (e) => void
  onAssigneeClick?: () => void

  customOptionBtn?: React.ReactNode
  activeBtnText?: string
  deleteBtnText?: string
  assigneeName?: string
  assigneeTitle?: string
  createBtnText?: string
  saveBtnText?: string
  resetBtnText?: string
  enableCreateBtn?: boolean
  activated?: boolean
  subMenu?: Array<ReactNode>
  center?: React.ReactNode
  subTitle?: React.ReactNode
  forceDesktopOperations?: boolean
  hideBackIcon?: boolean
  hideHeaderEdge?: boolean
  footer?: boolean
  className?: string
  avatar?: string
  isDocFileOpen?: boolean
  activeDefaultKey?: string
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
  onClose,
  onCancel,
  onTabChange,

  deleteBtnText,
  createBtnText,
  assigneeName,
  assigneeTitle,
  saveBtnText,
  resetBtnText,
  activeBtnText,
  enableCreateBtn,
  activated,
  subMenu = [],
  center,
  subTitle,
  forceDesktopOperations = false,
  hideBackIcon = false,
  hideHeaderEdge = false,
  children,
  className,
  onAssigneeClick,
  customOptionBtn = null,
  avatar,
  isDocFileOpen,
  activeDefaultKey,
  ...props
}) => {
  const ref = useRef(null)
  const isMobile = useMedia('(max-width: 767px)', false)
  const [active, setActive] = useState(true)
  const handleChangeActive = (checked) => {
    setActive(checked)
    onActivated?.(checked)
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
      wrapClassName={classnames(
        styles.fullScreenModal,
        'fullScreenModal',
        className
      )}
    >
      <div className={styles.fullScreenModalContainer} ref={ref}>
        <div
          className={styles.fullScreenModalHeader}
          style={{
            borderBottom: hideHeaderEdge ? 'unset' : undefined,
            gridTemplateColumns:
              operations?.length > 0 || customOptionBtn
                ? '1fr '.repeat(center ? 3 : 2)
                : '1fr',
          }}
        >
          <div>
            {!hideBackIcon && (
              <LeftOutlined
                onClick={(e) => onBackClick?.(e)}
                style={{
                  color: 'var(--light-grey-color)',
                  marginRight: '24px',
                  fontSize: '24px',
                }}
              />
            )}
            <div className={styles.titleContainer}>
              {title}
              {!isMobile && subTitle ? subTitle : ''}
            </div>
          </div>
          {center && <div className={styles.centeredItem}>{center}</div>}
          {(operations?.length || customOptionBtn) && (
            <div className={styles.fullScreenModalOps}>
              {!isMobile &&
                operations.includes(OperationType.active) &&
                !props.footer &&
                !forceDesktopOperations && (
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
              {customOptionBtn && customOptionBtn}
              {operations.map((operation) => (
                <React.Fragment key={operation}>
                  {isMobile && operation === OperationType.active && (
                    <div
                      className={styles.operationSwitch}
                      style={isMobile ? { marginRight: '0px' } : {}}
                    >
                      {activeBtnText || 'Active'}
                      <Switch
                        size="small"
                        checked={active}
                        onChange={(checked) => handleChangeActive(checked)}
                        style={{ marginLeft: '12px' }}
                      />
                    </div>
                  )}
                  {(!isMobile || forceDesktopOperations) && (
                    <>
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
                      {operation === OperationType.assignee && (
                        <div
                          className={styles.assigneeWrap}
                          onClick={onAssigneeClick}
                        >
                          <h5>{assigneeTitle}</h5>
                          <Avatar
                            className={styles.avatarIcon}
                            name={assigneeName}
                            size="large"
                            src={avatar}
                            zIndex={1}
                          />
                          <h6>{assigneeName}</h6>
                        </div>
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
                      {operation === OperationType.close && (
                        <Button type="text" onClick={() => onClose?.()}>
                          Esc
                          <CloseOutlined className={styles.closeIcon} />
                        </Button>
                      )}
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <ConfigProvider
          getPopupContainer={(node) => {
            if (node) {
              return node as HTMLElement
            }
            return document.body as HTMLElement
          }}
        >
          <div
            className={
              isDocFileOpen
                ? `${styles.fullScreenModalBody} ${styles.removeScroll}`
                : `${styles.fullScreenModalBody}`
            }
          >
            {subMenu.length > 0 && Array.isArray(children) ? (
              <TabMenu
                menuItems={subMenu}
                tabPosition="top"
                minHeight="1px"
                onTabClick={(e) => {
                  if (onTabChange) {
                    onTabChange(e)
                  }
                }}
                activeKey={activeDefaultKey}
              >
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
        </ConfigProvider>
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
    <div></div>
  )
}

export default FullScreenReportModal
