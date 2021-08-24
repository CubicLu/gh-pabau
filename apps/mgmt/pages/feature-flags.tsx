import React, { useState } from 'react'
import { Layout, Divider, Button } from 'antd'
import { FeatureFlags } from '../components/FeatureFlags/FeatureFlags'
import { NewFeatureModal } from '../components/FeatureFlags/NewFeatureModal'
import Sidebar from '../components/Sidebar/sidebar'
import { Notification, NotificationType } from '@pabau/ui'

import {
  GetFeatureFlagsDocument,
  useGetFeatureFlagsQuery,
  useNewFeatureFlagMutation,
} from '@pabau/graphql'

import 'antd/dist/antd.css'

const { Header, Content } = Layout

export function Index() {
  const [isNewModalVisible, setIsNewModalVisible] = useState(false)
  const [newFlagMutation] = useNewFeatureFlagMutation({
    onError() {
      Notification(NotificationType.error, 'Error creating the flag')
    },
    onCompleted() {
      setIsNewModalVisible(false)
    },
  })

  const { loading, error, data } = useGetFeatureFlagsQuery()
  if (error) return <div>Error</div>
  if (loading || !data) return <div>Loading...</div>

  const featureFlagsData = data.feature_flags.map((el) => {
    return {
      key: el.id,
      page: {
        name: el.page_slug,
        path: '/' + el.page_slug,
      },
      remote: 'https://pabau.com/' + el.fallback_slug,
      toggle: el.status,
    }
  })

  const showNewFeatureModalHandler = () => {
    setIsNewModalVisible(true)
  }

  const hideNewFeatureModalHandler = () => {
    setIsNewModalVisible(false)
  }

  const newFeatureCreateHandler = async (values) => {
    await newFlagMutation({
      variables: {
        fallback_slug: values.legacy_url,
        page_slug: values.page_url,
      },
      refetchQueries: [{ query: GetFeatureFlagsDocument }],
    })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Button type="primary" onClick={showNewFeatureModalHandler}>
              Add New Toggle
            </Button>
            <Divider />
            <FeatureFlags source={featureFlagsData} />
          </div>
        </Content>
      </Layout>
      <NewFeatureModal
        visible={isNewModalVisible}
        onCreate={newFeatureCreateHandler}
        onCancel={hideNewFeatureModalHandler}
      />
    </Layout>
  )
}

export default Index
