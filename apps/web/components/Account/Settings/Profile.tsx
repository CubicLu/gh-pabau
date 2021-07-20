import {
  Avatar,
  AvatarUploader,
  LanguageDropdown,
  PhoneNumberInput,
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
  Skeleton,
} from 'antd'
import dynamic from 'next/dynamic'
import React, { FC, useEffect, useState } from 'react'
import { getImage } from '../../../helper/cdn/imageUrl'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import useWindowSize from '../../../hooks/useWindowSize'
import styles from './skeleton.module.less'

const ReactQuill = dynamic(() => import('../../../components/MyReactQuill'), {
  ssr: false,
})

export interface Profile {
  id: number
  full_name: string
  image: string
  language: string
  phone_number: string
  signature: string
  timezone: string
  CmStaffGeneral: {
    ID?: number
    Fname?: string
    Lname?: string
  }
}
export interface ProfileProps {
  loading?: boolean
  profileData?: Profile
  setPhoneValid?: (valid: boolean) => void
  onProfileChange?: (data) => void
}

export const Profile: FC<ProfileProps> = ({
  loading = false,
  profileData,
  setPhoneValid,
  onProfileChange,
  ...rest
}) => {
  const { Option } = Select
  const size = useWindowSize()
  const { t } = useTranslationI18()
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [locationInfo, setLocationInfo] = useState(null)
  const [profile, setProfile] = useState(profileData)
  const [userImage, setUserImage] = useState('')
  const [form] = Form.useForm()

  const uploadPhoto = () => {
    setShowAvatarUploader(true)
  }
  const deletePhoto = () => {
    handleChangeImage('')
  }

  const handleInputChange = (obj) => {
    if (profile && Object.keys(profile)?.length) {
      setProfile({ ...profile, ...obj })
      onProfileChange({ ...profile, ...obj })
    }
  }

  const handleChangeImage = (image: string) => {
    setUserImage(image)
    handleInputChange({ image })
  }

  const onFirstNameChange = (value) => {
    const existProfile = { ...profile }
    let CmStaffData = existProfile.CmStaffGeneral
    if (CmStaffData)
      CmStaffData = { ...CmStaffData, Fname: value?.replace(/\s\s+/g, ' ') }
    handleInputChange({
      CmStaffGeneral: CmStaffData,
    })
  }
  const onLastNameChange = (value) => {
    const existProfile = { ...profile }
    let CmStaffData = existProfile?.CmStaffGeneral
    if (CmStaffData)
      CmStaffData = { ...CmStaffData, Lname: value?.replace(/\s\s+/g, ' ') }
    handleInputChange({
      CmStaffGeneral: CmStaffData,
    })
  }

  useEffect(() => {
    const profileInfo = { ...profileData }
    setProfile(profileInfo)
    if (profileInfo?.image && profileInfo?.image?.includes('/cdn/')) {
      setUserImage(getImage(`${profileInfo.image}`))
    }
    async function getIPLocation() {
      await fetch(`https://extreme-ip-lookup.com/json`)
        .then((res) => res.json())
        .then((response) => {
          setLocationInfo(response)
        })
    }
    getIPLocation()
    // eslint-disable-next-line
  }, [profileData])

  return (
    <div className={styles.skeletonWrapper}>
      <Descriptions title={t('account.settings.tab.header1')}>
        <Descriptions.Item>
          {t('account.settings.profile.description')}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      {loading ? (
        <Form layout="vertical">
          <Form.Item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div onClick={uploadPhoto}>
                <Avatar
                  src={userImage}
                  size={size.width > 767 ? 128 : 88}
                  name={profile?.full_name}
                  edit={true}
                  isLoading={loading}
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
                <Button
                  style={{ verticalAlign: 'middle' }}
                  onClick={deletePhoto}
                >
                  {t('account.settings.profile.delete')}
                </Button>
              </div>
            </div>
          </Form.Item>
          {size.width > 767 ? (
            <Row>
              <Col span={11}>
                <label className={styles.label}>
                  {t('account.settings.profile.firstname.label')}
                </label>
                <Form.Item className="pRelative">
                  <Skeleton.Input active />
                </Form.Item>
              </Col>
              <Col span={2} />
              <Col span={11}>
                <label className={styles.label}>
                  {t('account.settings.profile.lastname.label')}
                </label>
                <Form.Item className="pRelative">
                  <Skeleton.Input active />
                </Form.Item>
              </Col>
            </Row>
          ) : (
            <>
              <Row>
                <Col span={24}>
                  <label>{t('account.settings.profile.firstname.label')}</label>
                  <Form.Item className="pRelative">
                    <Skeleton.Input active />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <label>{t('account.settings.profile.lastname.label')}</label>
                  <Form.Item className="pRelative">
                    <Skeleton.Input active />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          <Row>
            <Col span={24}>
              <label>{t('account.settings.profile.mobilephone.label')}</label>
              <Form.Item className="pRelative">
                <Skeleton.Input active />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label>
                {t('account.settings.profile.emailsignature.label')}
              </label>
              <Form.Item className="pRelative">
                <Skeleton.Input style={{ height: 170 }} size="large" active />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label>{t('account.settings.profile.language.label')}</label>
              <div className="profileLang pRelative">
                <Skeleton.Input active />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label>{t('account.settings.profile.timezone.label')}</label>
              <Form.Item className="pRelative">
                <Skeleton.Input active />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : (
        <Form layout="vertical" form={form}>
          <Form.Item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div onClick={uploadPhoto}>
                <Avatar
                  src={userImage}
                  size={size.width > 767 ? 128 : 88}
                  name={profile?.full_name}
                  edit={true}
                  isLoading={loading}
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
                <Button
                  style={{ verticalAlign: 'middle' }}
                  onClick={deletePhoto}
                >
                  {t('account.settings.profile.delete')}
                </Button>
              </div>
            </div>
          </Form.Item>
          {size.width > 767 ? (
            <Row>
              <Col span={11}>
                <Form.Item
                  label={t('account.settings.profile.firstname.label')}
                >
                  <Input
                    value={profile?.CmStaffGeneral?.Fname || null}
                    onChange={(e) => onFirstNameChange(e.target.value)}
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
                    value={profile?.CmStaffGeneral?.Lname || null}
                    onChange={(e) => onLastNameChange(e.target.value)}
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
                      value={profile?.CmStaffGeneral?.Fname || null}
                      onChange={(e) => onFirstNameChange(e.target.value)}
                      placeholder={t(
                        'account.settings.profile.firstname.placeholder'
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label={t('account.settings.profile.lastname.label')}
                  >
                    <Input
                      value={profile?.CmStaffGeneral?.Lname || null}
                      onChange={(e) => onLastNameChange(e.target.value)}
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
                  value={profile?.phone_number || ''}
                  countryCode={
                    !profile?.phone_number ? locationInfo?.countryCode : ''
                  }
                  onChange={(val, valid) => {
                    setPhoneValid?.(valid)
                    handleInputChange({ phone_number: val })
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
                <ReactQuill
                  value={profile?.signature}
                  onChange={(val) => handleInputChange({ signature: val })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="profileLang">
                <LanguageDropdown
                  simple={true}
                  value={profile?.language}
                  label={t('account.settings.profile.language.label')}
                  onSelected={(val) => handleInputChange({ language: val })}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label={t('account.settings.profile.timezone.label')}>
                <Select
                  showSearch
                  value={profile?.timezone}
                  defaultValue={'Europe/London'}
                  onChange={(val) => handleInputChange({ timezone: val })}
                >
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
      )}
      {showAvatarUploader && (
        <AvatarUploader
          visible={showAvatarUploader}
          title={t('account.settings.profile.avatarupload.title')}
          onCreate={handleChangeImage}
          imageURL={userImage}
          onCancel={() => setShowAvatarUploader(false)}
        />
      )}
    </div>
  )
}

export default Profile
