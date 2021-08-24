import React, { FC, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { userDataProps } from '../../../../pages/team/users'
import { Button, Avatar, Table } from '@pabau/ui'
import styles from './ListView.module.less'

interface ListViewProps {
  users: userDataProps[]
}

export const ListView: FC<ListViewProps> = ({ users }) => {
  const { t } = useTranslation('common')
  const [rowId, setRowId] = useState<number>()

  const columns = [
    {
      title: t('team.user.listview.name.label'),
      dataIndex: 'name',
      key: 'name',
      width: '250px',
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <div className={styles.nameWrapper}>
          <Avatar src={record.img} name={record.name} />
          <div className={styles.textContent}>
            <h5>{text}</h5>
            <p>{record.title}</p>
          </div>
        </div>
      ),
      visible: true,
    },
    {
      title: t('team.user.listview.last.activity.label'),
      dataIndex: 'lastActivity',
      key: 'lastActivity',
      visible: true,
    },
    {
      title: t('team.user.listview.mobile.label'),
      dataIndex: 'mobile',
      key: 'mobile',
      visible: true,
    },
    {
      title: t('team.user.listview.email.label'),
      dataIndex: 'email',
      key: 'email',
      visible: true,
    },
    {
      title: t('team.user.listview.location.label'),
      dataIndex: 'location',
      key: 'location',
      visible: true,
    },
    {
      title: t('team.user.listview.user.group.label'),
      dataIndex: 'userGroup',
      key: 'userGroup',
      visible: true,
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      // eslint-disable-next-line react/display-name
      render: (text, record) =>
        rowId === record.id && (
          <Button icon={<EditOutlined />}>
            {t('team.user.listview.edit.label')}
          </Button>
        ),
      visible: true,
    },
  ]

  const onRowHoverHandle = (record: userDataProps) => {
    setRowId(record.id)
  }

  return (
    <div className={styles.listViewWrapper}>
      <Table
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={users as never[]}
        pagination={false}
        onRowHover={onRowHoverHandle}
        isHover={true}
      />
    </div>
  )
}
