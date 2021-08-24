import React from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'

import Sidebar from '../components/Sidebar/sidebar'

const { Header, Content } = Layout

function Index() {
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
            <h3>With great power comes great responsibility.</h3>
            <p>JK, we will probably put some graphs in here</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Index
