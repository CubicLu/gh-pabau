import React, { FC, useState, useRef } from 'react'
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
import Link from 'next/link'
import classNames from 'classnames'
import { useMedia } from 'react-use'
import { PopOverStateProps, FormListProps } from './ClientFormsLayout'
import styles from './ClientFormsLayout.module.less'
import { useTranslation } from 'react-i18next'

const { Panel } = Collapse

const setHtmlInputValue = (elem) => {
  const stylesString = `
    <style>
      * {
        line-height: 20px;
      }
      #fullForm {
        display: flex;
        justify-content: left;
        align-items: left;
        flex-direction: column;
      }
      #contentName {
        position: relative;
        font-size: 12px;
        color: #9292a3;
        margin-bottom: 1px;
        font-family: Circular-Std-Book, sans-serif;
      }
      #contentDetail {
        position: relative;
        font-size: 14px;
        color: #3d3d46;
        font-family: Circular-Std-Book, sans-serif;
      }
      #contentName p > span > strong,
      #contentDetail p > span > strong {
        font-size: 16px;
        color: #3d3d46;
        font-family: Circular-Std-Book, sans-serif;
      }
      #contentName p > strong,
      #contentDetail p > strong {
        font-size: 14px;
        color: #787889;
        font-family: Circular-Std-Book, sans-serif;
      }
      #contentName p,
      #contentDetail p {
        font-size: 14px;
        color: #9292a3;
        font-family: Circular-Std-Book, sans-serif;
      }
      #contentName > span,
      #contentDetail > span {
        font-family: Circular-Std-Book, sans-serif;
      }
      #contentDetail img {
        width: 300px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      #contentDetail table {
        border: 1px solid #eee;
      }
      #contentDetail table thead tr:hover {
        background-color: transparent;
      }
      #contentDetail table thead tr th {
        font-size: 14px;
        background-color: rgba(238, 238, 238, 0.75);
        text-transform: capitalize;
        text-align: left;
        border: 1px solid #eee;
        padding: 10px 16px;
        color: #3d3d46;
      }
      #contentDetail table tbody tr td {
        border: 1px solid #eee;
        padding: 10px 16px;
        text-align: left;
        color: #9292a3;
        font-size: 12px;
        font-weight: lighter;
      }
      #detailsBorder {
        margin: 6px 0px 8px 0px;
        border-bottom: 1px solid rgba(236, 237, 240, 1);
      }
    </style>
  `
  const stringHtml = `${stylesString}<div id="formDetails">${elem?.innerHTML}</div>`
  return stringHtml
}

interface FormActionProps {
  form: MedicalFormContact
  userPermission?: boolean
  popOverState: PopOverStateProps
  setPopOverState: (e) => void
  handlePinForm: () => void
  onShareCick: (e: FormListProps) => Promise<boolean>
  onVersionClick: (e: string) => Promise<boolean>
  onDeleteClick: (formContactId: number) => void
}
const FormAction: FC<FormActionProps> = ({
  form,
  userPermission,
  popOverState,
  setPopOverState,
  handlePinForm,
  onShareCick,
  onVersionClick,
  onDeleteClick,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const isTablet = useMedia('(max-width: 1024px)', false)
  const formRef = useRef<HTMLFormElement>(null)
  const htmlInputRef = useRef<HTMLInputElement>(null)

  const [openFormOptionsDrawer, setOpenFormOptionsDrawer] = useState(false)
  const [currentVersion, setCurrentVersion] = useState('22.07.21')
  const [formActionCollapse, setFormActionCollapse] = useState<
    string | string[]
  >('')

  const historyVersions = [
    { id: 1, version: '22.07.21' },
    { id: 2, version: '21.07.21' },
  ]

  const EditFormIcon = () => {
    return (
      <>
        <EditOutlined />
        <h3>{t('ui.clientcard.formaction.edit')}</h3>
      </>
    )
  }

  const moreOutlinedContent = (
    <div className={styles.contentWrapper} onClick={(e) => e.stopPropagation()}>
      <Link
        href={{
          pathname: `/test-form/${form?.formId}/${form?.contactId}`,
          query: {
            mode: 'update',
            id: form?.id?.toString(),
          },
        }}
        passHref
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="/#"
          className={styles.dotList}
          onClick={(e) => {
            e.stopPropagation()
            // onEditClick(form)
          }}
        >
          <EditFormIcon />
        </a>
      </Link>
      <Link passHref href="#">
        <div className={styles.dotList} onClick={handlePinForm}>
          <PushpinOutlined />
          <h3>
            {form.isPinned
              ? t('ui.clientcard.formaction.unpin')
              : t('ui.clientcard.formaction.pin')}
          </h3>
        </div>
      </Link>
      {userPermission && (
        <Link passHref href="#">
          <div
            className={styles.dotList}
            onClick={(e) => {
              e.stopPropagation()
              onDeleteClick?.(form?.id)
            }}
          >
            <DeleteOutlined />
            <h3>{t('ui.clientcard.formaction.delete')}</h3>
          </div>
        </Link>
      )}
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
        <Link
          href={{
            pathname: `/test-form/${form?.formId}/${form?.contactId}`,
            query: {
              mode: 'update',
              id: form?.id?.toString(),
            },
          }}
          passHref
        >
          <a
            target="_blank"
            rel="noreferrer"
            href="/#"
            onClick={(e) => {
              e.stopPropagation()
              // onEditClick(form)
            }}
            className={styles.listItem}
          >
            <EditFormIcon />
          </a>
        </Link>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleExport()
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
        <Link passHref href="#">
          <div onClick={handlePinForm} className={styles.listItem}>
            <PushpinOutlined />
            <h3>
              {form.isPinned
                ? t('ui.clientcard.formaction.unpin')
                : t('ui.clientcard.formaction.pin')}
            </h3>
          </div>
        </Link>
        {userPermission && (
          <Link passHref href="#">
            <div
              onClick={(e) => {
                e.stopPropagation()
                onDeleteClick?.(form?.id)
              }}
              className={styles.listItem}
            >
              <DeleteOutlined />
              <h3>{t('ui.clientcard.formaction.delete')}</h3>
            </div>
          </Link>
        )}
      </div>
    )
  }

  const handleExport = () => {
    const html = document.querySelector(`#form-details-${form.id}`)
    if (formRef?.current && html?.innerHTML && htmlInputRef.current) {
      const temp = setHtmlInputValue(html)
      htmlInputRef.current.value = temp
      formRef?.current?.submit()
    }
  }

  return (
    <div className={styles.formActionBtnWrapper}>
      <div className={styles.hidden}>
        <form
          ref={formRef}
          method="POST"
          action={`https://html2pdf.pabau.com/${form.name}.pdf`}
          encType="multipart/form-data"
          target="_blank"
        >
          <input type="text" name="html" ref={htmlInputRef} />
          <input
            type="text"
            name="token"
            value="jfdea089duj89wqjhrdoiwqerhoiwqehroiueh"
            onChange={() => false}
          />
        </form>
      </div>
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
          trigger="click"
          content={formActionContent}
          overlayClassName={styles.customFormPopover}
        >
          <Button
            className={styles.buttonInd}
            shape="circle"
            icon={<MoreOutlined />}
            onClick={(e) => {
              e.stopPropagation()
            }}
          />
        </Popover>
      ) : (
        <div className={styles.buttonAll}>
          <Button
            className={styles.buttonPrintShare}
            onClick={(e) => {
              e.stopPropagation()
              handleExport()
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
            placement="bottomRight"
            content={moreOutlinedContent}
            trigger="click"
            overlayClassName={styles.customPopover}
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
