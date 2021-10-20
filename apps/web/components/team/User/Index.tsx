import React, { FC, useState } from 'react'
import { Modal, Tabs, Drawer, Skeleton } from 'antd'
import { useMedia } from 'react-use'

import Layout from '../../Layout/Layout'
import {
  Breadcrumb,
  Avatar,
  Button,
  PabauPlus,
  AvatarUploader,
} from '@pabau/ui'
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
import AvatarImage from '../../../assets/images/avatar.png'
import { LeftOutlined } from '@ant-design/icons'
import { getImage } from '../../../components/Uploaders/UploadHelpers/UploadHelpers'
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
}
const Index: FC<UserDetailsProps> = ({ personalData, staffDataLoading }) => {
  const { t } = useTranslation('common')
  const { fields, graphData } = userDetail(t)
  const [tabKey, setTabKey] = useState<string>('1')
  const isMobile = useMedia('(max-width: 768px)')
  const [userImage, setUserImage] = useState<string>(AvatarImage)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [fieldsData, setFieldsData] = useState<customFieldsProps[]>(fields)
  const fullName = `${personalData?.firstname ?? ''} ${
    personalData?.lastname ?? ''
  }`

  const handleSaveCustomFields = (field: customFieldsProps[]) => {
    setFieldsData(field)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleShowAvatarUploader = () => {
    setShowAvatarUploader(true)
  }

  const handleChangeImage = (image: string) => {
    setUserImage(image)
  }

  const handleTabChange = (key: string) => {
    setTabKey(key)
  }
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
                        size={'large'}
                      />
                    ) : (
                      <Avatar
                        src={
                          personalData?.image
                            ? getImage(personalData?.image)
                            : userImage
                        }
                        size={'large'}
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
                  personalData={personalData}
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

        <AvatarUploader
          visible={showAvatarUploader}
          title={'Edit Photo'}
          imageURL={AvatarImage}
          onCreate={handleChangeImage}
          onCancel={() => setShowAvatarUploader(false)}
        />
      </Layout>
    </div>
  )
}

export default Index
