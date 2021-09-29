import React, { FC, useEffect, useState } from 'react'
import styles from './ClientDocuments.module.less'
import {
  BasicModal,
  folderProps,
  NotificationType,
  Notification,
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
  folderData?: folderProps[]
  folderTitle?: string
}

export interface FolderDataProps {
  data: folderProps
  onFolderClick: (index) => void
  listView: boolean
  checkedData: Array<string>
  setCheckedData: (e) => void
  setShowMenu: (e) => void
  setRecentData: (e) => void
  setSelectFolderData: (e) => void
  selectFolderData: Array<string>
  setTempData: (e) => void
  tempData: Array<string>
  handleDelete: () => void
  setRecentActionData: (e) => void
  recentActionData: Array<selectProps>
  setCurrentData: (e) => void
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
    selectFolderData,
    setSelectFolderData,
    setTempData,
    tempData,
    handleDelete,
    setRecentActionData,
    recentActionData,
  }) => {
    const isMobile = useMedia('(max-width: 767px)', false)
    const [tableData, setTableData] = useState([])
    const [folderContentData, setFolderContentData] = useState([])
    const [folderContentValue, setFolderContentValue] = useState([])
    const [folderDrawer, setFolderDrawer] = useState(false)
    const [folderDataDrawer, setFolderDataDrawer] = useState(false)
    const [previewModal, setPreviewModal] = useState(false)
    const [pdfData, setPdfData] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteItemModal, setDeleteItemModal] = useState(false)

    const [numPages, setNumPages] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState(1)
    const [pdfName, setPdfName] = useState('')

    const [dropFolderTitle, setDropFolderTitle] = useState('')
    const [deleteData, setDeleteData] = useState('')
    const [dragFolderTitle, setDragFolderTitle] = useState('')
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
    useEffect(() => {
      const alterTable = []
      const content = []
      const recentValue = []

      if (listView) {
        data.folder?.map((folderData, index) =>
          alterTable.push({
            name: [folderData.folderTitle, index],
            files: folderData.folderContent?.length,
            lastModified: folderData.folderContent?.length
              ? (folderData.folderContent[folderData.folderContent?.length - 1]
                  ?.dateTime as never)
              : (dayjs().format('DD.MM.YYYY') as string),
          } as never)
        )

        data.folderTitle === 'Folders' &&
          data.folderContent?.map((folder, index) => {
            const fileData = folder?.folderData
            recentValue.push(fileData as never)
            return content.push({
              name: [fileData, index],
              lastModified: folder?.dateTime
                ? folder?.dateTime
                : (dayjs().format('DD.MM.YYYY') as string),
            } as never)
          })
      }
      listView && setTableData(alterTable)
      listView && setFolderContentData(content)
      // setRecentData(recentValue)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, listView])

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
    const handleMobilePreviewModal = (x) => {
      setDeleteData(x.folders)
      const fileName = x.name[0].split('/')
      setPdfName(fileName[fileName.length - 1])
      setPdfData(x.name[0])
      setPageNumber(1)
      setFolderDrawer((e) => !e)
    }

    const handlePre = () => {
      setPreviewModal((e) => !e)
      setFolderDrawer(false)
    }
    const handleRecentDelete = (record) => {
      const val = { ...data }
      val.folderContent?.map((x, index) => {
        x.folderData === record && val.folderContent?.splice(index, 1)
        return 1
      })
      setCurrentData(val)
    }
    const handleMobileDelete = () => {
      const val = { ...data }
      val.folder.map((x) => {
        if (deleteData === x.folderTitle) {
          x.folderContent?.pop()
        }
        return 1
      })
      setCurrentData(val)
    }
    const content = (record) => {
      return (
        <div className={styles.menuContentMobileBody}>
          <div className={styles.menuContentList}>
            <div
              className={styles.menuItem}
              onClick={() =>
                isMobile ? handlePre() : handlePreview(record.name[0])
              }
            >
              <EyeOutlined /> Preview
            </div>
            <div className={styles.menuItem}>
              <EditOutlined /> Rename
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
              <FileOutlined /> Show file location
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
              onClick={() => setDeleteItemModal(true)}
            >
              <DeleteOutlined /> Delete
            </div>
          </div>

          <Modal
            title={'Delete forever ?'}
            onCancel={() => {
              setDeleteItemModal((e) => !e)
            }}
            onOk={() => {
              isMobile ? handleMobileDelete() : handleRecentDelete(record)
              setDeleteItemModal((e) => !e)
            }}
            visible={deleteItemModal}
            className={styles.deleteModal}
            cancelText={'Cancel'}
            okText={'Delete forever'}
          >
            <div className={styles.modalContent}>
              <p>
                {`items will be deleted forever and you won't be able to restore them.`}
              </p>
            </div>
          </Modal>
        </div>
      )
    }

    const handleSingleDelete = (record) => {
      const deleteValue = []
      deleteValue.push(record as never)
      setTempData(deleteValue)
      setDeleteModal(true)
    }

    const folderDataContent = (record) => {
      return (
        <div className={styles.menuContentMobileBody}>
          <div className={styles.menuContentList}>
            <div
              className={styles.menuItem}
              onClick={() => (isMobile ? handlePre() : handlePreview(record))}
            >
              <EyeOutlined /> Preview
            </div>
            <div className={styles.menuItem}>
              <EditOutlined /> Rename
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

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        // eslint-disable-next-line react/display-name
        render: (value) => (
          <div className={styles.tableFirstCol}>
            <FolderFilled />
            <p>{value[0]}</p>
          </div>
        ),
      },
      {
        title: 'Files',
        dataIndex: 'files',
      },
      {
        title: 'Last Modified',
        dataIndex: 'lastModified',
      },
    ]
    const folderContentColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        classNames: 'maxWidth',
        // eslint-disable-next-line react/display-name
        render: (value) => {
          const filename = value[0] ? value[0].split('/') : []
          const fileData = value[0] ? value[0].split('.') : []
          return (
            <div
              className={styles.folderContentFirst}
              style={{ border: '1px solid red' }}
            >
              <Checkbox
                checked={checkedData.includes(value[0] as never)}
                onChange={(e) => handleOnChange(e.target.checked, value)}
              >
                <Card bordered={false}>
                  {fileArray.has(fileData[fileData?.length - 1]) ? (
                    fileData[fileData.length - 1] === 'pdf' ? (
                      <div className={styles.pdfViewWrap}>
                        <DocumentPdf pageNumber={1} pdfURL={value[0]} />
                      </div>
                    ) : (
                      <FileIcon
                        extension={fileData[fileData.length - 1]}
                        {...fileIconStyle[fileData[fileData.length - 1]]}
                      />
                    )
                  ) : (
                    <img src={value[0]} alt={'none'} height={35} width={50} />
                  )}
                </Card>
                <div>
                  <p>{filename[filename.length - 1]}</p>
                </div>
              </Checkbox>
            </div>
          )
        },
      },
      {
        title: 'Last Modified',
        dataIndex: 'lastModified',
      },
      {
        title: '',
        key: 'action',
        // text,record
        // eslint-disable-next-line react/display-name
        render: (text, record) =>
          !isMobile ? (
            <Popover
              placement="left"
              content={content(record.name[0])}
              trigger="click"
            >
              <Button
                className={styles.btnCircle}
                shape="circle"
                icon={<MoreOutlined />}
                onClick={() => content(record.name[0])}
              />
            </Popover>
          ) : (
            <>
              <Button
                className={styles.btnCircle}
                shape="circle"
                icon={<MoreOutlined />}
                onClick={() => handleMobilePreviewModal(record)}
              />
              <Drawer
                placement={'bottom'}
                closable={false}
                onClose={() => setFolderDrawer((e) => !e)}
                visible={folderDrawer}
                className={styles.createContentMobile}
              >
                <div className={styles.mobileHeader}>
                  <div className={styles.handler} />
                  {content(record)}
                </div>
              </Drawer>
            </>
          ),
      },
    ]

    useEffect(() => {
      const x = []
      if (listView) {
        data.folderTitle !== 'Folders' &&
          data.folderContent?.map((contentValue, index) => {
            return x.push({
              name: [
                contentValue.folderData,
                contentValue.sharedWith ? contentValue.sharedWith : [],
                index,
              ],
              owner: 'me',
              date: contentValue.dateTime,
            } as never)
          })
        setFolderContentValue(x)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listView, data])

    const folderContentDataColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        // eslint-disable-next-line react/display-name
        render: (value) => {
          const filename = value[0] ? value[0].split('/') : []
          const fileData = value[0] ? value[0].split('.') : []
          return (
            <div className={styles.folderContentFirst}>
              <Checkbox
                checked={selectFolderData.includes(value[0] as never)}
                onChange={(e) => handleSelect(e.target.checked, value[0])}
              >
                <Card bordered={false}>
                  {fileArray.has(fileData[fileData?.length - 1]) ? (
                    fileData[fileData.length - 1] === 'pdf' ? (
                      <div className={styles.pdfViewWrap}>
                        <DocumentPdf pageNumber={1} pdfURL={value[0]} />
                      </div>
                    ) : (
                      <FileIcon
                        extension={fileData[fileData.length - 1]}
                        {...fileIconStyle[fileData[fileData.length - 1]]}
                      />
                    )
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
        // text,record
        // eslint-disable-next-line react/display-name
        render: (text, record) =>
          !isMobile ? (
            <Popover
              placement="left"
              content={folderDataContent(record.name[0])}
              trigger="click"
            >
              <Button
                className={styles.btnCircle}
                shape="circle"
                icon={<MoreOutlined />}
              />
            </Popover>
          ) : (
            <>
              <Button
                className={styles.btnCircle}
                shape="circle"
                icon={<MoreOutlined />}
                onClick={() => setFolderDataDrawer(true)}
              />

              <Drawer
                placement={'bottom'}
                closable={false}
                onClose={() => setFolderDataDrawer((e) => !e)}
                visible={folderDataDrawer}
                className={styles.createContentMobile}
              >
                <div className={styles.mobileHeader}>
                  <div className={styles.handler} />
                  {folderDataContent(record.name[0])}
                </div>
              </Drawer>
            </>
          ),
      },
    ]

    const handleSelect = (checked, folderContent) => {
      const storeData = [...selectFolderData]
      const idx = storeData.indexOf(folderContent as never)
      checked
        ? storeData.push(folderContent as never)
        : storeData.splice(idx, 1)
      setSelectFolderData([...storeData])
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
            folderData.folder.push(transferFolder as folderProps)
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
              <div className={styles.folderData}>
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
                        onClick={() => onFolderClick(i)}
                        onDragStart={(event) => dragFolder(event)}
                        draggable={true}
                        id={x.folderTitle}
                      >
                        <Card id={x.folderTitle}>
                          <FolderFilled />{' '}
                          <p className={styles.folderTitle} id={x.folderTitle}>
                            {x.folderTitle}
                          </p>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.folderContent}>
              {data.folderTitle === 'Folders' && (
                <h3 style={{ width: '100%', marginLeft: '7px' }}>Files</h3>
              )}
              {data.folderTitle === 'Folders' &&
                data?.folderContent?.map((folderItem) => {
                  const fileData = folderItem?.folderData?.split('.')
                  const fileName = folderItem?.folderData?.split('/')
                  return (
                    folderItem && (
                      <div
                        className={classNames(styles.checked, styles.showCheck)}
                        style={{ position: 'relative' }}
                      >
                        <div
                          className={styles.checkWrappers}
                          style={{ zIndex: -1 }}
                        >
                          {!isMobile ? (
                            <Popover
                              placement="bottom"
                              content={content(folderItem.folderData)}
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
                              onClick={() => setFolderDataDrawer(true)}
                            />
                          )}
                          <Card bordered={false}>
                            {fileArray.has(fileData[fileData?.length - 1]) &&
                              (folderItem.sharedWith as never) && (
                                <div className={styles.customEye}>
                                  <Tooltip
                                    trigger={'click'}
                                    arrowPointAtCenter
                                    title={
                                      <div>
                                        <p style={{ margin: '0' }}>
                                          Shared with
                                        </p>
                                        <div className={styles.eyeWrap}>
                                          {folderItem.sharedWith?.map(
                                            (data, index) => {
                                              const { firstName } = data
                                              return (
                                                <div
                                                  className={styles.circle}
                                                  style={{
                                                    backgroundColor: stc(
                                                      firstName
                                                    ),
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
                              <div
                                draggable={true}
                                onDragStart={(event) => dragItem(event)}
                                id={folderItem.folderData}
                              >
                                {fileArray.has(
                                  fileData[fileData.length - 1]
                                ) ? (
                                  fileData[fileData.length - 1] === 'pdf' ? (
                                    <div className={styles.pdfViewWrap}>
                                      <DocumentPdf
                                        pageNumber={1}
                                        pdfURL={folderItem.folderData}
                                      />
                                      {/*<FilePreviewerThumbnail*/}
                                      {/*  file={{*/}
                                      {/*    url: folderItem.folderData,*/}
                                      {/*    // mimeType: 'application/pdf',*/}
                                      {/*  }}*/}
                                      {/*/>*/}
                                    </div>
                                  ) : (
                                    <FileIcon
                                      draggable={true}
                                      extension={fileData[fileData.length - 1]}
                                      {...fileIconStyle[
                                        fileData[fileData.length - 1]
                                      ]}
                                    />
                                  )
                                ) : (
                                  folderItem.folderData.length > 0 && (
                                    <img
                                      src={folderItem.folderData}
                                      draggable={false}
                                      alt={folderItem.folderData}
                                    />
                                  )
                                )}
                              </div>
                              <p>{fileName[fileName.length - 1]}</p>
                            </div>
                          </Card>
                        </div>
                      </div>
                    )
                  )
                })}
              {data.folderTitle !== 'Folders' &&
                data.folderContent?.map((folderValue) => {
                  const fileData = folderValue?.folderData?.split('.')
                  const fileName = folderValue?.folderData?.split('/')
                  return (
                    <Checkbox
                      checked={selectFolderData.includes(
                        folderValue.folderData as never
                      )}
                      className={
                        selectFolderData.includes(
                          folderValue.folderData as never
                        )
                          ? classNames(styles.checked, styles.showCheck)
                          : ''
                      }
                      onChange={(e) =>
                        handleSelect(e.target.checked, folderValue.folderData)
                      }
                      key={folderValue.id}
                    >
                      <div className={styles.checkWrappers}>
                        {!isMobile ? (
                          <Popover
                            placement="bottom"
                            content={folderDataContent(folderValue.folderData)}
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
                            onClick={() => setFolderDataDrawer(true)}
                          />
                        )}
                        <Card
                          bordered={false}
                          key={folderValue.id}
                          className={
                            selectFolderData.includes(
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
                                                  backgroundColor: stc(
                                                    firstName
                                                  ),
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
                            <div
                              draggable={true}
                              onDragStart={(event) => dragItem(event)}
                              id={folderValue?.folderData}
                            >
                              {fileArray.has(fileData[fileData.length - 1]) ? (
                                fileData[fileData.length - 1] === 'pdf' ? (
                                  <div className={styles.pdfViewWrap}>
                                    <DocumentPdf
                                      pageNumber={1}
                                      pdfURL={folderValue?.folderData}
                                    />
                                  </div>
                                ) : (
                                  <FileIcon
                                    extension={fileData[fileData.length - 1]}
                                    {...fileIconStyle[
                                      fileData[fileData.length - 1]
                                    ]}
                                  />
                                )
                              ) : (
                                <img
                                  src={folderValue?.folderData}
                                  alt={'none'}
                                  draggable={false}
                                />
                              )}
                            </div>
                            <p
                              style={
                                selectFolderData.includes(
                                  folderValue.folderData as never
                                )
                                  ? { color: 'skyblue' }
                                  : {}
                              }
                            >
                              {fileName[fileName.length - 1]}
                            </p>
                          </div>
                        </Card>
                      </div>
                    </Checkbox>
                  )
                })}
            </div>
          </div>
        )}
        {listView && (
          <div className={styles.listViewWrap}>
            {data.folder.length > 0 && (
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                onRow={(record) => ({
                  onClick: () => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onFolderClick(record.name[1])
                  },
                })}
              />
            )}
            {data.folderTitle === 'Folders' && (
              <div className={styles.listViewWrapData}>
                <Table
                  columns={folderContentColumns}
                  dataSource={folderContentData}
                  pagination={false}
                  scroll={{ x: 600 }}
                />
              </div>
            )}
            {data.folderTitle !== 'Folders' && (
              <div className={styles.folderContentDataList}>
                <Table
                  columns={folderContentDataColumns}
                  dataSource={folderContentValue}
                  pagination={false}
                  scroll={{ x: 600 }}
                />
              </div>
            )}
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
