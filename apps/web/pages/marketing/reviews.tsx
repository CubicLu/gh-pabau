import {
  FacebookFilled,
  FacebookOutlined,
  FilterOutlined,
  FrownOutlined,
  GoogleOutlined,
  InstagramOutlined,
  LeftOutlined,
  LinkedinFilled,
  SmileOutlined,
  StarFilled,
  TwitterOutlined,
} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {
  GetSocialSurveyFeedbackDocument,
  GetAllSocialSurveyFeedbackDocument,
  GetAllSocialSurveyFeedbackRecordsDocument,
  SocialSurveyFeedbackAggregateDocument,
  InsertSocialSurveyResposnesDocument,
  UpdateSocialSurveyResponseDocument,
  UpdateSocialSurveyFeedbackDocument,
  DeleteSocialSurveyResponseDocument,
} from '@pabau/graphql'
import {
  Avatar,
  Breadcrumb,
  Button,
  Notification,
  NotificationBanner,
  NotificationType,
  Pagination,
  Reviews as ReviewTable,
  ShareReview,
  SimpleDropdown,
  Switch,
  Table,
  useLiveQuery,
} from '@pabau/ui'
import {
  Card,
  Col,
  Empty,
  Input as AntInput,
  Modal,
  Popover,
  Rate,
  Row,
  Skeleton,
  Tooltip,
} from 'antd'
import classNames from 'classnames'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React, {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useMedia } from 'react-use'
import clinicLogo from '../../assets/images/clinic-logo.png'
import PabauLogo from '../../assets/images/logo.svg'
import notificationBannerReviewPageImage from '../../assets/images/notification-image-review.png'
import { apiURL } from '../../baseUrl'
import MobileHeader from '../../components/MobileHeader'
import Layout from '../../components/Layout/Layout'
import { UserContext } from '../../context/UserContext'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './reviews.module.less'
import { TFunction } from 'i18next'

const progressDataList = [
  {
    id: 'need-improvement',
    width: '15%',
    color: 'linear-gradient(67.52deg, #DC143C 0%, #DF562B 92.36%)',
    label: '<2',
  },
  {
    id: 'ok',
    width: '20%',
    color: 'linear-gradient(67.52deg, #DF562B 0%, #FAAD14 92.36%)',
    label: '2-3',
  },
  {
    id: 'great',
    width: '40%',
    color: 'linear-gradient(67.52deg, #FAAD14 0%, #9DD7BF 92.36%)',
    label: '3 - 4.5',
  },
  {
    id: 'excellent',
    width: '25%',
    color: 'linear-gradient(67.52deg, #9DD7BF 0%, #00A69B 92.36%)',
    label: '> 4.5',
  },
]

const fields = [
  {
    icon: <img src={PabauLogo} alt={'logo'} />,
    score: '0/5',
    reviews: 0,
    mostRecent: '',
    isPlus: false,
    key: 1,
  },
  {
    icon: <FacebookOutlined />,
    score: '0/5',
    reviews: 0,
    mostRecent: '',
    isPlus: true,
    key: 2,
  },
  {
    icon: <GoogleOutlined />,
    score: '0/5',
    reviews: 0,
    mostRecent: '',
    isPlus: true,
    key: 3,
  },
]

interface ColumnData {
  title?: string
  dataIndex?: string
  className?: string
  visible?: boolean
  render?: ReactNode
  isHover?: boolean
}

interface ReviewConfig {
  columnList: Array<ColumnData>
}

interface TranslationProps {
  t?: TFunction
}

const Reviews: FC<ReviewConfig> = () => {
  const [hideBanner, setHideBanner] = useState(false)
  const isMobile = useMedia('(max-width: 768px)', false)
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataList, setDataList] = useState<any>([])
  const [modalShowing, setModalShowing] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [modalValue, setModalValue] = useState('')
  const [progressData, setProgressData] = useState(progressDataList)
  const [reviewData, setReviewData] = useState(fields)
  const [message, setMessage] = useState('')
  const [average, setAverage] = useState([])
  const [sendResEmail, setSendResEmail] = useState(true)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    skip: 0,
    take: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const [filterValue, setFilterValue] = useState({
    score: '',
    employee: '',
    service: '',
  })
  const crudTableRef = useRef(null)
  const { t } = useTranslationI18()
  const user = useContext(UserContext)

  const sendResponseEmail = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': apiURL,
      },
      body: JSON.stringify({
        bodyContent: `
        <div>
          <h5 style="color:#000; font-size:16px; ">${selectedRow?.Company.details.company_name} responded to your review. Click on the button below to read it.</h5>
          <button
            style="
              border: 1px solid #54b2d3;
              background: #54b2d3;
              color: #fff;
              font-size: 0.8rem;
              border-radius: 4px;
              letter-spacing: 0.05em;
              padding: 4px 1em;
              line-height: 1.5715;
              box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
              text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
              outline: none;
              font-weight: bolder;
              margin-left: 207px;
              cursor: pointer;
            "
          >
            Go To The Review
          </button>
        </div>
        `,
        email: selectedRow?.CmContact.Email,
        subject: 'Response Testing',
      }),
    }
    if (sendResEmail) {
      fetch(`${apiURL}/notification-email`, requestOptions).then((res) => {
        if (res.status === 201) {
          setTimeout(() => {
            Notification(NotificationType.success, 'Response Email sent')
          }, 2500)
        } else {
          setTimeout(() => {
            Notification(NotificationType.error, 'Response Email failed')
          }, 2500)
        }
      })
    }
  }

  const [addMutation] = useMutation(InsertSocialSurveyResposnesDocument, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('marketingreviews.data.creatediscountsuccessfullymessage')
      )
      sendResponseEmail()
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('marketingreviews.data.creatediscounterrormessages')
      )
    },
  })

  const [editSocialSurveyFeedbackResponseMutation] = useMutation(
    UpdateSocialSurveyResponseDocument,
    {
      onCompleted(data) {
        Notification(
          NotificationType.success,
          t('marketingreviews.data.updatediscountsuccessmessages')
        )
        sendResponseEmail()
      },
      onError(err) {
        Notification(
          NotificationType.error,
          t('marketingreviews.data.updatediscounterrormessages')
        )
      },
    }
  )

  const [editSocialSurveyFeedbackMutation] = useMutation(
    UpdateSocialSurveyFeedbackDocument,
    {
      onCompleted(data) {
        if (data !== null) {
          if (data.updateOneSocialSurveyFeedback.public_use === 0) {
            Notification(
              NotificationType.success,
              t('marketingreviews.delete.message')
            )
          }
          if (data.updateOneSocialSurveyFeedback.public_use === 1) {
            Notification(
              NotificationType.success,
              t('marketingreviews.add.message')
            )
          }
        }
      },
      onError(err) {
        Notification(NotificationType.error, t('Error'))
      },
    }
  )

  const [deleteMutation] = useMutation(DeleteSocialSurveyResponseDocument, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('marketingreviews.data.deletediscountsuccessmessages')
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('marketingreviews.data.deletediscounterrormessages')
      )
    },
  })

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        take: paginateData.take,
        skip: paginateData.skip,
        full_name: filterValue.employee !== '' ? filterValue.employee : '%%',
        service: filterValue.service !== '' ? filterValue.service : '%%',
        rating:
          filterValue.score !== ''
            ? filterValue.score === 'Excellent'
              ? {
                  lte: 5,
                  gt: 4,
                }
              : filterValue.score === 'Ok'
              ? {
                  lte: 4,
                  gte: 3,
                }
              : filterValue.score === 'Bad'
              ? {
                  lt: 3,
                }
              : {}
            : {},
      },
    }
    return queryOptions
  }, [
    paginateData.take,
    paginateData.skip,
    filterValue.employee,
    filterValue.service,
    filterValue.score,
  ])

  const getAllQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        full_name: filterValue.employee !== '' ? filterValue.employee : '%%',
        service: filterValue.service !== '' ? filterValue.service : '%%',
        rating:
          filterValue.score !== ''
            ? filterValue.score === 'Excellent'
              ? {
                  lte: 5,
                  gt: 4,
                }
              : filterValue.score === 'Ok'
              ? {
                  lte: 4,
                  gte: 3,
                }
              : filterValue.score === 'Bad'
              ? {
                  lt: 3,
                }
              : {}
            : {},
      },
    }
    return queryOptions
  }, [filterValue.employee, filterValue.service, filterValue.score])

  const { data, loading } = useLiveQuery(
    GetSocialSurveyFeedbackDocument,
    getQueryVariables
  )

  const { data: aggregateData } = useLiveQuery(
    SocialSurveyFeedbackAggregateDocument
  )

  const { data: Alldata, loading: alldataloading } = useLiveQuery(
    GetAllSocialSurveyFeedbackDocument
  )

  const { data: AllRecord } = useLiveQuery(
    GetAllSocialSurveyFeedbackRecordsDocument,
    getAllQueryVariables
  )

  const DataLists = data

  const columnData: Array<ColumnData> = [
    {
      title: t('marketingreviews.table.column.source'),
      dataIndex: 'feedback_source',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('marketingreviews.table.column.score'),
      dataIndex: 'rating',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('marketingreviews.table.column.name'),
      dataIndex: 'feedback_name',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('marketingreviews.table.column.date'),
      dataIndex: 'date',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('marketingreviews.table.column.for'),
      dataIndex: 'feedback_for',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('marketingreviews.table.column.message'),
      dataIndex: 'feedback_comment',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: '',
      dataIndex: 'feedback_status',
      className: 'drag-visible',
      visible: true,
      isHover: true,
    },
  ]

  useEffect(() => {
    if (DataLists !== undefined) {
      setDataList(data)
    } else {
      setDataList([])
    }

    if (AllRecord !== undefined) {
      if (aggregateData !== AllRecord.length) {
        setPaginateData({
          ...paginateData,
          total: AllRecord !== undefined ? AllRecord.length : 0,
          showingRecords: DataLists !== undefined ? data.length : 0,
        })
      } else {
        setPaginateData({
          ...paginateData,
          total: DataLists !== undefined ? aggregateData : 0,
          showingRecords: DataLists !== undefined ? data.length : 0,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DataLists, aggregateData, AllRecord])

  useEffect(() => {
    if (
      alldataloading === false &&
      Alldata !== undefined &&
      Alldata.length > 0
    ) {
      const Record = []
      Alldata.map((item) => {
        if (item.rating !== undefined) {
          Record.push(item.rating)
        }
        return Record
      })
      setAverage(Record)

      const List = [...progressData]

      List[0].width = `${
        (Record.filter((item) => item < 2).length * 100) / Alldata.length
      }%`
      List[1].width = `${
        (Record.filter((item) => item >= 2 || item < 3).length * 100) /
        Alldata.length
      }%`
      List[2].width = `${
        (Record.filter((item) => item >= 3 || item < 4.5).length * 100) /
        Alldata.length
      }%`
      List[3].width = `${
        (Record.filter((item) => item >= 4.5).length * 100) / Alldata.length
      }%`

      setProgressData(List)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Alldata])

  useEffect(() => {
    if (Alldata !== undefined && Alldata?.length > 0) {
      const website = Alldata?.filter(
        (item) => item.feedback_source === 'website'
      )
      const facebook = Alldata?.filter(
        (item) => item.feedback_source === 'facebook'
      )
      const google = Alldata?.filter(
        (item) => item.feedback_source === 'google'
      )

      const List = [...reviewData]

      if (website.length > 0) {
        List[0].key = website[0].id
        List[0].score = `${(
          website.map((i) => i.rating).reduce((v, i) => v + i, 0) /
          Alldata?.length
        ).toFixed(1)}/5`
        List[0].reviews = website.length
        List[0].mostRecent = new Date(
          website[0].date * 1000
        ).toLocaleDateString('en-GB')
      }

      if (facebook.length > 0) {
        List[1].key = facebook[0].id
        List[1].score = `${(
          facebook.map((i) => i.rating).reduce((v, i) => v + i, 0) /
          Alldata?.length
        ).toFixed(1)}/5`
        List[1].reviews = facebook.length
        List[1].mostRecent = new Date(
          facebook[0].date * 1000
        ).toLocaleDateString('en-GB')
      }

      if (google.length > 0) {
        List[2].key = google[0].id
        List[2].score = `${(
          google.map((i) => i.rating).reduce((v, i) => v + i, 0) /
          Alldata?.length
        ).toFixed(1)}/5`
        List[2].reviews = google.length
        List[2].mostRecent = new Date(google[0].date * 1000).toLocaleDateString(
          'en-GB'
        )
      }

      setReviewData(List)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Alldata])

  useEffect(() => {
    if (crudTableRef.current) {
      crudTableRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [paginateData.currentPage, paginateData.take])

  useEffect(() => {
    selectedRow?.Response.length === 0
      ? setMessage('')
      : setMessage(selectedRow?.Response[0].response)
  }, [selectedRow])

  const handleConfigure = (): void => {
    router.push('/setup/reviews-config')
  }

  const onRowClick = (e, value) => {
    setSelectedRow(e)
    setModalValue(value)
    setModalShowing((e) => !e)
  }

  const onFavouriteClick = (key, favorite) => {
    const editValue = {
      feedback_id: key,
      public_use: favorite === 1 ? 0 : 1,
    }
    editSocialSurveyFeedbackMutation({
      variables: editValue,
      optimisticResponse: {},
      refetchQueries: [
        {
          query: GetSocialSurveyFeedbackDocument,
          ...getQueryVariables,
        },
      ],
    })
  }

  const handleResponseModal = (e) => {
    setSendResEmail(true)
    onRowClick(e, 'respond')
  }

  const renderVisibleData = (e) => {
    return (
      <div className={styles.buttonVisibleWrap}>
        <Button onClick={() => onRowClick(e, 'share')}>
          {t('marketingreviews.share.modal.share')}
        </Button>
        <Button onClick={() => handleResponseModal(e)}>
          {e.Response.length === 0
            ? t('marketingreviews.share.modal.responsed')
            : t('common-label-edit')}
        </Button>
        <Tooltip
          placement={'topRight'}
          title={e.public_use ? t('marketingreviews.visible.message') : ''}
        >
          <Button
            onClick={() => onFavouriteClick(e.id, e.public_use)}
            className={
              e.public_use === 1 ? styles.favouriteWrap : styles.unFavouriteWrap
            }
          >
            <StarFilled />
          </Button>
        </Tooltip>
      </div>
    )
  }

  const handleResetButton = (handleReset) => {
    setFilterValue({
      score: '',
      employee: '',
      service: '',
    })
    handleReset()
  }

  const filterContent = () => {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          score: filterValue.score,
          employee: filterValue.employee,
          service: filterValue.service,
        }}
        onSubmit={(value) => {
          setFilterValue(value)
        }}
      >
        {({ setFieldValue, handleSubmit, handleReset, values }) => (
          <div>
            <div className={styles.filterHeader}>
              <div>{t('add-button-filter-header-text-filter')}</div>
              <Button
                type="text"
                onClick={() => handleResetButton(handleReset)}
              >
                {t('add-button-filter-reset')}
              </Button>
            </div>
            <div className={styles.filterMenu}>
              <div className={styles.filterMenuItem}>
                <div>
                  <b>{t('marketingreviews.table.column.score')}</b>
                </div>
              </div>
              <div className={styles.filterViewerStatusContainer}>
                <Button
                  type={values.score === 'Bad' ? 'primary' : 'default'}
                  onClick={() => {
                    setFieldValue('score', values.score === 'Bad' ? '' : 'Bad')
                  }}
                >
                  {t('marketingreviews.filter.option.bad')}
                </Button>
                <Button
                  type={values.score === 'Ok' ? 'primary' : 'default'}
                  onClick={() => {
                    setFieldValue('score', values.score === 'Ok' ? '' : 'Ok')
                  }}
                >
                  {t('marketingreviews.ok.label')}
                </Button>
                <Button
                  type={values.score === 'Excellent' ? 'primary' : 'default'}
                  onClick={() => {
                    setFieldValue(
                      'score',
                      values.score === 'Excellent' ? '' : 'Excellent'
                    )
                  }}
                >
                  {t('marketingreviews.excellent.label')}
                </Button>
              </div>
              <div className={styles.filterMenuItem}>
                <div>
                  <b>{t('setup.business-details.employee.singular')}</b>
                </div>
                <SimpleDropdown
                  name="employee"
                  dropdownItems={
                    alldataloading === false &&
                    Alldata !== undefined &&
                    Alldata.length > 0
                      ? ([
                          ...new Set(
                            Alldata.map((item) => item.User?.full_name)
                          ),
                        ].filter((item) => item !== undefined) as string[])
                      : []
                  }
                  onSelected={(val) => setFieldValue('employee', val)}
                  value={values.employee}
                />
              </div>
              <div className={styles.filterMenuItem}>
                <div>
                  <b>{t('setup.discount.data.service')}</b>
                </div>
                <SimpleDropdown
                  name="service"
                  dropdownItems={
                    alldataloading === false &&
                    Alldata !== undefined &&
                    Alldata.length > 0
                      ? ([
                          ...new Set(Alldata.map((item) => item.service)),
                        ].filter((item) => item !== undefined) as string[])
                      : []
                  }
                  onSelected={(val) => setFieldValue('service', val)}
                  value={values.service}
                />
              </div>
              <div className={styles.filterBtn}>
                <Button
                  type="default"
                  onClick={() => {
                    handleSubmit()
                  }}
                  className={styles.filterApplyBtn}
                >
                  {t('common-label-apply')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    )
  }

  const DeskTopHeader: FC<TranslationProps> = ({ t }) => (
    <div>
      <Row className={styles.mainWrapper}>
        <Col span={12} className={styles.titleWrapper}>
          <Breadcrumb
            items={[
              {
                breadcrumbName: t('marketingreviews.notification.title'),
                path: '',
              },
            ]}
          />
          <h4>{t('marketingreviews.notification.title')}</h4>
        </Col>
        <Col span={'auto'} className={styles.titleSaveBtn}>
          <div className={styles.reviewLink}>
            <h5>{t('marketingreviews.notification.review.link.label')}</h5>
            <a
              href={'https://crm.pabau.com/reviews/perfect-skin'}
              target="__blank"
            >
              <span>{t('marketingreviews.notification.review.link')}</span>
            </a>
          </div>
          <div className={styles.btnWrapperFilter}>
            <Popover
              trigger="click"
              content={filterContent}
              placement="bottomRight"
              overlayClassName={styles.filterPopover}
            >
              <Button className={styles.filterBtn}>
                <FilterOutlined /> {t('marketingreviews.notification.filter')}
              </Button>
            </Popover>
            <Button
              type="primary"
              className={styles.saveBtn}
              onClick={handleConfigure}
            >
              {t('marketingreviews.notification.configure')}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )

  const customProgressBar = (width, classname) => {
    return (
      <div>
        {!alldataloading ? (
          <div className={styles.containerStyles}>
            {progressData.map((item) => (
              <div
                className={styles.fillerStyles}
                style={{ width: item.width, background: item.color }}
                key={item.id}
              >
                <div className={styles.number}>{item.label}</div>
                <span className={styles.labelStyles} />
                {item.id === 'great' && (
                  <div
                    className={classNames(classname, styles.progressDot)}
                    style={{
                      left: `${width}%`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <Skeleton.Input active className={styles.containerStyles} />
        )}
      </div>
    )
  }

  const onHoverHandle = (item) => {
    const result = dataList.map((itemList) => {
      if (itemList.id === item.id) {
        return { ...itemList, isShow: true }
      }
      return { ...itemList, isShow: false }
    })
    setDataList(result)
  }

  const onHoverLeave = () => {
    const resultData = dataList.map((itemList) => {
      return { ...itemList, isShow: false }
    })
    setDataList(resultData)
  }

  const updateDataSource = ({ newData }) => {
    setDataList(newData)
  }

  const onPaginationChange = (currentPage, take) => {
    const skip = paginateData.take * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      skip,
      take,
      currentPage: currentPage,
    })
  }

  const reviewComponentRender = (feedbackValue) => {
    let left = feedbackValue * 20
    let classname = null
    let text = ''

    switch (true) {
      case feedbackValue < 2:
        left = feedbackValue
        classname = styles.rate2
        text = t('marketingreviews.message.title1')
        break
      case feedbackValue >= 2 && feedbackValue < 3:
        left = feedbackValue === 2 ? feedbackValue * 7.5 : feedbackValue * 11.67
        classname = styles.rate3
        text = t('marketingreviews.message.title2')
        break
      case feedbackValue >= 3 && feedbackValue < 4.5:
        left =
          feedbackValue === 3 ? feedbackValue * 11.67 : feedbackValue * 16.67
        classname = styles.rate4
        text = t('marketingreviews.message.title3')
        break
      case feedbackValue >= 4.5:
        left =
          feedbackValue === 4.5 ? feedbackValue * 16.67 : feedbackValue * 20
        classname = styles.rate5
        text = t('marketingreviews.message.title4')
        break
    }
    return (
      <Row className={styles.mobColumn}>
        <Col xs={24} lg={12}>
          <div className={styles.reviewCard}>
            {!alldataloading ? (
              <div className={`${styles.reviewHeader} ${classname}`}>
                <div className={styles.starWrapper}>
                  <span className={styles.imgSmile}>
                    {feedbackValue < 3 ? (
                      <FrownOutlined className={styles.face} />
                    ) : (
                      <SmileOutlined className={styles.face} />
                    )}
                  </span>
                  <div className={styles.clientReview}>
                    <h5>{text}</h5>
                    <div className={styles.rateWrap}>
                      <h6>{feedbackValue}/5</h6>
                      <Rate
                        className={styles.rateWrapStar}
                        disabled={true}
                        allowHalf
                        value={feedbackValue}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.socialBtn}>
                  <Button>{t('marketingreviews.share.button.label')}</Button>
                </div>
              </div>
            ) : (
              <Skeleton.Input active className={styles.bannerSkeleton} />
            )}
            <div className={styles.rateListing}>
              <div className={styles.progressBar}>
                {customProgressBar(left, classname)}
              </div>
              {!alldataloading ? (
                <div className={styles.listColor}>
                  <ul>
                    <li>
                      <span />
                      <p>{t('marketingreviews.need.improvement.label')}</p>
                    </li>
                    <li>
                      <span />
                      <p>{t('marketingreviews.ok.label')}</p>
                    </li>
                    <li>
                      <span />
                      <p>{t('marketingreviews.great.label')}</p>
                    </li>
                    <li>
                      <span />
                      <p>{t('marketingreviews.excellent.label')}</p>
                    </li>
                  </ul>
                </div>
              ) : (
                <Skeleton.Input active className={styles.listColor} />
              )}
            </div>
          </div>
        </Col>
        <Col xs={24} lg={6}>
          <div className={styles.reviewWrap}>
            <ReviewTable
              loading={alldataloading}
              fields={reviewData}
              sourceFieldTitle={t('marketingreviews.table.column.source')}
              scoreFieldTitle={t('marketingreviews.table.column.score')}
              reviewFieldTitle={t('marketingreviews.notification.title')}
              mostRecentTitle={t('marketingreviews.table.column.most.recent')}
            />
          </div>
        </Col>
      </Row>
    )
  }

  const onHandleModal = () => {
    setModalShowing(!modalShowing)
    setSelectedRow(null)
  }

  const handleResponseMessage = () => {
    if (selectedRow?.Response.length === 0) {
      const addValue = {
        response: message,
        feedback: selectedRow?.id,
        uid: user.me.id,
        company_id: user.me.company.id,
      }
      addMutation({
        variables: addValue,
        optimisticResponse: {},
        refetchQueries: [
          {
            query: GetSocialSurveyFeedbackDocument,
            ...getQueryVariables,
          },
        ],
      })
    } else {
      const editValue = {
        id: selectedRow?.Response[0].id,
        updated_text: message,
      }
      editSocialSurveyFeedbackResponseMutation({
        variables: editValue,
        optimisticResponse: {},
        refetchQueries: [
          {
            query: GetSocialSurveyFeedbackDocument,
            ...getQueryVariables,
          },
        ],
      })
    }

    setModalShowing(!modalShowing)
    setSelectedRow(null)
  }

  const handleDeleteResponseMessage = () => {
    if (selectedRow?.Response.length > 0) {
      const deleteValue = {
        id: selectedRow?.Response[0].id,
      }
      deleteMutation({
        variables: deleteValue,
        optimisticResponse: {},
        refetchQueries: [
          {
            query: GetSocialSurveyFeedbackDocument,
            ...getQueryVariables,
          },
        ],
      })
    }

    setModalShowing(!modalShowing)
    setSelectedRow(null)
  }

  const RenderModalHeader: FC<TranslationProps> = ({ t }) => (
    <div className={styles.headerModalWrap}>
      <LeftOutlined onClick={onHandleModal} />{' '}
      <h4>
        {t('marketingreviews.share.modal.respond')} {selectedRow?.feedback_name}
      </h4>
    </div>
  )

  const handleInputChange = (e) => {
    setMessage(e.target.value)
  }

  const renderModalData = (modalValue: string, t: TFunction) => {
    return (
      <>
        {isMobile ? (
          <RenderModalHeader t={t} />
        ) : (
          <div className={styles.headerModalWrap}>
            <h4>
              {modalValue === 'respond'
                ? `${t('marketingreviews.share.modal.respond')} ${
                    selectedRow?.feedback_name
                  }`
                : `${t('marketingreviews.share.modal.share')} ${
                    selectedRow?.feedback_name
                  }`}
            </h4>
          </div>
        )}
        <div className={styles.respondLink}>
          <span className={styles.dateList}>
            <span className={styles.imgWap}>
              {renderSocialMediaIcon(selectedRow?.feedback_source)}{' '}
            </span>
            <h6>{selectedRow?.rating}/5</h6>
            <h6>{selectedRow?.feedback_name}</h6>
            <p>
              {new Date(selectedRow?.date * 1000).toLocaleDateString('en-GB')}
            </p>
          </span>
          <h5>
            <q>{selectedRow?.feedback_comment}</q>
          </h5>
        </div>
        {modalValue === 'respond' ? (
          <>
            <div className={styles.answerWrapper}>
              <label>{t('marketingreviews.share.modal.answer')}</label>
              <AntInput.TextArea
                rows={4}
                placeholder={`${t(
                  'marketingreviews.share.modal.personalised.answer'
                )} ${selectedRow?.feedback_name}`}
                onChange={(e) => handleInputChange(e)}
                value={message}
              />
            </div>
            <div className={styles.footerBottom}>
              <div className={styles.footerSwitch}>
                <Switch
                  onChange={(checked) => setSendResEmail(checked)}
                  size="small"
                  checked={sendResEmail}
                  className={styles.switch}
                />{' '}
                {t('marketingreviews.share.modal.notify')}{' '}
                {selectedRow?.feedback_name}{' '}
                {t('marketingreviews.share.modal.response')}
              </div>
              <div className={styles.box}>
                {selectedRow?.Response.length !== 0 && (
                  <Button
                    type="default"
                    className={styles.deleteButton}
                    onClick={handleDeleteResponseMessage}
                  >
                    {t('marketingreviews.share.modal.delete')}
                  </Button>
                )}
                <div className={styles.respondGroup}>
                  <Button type="primary" onClick={handleResponseMessage}>
                    {selectedRow?.Response.length === 0
                      ? t('marketingreviews.share.modal.responsed')
                      : t('marketingsource-save-button')}
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.reviewShareWrapper} key={selectedRow?.id}>
            <div className={styles.socialIcon}>
              <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.pabau.com%2Freviews%2FPerfectSkinClinic%2F216263">
                <FacebookFilled />
              </a>
              <TwitterOutlined />
              <LinkedinFilled />
            </div>
            <p>{t('marketingreviews.share.modal.or')}</p>
            <ShareReview
              reviewScore={selectedRow?.rating}
              date={new Date(new Date().getMonth() - 2)}
              companyName={selectedRow?.feedback_name}
              logo={clinicLogo}
              text={selectedRow?.feedback_comment}
            />
          </div>
        )}
      </>
    )
  }

  const renderSocialMediaIcon = (item) => {
    switch (item) {
      case 'website':
        return <img src={PabauLogo} alt={'logo'} />
      case 'facebook':
        return <FacebookOutlined />
      case 'google':
        return <GoogleOutlined />
      case 'instagram':
        return <InstagramOutlined />
    }
  }

  return (
    <Layout>
      <MobileHeader title={t('marketingreviews.notification.title')} />
      <div className={styles.notificationBanner}>
        <NotificationBanner
          title={t('marketingreviews.notification.title')}
          desc={t('marketingreviews.notification.description')}
          imgPath={notificationBannerReviewPageImage}
          allowClose={true}
          setHide={[hideBanner, setHideBanner]}
          showPaymentButton={true}
          showEmail={true}
          showPaymentTitle={t('marketingreviews.notification.button')}
        />
      </div>
      <Card className={styles.reviewContainer}>
        <DeskTopHeader t={t} />
        <Modal
          visible={modalShowing}
          width={'100%'}
          footer={null}
          onCancel={onHandleModal}
          className={styles.respondWrapper}
          wrapClassName={isMobile && styles.fullScreenModal}
        >
          {renderModalData(modalValue, t)}
        </Modal>
        {reviewComponentRender(
          aggregateData !== undefined
            ? (average?.reduce((v, i) => v + i, 0) / aggregateData).toFixed(1)
            : 0
        )}
        <div className={styles.tableMob}>
          {loading ? (
            <div className={styles.table}>
              <Table
                rowKey="key"
                pagination={false}
                dataSource={[...Array.from({ length: 10 })].map((_, index) => ({
                  key: `key${index}`,
                }))}
                columns={columnData.map((column) => {
                  return {
                    ...column,
                    render: function renderPlaceholder() {
                      switch (column.dataIndex) {
                        case 'feedback_source':
                          return (
                            <Skeleton
                              loading={loading}
                              active
                              avatar
                              className={styles.skeleton}
                            />
                          )
                        case 'rating':
                          return (
                            <Skeleton
                              loading={loading}
                              active
                              title={true}
                              paragraph={false}
                            />
                          )
                        case 'date':
                          return (
                            <Skeleton
                              loading={loading}
                              active
                              title={true}
                              paragraph={false}
                            />
                          )
                        case 'feedback_for':
                          return (
                            <Skeleton
                              loading={loading}
                              active
                              avatar
                              className={styles.skeleton}
                            />
                          )
                        case 'feedback_comment':
                          return (
                            <Skeleton
                              loading={loading}
                              active
                              title={true}
                              paragraph={false}
                            />
                          )
                        case 'visibleData':
                          return (
                            <Skeleton
                              loading={loading}
                              active
                              title={true}
                              paragraph={false}
                            />
                          )
                        default:
                          return (
                            <Skeleton
                              loading={loading}
                              active
                              title={true}
                              paragraph={false}
                            />
                          )
                      }
                    },
                  }
                })}
              />
            </div>
          ) : dataList.length > 0 ? (
            <Table
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              columns={columnData}
              dataSource={dataList.map((item) => {
                return {
                  ...item,
                  feedback_source: renderSocialMediaIcon(item?.feedback_source),
                  rating: `${item?.rating}/5`,
                  date: new Date(item?.date * 1000).toLocaleDateString('en-GB'),
                  feedback_for: (
                    <Tooltip
                      placement="top"
                      title={`${item?.service} with ${item?.User?.full_name}`}
                    >
                      <div className={styles.avatarWrap}>
                        <Avatar
                          src={`https://crm.pabau.com/${item?.User?.image}`}
                          name={item?.User?.full_name}
                          size="default"
                          isTooltip={false}
                        />
                      </div>
                    </Tooltip>
                  ),
                  visibleData: renderVisibleData(item),
                  feedback_comment: (
                    <Tooltip
                      placement="top"
                      title={(item?.feedback_comment).substring(0, 2000)}
                    >
                      {item?.feedback_comment}
                    </Tooltip>
                  ),
                }
              })}
              loading={loading}
              isHover={true}
              onRowHover={onHoverHandle}
              onLeaveRow={onHoverLeave}
              updateDataSource={updateDataSource}
              pagination={dataList?.length > 10 ? {} : false}
            />
          ) : (
            <div className={styles.empty}>
              <Empty
                description={t('marketingreviews.data.nodata.content')}
                className={styles.noData}
              />
            </div>
          )}
        </div>
      </Card>
      <Pagination
        total={paginateData.total}
        defaultPageSize={10}
        showSizeChanger={false}
        onChange={onPaginationChange}
        pageSizeOptions={['10', '25', '50', '100']}
        onPageSizeChange={(pageSize) => {
          setPaginateData({
            ...paginateData,
            take: pageSize,
          })
        }}
        pageSize={paginateData.take}
        current={paginateData.currentPage}
        showingRecords={paginateData.showingRecords}
      />
    </Layout>
  )
}

export default Reviews
