import React, { FC, useState, useEffect } from 'react'
import { Modal, Tabs, Drawer, Skeleton } from 'antd'
import { useMedia } from 'react-use'
import Layout from '../../Layout/Layout'
import {
  Breadcrumb,
  Avatar,
  Button,
  PabauPlus,
  Notification as ResNotification,
  NotificationType,
} from '@pabau/ui'
import AvatarUploader from '../../../../web/components/Uploaders/AvatarUploader/AvatarUploader'
import { useTranslation } from 'react-i18next'
import styles from './UserDetail.module.less'
import { userDetail } from '../../../mocks/UserDetail'
import PersonalDetail from './PersonalDetail/PersonalDetail'
import Permission from './Permissions/Permissions'
import Document from './Documents/Documents'
import Service from './Services/Service'
import Performance from './Performance/Performance'
import Emergency from './Emergency/Emergency'
import CustomizeFields from './PersonalDetail/CustomizeFields'
import CommonHeader from '../../../components/CommonHeader'
import { LeftOutlined } from '@ant-design/icons'
import { getImage } from '../../../components/Uploaders/UploadHelpers/UploadHelpers'
import { useUpdateOneUserMutation } from '@pabau/graphql'
const { TabPane } = Tabs

export interface customFieldsProps {
  id: string
  label: string
  name?: string
  value?: string
  control?: string
  type?: string
  options?: string[]
  placeholder?: string
  helpTooltip?: string
}
export interface StaffDetails {
  firstname: string
  lastname: string
  staffTitle: string
  birthday?: Date
  mobilePhone: string
  email: string
  employmentStartDate?: Date
  otherLocations: number[]
  primaryLocation: number
  primaryLocationName: string
  image: string
  Location: string
  notes: string
}
export interface LocationDetails {
  id: number
  name: string
}
interface UserDetailsProps {
  personalData?: StaffDetails
  staffDataLoading?: boolean
  userId?: number
}
const Index: FC<UserDetailsProps> = ({
  personalData,
  staffDataLoading,
  userId,
}) => {
  const { t } = useTranslation('common')
  const { fields, graphData } = userDetail(t)
  const [tabKey, setTabKey] = useState<string>('1')
  const isMobile = useMedia('(max-width: 768px)')
  const [userImage, setUserImage] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [fieldsData, setFieldsData] = useState<customFieldsProps[]>(fields)
  const [personalDetails, setPersonalDetails] = useState<StaffDetails>()
  const fullName = `${personalData?.firstname ?? ''} ${
    personalData?.lastname ?? ''
  }`
  const [updateProfileMutation] = useUpdateOneUserMutation({
    onCompleted() {
      ResNotification(
        NotificationType.success,
        t('account.settings.response.notification.profilesection.success')
      )
    },
    onError() {
      ResNotification(
        NotificationType.error,
        t('account.settings.response.notification.error')
      )
    },
  })
  const handleSaveCustomFields = (field: customFieldsProps[]) => {
    setFieldsData(field)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleShowAvatarUploader = () => {
    setShowAvatarUploader(true)
  }
  const handleImage = (imageData) => {
    const { url, path } = imageData
    setUserImage(url)
    handleInputChange({ image: url })
    updateProfileMutation({
      variables: {
        where: { id: userId },
        data: {
          image: { set: path },
        },
      },
    })
  }
  const handleInputChange = (obj) => {
    if (personalDetails && Object.keys(personalDetails)?.length) {
      setPersonalDetails({ ...personalDetails, ...obj })
    }
  }
  const handleTabChange = (key: string) => {
    setTabKey(key)
  }
  useEffect(() => {
    if (personalData) {
      setPersonalDetails(personalData)
    }
    if (personalData?.image) {
      setUserImage(getImage(personalData?.image))
    }
  }, [personalData])
  return (
    <div className={styles.userDetailMain}>
      <Layout>
        <CommonHeader
          isLeftOutlined
          reversePath="/team/users"
          title={fullName}
        />
        <div className={styles.userDetailMainWrapper}>
          <div className={styles.userDetailWrapper}>
            <div className={styles.mobileUserHeader}>
              <LeftOutlined /> <h2>{fullName}</h2>
            </div>
            <div className={styles.userDetailHeader}>
              <div>
                <Breadcrumb
                  items={[
                    { breadcrumbName: 'Users', path: 'team/users' },
                    { breadcrumbName: fullName, path: '' },
                  ]}
                />
                <div className={styles.userHead}>
                  <div onClick={handleShowAvatarUploader}>
                    {staffDataLoading ? (
                      <Skeleton.Avatar
                        className={styles.skeletonIcon}
                        active={true}
                        size={54}
                      />
                    ) : (
                      <Avatar
                        name={fullName}
                        src={userImage}
                        size={54}
                        edit={true}
                      />
                    )}
                  </div>
                  <div className={styles.userHeadTitle}>
                    <h2>
                      {staffDataLoading ? (
                        <Skeleton.Input
                          active={true}
                          className={styles.skeletonName}
                        />
                      ) : (
                        fullName
                      )}
                    </h2>
                    <p>
                      {staffDataLoading ? (
                        <Skeleton.Input
                          active={true}
                          className={styles.skeletonJobTitle}
                        />
                      ) : (
                        personalData?.staffTitle ?? ''
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {tabKey === '1' && (
                <div className={styles.customizeBtn}>
                  <Button
                    className={styles.customizeFieldsBtn}
                    type={'primary'}
                    onClick={() => setShowModal(true)}
                  >
                    Customize fields
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.userDetailLeftTabs}>
            <Tabs
              tabPosition={isMobile ? 'top' : 'left'}
              onChange={handleTabChange}
            >
              <TabPane
                tab={<span>{t('team.user.personal.details.title')}</span>}
                key="1"
              >
                <PersonalDetail
                  t={t}
                  personalData={personalDetails}
                  field={fieldsData}
                  graphData={graphData}
                  staffDataLoading={staffDataLoading}
                />
              </TabPane>
              <TabPane
                tab={<span>{t('team.user.services.title')}</span>}
                key="2"
              >
                <Service />
              </TabPane>
              <TabPane tab={<span>Permissions</span>} key="3">
                <Permission />
              </TabPane>
              <TabPane tab={<span>Documents</span>} key="4">
                <Document />
              </TabPane>
              <TabPane tab={<span>Emergency</span>} key="5">
                <Emergency />
              </TabPane>
              <TabPane tab={<span>Training</span>} key="6">
                Content of Tab
              </TabPane>
              <TabPane
                tab={
                  <span>
                    Performance <PabauPlus label={'Plus'} modalType={'Staff'} />
                  </span>
                }
                key="7"
              >
                <Performance />
              </TabPane>
            </Tabs>
          </div>
          {tabKey === '1' && (
            <div className={styles.customizeMobileBtn}>
              <Button className={styles.customizeFieldsCancelBtn}>
                Cancel
              </Button>
              <Button
                className={styles.customizeFieldsBtn}
                type={'primary'}
                onClick={() => setShowModal(true)}
              >
                Customize fields
              </Button>
            </div>
          )}
        </div>
        {!isMobile ? (
          <Modal
            title={'Customize fields for all employees'}
            visible={showModal}
            footer={false}
            width={682}
            className={styles.customModal}
            onCancel={() => handleCloseModal()}
          >
            <CustomizeFields
              field={fieldsData}
              handleSaveCustomFields={handleSaveCustomFields}
              handleCloseModal={handleCloseModal}
            />
          </Modal>
        ) : (
          <Drawer
            placement={'bottom'}
            closable={false}
            onClose={handleCloseModal}
            visible={showModal}
            key={'drawer'}
            className={styles.drawer}
          >
            <div className={styles.line} onClick={handleCloseModal} />
            <CustomizeFields
              field={fieldsData}
              handleSaveCustomFields={handleSaveCustomFields}
              handleCloseModal={handleCloseModal}
              isMobile={isMobile}
            />
          </Drawer>
        )}

        {showAvatarUploader && (
          <AvatarUploader
            visible={showAvatarUploader}
            section={'avatar_photos'}
            type={'file_attachments'}
            title={t('team.user.personal.details.avtar.modal.title')}
            imageURL={userImage}
            width={400}
            height={400}
            successHandler={handleImage}
            onCancel={() => setShowAvatarUploader(false)}
          />
        )}
      </Layout>
    </div>
  )
}

export default Index
