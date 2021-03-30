import {
  Avatar,
  Language,
  AvatarUploader,
  timezone as timezones,
  PhoneNumberInput,
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
import AvatarImage from '../../../assets/images/setting-avatar.png'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const ReactQuill = dynamic(() => import('../../../components/MyReactQuill'), {
  ssr: false,
})

const Profile: FC = () => {
  const { Option } = Select
  const size = useWindowSize()
  const { t } = useTranslationI18()
  const [userImage, setUserImage] = useState<string>(AvatarImage)
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)

  const uploadPhoto = () => {
    setShowAvatarUploader(true)
  }
  const deletePhoto = () => {
    return
  }
  const handleChangeImage = (image: string) => {
    setUserImage(image)
  }
  return (
    <>
      <Descriptions title={t('account.settings.tab.header1')}>
        <Descriptions.Item>
          {t('account.settings.profile.description')}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div onClick={uploadPhoto}>
              <Avatar
                src={userImage}
                size={size.width > 767 ? 128 : 88}
                name={'Zhen'}
                edit={true}
              />
            </div>
            <div>
              <Button
                style={
                  size.width > 767
                    ? { margin: '0 16px', verticalAlign: 'middle' }
                    : { margin: '0 10px', verticalAlign: 'middle' }
                }
                onClick={uploadPhoto}
              >
                {t('account.settings.profile.upload')}
              </Button>
              <Button style={{ verticalAlign: 'middle' }} onClick={deletePhoto}>
                {t('account.settings.profile.delete')}
              </Button>
            </div>
          </div>
        </Form.Item>
        {size.width > 767 ? (
          <Row>
            <Col span={11}>
              <Form.Item label={t('account.settings.profile.firstname.label')}>
                <Input
                  placeholder={t(
                    'account.settings.profile.firstname.placeholder'
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item label={t('account.settings.profile.lastname.label')}>
                <Input
                  placeholder={t(
                    'account.settings.profile.lastname.placeholder'
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col span={24}>
                <Form.Item
                  label={t('account.settings.profile.firstname.label')}
                >
                  <Input
                    placeholder={t(
                      'account.settings.profile.firstname.placeholder'
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label={t('account.settings.profile.lastname.label')}>
                  <Input
                    placeholder={t(
                      'account.settings.profile.lastname.placeholder'
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        <Row>
          <Col span={24}>
            <Form.Item>
              <PhoneNumberInput
                onChange={(val) => {
                  console.log(val)
                }}
                label={t('account.settings.profile.mobilephone.label')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label={t('account.settings.profile.emailsignature.label')}
            >
              <ReactQuill />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={t('account.settings.profile.language.label')}>
              <Language />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={t('account.settings.profile.timezone.label')}>
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
        title={t('account.settings.profile.avatarupload.title')}
        onCreate={handleChangeImage}
        imageURL={userImage}
        onCancel={() => setShowAvatarUploader(false)}
      />
    </>
  )
}

export default Profile
