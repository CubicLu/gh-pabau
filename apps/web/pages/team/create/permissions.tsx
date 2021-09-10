import React, { FC, useState } from 'react'
import {
  TabbedTable,
  Permission,
  ReportsPermissions,
  FeaturePermission,
  NotificationBanner,
} from '@pabau/ui'
import { Popover } from 'antd'
import {
  CheckCircleFilled,
  TeamOutlined,
  QuestionCircleOutlined,
  WalletOutlined,
  NotificationOutlined,
  RiseOutlined,
  LineChartOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
} from '@ant-design/icons'
import { useMedia } from 'react-use'
import {
  permissionData,
  permissionRoleData,
  reportPermissionData,
  permissions,
  featurePermissionDta,
} from '../../../mocks/CreateUser'
import styles from './permissions.module.less'
import classNames from 'classnames'
import createBannerPageImage from '../../../assets/images/createBannerPageImage.svg'

export interface ContainerType {
  name: string
  value: boolean
  key: number
}
export interface PermissionFieldType {
  name: string
  description: string
  key: number
  container: ContainerType[]
}

export interface FeaturePermissionProps {
  id: string
  title: string
  subtitle: string
  permissionFields: PermissionFieldType[]
}

export interface PermissionsProps {
  fields?: PermissionFieldType[]
}

export const Permissions: FC<PermissionsProps> = () => {
  const [selectedRole, setSelectedRole] = useState('scheduler')
  const [hideBanner, setHideBanner] = useState(false)
  const [mainFields, setMainFields] =
    useState<PermissionFieldType[]>(permissionData)
  const [mainFeature, setFeature] =
    useState<FeaturePermissionProps[]>(featurePermissionDta)
  const [isVisible, setVisible] = useState(false)
  const isMobile = useMedia('(max-width: 767px)', false)

  const onChange = (index: number, ind: number) => {
    mainFields[index].container[ind].value =
      !mainFields[index].container[ind].value
    setMainFields([...mainFields])
  }

  const CheckAll = () => {
    for (const f of mainFields) {
      for (const data of f.container) {
        data.value = true
      }
    }
    setMainFields([...mainFields])
  }
  const UnCheckAll = () => {
    for (const f of mainFields) {
      for (const data of f.container) {
        data.value = false
      }
    }
    setMainFields([...mainFields])
  }

  const onFeaturesChange = (index: number, ind: number, rowId: string) => {
    const features = mainFeature
    features.map((thread) => {
      if (thread.id === rowId) {
        thread.permissionFields[index].container[ind].value =
          !thread.permissionFields[index].container[ind].value
      }
      return thread
    })
    setFeature([...features])
  }

  const FeaturesCheckAll = (rowId: string) => {
    const features = mainFeature
    features.map((thread) => {
      if (thread.id === rowId) {
        for (const f of thread.permissionFields) {
          for (const data of f.container) {
            data.value = true
          }
        }
      }
      return thread
    })
    setFeature([...features])
  }

  const FeaturesUnCheckAll = (rowId: string) => {
    const features = mainFeature
    features.map((thread) => {
      if (thread.id === rowId) {
        for (const f of thread.permissionFields) {
          for (const data of f.container) {
            data.value = false
          }
        }
      }
      return thread
    })
    setFeature([...features])
  }

  const onHandleVisible = (value: boolean) => {
    setVisible(value)
  }

  const RenderNotification = (): JSX.Element => {
    return (
      <div className={styles.deskTopViewNone}>
        <NotificationBanner
          title="Add 1 set to your plan"
          desc="Your monthly price will go up by $ 19 for 1 set added to your monthly plan."
          imgPath={createBannerPageImage}
          allowClose={true}
          setHide={[hideBanner, setHideBanner]}
          showPaymentButton={true}
          showEmail={true}
          showPaymentTitle="Add"
        />
      </div>
    )
  }

  const prepareContent = () => {
    return (
      <div className={styles.accessTooltip}>
        <h5>Access to</h5>
        <div className={styles.accessContent}>
          <WalletOutlined />
          <p>Financials</p>
        </div>
        <div className={styles.accessContent}>
          <ProfileOutlined />
          <p>Contacts</p>
        </div>
        <div className={styles.accessContent}>
          <NotificationOutlined />
          <p>Marketing</p>
        </div>
        <div className={styles.accessContent}>
          <RiseOutlined />
          <p>Leads</p>
        </div>
        <div className={styles.accessContent}>
          <LineChartOutlined />
          <p>Reports</p>
        </div>
        <div className={styles.accessContent}>
          <ShoppingCartOutlined />
          <p>Stock</p>
        </div>
        <div className={styles.accessContent}>
          <TeamOutlined />
          <p>Team</p>
        </div>
      </div>
    )
  }

  const CommonFeatures = (): JSX.Element => {
    return (
      <>
        <h4>Role</h4>
        <p>Choose which user group you wish to assign to William</p>
        <div className={styles.teamMate}>
          {permissionRoleData.map((item) => (
            <Popover
              content={prepareContent()}
              placement={isMobile ? 'bottomRight' : 'bottomLeft'}
              trigger={isMobile ? '' : 'hover'}
              key={item.key}
              overlayClassName={styles.popoverWrap}
            >
              <div
                className={
                  item.key === selectedRole
                    ? classNames(styles.teamWrap, styles.active)
                    : styles.teamWrap
                }
                onClick={() => setSelectedRole(item.key)}
                key={item.key}
              >
                <div className={styles.userInfo}>
                  <span className={styles.user}>
                    <TeamOutlined />{' '}
                  </span>
                  <h5>{item.name}</h5>
                </div>

                <div
                  className={
                    isVisible
                      ? classNames(styles.verify, styles.questionActive)
                      : styles.verify
                  }
                >
                  <Popover
                    content={prepareContent()}
                    placement={'bottomRight'}
                    trigger={'click'}
                    key={item.key}
                    onVisibleChange={(e) => onHandleVisible(e)}
                    overlayClassName={styles.popoverWrap}
                  >
                    <QuestionCircleOutlined />
                  </Popover>
                  <CheckCircleFilled />
                </div>
              </div>
            </Popover>
          ))}
        </div>
      </>
    )
  }
  const RenderModuleTab = (): JSX.Element => {
    return (
      <div className={styles.assignWrapper}>
        <RenderNotification />
        <CommonFeatures />
        <div className={styles.permissionContent}>
          <Permission
            title={'Permissions'}
            description={
              'Choose which permissions you wish to assign to William'
            }
            fields={permissionData}
            onChange={onChange}
            onCheckAllClicked={CheckAll}
            onUnCheckAllClicked={UnCheckAll}
          />
        </div>
      </div>
    )
  }

  const RenderFeaturesTab = (): JSX.Element => {
    return (
      <div className={styles.assignWrapper}>
        <RenderNotification />
        <CommonFeatures />
        <FeaturePermission
          feature={featurePermissionDta}
          onChange={onFeaturesChange}
          CheckAll={FeaturesCheckAll}
          UnCheckAll={FeaturesUnCheckAll}
        />
      </div>
    )
  }

  const RenderReportsTab = (): JSX.Element => {
    return (
      <div className={styles.assignWrapper}>
        <RenderNotification />
        <CommonFeatures />
        <ReportsPermissions
          pageTitle={'Role'}
          subTitle={'Choose which user group you wish to assign to William'}
          data={reportPermissionData}
          permissions={permissions}
        />
      </div>
    )
  }
  return (
    <div className={styles.permissionMainWrap}>
      <TabbedTable tabItems={['Modules', 'Features', 'Reports']}>
        <RenderModuleTab />
        <RenderFeaturesTab />
        <RenderReportsTab />
      </TabbedTable>
    </div>
  )
}

export default Permissions
