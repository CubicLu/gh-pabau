import {
  Avatar,
  Language,
  AvatarUploader,
  timezone as timezones,
} from '@pabau/ui'
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  Row,
  Select,
} from 'antd'
import dynamic from 'next/dynamic'
import React, { FC, useState } from 'react'
import useWindowSize from '../../../hooks/useWindowSize'
import userImage from '../../../assets/images/avatar.png'
import styles from './index.module.less'
const { TextArea } = Input

const ReactQuill = dynamic(() => import('../../../components/MyReactQuill'), {
  ssr: false,
})

const Profile: FC = () => {
  const { Option } = Select
  const size = useWindowSize()
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)

  const uploadPhoto = () => {
    setShowAvatarUploader(true)
  }
  const deletePhoto = () => {
    return
  }
  return (
    <>
      <Descriptions title="Profile">
        <Descriptions.Item>
          Choose how you want to be notified with certain interactions occur on
          Pabau
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <div className={styles.avtarWrapper}>
            <Avatar
              src={
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              }
              size={size.width > 767 ? 128 : 88}
              name={'Zhen'}
            />
            <div className={styles.btnAvatarWrapper}>
              <Button
                style={
                  size.width > 767
                    ? { margin: '0 16px', verticalAlign: 'middle' }
                    : { margin: '0 10px', verticalAlign: 'middle' }
                }
                onClick={uploadPhoto}
              >
                Upload Photo
              </Button>
              <Button style={{ verticalAlign: 'middle' }} onClick={deletePhoto}>
                Delete
              </Button>
            </div>
          </div>
        </Form.Item>
        {size.width > 767 ? (
          <Row>
            <Col span={11}>
              <Form.Item label="First name">
                <Input placeholder="First name" />
              </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Form.Item label="Last name">
                <Input placeholder="Last name" />
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col span={24}>
                <Form.Item label="First name">
                  <Input placeholder="First name" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Last name">
                  <Input placeholder="Last name" />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        <Row>
          <Col span={24}>
            <Form.Item label="Mobile phone">
              <Input placeholder="Mobile phone" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Biography">
              <TextArea placeholder="Biography" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Email signature">
              <ReactQuill />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Language">
              <Language />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Timezone">
              <Select showSearch defaultValue={'Europe/London'}>
                {timezones.map(
                  (item: { timezone: string; text: string }, index) => (
                    <Option key={index} value={item.timezone}>
                      {item.timezone}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <AvatarUploader
        visible={showAvatarUploader}
        title="Upload Avatar Photo"
        imageURL={userImage}
        onCancel={() => setShowAvatarUploader(false)}
      />
    </>
  )
}

export default Profile
