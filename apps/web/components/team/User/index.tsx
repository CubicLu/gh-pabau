import React, { FC, useState } from 'react'
import { Modal, Tabs, Drawer } from 'antd'
import { useMedia } from 'react-use'

import Layout from '../../Layout/Layout'
import {
  Breadcrumb,
  Avatar,
  Button,
  PabauPlus,
  AvatarUploader,
} from '@pabau/ui'
import styles from './UserDetail.module.less'
import { userDetail, fields, graphData } from '../../../mocks/UserDetail'
import PersonalDetail from './PersonalDetail/PersonalDetail'
import Permission from './Permissions/Permissions'
import Document from './Documents/Documents'
import Service from './Services/Service'
import Performance from './Performance/Performance'
import Emergency from './Emergency/Emergency'
import CustomizeFields from './PersonalDetail/CustomizeFields'
import AvatarImage from '../../../assets/images/avatar.png'
import { LeftOutlined } from '@ant-design/icons'
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

const Index: FC = () => {
  const [tabKey, setTabKey] = useState<string>('1')
  const isMobile = useMedia('(max-width: 768px)')
  const [userImage, setUserImage] = useState<string>(AvatarImage)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [fieldsData, setFieldsData] = useState<customFieldsProps[]>(fields)

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
        <div className={styles.userDetailMainWrapper}>
          <div className={styles.userDetailWrapper}>
            <div className={styles.mobileUserHeader}>
              <LeftOutlined /> <h2>{userDetail.name}</h2>
            </div>
            <div className={styles.userDetailHeader}>
              <div>
                <Breadcrumb
                  breadcrumbItems={[
                    { breadcrumbName: 'Users', path: 'team/users' },
                    { breadcrumbName: userDetail.name, path: '' },
                  ]}
                />
                <div className={styles.userHead}>
                  <div onClick={handleShowAvatarUploader}>
                    <Avatar src={userImage} size={'large'} edit={true} />
                  </div>
                  <div className={styles.userHeadTitle}>
                    <h2>{userDetail.name}</h2>
                    <p>{userDetail.post}</p>
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
              <TabPane tab={<span>Personal Details</span>} key="1">
                <PersonalDetail field={fieldsData} graphData={graphData} />
              </TabPane>
              <TabPane tab={<span>Services</span>} key="2">
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