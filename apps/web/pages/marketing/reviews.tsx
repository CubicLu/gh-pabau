import {
  FacebookFilled,
  FacebookOutlined,
  FilterOutlined,
  FrownOutlined,
  GoogleOutlined,
  InstagramOutlined,
  LeftOutlined,
  LinkedinFilled,
  LoadingOutlined,
  SmileOutlined,
  StarFilled,
  TwitterOutlined,
} from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
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
  Spin,
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
import CommonHeader from '../../components/CommonHeader'
import Layout from '../../components/Layout/Layout'
import { UserContext } from '../../context/UserContext'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './reviews.module.less'

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

const listQuery = gql`
  query get_social_survey_feedback(
    $take: Int
    $skip: Int
    $full_name: String
    $rating: IntFilter
    $service: String
  ) {
    socialSurveyFeedbacks(
      take: $take
      skip: $skip
      orderBy: { date: desc }
      where: {
        User: { full_name: { contains: $full_name } }
        rating: $rating
        service: { contains: $service }
      }
    ) {
      feedback_source
      id
      date
      contact_id
      feedback_status
      rating
      service
      feedback_name #Name
      feedback_comment
      feedback_for
      public_use
      Response {
        response
        id
      }
      CmContact {
        Email
      }
      Company {
        details {
          company_name
        }
      }
      User {
        username
        full_name
        image
      }
    }
  }
`

const AlllistQuery = gql`
  query get_all_social_survey_feedback {
    socialSurveyFeedbacks(orderBy: { date: desc }) {
      feedback_source
      id
      date
      contact_id
      feedback_status
      rating
      service
      feedback_name
      feedback_comment
      feedback_for
      Response {
        response
        id
      }
      User {
        username
        full_name
      }
    }
  }
`

const AllDataQuery = gql`
  query get_all_social_survey_feedback(
    $full_name: String
    $rating: IntFilter
    $service: String
  ) {
    socialSurveyFeedbacks(
      orderBy: { date: desc }
      where: {
        User: { full_name: { contains: $full_name } }
        rating: $rating
        service: { contains: $service }
      }
    ) {
      feedback_source
      id
      date
      contact_id
      feedback_status
      rating
      service
      feedback_name
      feedback_comment
      feedback_for
      Response {
        response
        id
      }
      User {
        username
        full_name
      }
    }
  }
`

const aggregateQuery = gql`
  query social_survey_feedback_aggregate {
    socialSurveyFeedbacksCount
  }
`

const createQuery = gql`
  mutation insert_social_survey_resposnes(
    $response: String!
    $feedback: Int!
    $uid: Int!
  ) {
    createOneSocialSurveyFeedbackResponse(
      data: {
        response: $response
        Company: {}
        User: { connect: { id: $uid } }
        Feedback: { connect: { id: $feedback } }
      }
    ) {
      __typename
      response
      review_id
      id
    }
  }
`

const updateSocialSurveyFeedbackResponseQuery = gql`
  mutation update_social_survey_response($id: Int!, $updated_text: String!) {
    updateOneSocialSurveyFeedbackResponse(
      data: { response: { set: $updated_text } }
      where: { id: $id }
    ) {
      __typename
      id
      response
      review_id
    }
  }
`

const updateSocialSurveyFeedbackQuery = gql`
  mutation update_social_survey_feedback(
    $public_use: Int!
    $feedback_id: Int!
  ) {
    updateOneSocialSurveyFeedback(
      where: { id: $feedback_id }
      data: { public_use: { set: $public_use } }
    ) {
      __typename
      public_use
    }
  }
`

const deleteQuery = gql`
  mutation delete_social_survey_response($id: Int) {
    deleteOneSocialSurveyFeedbackResponse(where: { id: $id }) {
      __typename
      id
    }
  }
`

const fields = [
  {
    icon: <img src={PabauLogo} alt={'logo'} />,
    score: '0/5',
    reviews: 0,
    mostRecent: '',
    isPlus: true,
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  t?: Function
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
  const [paginateData, setPaginateData] = useState({
    total: 0,
    skip: 0,
    take: 10,
    currentPage: 1,
    showingRecords: 0,
  })
  const [progressData, setProgressData] = useState(progressDataList)
  const [reviewData, setReviewData] = useState(fields)
  const [message, setMessage] = useState('')
  const [average, setAverage] = useState([])
  const [sendResEmail, setSendResEmail] = useState(true)
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

  const [addMutation] = useMutation(createQuery, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('marketingrevirews.data.creatediscountsuccessfullymessage')
      )
      sendResponseEmail()
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('marketingrevirews.data.creatediscounterrormessages')
      )
    },
  })

  const [editSocialSurveyFeedbackResponseMutation] = useMutation(
    updateSocialSurveyFeedbackResponseQuery,
    {
      onCompleted(data) {
        Notification(
          NotificationType.success,
          t('marketingrevirews.data.updatediscountsuccessmessages')
        )
        sendResponseEmail()
      },
      onError(err) {
        Notification(
          NotificationType.error,
          t('marketingrevirews.data.updatediscounterrormessages')
        )
      },
    }
  )

  const [editSocialSurveyFeedbackMutation] = useMutation(
    updateSocialSurveyFeedbackQuery,
    {
      onCompleted(data) {
        if (data !== null) {
          if (data.updateOneSocialSurveyFeedback.public_use === 0) {
            Notification(NotificationType.success, t('Remove from Favourite'))
          }
          if (data.updateOneSocialSurveyFeedback.public_use === 1) {
            Notification(NotificationType.success, t('Added to Favourite'))
          }
        }
      },
      onError(err) {
        Notification(NotificationType.error, t('Error'))
      },
    }
  )

  const [deleteMutation] = useMutation(deleteQuery, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('marketingrevirews.data.deletediscountsuccessmessages')
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('marketingrevirews.data.deletediscounterrormessages')
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

  const { data, loading } = useLiveQuery(listQuery, getQueryVariables)

  const { data: aggregateData } = useLiveQuery(aggregateQuery)

  const { data: Alldata, loading: alldataloading } = useLiveQuery(AlllistQuery)

  const { data: AllRecord } = useLiveQuery(AllDataQuery, getAllQueryVariables)

  const DataLists = data

  const columnData: Array<ColumnData> = [
    {
      title: t('marketingrevirews.table.column.source'),
      dataIndex: 'feedback_source',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('marketingrevirews.table.column.score'),
      dataIndex: 'rating',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('marketingrevirews.table.column.name'),
      dataIndex: 'feedback_name',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('marketingrevirews.table.column.date'),
      dataIndex: 'date',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('marketingrevirews.table.column.for'),
      dataIndex: 'feedback_for',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('marketingrevirews.table.column.message'),
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
      if (aggregateData > AllRecord.length) {
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
    if (Alldata !== undefined && Alldata.length > 0) {
      const website = Alldata.filter(
        (item) => item.feedback_source === 'website'
      )
      const facebook = Alldata.filter(
        (item) => item.feedback_source === 'facebook'
      )
      const google = Alldata.filter((item) => item.feedback_source === 'google')

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
          query: listQuery,
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
          {t('marketingrevirews.share.modal.share')}
        </Button>
        <Button onClick={() => handleResponseModal(e)}>
          {e.Response.length === 0
            ? t('marketingrevirews.share.modal.responsed')
            : t('common-label-edit')}
        </Button>
        <Tooltip
          placement={'topRight'}
          title={e.public_use ? t('marketingrevirews.visible.message') : ''}
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
              <div>Filter by</div>
              <Button
                type="text"
                onClick={() => handleResetButton(handleReset)}
              >
                Reset
              </Button>
            </div>
            <div className={styles.filterMenu}>
              <div className={styles.filterMenuItem}>
                <div>
                  <b>Score</b>
                </div>
              </div>
              <div className={styles.filterViewerStatusContainer}>
                <Button
                  type={values.score === 'Bad' ? 'primary' : 'default'}
                  onClick={() => setFieldValue('score', 'Bad')}
                >
                  Bad
                </Button>

                <Button
                  type={values.score === 'Ok' ? 'primary' : 'default'}
                  onClick={() => setFieldValue('score', 'Ok')}
                >
                  Ok
                </Button>
                <Button
                  type={values.score === 'Excellent' ? 'primary' : 'default'}
                  onClick={() => setFieldValue('score', 'Excellent')}
                >
                  Excellent
                </Button>
              </div>
              <div className={styles.filterMenuItem}>
                <div>
                  <b>Employee</b>
                </div>
                <SimpleDropdown
                  name="employee"
                  dropdownItems={
                    alldataloading === false &&
                    Alldata !== undefined &&
                    Alldata.length > 0
                      ? ([
                          ...new Set(
                            Alldata.map((item) => item.User.full_name)
                          ),
                        ] as string[])
                      : []
                  }
                  onSelected={(val) => setFieldValue('employee', val)}
                  value={values.employee}
                />
              </div>
              <div className={styles.filterMenuItem}>
                <div>
                  <b>Service</b>
                </div>
                <SimpleDropdown
                  name="service"
                  dropdownItems={
                    alldataloading === false &&
                    Alldata !== undefined &&
                    Alldata.length > 0
                      ? ([
                          ...new Set(Alldata.map((item) => item.service)),
                        ] as string[])
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
                  Apply
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
            breadcrumbItems={[
              {
                breadcrumbName: t('marketingrevirews.notification.marketing'),
                path: 'marketing',
              },
              {
                breadcrumbName: t('marketingrevirews.notification.title'),
                path: '',
              },
            ]}
          />
          <h4>{t('marketingrevirews.notification.title')}</h4>
        </Col>
        <Col span={'auto'} className={styles.titleSaveBtn}>
          <div className={styles.reviewLink}>
            <h5>{t('marketingrevirews.notification.review.link.label')}</h5>
            <a
              href={'https://crm.pabau.com/reviews/perfect-skin'}
              target="__blank"
            >
              <span>{t('marketingrevirews.notification.review.link')}</span>
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
                <FilterOutlined /> {t('marketingrevirews.notification.filter')}
              </Button>
            </Popover>
            <Button
              type="primary"
              className={styles.saveBtn}
              onClick={handleConfigure}
            >
              {t('marketingrevirews.notification.configure')}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )

  const customProgressBar = (width, classname) => {
    return (
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

    switch (true) {
      case feedbackValue < 2:
        left = feedbackValue
        classname = styles.rate2
        break
      case feedbackValue >= 2 && feedbackValue < 3:
        left = feedbackValue === 2 ? feedbackValue * 7.5 : feedbackValue * 11.67
        classname = styles.rate3
        break
      case feedbackValue >= 3 && feedbackValue < 4.5:
        left =
          feedbackValue === 3 ? feedbackValue * 11.67 : feedbackValue * 16.67
        classname = styles.rate4
        break
      case feedbackValue >= 4.5:
        left =
          feedbackValue === 4.5 ? feedbackValue * 16.67 : feedbackValue * 20
        classname = styles.rate5
        break
    }
    return (
      <Row className={styles.mobColumn}>
        <Col xs={24} lg={12}>
          <div className={styles.reviewCard}>
            <div className={`${styles.reviewHeader} ${classname}`}>
              <div className={styles.starWrapper}>
                <span className={styles.imgSmile}>
                  {feedbackValue < 2 ? (
                    <FrownOutlined className={styles.face} />
                  ) : (
                    <SmileOutlined className={styles.face} />
                  )}
                </span>
                <div className={styles.clientReview}>
                  <h5>{t('marketingrevirews.client.message')}</h5>
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
                <Button>{t('marketingrevirews.share.button.label')}</Button>
              </div>
            </div>
            <div className={styles.rateListing}>
              <div className={styles.progressBar}>
                {customProgressBar(left, classname)}
              </div>
              <div className={styles.listColor}>
                <ul>
                  <li>
                    <span />
                    <p>{t('marketingrevirews.need.improvement.label')}</p>
                  </li>
                  <li>
                    <span />
                    <p>{t('marketingrevirews.ok.label')}</p>
                  </li>
                  <li>
                    <span />
                    <p>{t('marketingrevirews.great.label')}</p>
                  </li>
                  <li>
                    <span />
                    <p>{t('marketingrevirews.excellent.label')}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} lg={6}>
          <div className={styles.reviewWrap}>
            <ReviewTable
              fields={reviewData}
              sourceFieldTitle={t('marketingrevirews.table.column.source')}
              scoreFieldTitle={t('marketingrevirews.table.column.score')}
              reviewFieldTitle={t('marketingrevirews.notification.title')}
              mostRecentTitle={t('marketingrevirews.table.column.most.recent')}
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
            query: listQuery,
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
            query: listQuery,
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
            query: listQuery,
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
        {t('marketingrevirews.share.modal.respond')}{' '}
        {selectedRow?.feedback_name}
      </h4>
    </div>
  )

  const handleInputChange = (e) => {
    setMessage(e.target.value)
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  const renderModalData = (modalValue: string, t: Function) => {
    return (
      <>
        {isMobile ? (
          <RenderModalHeader t={t} />
        ) : (
          <div className={styles.headerModalWrap}>
            <h4>
              {modalValue === 'respond'
                ? `${t('marketingrevirews.share.modal.respond')} ${
                    selectedRow?.feedback_name
                  }`
                : `${t('marketingrevirews.share.modal.share')} ${
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
              <label>{t('marketingrevirews.share.modal.answer')}</label>
              <AntInput.TextArea
                rows={4}
                placeholder={`${t(
                  'marketingrevirews.share.modal.personalised.answer'
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
                {t('marketingrevirews.share.modal.notify')}{' '}
                {selectedRow?.feedback_name}{' '}
                {t('marketingrevirews.share.modal.response')}
              </div>
              <div className={styles.box}>
                {selectedRow?.Response.length !== 0 && (
                  <Button
                    type="default"
                    className={styles.deleteButton}
                    onClick={handleDeleteResponseMessage}
                  >
                    {t('marketingrevirews.share.modal.delete')}
                  </Button>
                )}
                <div className={styles.respondGroup}>
                  <Button type="primary" onClick={handleResponseMessage}>
                    {selectedRow?.Response.length === 0
                      ? t('marketingrevirews.share.modal.responsed')
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
            <p>{t('marketingrevirews.share.modal.or')}</p>
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
    <>
      <CommonHeader title={t('marketingrevirews.notification.title')} />
      <Layout>
        <div className={styles.notificationBanner}>
          <NotificationBanner
            title={t('marketingrevirews.notification.title')}
            desc={t('marketingrevirews.notification.description')}
            imgPath={notificationBannerReviewPageImage}
            allowClose={true}
            setHide={[hideBanner, setHideBanner]}
            showPaymentButton={true}
            showEmail={true}
            showPaymentTitle={t('marketingrevirews.notification.button')}
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
              <Spin
                className={styles.spinner}
                size={'large'}
                delay={0}
                spinning={true}
                indicator={<LoadingOutlined className={styles.icon} spin />}
              />
            ) : dataList.length > 0 ? (
              <Table
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                columns={columnData}
                dataSource={dataList.map((item) => {
                  return {
                    ...item,
                    feedback_source: renderSocialMediaIcon(
                      item?.feedback_source
                    ),
                    rating: `${item?.rating}/5`,
                    date: new Date(item?.date * 1000).toLocaleDateString(
                      'en-GB'
                    ),
                    feedback_for: (
                      <Tooltip
                        placement="bottom"
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
                      <Tooltip placement="top" title={item?.feedback_comment}>
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
    </>
  )
}

export default Reviews
