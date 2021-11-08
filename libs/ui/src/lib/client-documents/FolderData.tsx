import React, { FC, useEffect, useState } from 'react'
import styles from './ClientDocuments.module.less'
import {
  BasicModal,
  FolderProps,
  NotificationType,
  Notification,
  FolderContentProps,
} from '@pabau/ui'
import { Card, Tooltip, Table, Popover, Button, Drawer, Modal } from 'antd'
import {
  EyeOutlined,
  FileOutlined,
  FolderFilled,
  MoreOutlined,
  RightOutlined,
  DownloadOutlined,
  EditOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  PrinterOutlined,
  FolderOutlined,
} from '@ant-design/icons'
import { FileIcon, defaultStyles } from 'react-file-icon'
import dynamic from 'next/dynamic'
import stc from 'string-to-color'
import dayjs from 'dayjs'
import { Checkbox } from '../checkbox/Checkbox'
import { useMedia } from 'react-use'
import classNames from 'classnames'
import PreviewFile from './PreviewFile'

const DocumentPdf = dynamic(() => import('./DocumentViewer'), {
  ssr: false,
})

export interface selectProps {
  folderData?: FolderProps[]
  folderTitle?: string
}

export interface FolderDataProps {
  data: FolderProps
  onFolderClick: (id: number) => void
  listView: boolean
  checkedData: Array<string>
  setCheckedData: (e) => void
  setShowMenu: (e) => void
  setRecentData: (e) => void
  setSelectedDocuments: (e) => void
  selectedDocuments: Array<string>
  setTempData: (e) => void
  tempData: Array<string>
  handleDelete: () => void
  setRecentActionData: (e) => void
  recentActionData: Array<selectProps>
  setCurrentData: (e) => void
  onFolderRename?: (id: number) => void
  onFolderDelete: (id: number) => void
}

export const FolderData: FC<FolderDataProps> = React.memo(
  ({
    data,
    onFolderClick,
    listView,
    checkedData,
    setCheckedData,
    setShowMenu,
    setCurrentData,
    selectedDocuments,
    setSelectedDocuments,
    setTempData,
    tempData,
    handleDelete,
    onFolderRename,
    onFolderDelete,
    setRecentActionData,
    recentActionData,
  }) => {
    const isMobile = useMedia('(max-width: 767px)', false)

    const [folderDrawer, setFolderDrawer] = useState(false)
    const [documentDrawer, setDocumentDrawer] = useState(false)
    const [previewModal, setPreviewModal] = useState(false)
    const [pdfData, setPdfData] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)

    const [numPages, setNumPages] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState(1)
    const [pdfName, setPdfName] = useState('')

    const [dropFolderTitle, setDropFolderTitle] = useState('')
    const [dragFolderTitle, setDragFolderTitle] = useState('')

    const [selectedFolder, setSelectedFolder] = useState<FolderProps>()
    const [
      selectedDocument,
      setSelectedDocument,
    ] = useState<FolderContentProps>()

    useEffect(() => {
      setNumPages(0)
      setPageNumber(1)
    }, [pdfData])

    const onDocumentLoadSuccess = ({ numPages }) => {
      setPageNumber(1)
      setNumPages(numPages)
    }

    const onSetNumPages = (page: number) => {
      setPageNumber(page)
    }

    const fileArray = new Set(['html', 'docx', 'pdf', 'doc'])
    const fileIconStyle = {
      ...defaultStyles,
      pdf: {
        type: 'acrobat',
        extension: '',
      },
      html: {
        type: 'code2',
        extension: '',
      },
      docx: {
        glyphColor: '#cfcfcf',
        type: 'document',
        extension: '',
      },
      doc: {
        glyphColor: '#cfcfcf',
        type: 'document',
        extension: '',
      },
    }

    const handlePreview = (pdf) => {
      setPdfName(pdf)
      setPdfData(pdf)
      setPageNumber(1)
      setPreviewModal((e) => !e)
    }

    const handlePre = () => {
      setPreviewModal((e) => !e)
      setFolderDrawer(false)
    }

    const handleSingleDelete = (record) => {
      const deleteValue = []
      deleteValue.push(record as never)
      setTempData(deleteValue)
      setDeleteModal(true)
    }

    const FolderPopupContent = ({ record }) => {
      return (
        <div className={styles.menuContentMobileBody}>
          <div className={styles.menuContentList}>
            <div
              className={styles.menuItem}
              onClick={() => {
                setFolderDrawer(() => false)
                onFolderRename?.(record?.id)
              }}
            >
              <EditOutlined /> Rename
            </div>
            <div className={styles.menuItem}>
              <ShareAltOutlined /> Share
            </div>
            <div
              className={styles.menuItem}
              style={{ borderBottom: '1px solid #ECEDF0' }}
            >
              <DownloadOutlined /> Download
            </div>
            <div
              className={styles.menuItem}
              style={{ color: 'red' }}
              onClick={() => {
                setFolderDrawer(() => false)
                onFolderDelete(record?.id)
              }}
            >
              <DeleteOutlined /> Delete
            </div>
          </div>
        </div>
      )
    }

    const DocumentPopupContent = ({ record }) => {
      return (
        <div className={styles.menuContentMobileBody}>
          <div className={styles.menuContentList}>
            <div
              className={styles.menuItem}
              onClick={() => (isMobile ? handlePre() : handlePreview(record))}
            >
              <EyeOutlined /> Preview
            </div>
            <div
              className={styles.menuItem}
              style={{ justifyContent: 'space-between', display: 'flex' }}
            >
              <div>
                <FolderOutlined /> Move to
              </div>
              <RightOutlined />
            </div>
            <div className={styles.menuItem}>
              <PrinterOutlined /> Print
            </div>
            <div className={styles.menuItem}>
              <ShareAltOutlined /> Share
            </div>
            <div
              className={styles.menuItem}
              style={{ borderBottom: '1px solid #ECEDF0' }}
            >
              <DownloadOutlined /> Download
            </div>
            <div
              className={styles.menuItem}
              style={{ color: 'red' }}
              onClick={() => handleSingleDelete(record)}
            >
              <DeleteOutlined /> Delete
            </div>
          </div>
        </div>
      )
    }

    const handleOnChange = (checked, folderContent) => {
      const temp = recentActionData
      const storeData = [...checkedData]
      const idx = storeData.indexOf(folderContent[0] as never)
      checked
        ? storeData.push(folderContent[0] as never)
        : storeData.splice(idx, 1)
      checked &&
        temp.push({
          folderTitle: folderContent[1],
          folderData: folderContent[0],
        } as never)
      if (!checked) {
        let tempIndex
        temp.map((x, i) => {
          if (x.folderData === folderContent[0]) {
            tempIndex = i
          }
          return 1
        })
        temp.splice(tempIndex, 1)
      }
      setCheckedData([...storeData])
      setRecentActionData(temp)
      storeData.length > 0 ? setShowMenu(true) : setShowMenu(false)
    }

    const foldersTableColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        classNames: 'maxWidth',
        render: function renderTableSource(value, record) {
          return (
            <div
              className={styles.tableFirstCol}
              onClick={() => {
                onFolderClick(record?.id)
              }}
            >
              <FolderFilled />
              <p>{value?.substring(0, 40)}</p>
            </div>
          )
        },
      },
      {
        title: 'Files',
        dataIndex: 'files',
        render: function renderTableSource(value) {
          return value
        },
      },
      {
        title: 'Last Modified',
        dataIndex: 'lastModified',
      },
      {
        title: '',
        key: 'action',
        render: function renderTableSource(text, record) {
          return !isMobile ? (
            <Popover
              placement="left"
              content={<FolderPopupContent record={record} />}
              trigger="click"
            >
              <Button
                className={styles.btnCircle}
                shape="circle"
                icon={<MoreOutlined />}
              />
            </Popover>
          ) : (
            <Button
              className={styles.btnCircle}
              shape="circle"
              icon={<MoreOutlined />}
              onClick={() => {
                setSelectedFolder(record)
                setFolderDrawer(() => true)
              }}
            />
          )
        },
      },
    ]

    const documentsTableColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        classNames: 'maxWidth',
        render: function renderTableSource(value) {
          const filename = value ? value.split('/') : []
          const fileData = value ? value.split('.') : []
          return (
            <div className={styles.folderContentFirst}>
              <Checkbox
                checked={selectedDocuments.includes(value)}
                onChange={(e) => handleSelect(e.target.checked, value)}
              >
                <Card bordered={false}>
                  {fileArray.has(fileData[fileData?.length - 1]) ? (
                    <FileIcon
                      extension={fileData[fileData.length - 1]}
                      {...fileIconStyle[fileData[fileData.length - 1]]}
                    />
                  ) : (
                    <img src={value[0]} alt={'none'} height={35} width={50} />
                  )}
                </Card>
                <div>
                  <p>{filename[filename.length - 1]}</p>
                </div>
                {value[1].length > 0 && (
                  <div
                    className={styles.shareView}
                    style={{ marginLeft: '10px' }}
                  >
                    <Tooltip
                      trigger={'click'}
                      arrowPointAtCenter
                      title={
                        <div>
                          <p style={{ margin: '0' }}>Shared with</p>
                          <div className={styles.eyeWrap}>
                            {value[1].map((data, index) => {
                              const { firstName } = data
                              return (
                                <div
                                  className={styles.circle}
                                  style={{
                                    backgroundColor: stc(firstName),
                                  }}
                                  key={index}
                                >
                                  {firstName[0]}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      }
                    >
                      <EyeOutlined />
                    </Tooltip>
                  </div>
                )}
              </Checkbox>
            </div>
          )
        },
      },
      {
        title: 'Owner',
        dataIndex: 'owner',
      },
      {
        title: 'Last modified',
        dataIndex: 'date',
      },
      {
        title: '',
        key: 'action',
        render: function renderTableSource(text, record) {
          return !isMobile ? (
            <Popover
              placement="left"
              content={<DocumentPopupContent record={record.name[0]} />}
              trigger="click"
            >
              <Button
                className={styles.btnCircle}
                shape="circle"
                icon={<MoreOutlined />}
              />
            </Popover>
          ) : (
            <Button
              className={styles.btnCircle}
              shape="circle"
              icon={<MoreOutlined />}
              onClick={() => {
                setSelectedDocument(record)
                setDocumentDrawer(true)
              }}
            />
          )
        },
      },
    ]

    const handleSelect = (checked, folderContent) => {
      const storeData = [...selectedDocuments]
      const idx = storeData.indexOf(folderContent as never)
      checked
        ? storeData.push(folderContent as never)
        : storeData.splice(idx, 1)
      setSelectedDocuments([...storeData])
      storeData.length > 0 ? setShowMenu(true) : setShowMenu(false)
    }

    const dragFolder = (ev) => {
      ev.dataTransfer.setData('folderTitle', ev.target.id)
      setDragFolderTitle(ev.target.id)
    }
    const allowDrop = (ev) => {
      ev.preventDefault()

      if (dragFolderTitle !== ev.target.id) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.querySelector(`#${ev.target.id}`).style.backgroundColor =
          'skyblue'
      }
      setDropFolderTitle(
        ev.target.id === '' ? ev.target.lastChild.id : ev.target.id
      )
    }
    const drop = (ev) => {
      ev.preventDefault()
      const folderTitle = ev.dataTransfer.getData('folderTitle')
      const folderDragItem = ev.dataTransfer.getData('folderItem')
      if (folderTitle !== '') {
        const dropData = { ...data }
        let transferFolder = {}
        dropData.folder.map((folderData) => {
          if (folderData.folderTitle === folderTitle) {
            transferFolder = folderData
          }
          return 1
        })

        dropData.folder.map((folderData) => {
          if (
            folderData.folderTitle === dropFolderTitle &&
            folderData.folderTitle !== folderTitle
          ) {
            folderData.folder.push(transferFolder as FolderProps)
            dropData.folder.map((dropVal, i) => {
              if (dropVal.folderTitle === folderTitle) {
                dropData.folder.splice(i, 1)
              }
              return 1
            })
          }
          return 1
        })
        setCurrentData(dropData)
        dropFolderTitle !== folderTitle &&
          Notification(
            NotificationType.success,
            `${folderTitle} has been moved into ${dropFolderTitle}`
          )
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.querySelector(`#${dropFolderTitle}`).style.backgroundColor =
          'white'

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.querySelector(`#${folderTitle}`).style.backgroundColor =
          'white'
        setDragFolderTitle('')
      }
      if (folderDragItem !== '') {
        const moveItemName = folderDragItem.split('/')
        const dropData = { ...data }
        dropData.folder.map((val) => {
          return (
            val.folderTitle === dropFolderTitle &&
            val.folderContent?.push({
              id: 'folderItem',
              folderData: folderDragItem,
              dateTime: dayjs().format('DD.MM.YYYY') as string,
            } as never)
          )
        })
        dropData.folderContent?.map((x, index) => {
          if (x.folderData === folderDragItem) {
            dropData.folderContent?.splice(index, 1)
          }
          return 1
        })
        setCurrentData(dropData)
        Notification(
          NotificationType.success,
          `${
            moveItemName[moveItemName.length - 1]
          } has been moved into ${dropFolderTitle}`
        )
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.querySelector(`#${dropFolderTitle}`).style.backgroundColor =
          'white'

        const ghost = document.querySelector('#draGhost')
        if (ghost?.parentNode) {
          ghost.remove()
        }
      }
    }

    const dragItem = (ev) => {
      ev.dataTransfer.setData('folderItem', ev.target.id)
      const img = new Image()
      img.src = ev.target.id

      const moveItemName = ev.target.id.split('/')
      const ghostEle = document.createElement('div')
      ghostEle.id = 'draGhost'
      ghostEle.innerHTML = moveItemName[moveItemName.length - 1]
      ghostEle.style.color = 'skyBlue'
      ghostEle.style.backgroundColor = '#f6f6f6'
      ghostEle.style.position = 'absolute'
      ghostEle.style.top = '-900px'
      ghostEle.style.width = '160px'
      ghostEle.style.height = '45px'
      ghostEle.style.textAlign = 'center'
      document.body.append(ghostEle)
      ev.dataTransfer.setDragImage(ghostEle, 10, 10)
    }

    return (
      <div className={styles.folderListContainer}>
        {!listView && (
          <div className={styles.folderListWrap}>
            {data.folder.length > 0 && (
              <div
                className={styles.folderData}
                style={
                  data?.folderContent && data?.folderContent?.length > 0
                    ? {
                        borderBottom: '1px solid #ecedf0',
                      }
                    : { borderBottom: '1px solid transparent' }
                }
              >
                {data.folder?.map((x, i) => (
                  <div className={styles.folderDataWrap} key={i}>
                    <div
                      className={styles.folderContainer}
                      id={x.folderTitle}
                      onDrop={(ev) => drop(ev)}
                      onDragOver={(ev) => allowDrop(ev)}
                    >
                      <div
                        className={styles.gridContainer}
                        onDragStart={(event) => dragFolder(event)}
                        draggable={true}
                        id={x.folderTitle}
                      >
                        <Card
                          id={x.folderTitle}
                          onClick={() => onFolderClick(x?.id)}
                        >
                          <FolderFilled />{' '}
                          <p className={styles.folderTitle} id={x.folderTitle}>
                            {x.folderTitle}
                          </p>
                        </Card>
                        {!isMobile ? (
                          <Popover
                            placement="bottomRight"
                            content={() => <FolderPopupContent record={x} />}
                            trigger="click"
                            className={styles.imageDotButton}
                          >
                            <div className={styles.dotBtn}>
                              <Button
                                className={styles.btnCircle}
                                shape="circle"
                                icon={<MoreOutlined />}
                              />
                            </div>
                          </Popover>
                        ) : (
                          <div
                            className={styles.dotBtn}
                            onClick={() => {
                              setFolderDrawer(() => true)
                              setSelectedFolder(x)
                            }}
                          >
                            <Button
                              className={styles.btnCircle}
                              shape="circle"
                              icon={<MoreOutlined />}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.folderContent}>
              {data.folderTitle === 'Uncategorized' && (
                <h3 style={{ width: '100%', marginLeft: '7px' }}>Files</h3>
              )}

              {data?.folderContent?.map((folderValue) => {
                const fileData = folderValue?.folderData?.split('.')
                const fileName = folderValue?.folderData?.split('/')
                return (
                  <div className={styles.checkWrappers} key={folderValue?.id}>
                    <Card
                      bordered={false}
                      key={folderValue.id}
                      className={
                        selectedDocuments.includes(
                          folderValue.folderData as never
                        )
                          ? styles.selectStyle
                          : ''
                      }
                    >
                      {fileArray.has(fileData[fileData?.length - 1]) &&
                        (folderValue?.sharedWith as never) && (
                          <div className={styles.customEye}>
                            <Tooltip
                              trigger={'click'}
                              arrowPointAtCenter
                              title={
                                <div>
                                  <p style={{ margin: '0' }}>Shared with</p>
                                  <div className={styles.eyeWrap}>
                                    {folderValue?.sharedWith?.map(
                                      (data, index) => {
                                        const { firstName } = data
                                        return (
                                          <div
                                            className={styles.circle}
                                            style={{
                                              backgroundColor: stc(firstName),
                                            }}
                                            key={index}
                                          >
                                            {firstName[0]}
                                          </div>
                                        )
                                      }
                                    )}
                                  </div>
                                </div>
                              }
                            >
                              <EyeOutlined />
                            </Tooltip>
                          </div>
                        )}
                      <div className={styles.folderContentData}>
                        <Checkbox
                          checked={selectedDocuments.includes(
                            folderValue.folderData as never
                          )}
                          className={
                            selectedDocuments.includes(
                              folderValue.folderData as never
                            )
                              ? classNames(styles.checked, styles.showCheck)
                              : ''
                          }
                          onChange={(e) =>
                            handleSelect(
                              e.target.checked,
                              folderValue.folderData
                            )
                          }
                        />
                        {!isMobile ? (
                          <Popover
                            placement="bottom"
                            content={
                              <DocumentPopupContent
                                record={folderValue.folderData}
                              />
                            }
                            trigger="click"
                          >
                            <Button
                              className={styles.btnCircle}
                              shape="circle"
                              icon={<MoreOutlined />}
                            />
                          </Popover>
                        ) : (
                          <Button
                            className={styles.btnCircle}
                            shape="circle"
                            icon={<MoreOutlined />}
                            onClick={() => setDocumentDrawer(true)}
                          />
                        )}
                        <div className={styles.hoverOverlay} />
                        <div
                          draggable={true}
                          onDragStart={(event) => dragItem(event)}
                          id={folderValue?.folderData}
                        >
                          {fileArray.has(fileData[fileData.length - 1]) ? (
                            <FileIcon
                              extension={fileData[fileData.length - 1]}
                              {...fileIconStyle[fileData[fileData.length - 1]]}
                            />
                          ) : (
                            <img
                              src={folderValue?.folderData}
                              alt={'none'}
                              draggable={false}
                            />
                          )}
                        </div>
                      </div>
                      <p
                        style={
                          selectedDocuments.includes(
                            folderValue.folderData as never
                          )
                            ? { color: 'skyblue' }
                            : {}
                        }
                      >
                        {fileName[fileName.length - 1]}
                      </p>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <Drawer
          placement={'bottom'}
          closable={false}
          onClose={() => setFolderDrawer((e) => !e)}
          visible={folderDrawer}
          className={styles.createContentMobile}
        >
          <div className={styles.mobileHeader}>
            <div className={styles.handler} />
            <FolderPopupContent record={selectedFolder} />
          </div>
        </Drawer>

        <Drawer
          placement={'bottom'}
          closable={false}
          onClose={() => setDocumentDrawer((e) => !e)}
          visible={documentDrawer}
          className={styles.createContentMobile}
        >
          <div className={styles.mobileHeader}>
            <div className={styles.handler} />
            <DocumentPopupContent record={selectedFolder} />
          </div>
        </Drawer>

        {listView && (
          <div className={styles.listViewWrap}>
            {data.folder.length > 0 && (
              <Table
                columns={foldersTableColumns}
                dataSource={data.folder?.map((item) => {
                  return {
                    id: item?.id,
                    name: item.folderTitle,
                    files: item.contentCount || 0,
                    lastModified: dayjs(item?.modifiedDate).format(
                      'DD-MM-YYYY'
                    ),
                  }
                })}
                pagination={false}
              />
            )}

            <div className={styles.listViewWrapData}>
              <Table
                columns={documentsTableColumns}
                dataSource={data?.folderContent?.map((item) => {
                  return {
                    id: item?.id,
                    name: item.folderData,
                    owner: 'me',
                    date: dayjs(new Date(item.dateTime * 1000)).format(
                      'DD-MM-YYYY'
                    ),
                  }
                })}
                pagination={false}
                scroll={{ x: 600 }}
              />
            </div>
          </div>
        )}

        <BasicModal
          modalWidth={isMobile ? 375 : 1000}
          onCancel={() => {
            setPageNumber(1)
            setPreviewModal((e) => !e)
          }}
          onDelete={() => console.log()}
          onSpecialBooleanClick={() => console.log()}
          visible={previewModal}
          className={styles.previewModal}
          footer={false}
        >
          <div className={styles.modalContent}>
            {
              <PreviewFile
                title={pdfName}
                numPages={numPages}
                pageNumber={pageNumber}
                pdfURL={pdfData}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
                onSetNumPages={onSetNumPages}
                setPreviewModal={setPreviewModal}
              />
            }
          </div>
        </BasicModal>
        <Modal
          title={'Delete forever ?'}
          onCancel={() => {
            setDeleteModal((e) => !e)
          }}
          onOk={() => {
            handleDelete()
            setDeleteModal((e) => !e)
          }}
          visible={deleteModal}
          className={styles.deleteModal}
          cancelText={'Cancel'}
          okText={'Delete forever'}
        >
          <div className={styles.modalContent}>
            <p>
              {tempData.length}{' '}
              {`items will be deleted forever and you won't be able to restore them.`}
            </p>
          </div>
        </Modal>
      </div>
    )
  }
)

export default FolderData
