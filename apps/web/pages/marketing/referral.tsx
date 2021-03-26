/* eslint-disable graphql/template-strings */
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { UserContext } from '../../context/UserContext'
import { languageMapper } from '../../helper/languageMapper'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, BasicModal, FullScreenReportModal } from '@pabau/ui'
import { Avatar, Skeleton, Tooltip, Tag, Table, Progress } from 'antd'
import styles from './referral.module.less'
import { gql, useQuery } from '@apollo/client'
import CrudLayout from '../../components/CrudLayout/CrudLayout'
import classNames from 'classnames'
import { useMedia } from 'react-use'

import { ReactComponent as FirstPlaceSrc } from '../../assets/images/marketing/referrals/1st.svg'
import { ReactComponent as SecondPlaceSrc } from '../../assets/images/marketing/referrals/2nd.svg'
import { ReactComponent as ThirdPlaceSrc } from '../../assets/images/marketing/referrals/3rd.svg'
import { ReactComponent as MegaphoneSrc } from '../../assets/images/marketing/referrals/megaphone.svg'
import { ReactComponent as PresentSrc } from '../../assets/images/marketing/referrals/present.svg'
import { ReactComponent as BookSrc } from '../../assets/images/marketing/referrals/book.svg'
import { ReactComponent as TrophySrc } from '../../assets/images/marketing/referrals/trophy.svg'

const FigmaFirstPlaceIcon = () => (
  <FirstPlaceSrc width={28} height={28} alt={'1st'} />
)
const FigmaSecondPlaceIcon = () => <SecondPlaceSrc height={28} alt={'2nd'} />
const FigmaThirdPlaceIcon = () => (
  <ThirdPlaceSrc width={28} height={28} alt={'3rd'} />
)
const FigmaMegaphoneIcon = () => (
  <MegaphoneSrc width={32} height={32} alt={'megaphone'} />
)
const FigmaBookIcon = () => <BookSrc width={32} height={32} alt={'book'} />
const FigmaTrophyIcon = () => (
  <TrophySrc width={32} height={32} alt={'trophy'} />
)
const FigmaPresentIcon = () => (
  <PresentSrc width={32} height={32} alt={'present'} />
)
const USER_QUERY = gql`
  query users($id: Int = 7861) {
    user(where: { id: $id }) {
      image
      full_name
      job_title
    }
  }
`

const StateStyles = {
  confirmed: ['#F6FBFD', '#A5D7E8', '#54B2D3'],
  pending: ['rgba(250, 173, 20, 0.05)', 'rgba(250, 173, 20, 0.5)', '#FAAD14'],
  expired: ['#FFF7F7', 'rgba(255, 91, 100, 0.5)', '#FF5B64'],
}
const TableRenders = {
  User({
    value,
    showJobTitle = false,
    noPad = false,
  }: {
    value: string | number
    showJobTitle?: boolean
    noPad?: boolean
  }) {
    const [initial, setInitial] = useState('')
    const width = useRef(Math.floor(Math.random() * 25) + 75)
    const { loading, error, data } = useQuery(USER_QUERY, {
      variables: {
        id: typeof value === 'number' ? value : Number.parseInt(value),
      },
    })
    if (loading || error || data?.user === null) {
      const content = (
        <>
          <Skeleton.Avatar shape="circle" size={36} active={Boolean(error)} />
          <span
            className={classNames({
              [styles.padLeft32]: !noPad,
              [styles.padLeft5]: noPad,
            })}
          >
            <Skeleton.Input
              style={{
                width: width.current,
                marginTop: '6px',
              }}
              active={Boolean(error)}
              size={'small'}
            />
          </span>
        </>
      )
      return (
        <div>
          {error ? <Tooltip title={error.name}>{content}</Tooltip> : content}
        </div>
      )
    }
    return (
      <div style={{ display: 'flex' }}>
        <Avatar
          shape="circle"
          size={36}
          src={data.user.image}
          onError={() => {
            setInitial(
              data.user.full_name
                .split(' ')
                .map((word) => word.charAt(0))
                .join('')
            )
            return true
          }}
        >
          {initial}
        </Avatar>
        <div
          className={classNames({
            [styles.padLeft32]: !noPad,
            [styles.padLeft5]: noPad,
            [styles.padTop5]: noPad,
          })}
          style={{
            marginTop: !showJobTitle ? '8px' : '0px',
          }}
        >
          <span>{data.user.full_name}</span>
          {showJobTitle && (
            <>
              <br />
              <span style={{ fontSize: '12px', color: 'gray' }}>
                {data.user.job_title}
              </span>
            </>
          )}
        </div>
      </div>
    )
  },
  Date({ value }: { value: string }) {
    const date = new Date(value)
    return (
      <span>
        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
      </span>
    )
  },
  Currency({ value }: { value: number }) {
    return value > 0 ? <span>£{value}</span> : null
  },
  Incentive({ value }: { value: boolean }) {
    const { t, i18n } = useTranslationI18()
    const user = useContext(UserContext)
    useEffect(() => {
      if (user?.company?.details?.language) {
        const lan = user.company.details.language
        const lanCode = lan ? languageMapper(lan) : 'en'
        i18n.changeLanguage(lanCode)
      }
    }, [user, i18n])
    return (
      value && (
        <Tag
          style={{
            backgroundColor: '#F7FDFA',
            border: '1px solid #65CD98',
            boxSizing: 'border-box',
            borderRadius: '4px',
            color: '#65CD98',
          }}
        >
          {t('marketingreferral-misc.paid')}
        </Tag>
      )
    )
  },
  State({ value }: { value: string }) {
    switch (value) {
      case 'confirmed':
      case 'pending':
      case 'expired': {
        const [bg, border, text] = StateStyles[value]
        return (
          <Tag
            style={{
              backgroundColor: bg,
              border: `1px solid ${border}`,
              boxSizing: 'border-box',
              borderRadius: '4px',
              color: text,
            }}
          >
            {value}
          </Tag>
        )
      }
      default:
        return <p>missing data</p>
    }
  },
  ViewButton(_value, entry: { referer }) {
    return (
      <Button
        onClick={() => {
          alert(`show something for user(id=${entry.referer})`)
        }}
      >
        View
      </Button>
    )
  },
  Points({ value, max }: { value: number; max: number }) {
    return (
      <div className={styles.pointsWrapper}>
        <div className={styles.points}>{value}</div>
        <div className={styles.progressBar}>
          <Progress
            showInfo={false}
            strokeColor={'#65CD98'}
            percent={(100 * value) / max}
          ></Progress>
        </div>
      </div>
    )
  },
}
const LIST_QUERY = gql`
  query marketing_referral(
    $searchTerm: String = ""
    $offset: Int
    $limit: Int
  ) {
    marketing_referral(
      offset: $offset
      limit: $limit
      where: {
        _or: [
          { referee: { _ilike: $searchTerm }, referer: { _ilike: $searchTerm } }
        ]
      }
    ) {
      date
      incentive
      referee
      referer
      spend
      state
      key: id
    }
  }
`
const LIST_AGGREGATE_QUERY = gql`
  query marketing_referral_aggregate {
    marketing_referral_aggregate {
      aggregate {
        count
      }
    }
  }
`
const DELETE_MUTATION = gql`
  mutation delete_marketing_referral($id: uuid = "") {
    delete_marketing_referral(where: { id: { _eq: $id } }) {
      returning {
        date
        incentive
        referee
        referer
        spend
        state
        id
      }
    }
  }
`
const ADD_MUTATION = gql`
  mutation add_marketing_referral(
    $state: String = ""
    $spend: numeric = 0
    $referer: String = ""
    $referee: String = ""
    $incentive: Boolean = false
    $date: date = ""
  ) {
    insert_marketing_referral(
      objects: {
        state: $state
        spend: $spend
        referer: $referer
        referee: $referee
        incentive: $incentive
        date: $date
      }
    ) {
      returning {
        date
        incentive
        referee
        referer
        spend
        state
        id
      }
    }
  }
`
const EDIT_MUTATION = gql`
  mutation update_marketing_referral(
    $id: uuid = ""
    $date: date = ""
    $incentive: Boolean = false
    $referee: String = ""
    $referer: String = ""
    $spend: numeric = 0
    $state: String = ""
  ) {
    update_marketing_referral(
      where: { id: { _eq: $id } }
      _set: {
        incentive: $incentive
        referee: $referee
        referer: $referer
        spend: $spend
        state: $state
        date: $date
      }
    ) {
      returning {
        date
        incentive
        referee
        referer
        spend
        state
      }
    }
  }
`
const UPDATE_ORDER_MUTATION = gql`
  mutation update_marketing_referral(
    $state: String = ""
    $spend: numeric = 0
    $referer: String = ""
    $referee: String = ""
    $incentive: Boolean = false
    $date: date = ""
    $id: uuid = ""
  ) {
    update_marketing_referral(
      _set: {
        date: $date
        incentive: $incentive
        referee: $referee
        referer: $referer
        spend: $spend
        state: $state
      }
      where: { id: { _eq: $id } }
    ) {
      returning {
        date
        incentive
        referee
        referer
        spend
        state
        id
      }
    }
  }
`
interface LeaderboardProps {
  leaderboardVisible: boolean
  setLeaderboardVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const TEMP_LEADERBOARD_QUERY = gql`
  query users {
    users(take: 10, where: { NOT: { job_title: { equals: "" } } }) {
      id
      points: company_id
    }
  }
`
function Leaderboard({
  leaderboardVisible,
  setLeaderboardVisible,
}: LeaderboardProps) {
  const mobile = useMedia('(max-width:767px)', false)
  const [maxPoints, setMaxPoints] = useState(1)
  const [visibleData, setVisibleData] = useState([])
  const { data, error, loading } = useQuery(TEMP_LEADERBOARD_QUERY)
  const { t, i18n } = useTranslationI18()
  const user = useContext(UserContext)
  useEffect(() => {
    if (user?.company?.details?.language) {
      const lan = user.company.details.language
      const lanCode = lan ? languageMapper(lan) : 'en'
      i18n.changeLanguage(lanCode)
    }
  }, [user, i18n])

  useEffect(() => {
    if (data) {
      let max = 0
      console.log({ data })
      setVisibleData(
        data.users
          .map((user, index) => {
            max = Math.max(max, user.points)
            return {
              order: index,
              user: user.id,
              points: user.points,
            }
          })
          .sort((a, b) => b.points - a.points)
      )
      setMaxPoints(Math.max(1, max))
    }
  }, [data])
  const ModalType = mobile ? FullScreenReportModal : BasicModal
  return (
    <ModalType
      title={t('marketingreferral-spotlights.leaderboard')}
      visible={leaderboardVisible}
      onCancel={() => setLeaderboardVisible(false)}
      onBackClick={() => setLeaderboardVisible(false)}
      modalWidth={682}
      operations={[]}
    >
      {loading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <Table
          columns={[
            {
              title: t('marketingreferral-leaderboard.rank'),
              render(value, record, index) {
                if (index === 0)
                  return (
                    <div className={styles.rankItem}>
                      <FigmaFirstPlaceIcon></FigmaFirstPlaceIcon>
                    </div>
                  )
                if (index === 1)
                  return (
                    <div className={styles.rankItem}>
                      <FigmaSecondPlaceIcon></FigmaSecondPlaceIcon>
                    </div>
                  )
                if (index === 2)
                  return (
                    <div className={styles.rankItem}>
                      <FigmaThirdPlaceIcon></FigmaThirdPlaceIcon>
                    </div>
                  )
                return <div className={styles.rankItem}>{index + 1}</div>
              },
              width: 50,
              dataIndex: 'order',
              className: classNames(styles.rankColumn, 'leaderboard'),
            },
            {
              dataIndex: 'user',
              title: t('marketingreferral-leaderboard.name'),
              render(value) {
                return (
                  <TableRenders.User
                    value={value}
                    showJobTitle={true}
                    noPad={true}
                  />
                )
              },
              className: classNames(styles.userColumn, 'leaderboard'),
            },
            {
              dataIndex: 'points',
              title: t('marketingreferral-leaderboard.points'),
              render(value, records, index) {
                return (
                  <TableRenders.Points
                    value={value}
                    max={maxPoints}
                  ></TableRenders.Points>
                )
              },
              className: classNames(styles.pointsColumn, 'leaderboard'),
            },
          ]}
          dataSource={visibleData}
          pagination={false}
          rowKey={(record) => record.order.toString()}
          style={{ minWidth: '500px' }}
        ></Table>
      )}
    </ModalType>
  )
}

// eslint-disable-next-line
export interface ReferralProps {}

export function Referral(props: ReferralProps) {
  const mobile = useMedia('(max-width:767px)', false)
  const [leaderboardVisible, setLeaderboardVisible] = useState(false)

  const { t, i18n } = useTranslationI18()
  const user = useContext(UserContext)
  useEffect(() => {
    if (user?.company?.details?.language) {
      const lan = user.company.details.language
      const lanCode = lan ? languageMapper(lan) : 'en'
      i18n.changeLanguage(lanCode)
    }
  }, [user, i18n])
  const schema: Schema = {
    full: t('marketingreferral-title.translation'),
    fullLower: t('marketingreferral-title.translation'),
    short: 'Source',
    shortLower: 'source',
    createButtonLabel: t('marketingreferral-buttons.configure'),
    messages: {
      create: {
        success: 'New marketings source created.',
        error: 'While creating marketing source.',
      },
      update: {
        success: 'Marketings source updated.',
        error: 'While updating marketings source.',
      },
      delete: {
        success: 'Marketings source deleted.',
        error: 'While deleting marketing sources.',
      },
    },
    deleteBtnLabel: 'Yes, Delete Source',
    fields: {
      referer: {
        full: 'Reffered by',
        fullLower: 'reffered by',
        type: 'string',
        visible: true,
        render(value: number) {
          return <TableRenders.User value={value}></TableRenders.User>
        },
        cssWidth: '249px',
      },
      referee: {
        full: t('marketingreferral-fields.referrer'),
        fullLower: t('marketingreferral-fields.referrer').toLowerCase(),
        type: 'string',
        visible: true,
        render(value: number) {
          return <TableRenders.User value={value}></TableRenders.User>
        },
        cssWidth: '269px',
      },
      date: {
        full: t('marketingreferral-fields.date'),
        fullLower: t('marketingreferral-fields.date').toLowerCase(),
        type: 'string',
        visible: true,
        render(value: string) {
          return <TableRenders.Date value={value} />
        },
        cssWidth: '120px',
      },
      spend: {
        full: t('marketingreferral-fields.spend'),
        fullLower: t('marketingreferral-fields.spend').toLowerCase(),
        type: 'number',
        visible: true,
        render(value: number) {
          return <TableRenders.Currency value={value}></TableRenders.Currency>
        },
        cssWidth: '112px',
      },
      incentive: {
        full: t('marketingreferral-fields.incentive'),
        fullLower: t('marketingreferral-fields.incentive').toLowerCase(),
        type: 'boolean',
        visible: true,
        render(value: boolean) {
          return <TableRenders.Incentive value={value}></TableRenders.Incentive>
        },
        cssWidth: '125px',
      },
      state: {
        full: t('marketingreferral-fields.state'),
        fullLower: t('marketingreferral-fields.state').toLowerCase(),
        type: 'select',
        visible: true,
        render(value: string) {
          return <TableRenders.State value={value}></TableRenders.State>
        },
        cssWidth: '168px',
      },
    },
  }
  return (
    <>
      <CrudLayout
        schema={schema}
        addQuery={ADD_MUTATION}
        deleteQuery={DELETE_MUTATION}
        listQuery={LIST_QUERY}
        editQuery={EDIT_MUTATION}
        aggregateQuery={LIST_AGGREGATE_QUERY}
        updateOrderQuery={UPDATE_ORDER_MUTATION}
        needTranslation={false}
        spotlightButtons={{
          buttons: [
            {
              name: t('marketingreferral-spotlights.client-referrals'),
              icon: FigmaMegaphoneIcon,
            },
            {
              name: t('marketingreferral-spotlights.sources'),
              icon: FigmaBookIcon,
              badge: true,
            },
            {
              name: t('marketingreferral-spotlights.incentive'),
              icon: FigmaPresentIcon,
              badge: true,
            },
            {
              name: t('marketingreferral-spotlights.leaderboard'),
              icon: FigmaTrophyIcon,
              badge: true,
              onClick() {
                setLeaderboardVisible(true)
              },
            },
          ],
        }}
        actions={[
          {
            name: 'view',
            render: TableRenders.ViewButton,
            visible: !mobile,
            title: '',
            width: '100px',
            value: true,
          },
        ]}
        allowReorder={false}
        allowRowEditing={false}
        onCreateNew={() => {
          return false
        }}
        onRowClick={(entry: { referer: string }) => {
          if (mobile) {
            alert(`show something for user(id=${entry.referer})`)
          }
        }}
      />
      <Leaderboard
        leaderboardVisible={leaderboardVisible}
        setLeaderboardVisible={(value) => setLeaderboardVisible(value)}
      />
    </>
  )
}
export default Referral
