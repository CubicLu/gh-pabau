import React, { FC, useEffect, useState } from 'react'
import styles from './ClientDocuments.module.less'
import {
  BasicModal,
  FolderProps,
  NotificationType,
  Notification,
  FolderContentProps,
  Pagination,
} from '@pabau/ui'
import {
  Input,
  Card,
  Tooltip,
  Table,
  Popover,
  Button,
  Drawer,
  Modal,
  Skeleton,
  Menu,
} from 'antd'
import {
  EyeOutlined,
  FolderFilled,
  MoreOutlined,
  RightOutlined,
  DownloadOutlined,
  EditOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  PrinterOutlined,
  FolderOutlined,
  PlusOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import { FileIcon, defaultStyles } from 'react-file-icon'
import { ReactComponent as ImageFolder } from '../../assets/images/image-album.svg'
import stc from 'string-to-color'
import dayjs from 'dayjs'
import { Checkbox } from '../checkbox/Checkbox'
import { useMedia } from 'react-use'
import classNames from 'classnames'
import PreviewFile from './PreviewFile'

const getThumb = (src: string) => {
  if (src.includes('photos/')) {
    const pathArr = src.split('photos/')
    pathArr[1] = `thumb_${pathArr[1]}`
    return pathArr.join('photos/')
  } else {
    return src
  }
}

const ImageItem = ({ origin, isDirectPath = false, ...props }) => {
  const [source, setSource] = useState('')

  useEffect(() => {
    if (source === '' && origin !== '') {
      const path = getThumb(origin)
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.addEventListener('load', () => {
        //draw origin image
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          img.width,
          img.height
        )
        setSource(canvas.toDataURL())
      })
      img.addEventListener('error', () => {
        setSource('')
      })
      img.src = path
    }
  }, [isDirectPath, origin, source])

  return source ? (
    <img
      src={!isDirectPath ? source : getThumb(origin)}
      alt="content"
      {...props}
    />
  ) : (
    <div {...props}>
      <Skeleton.Image />
    </div>
  )
}

interface DataSourceType {
  [key: string]: string | number
}

export interface FolderDataProps {
  data: FolderProps
  allFolders: FolderProps[]
  onFolderClick: (id: number) => void
  listView: boolean
  loading: boolean
  setShowMenu: (e) => void
  setSelectedDocuments: (e) => void
  selectedDocuments: FolderContentProps[]
  paginateData: {
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
    currentPage: number
  }
  onFolderRename?: (id: number) => void
  onFolderDelete?: (id: number) => void
  onDocumentDelete?: (id: number) => void
  singleDocDelLoading?: boolean
  onSingleDocumentMove?: (
    albumId: number,
    imageId: number,
    createAlbum?: boolean
  ) => void
  drop: (e) => void
  allowDrop: (e) => void
  dragDocument: (e) => void
  onRenameFile?: (file: number, name: string) => void
  renameFileLoading?: boolean
}

export const FolderData: FC<FolderDataProps> = ({
  data,
  allFolders,
  onFolderClick,
  listView,
  loading,
  paginateData,
  setShowMenu,
  selectedDocuments,
  setSelectedDocuments,
  onFolderRename,
  onFolderDelete,
  onDocumentDelete,
  singleDocDelLoading,
  onSingleDocumentMove,
  drop,
  allowDrop,
  dragDocument,
  onRenameFile,
  renameFileLoading,
}) => {
  const isMobile = useMedia('(max-width: 767px)', false)

  const [folderDrawer, setFolderDrawer] = useState(false)
  const [documentDrawer, setDocumentDrawer] = useState(false)
  const [previewModal, setPreviewModal] = useState(false)
  const [pdfData, setPdfData] = useState('')
  const [docDeleteModal, setDocDelModal] = useState(false)

  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfName, setPdfName] = useState('')

  const [selectedFolder, setSelectedFolder] = useState<number>(0)
  const [selectedDocument, setSelectedDocument] = useState<number>(0)

  const [renamingFile, setRenamingFile] = useState<{
    id: number
    name: string
  }>({ id: 0, name: '' })
  const [renameFileModal, setRenameFileModal] = useState(false)

  useEffect(() => {
    setNumPages(0)
    setPageNumber(1)
  }, [pdfData])

  useEffect(() => {
    setDocDelModal(() => false)
    setDocumentDrawer(() => false)
    setRenameFileModal(() => false)
    setRenamingFile({ id: 0, name: '' })
  }, [data])

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

  const handlePreview = (pdf, name = '') => {
    let cName = name
    if (!cName) {
      const cNameArr = pdf?.split('/')
      cName = displayDocName(cNameArr[cNameArr?.length - 1])
    }
    setPdfName(cName)
    setPdfData(pdf)
    setPageNumber(1)
    setPreviewModal((e) => !e)
  }

  const FolderPopupContent = ({ record }) => {
    return (
      <div className={styles.menuContentMobileBody}>
        <div className={styles.menuContentList}>
          <div
            className={styles.menuItem}
            onClick={() => {
              setFolderDrawer(() => false)
              onFolderRename?.(record)
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
              setSelectedFolder(record)
              onFolderDelete?.(record)
            }}
          >
            <DeleteOutlined /> Delete
          </div>
        </div>
      </div>
    )
  }

  const FolderDropdownMenu = ({ docId = 0, closePopover }) => {
    const filtered: { id: number; name: string }[] = []
    const iterateToAlbms = (folders) => {
      for (const el of folders) {
        if (el?.id !== data?.id) {
          filtered.push({
            id: el?.id,
            name: el?.folderTitle,
          })
          if (el?.folder?.length) iterateToAlbms(el?.folder)
        }
      }
    }
    iterateToAlbms(allFolders)
    if (data?.id !== 0) filtered.unshift({ id: 0, name: 'Uncategorized' })

    return (
      <Menu className={styles.menuItemList}>
        {filtered?.map((folder) => (
          <Menu.Item
            key={folder.id.toString()}
            onClick={() => {
              onSingleDocumentMove?.(folder.id, docId, false)
              closePopover?.()
            }}
          >
            <ImageFolder />
            <div>{folder.name}</div>
          </Menu.Item>
        ))}
        <Menu.Item
          key="New"
          onClick={() => {
            onSingleDocumentMove?.(0, docId, true)
            closePopover?.()
          }}
        >
          <PlusOutlined />
          <div>New Folder</div>
        </Menu.Item>
      </Menu>
    )
  }

  const DocumentPopupContent = ({ record, showFolderMenu = false }) => {
    const [folderDropdown, setFolderDropdown] = useState(showFolderMenu)
    const [downloadPerc, setDownloadPerc] = useState(0)
    const [downloadStarted, setDownloadStarted] = useState(false)

    const downloadSingleDoc = (url: string) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'blob'
      xhr.addEventListener('progress', (event) => {
        let contentLength: number
        let perc = 0
        if (event.lengthComputable) {
          contentLength = event.total
          perc = (event.loaded / contentLength) * 100
          setDownloadPerc(perc)
        }

        if (perc >= 100 && downloadStarted) {
          setDownloadStarted(() => false)
          Notification(NotificationType?.success, 'Downloading...')
        }
      })
      xhr.addEventListener('error', function () {
        Notification(NotificationType?.error, 'Failed')
      })
      xhr.addEventListener('load', function () {
        const urlCreator = window.URL || window.webkitURL
        const imageUrl = urlCreator.createObjectURL(this.response)
        const tag = document.createElement('a')
        tag.href = imageUrl
        tag.download = url
        document.body.append(tag)
        tag.click()
        tag.remove()
        if (downloadStarted)
          Notification(NotificationType?.success, 'Downloaded')
        setDownloadStarted(() => false)
      })
      xhr.send()
      setDownloadStarted(() => true)
      Notification(NotificationType?.success, 'Downloading...')
    }

    useEffect(() => {
      setFolderDropdown(showFolderMenu)
    }, [showFolderMenu])

    return folderDropdown ? (
      <div className={styles.docPopoutFolderDropdown}>
        <CloseOutlined onClick={() => setFolderDropdown(() => false)} />
        <FolderDropdownMenu
          docId={record}
          closePopover={() => setFolderDropdown(() => false)}
        />
      </div>
    ) : (
      <div className={styles.menuContentMobileBody}>
        <div className={styles.menuContentList}>
          <div
            className={styles.menuItem}
            style={{ borderBottom: '1px solid #ECEDF0' }}
            onClick={() => {
              const cFolderContent = data?.folderContent
              const url = cFolderContent?.find((el) => el?.id === record)
                ?.folderData
              if (url && !downloadStarted) downloadSingleDoc?.(url || '')
            }}
          >
            <DownloadOutlined />
            {downloadStarted
              ? downloadPerc > 0
                ? downloadPerc + '% downloaded'
                : 'Donwloading...'
              : 'Donwload'}
          </div>
          <div
            className={styles.menuItem}
            onClick={() => {
              const cFile = data?.folderContent?.find((el) => el?.id === record)
              if (cFile) {
                setRenamingFile({
                  id: cFile?.id,
                  name: cFile?.documentName || '',
                })
                setRenameFileModal((e) => !e)
              }
            }}
          >
            <EditOutlined /> Rename
          </div>
          <div
            className={styles.menuItem}
            style={{ justifyContent: 'space-between', display: 'flex' }}
            onClick={() => {
              setFolderDropdown((e) => !e)
            }}
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
            style={{ color: 'red' }}
            onClick={() => {
              setSelectedDocument(record)
              setDocumentDrawer(() => false)
              setDocDelModal(() => true)
            }}
          >
            <DeleteOutlined /> Delete
          </div>
        </div>
      </div>
    )
  }

  const foldersTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '50%',
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
      width: '15%',
      render: function renderTableSource(value) {
        return value
      },
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      width: '25%',
    },
    {
      title: '',
      key: 'action',
      width: '10%',
      render: function renderTableSource(text, record) {
        return (
          selectedDocuments?.length <= 0 &&
          (!isMobile ? (
            <Popover
              placement="left"
              content={<FolderPopupContent record={record?.id} />}
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
                setSelectedFolder(record?.id)
                setFolderDrawer(() => true)
              }}
            />
          ))
        )
      },
    },
  ]

  const documentsTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '50%',
      render: function renderTableSource(value, record) {
        const fileName = value ? value.split('/') : []
        const fileData = value ? value.split('.') : []
        return (
          <div className={styles.folderContentFirst}>
            <Checkbox
              checked={
                selectedDocuments.find((el) => el?.id === record?.id)
                  ? true
                  : false
              }
              onChange={(e) => handleSelect(e.target.checked, record)}
            />
            <Card
              bordered={false}
              onClick={() =>
                handlePreview(record?.folderData, record?.documentName)
              }
            >
              {fileArray.has(fileData[fileData?.length - 1]) ? (
                <FileIcon
                  foldColor="lightgray"
                  labelColor="var(--primary-color)"
                  glyphColor="var(--primary-color)"
                  extension={fileData[fileData.length - 1]}
                  {...fileIconStyle[fileData[fileData.length - 1]]}
                />
              ) : (
                <ImageItem
                  origin={value}
                  className={styles.tableImage}
                  alt={record?.folderData}
                  id={record?.id}
                  key={record?.id}
                />
              )}
            </Card>
            <div
              onClick={() =>
                handlePreview(record?.folderData, record?.documentName)
              }
            >
              <p>
                {record?.documentName
                  ? record?.documentName
                  : displayDocName(fileName[fileName.length - 1], 20)}
              </p>
            </div>
            {value?.[1]?.length > 0 && (
              <div className={styles.shareView} style={{ marginLeft: '10px' }}>
                <Tooltip
                  trigger={'click'}
                  arrowPointAtCenter
                  title={
                    <div>
                      <p style={{ margin: '0' }}>Shared with</p>
                      {/* <div className={styles.eyeWrap}>
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
                        </div> */}
                    </div>
                  }
                >
                  <EyeOutlined />
                </Tooltip>
              </div>
            )}
          </div>
        )
      },
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      width: '15%',
    },
    {
      title: 'Last modified',
      dataIndex: 'date',
      width: '25%',
    },
    {
      title: '',
      key: 'action',
      width: '10%',
      className: 'contentTablePopover',
      render: function renderTableSource(text, record) {
        return (
          <div>
            {selectedDocuments?.length <= 0 &&
              (!isMobile ? (
                <Popover
                  placement="left"
                  content={
                    <DocumentPopupContent
                      record={record?.id}
                      showFolderMenu={false}
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
                  onClick={() => {
                    setSelectedDocument(record?.id)
                    setDocumentDrawer(true)
                  }}
                />
              ))}
          </div>
        )
      },
    },
  ]

  const handleSelect = (checked: boolean, folderContent) => {
    const storeData = [...selectedDocuments]
    const idx = storeData.findIndex((el) => el?.id === folderContent?.id)
    checked ? storeData.push(folderContent) : storeData.splice(idx, 1)
    setSelectedDocuments([...storeData])
    storeData.length > 0 ? setShowMenu(true) : setShowMenu(false)
  }

  const displayDocName = (name: string, len = 10) => {
    if (name?.includes('.')) {
      const cNameArr = name?.split('.')
      const ext = cNameArr[cNameArr?.length - 1]
      const nmArr = cNameArr[0]?.split('_$')?.[0]
      return nmArr + `.${ext}`
    }
    return name
  }

  const LoadingTable = ({ columns }) => {
    const cColumns: ColumnsType = []
    const dataSource: DataSourceType[] = []
    for (const key of columns) {
      const { visible = true } = key
      if (visible) {
        cColumns.push({
          ...key,
          render: function render() {
            const width = key.skeletonWidth ?? '200px'
            return (
              <div className={styles.columnLoader} style={{ width: width }}>
                <Skeleton.Input active={true} size="small" />
              </div>
            )
          },
        })
      }
    }
    for (
      let i = 0;
      i <
      (data?.contentCount < paginateData?.pageSize
        ? data?.contentCount
        : paginateData?.pageSize || 10);
      i = i + 1
    ) {
      let data
      for (const key of columns) {
        data = { ...data, id: i, key: i, [key.dataIndex]: '' }
      }
      dataSource.push(data)
    }
    return (
      <Table
        dataSource={dataSource}
        columns={cColumns}
        rowKey="key"
        pagination={false}
      />
    )
  }

  return (
    <div className={styles.folderListContainer}>
      <div
        className={classNames(
          styles.folderListWrap,
          listView && styles.displayNone
        )}
      >
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
                <div className={styles.folderContainer}>
                  <div className={styles.gridContainer}>
                    <Card onClick={() => onFolderClick(x?.id)}>
                      <FolderFilled />{' '}
                      <p className={styles.folderTitle}>{x.folderTitle}</p>
                    </Card>
                    {!isMobile ? (
                      <Popover
                        placement="bottomRight"
                        content={() => <FolderPopupContent record={x?.id} />}
                        trigger="click"
                        className={styles.imageDotButton}
                      >
                        {selectedDocuments?.length <= 0 && (
                          <div className={styles.dotBtn}>
                            <Button
                              className={styles.btnCircle}
                              shape="circle"
                              icon={<MoreOutlined />}
                            />
                          </div>
                        )}
                      </Popover>
                    ) : (
                      <div
                        className={styles.dotBtn}
                        onClick={() => {
                          setFolderDrawer((e) => !e)
                          setSelectedFolder(x?.id)
                        }}
                      >
                        {selectedDocuments?.length <= 0 && (
                          <Button
                            className={styles.btnCircle}
                            shape="circle"
                            icon={<MoreOutlined />}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={styles.dropable}
                  id={`tar${x?.id}`}
                  onDrop={(ev) => drop(ev)}
                  onDragOver={(ev) => allowDrop(ev)}
                  onDragLeave={() => {
                    document
                      ?.querySelector(`#tar${x.id}`)
                      ?.classList?.remove('dropEffect')
                  }}
                ></div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.folderContent}>
          {data?.folder &&
            data?.folder?.length > 0 &&
            data?.folderContent &&
            data?.folderContent?.length > 0 &&
            data.folderTitle === 'Uncategorized' && (
              <h3 style={{ width: '100%', marginLeft: '7px' }}>Files</h3>
            )}
          {!loading &&
            data?.folderContent &&
            data?.folderContent?.length > 0 &&
            data?.folderContent?.map((folderValue, i) => {
              const fileData = folderValue?.folderData?.split('.')
              const fileName = folderValue?.folderData?.split('/')
              return (
                <div className={styles.checkWrappers} key={folderValue?.id}>
                  <Card
                    bordered={false}
                    key={folderValue.id}
                    className={
                      selectedDocuments.includes(folderValue)
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
                        checked={selectedDocuments.includes(folderValue)}
                        className={
                          selectedDocuments.includes(folderValue)
                            ? classNames(styles.checked, styles.showCheck)
                            : ''
                        }
                        onChange={(e) =>
                          handleSelect(e.target.checked, folderValue)
                        }
                      />
                      {selectedDocuments?.length <= 0 &&
                        (!isMobile ? (
                          <Popover
                            placement="bottom"
                            content={
                              <DocumentPopupContent
                                record={folderValue?.id}
                                showFolderMenu={false}
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
                            onClick={() => {
                              setSelectedDocument(folderValue?.id)
                              setDocumentDrawer(() => true)
                            }}
                          />
                        ))}
                      <div
                        className={styles.hoverOverlay}
                        onClick={() =>
                          handlePreview(
                            folderValue?.folderData,
                            folderValue?.documentName
                          )
                        }
                        draggable={true}
                        id={folderValue?.id?.toString()}
                        onDragStart={(event) => dragDocument(event)}
                        onDragLeave={() => {
                          const elem = document.querySelector('#draGhost')
                          elem?.remove()
                        }}
                        data-type={fileData[fileData.length - 1]}
                      />
                      <div>
                        {fileArray.has(fileData[fileData.length - 1]) ? (
                          <FileIcon
                            foldColor="lightgray"
                            labelColor="var(--primary-color)"
                            glyphColor="var(--primary-color)"
                            extension={fileData[fileData.length - 1]}
                            {...fileIconStyle[fileData[fileData.length - 1]]}
                          />
                        ) : (
                          <ImageItem
                            origin={folderValue?.folderData}
                            alt={folderValue?.folderData}
                            id={folderValue?.id}
                            key={i}
                          />
                        )}
                      </div>
                    </div>
                    <p
                      style={
                        selectedDocuments.includes(folderValue)
                          ? { color: 'skyblue' }
                          : {}
                      }
                    >
                      {folderValue?.documentName
                        ? folderValue?.documentName
                        : displayDocName(fileName[fileName.length - 1])}
                    </p>
                  </Card>
                </div>
              )
            })}
          {loading && data.folderContent?.length > 0 && (
            <div className={styles.gridViewItemSkeleton}>
              <div className={styles.boxItemImage}>
                {Array.from({
                  length:
                    data?.contentCount < paginateData?.pageSize
                      ? data?.contentCount
                      : paginateData?.pageSize || 10,
                })
                  .fill(null)
                  .map((_, i) => i)
                  .map((img) => {
                    return (
                      <ImageItem
                        origin=""
                        className={styles.imagePreview}
                        key={img}
                      />
                    )
                  })}
              </div>
            </div>
          )}
        </div>
      </div>

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
          <DocumentPopupContent
            record={selectedDocument}
            showFolderMenu={false}
          />
        </div>
      </Drawer>

      <div
        className={classNames(
          styles.listViewWrap,
          !listView && styles.displayNone
        )}
      >
        {data.folder.length > 0 && (
          <Table
            columns={foldersTableColumns}
            dataSource={data.folder?.map((item) => {
              return {
                id: item?.id,
                name: item.folderTitle,
                files: item.contentCount || 0,
                lastModified: dayjs(item?.modifiedDate).format('DD-MM-YYYY'),
              }
            })}
            pagination={false}
            scroll={{ x: 600 }}
          />
        )}

        <div className={styles.listViewWrapData}>
          {data?.folderContent?.length > 0 &&
            (loading ? (
              <LoadingTable columns={documentsTableColumns} />
            ) : (
              <Table
                columns={documentsTableColumns}
                dataSource={data?.folderContent?.map((item) => {
                  return {
                    id: item?.id,
                    name: item.folderData,
                    owner: 'me',
                    folderData: item.folderData,
                    documentName: item?.documentName,
                    date: dayjs(new Date(item.dateTime * 1000)).format(
                      'DD-MM-YYYY'
                    ),
                  }
                })}
                pagination={false}
                scroll={{ x: 600 }}
              />
            ))}
        </div>
      </div>

      {(data?.contentCount || 0) > 0 && (
        <div className={styles.pagination}>
          <Pagination
            total={data?.contentCount}
            defaultPageSize={50}
            showSizeChanger={false}
            onChange={paginateData?.onPageChange}
            pageSizeOptions={['10', '25', '50', '100']}
            onPageSizeChange={paginateData?.onPageSizeChange}
            pageSize={paginateData?.pageSize}
            current={paginateData?.currentPage}
            showingRecords={
              (paginateData?.currentPage - 1) * paginateData?.pageSize +
                data?.folderContent?.length || 0
            }
          />
        </div>
      )}
      <Modal
        onCancel={() => {
          setPageNumber(1)
          setPreviewModal((e) => !e)
        }}
        visible={previewModal}
        className={styles.previewModal}
        footer={false}
        width="100%"
      >
        <div className={styles.modalContent}>
          <PreviewFile
            title={pdfName}
            numPages={numPages}
            pageNumber={pageNumber}
            pdfURL={pdfData}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
            onSetNumPages={onSetNumPages}
            setPreviewModal={setPreviewModal}
          />
        </div>
      </Modal>
      <Modal
        centered={true}
        onCancel={() => {
          setSelectedDocument(0)
          setDocDelModal(() => false)
        }}
        onOk={() => onDocumentDelete?.(selectedDocument || 0)}
        visible={docDeleteModal}
        title={'Delete Forever?'}
        cancelText={'Cancel'}
        okText={'Delete Forever'}
        confirmLoading={singleDocDelLoading}
      >
        <div>
          <p>
            {`1 item will be deleted forever and you won't be able to restore
            them.`}
          </p>
        </div>
      </Modal>
      <BasicModal
        modalWidth={600}
        onCancel={() => {
          setRenamingFile({ id: 0, name: '' })
          setRenameFileModal((e) => !e)
        }}
        onOk={() => {
          if (renamingFile?.id && renamingFile?.name) {
            onRenameFile?.(renamingFile?.id, renamingFile?.name?.trim())
          }
        }}
        title="Rename File"
        visible={renameFileModal}
        newButtonText="Save"
        loading={renameFileLoading}
      >
        <div className={styles.modalContent}>
          <label>Name</label>
          <Input
            autoFocus
            name="name"
            placeholder="Enter a name"
            value={renamingFile?.name}
            onChange={(e) => {
              setRenamingFile({ ...renamingFile, name: e.target.value })
            }}
          />
        </div>
      </BasicModal>
    </div>
  )
}

export default FolderData
