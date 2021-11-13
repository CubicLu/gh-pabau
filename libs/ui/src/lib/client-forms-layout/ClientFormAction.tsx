import React, { FC, useState } from 'react'
import {
  EditOutlined,
  HistoryOutlined,
  MoreOutlined,
  PrinterOutlined,
  PushpinOutlined,
  ShareAltOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Button, MedicalFormContact } from '@pabau/ui'
import { Popover, Drawer, Collapse } from 'antd'
import classNames from 'classnames'
import { useMedia } from 'react-use'
import { PopOverStateProps, FormListProps } from './ClientFormsLayout'
import styles from './ClientFormsLayout.module.less'
import { useTranslation } from 'react-i18next'

const { Panel } = Collapse
interface FormActionProps {
  form: MedicalFormContact
  popOverState: PopOverStateProps
  setPopOverState: (e) => void
  handlePinForm: () => void
  onPrintClick: (e: FormListProps) => Promise<boolean>
  onShareCick: (e: FormListProps) => Promise<boolean>
  onVersionClick: (e: string) => Promise<boolean>
  onEditClick: (e: FormListProps) => Promise<boolean>
  onDeleteClick: (e: FormListProps) => Promise<boolean>
}
const FormAction: FC<FormActionProps> = ({
  form,
  popOverState,
  setPopOverState,
  handlePinForm,
  onPrintClick,
  onShareCick,
  onVersionClick,
  onEditClick,
  onDeleteClick,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const isTablet = useMedia('(max-width: 1024px)', false)

  const [openFormOptionsDrawer, setOpenFormOptionsDrawer] = useState(false)
  const [currentVersion, setCurrentVersion] = useState('22.07.21')
  const [formActionCollapse, setFormActionCollapse] = useState<
    string | string[]
  >('')

  const [openFilterPopover, setOpenFilterPopover] = useState(false)

  const historyVersions = [
    { id: 1, version: '22.07.21' },
    { id: 2, version: '21.07.21' },
  ]

  const content = (
    <div className={styles.contentWrapper} onClick={(e) => e.stopPropagation()}>
      <div
        className={styles.dotList}
        onClick={(e) => {
          e.stopPropagation()
          onEditClick(form)
        }}
      >
        <EditOutlined />
        <h3>{t('ui.clientcard.formaction.edit')}</h3>
      </div>
      <div className={styles.dotList} onClick={handlePinForm}>
        <PushpinOutlined />
        <h3>
          {form.isPinned
            ? t('ui.clientcard.formaction.unpin')
            : t('ui.clientcard.formaction.pin')}
        </h3>
      </div>
      <div
        className={styles.dotList}
        onClick={(e) => {
          e.stopPropagation()
          onDeleteClick(form)
        }}
      >
        <DeleteOutlined />
        <h3>{t('ui.clientcard.formaction.delete')}</h3>
      </div>
    </div>
  )
  const versioncontent = (
    <div
      className={styles.versionContentWrapper}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.versionTitle}>
        <span>{t('ui.clientcard.formaction.historyversions')}</span>
      </div>
      {historyVersions.length > 0 &&
        historyVersions.map((item) => (
          <div
            key={item.id}
            className={styles.versionList}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentVersion(item.version)
              onVersionClick(item.version)
            }}
          >
            <span
              className={
                currentVersion === item.version
                  ? classNames(styles.text, styles.activeVersion)
                  : classNames(styles.text, styles.textCapital)
              }
            >
              <HistoryOutlined />
              <h3 className={styles.title}>
                {t(`ui.clientcard.formaction.version.${item.version}`, {
                  what: currentVersion === item.version ? 'Current' : null,
                })}
              </h3>
            </span>
          </div>
        ))}
    </div>
  )

  const formActionContent = () => {
    return (
      <div
        className={styles.formActionWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
            onEditClick(form)
          }}
          className={styles.listItem}
        >
          <EditOutlined />
          <h3>{t('ui.clientcard.formaction.edit')}</h3>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            onPrintClick(form)
          }}
          className={styles.listItem}
        >
          <PrinterOutlined />
          <h3>{t('ui.clientcard.formaction.print')}</h3>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            onShareCick(form)
          }}
          className={styles.listItem}
        >
          <ShareAltOutlined />
          <h3>{t('ui.clientcard.formaction.share')}</h3>
        </div>
        <div
          className={styles.listItemCollapse}
          style={
            formActionCollapse.length === 0
              ? { marginBottom: '16px' }
              : { marginBottom: '13px' }
          }
          onClick={(e) => e.stopPropagation()}
        >
          <Collapse
            ghost
            expandIconPosition={'right'}
            onChange={(e) => setFormActionCollapse(e)}
          >
            <Panel
              header={
                <div className={styles.listItemDrop}>
                  <HistoryOutlined />
                  <h3>{t('ui.clientcard.formaction.historyversions')}</h3>
                </div>
              }
              key="1"
            >
              {historyVersions.length > 0 &&
                historyVersions.map((item) => (
                  <div
                    key={item.id}
                    className={styles.versionList}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentVersion(item.version)
                      onVersionClick(item.version)
                    }}
                  >
                    <span
                      className={
                        currentVersion === item.version
                          ? classNames(styles.text, styles.activeVersion)
                          : classNames(styles.text, styles.textCapital)
                      }
                    >
                      <HistoryOutlined />
                      <h3 className={styles.title}>
                        {t(`ui.clientcard.formaction.version.${item.version}`, {
                          what:
                            currentVersion === item.version ? 'Current' : null,
                        })}
                      </h3>
                    </span>
                  </div>
                ))}
            </Panel>
          </Collapse>
        </div>
        <div onClick={handlePinForm} className={styles.listItem}>
          <PushpinOutlined />
          <h3>
            {form.isPinned
              ? t('ui.clientcard.formaction.unpin')
              : t('ui.clientcard.formaction.pin')}
          </h3>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            onDeleteClick(form)
          }}
          className={styles.listItem}
        >
          <DeleteOutlined />
          <h3>{t('ui.clientcard.formaction.delete')}</h3>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.formActionBtnWrapper}>
      {isMobile ? (
        <Button
          className={styles.buttonInd}
          shape="circle"
          icon={
            <MoreOutlined
              style={
                openFormOptionsDrawer
                  ? { color: '#40A0C1' }
                  : { color: '#9292A3' }
              }
            />
          }
          onClick={(e) => {
            e.stopPropagation()
            setOpenFormOptionsDrawer((val) => !val)
          }}
        />
      ) : isTablet ? (
        <Popover
          visible={openFilterPopover}
          trigger="click"
          content={formActionContent}
          overlayClassName={styles.customFormPopover}
          onVisibleChange={(val) => setOpenFilterPopover(val)}
        >
          <Button
            className={styles.buttonInd}
            shape="circle"
            icon={<MoreOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              setOpenFilterPopover((val) => !val)
            }}
          />
        </Popover>
      ) : (
        <div className={styles.buttonAll}>
          <Button
            className={styles.buttonPrintShare}
            onClick={(e) => {
              e.stopPropagation()
              onPrintClick(form)
            }}
            icon={<PrinterOutlined />}
          >
            <span className={styles.btnText}>
              {t('ui.clientcard.formaction.print')}
            </span>
          </Button>
          <Button
            className={styles.buttonPrintShare}
            onClick={(e) => {
              e.stopPropagation()
              onShareCick(form)
            }}
            icon={<ShareAltOutlined />}
          >
            <span className={styles.btnText}>
              {t('ui.clientcard.formaction.share')}
            </span>
          </Button>
          <Popover
            visible={popOverState.version}
            placement="bottomRight"
            content={versioncontent}
            trigger="click"
            overlayClassName={styles.customPopover}
            onVisibleChange={(val) =>
              setPopOverState({
                ...popOverState,
                version: val,
              })
            }
          >
            <Button
              className={styles.buttonInd}
              shape="circle"
              onClick={(e) => e.stopPropagation()}
              icon={<HistoryOutlined />}
            />
          </Popover>
          <Popover
            visible={popOverState.content}
            placement="bottomRight"
            content={content}
            trigger="click"
            overlayClassName={styles.customPopover}
            onVisibleChange={(val) =>
              setPopOverState({
                ...popOverState,
                content: val,
              })
            }
          >
            <Button
              className={styles.buttonInd}
              shape="circle"
              icon={<MoreOutlined />}
              onClick={(e) => e.stopPropagation()}
            />
          </Popover>
        </div>
      )}
      <Drawer
        placement={'bottom'}
        closable={false}
        onClose={(e) => {
          e.stopPropagation()
          setOpenFormOptionsDrawer((val) => !val)
        }}
        visible={openFormOptionsDrawer}
        key={'bottom'}
        height={formActionCollapse.length === 0 ? '264px' : '326px'}
        className={styles.formActionDrawer}
      >
        <div className={styles.formActionDrawerWrapper}>
          <span className={styles.line} />
          {formActionContent()}
        </div>
      </Drawer>
    </div>
  )
}

export default FormAction
