import { Switch, Table, Typography } from 'antd'
import React from 'react'
import { Notification, NotificationType } from '@pabau/ui'
import { useUpdateFeatureStatusMutation } from '@pabau/graphql'

const { Text } = Typography

// const expandedRowRender = () => {
//   const columns = [
//     { title: 'Company', dataIndex: 'date', key: 'company' },
//     { title: 'ID', dataIndex: 'cid', key: 'cid' },
//     {
//       title: 'Status',
//       key: 'state',
//       render: () => (
//         <span>
//           <Badge status="success" />
//           Live
//         </span>
//       ),
//     },
//     {
//       title: 'Active',
//       dataIndex: 'toggle',
//       key: 'toggle',
//       render: (isChecked) => {
//         return <Switch defaultChecked={isChecked} />
//       },
//     },
//   ]
//
//   const data = []
//   for (let i = 0; i < 1; ++i) {
//     data.push({
//       key: i,
//       date: "Nenad's Clinic",
//       cid: '8021',
//       state: '',
//       toggle: true,
//     })
//   }
//   return <Table columns={columns} dataSource={data} pagination={false} />
// }

export const FeatureFlags = (props) => {
  const { source } = props

  const [updateFlagMutation] = useUpdateFeatureStatusMutation({
    onError() {
      Notification(NotificationType.error, 'Error updating the flag')
    },
  })

  const featureColumns = [
    {
      title: 'Page',
      dataIndex: 'page',
      render: function firstColRender(el) {
        return (
          <div>
            <Text>{el.name}</Text>
            <br />
            <Text type="secondary">{el.path}</Text>
          </div>
        )
      },
    },
    {
      title: 'Remote URL',
      dataIndex: 'remote',
    },
    {
      title: 'Page Enabled',
      dataIndex: 'toggle',
      render: function lastColRender(isChecked, row) {
        return (
          <Switch
            key={row.key}
            defaultChecked={isChecked}
            onChange={(checked) => featureToggleHandler(checked, row.key)}
          />
        )
      },
    },
  ]

  const featureToggleHandler = async (checked, key) => {
    await updateFlagMutation({ variables: { id: key, status: checked } })
  }

  return <Table dataSource={source} columns={featureColumns} />
}
