import {
  EditOutlined,
  PlaySquareOutlined,
  QuestionCircleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { gql } from '@apollo/client'
import { SetupChip, useLiveQuery } from '@pabau/ui'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from '../../../pages/setup/setup.module.less'

const GET_VIDEO_COUNT = gql`
  query getTrainings {
    findManyTrainingCourseCount
  }
`
const GET_COMMUNITY_COUNT = gql`
  query getCommunityCount {
    featureRequestsWeeklyAvg
  }
`
export interface HeaderDataType {
  key: string
  title: string
  subTitle: string
  count: string
  image: ReactElement
  loading: boolean
  href?: string
  error?: boolean
}

const HeaderChip: FC = () => {
  const handleChipClick = (url: string) => {
    window.open(url, '_blank')
  }
  const { t } = useTranslationI18()
  const data: HeaderDataType[] = [
    {
      key: 'Blog',
      title: t('setup.header.chip.blog'),
      count: '53',
      subTitle: t('setup.header.chip.blog.subTitle'),
      image: <EditOutlined />,
      href: 'https://www.pabau.com/blog/',
      loading: false,
    },
    {
      key: 'Community',
      title: t('setup.header.chip.community'),
      count: '18',
      subTitle: t('setup.header.chip.community.subTitle'),
      image: <UsergroupAddOutlined />,
      href: 'https://community.pabau.com/',
      loading: true,
    },
    {
      key: 'Video guides',
      title: t('setup.header.chip.video'),
      count: '18',
      subTitle: t('setup.header.chip.video.subTitle'),
      image: <PlaySquareOutlined />,
      loading: true,
    },
    {
      key: 'Help guides',
      title: t('setup.header.chip.help'),
      count: '28',
      subTitle: t('setup.header.chip.help.subTitle'),
      image: <QuestionCircleOutlined />,
      href: 'https://intercom.help/pabau/en',
      loading: false,
    },
  ]
  const [headerData, setHeaderData] = useState([...data])

  const {
    data: videoCount,
    error: videoError,
    loading: videoLoading,
  } = useLiveQuery(GET_VIDEO_COUNT)
  const {
    data: communityCount,
    error: communityError,
    loading: communityLoading,
  } = useLiveQuery(GET_COMMUNITY_COUNT)

  useEffect(() => {
    if (videoCount && !videoLoading) {
      const data = [...headerData]
      for (const item of data) {
        if (item.key === 'Video guides') {
          item.count = videoCount
          item.loading = false
        }
      }
      setHeaderData(data)
    }

    if (communityCount && !communityLoading) {
      const data = [...headerData]
      for (const item of data) {
        if (item.key === 'Community') {
          item.count = communityCount
          item.loading = false
        }
      }
      setHeaderData(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoCount, communityCount, videoLoading, communityLoading])

  useEffect(() => {
    if (videoError) {
      const data = [...headerData]
      const records = data.find((item) => item.key === 'Video guides')
      records.error = true
      records.loading = false
      setHeaderData(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoError])

  useEffect(() => {
    if (communityError) {
      const data = [...headerData]
      const records = data.find((item) => item.key === 'Community')
      records.error = true
      records.loading = false
      setHeaderData(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityError])

  return (
    <div className={styles.headerChipWrapper}>
      {headerData?.map((value) => (
        <SetupChip
          key={value.key}
          {...value}
          onClick={() => handleChipClick(value.href)}
        />
      ))}
    </div>
  )
}

export default HeaderChip
