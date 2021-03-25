import React from 'react'
import { SetupChip } from '@pabau/ui'
import styles from '../../../pages/setup/Setup.module.less'
import { useRouter } from 'next/router'

import {
  EditOutlined,
  PlaySquareOutlined,
  UsergroupAddOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'

const data = [
  {
    title: 'Blog',
    subTitle: '53 posts',
    image: <EditOutlined />,
    href: 'https://www.pabau.com/blog/',
  },
  {
    title: 'Community',
    subTitle: '18 topics',
    image: <UsergroupAddOutlined />,
    href: 'https://community.pabau.com/',
  },
  {
    title: 'Video guides',
    subTitle: '18 videos',
    image: <PlaySquareOutlined />,
  },
  {
    title: 'Help guides',
    subTitle: '28 guides',
    image: <QuestionCircleOutlined />,
    href: 'https://intercom.help/pabau/en',
  },
]

const HeaderChip = () => {
  const router = useRouter()
  const handleChipClick = (url: string) => {
    router.push(url)
  }

  return (
    <div className={styles.headerChipWrapper}>
      {data?.map((value, index) => (
        <SetupChip
          key={index}
          {...value}
          onClick={() => handleChipClick(value.href)}
        />
      ))}
    </div>
  )
}

export default HeaderChip
