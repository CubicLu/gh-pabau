import { BellOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import {
  Notification as ResNotification,
  NotificationType,
  TabMenu,
} from '@pabau/ui'
import { Button, Col, Row } from 'antd'
import React, { FC, useContext, useEffect, useState } from 'react'
import Notification from '../../../components/Account/Settings/Notifications'
import Profile from '../../../components/Account/Settings/Profile'
import Security from '../../../components/Account/Settings/Security'
import Layout from '../../../components/Layout/Layout'
import MobileHeader from '../../../components/MobileHeader'
import { UserContext } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import useWindowSize from '../../../hooks/useWindowSize'
import {
  GetProfileTabDocument,
  GetSecurityTabDocument,
  GetNotificationTabDocument,
  useGetProfileTabQuery,
  useGetSecurityTabQuery,
  useGetNotificationTabQuery,
  useGetNotificationsTypesQuery,
  useGetNotificationsDataQuery,
  GetNotificationsDataDocument,
  useAccountSettingsUserAlertsQuery,
  useUpdateOneUserMutation,
  useUpdateOneCmStaffGeneralMutation,
  useCreateOneUserAlertPermissionMutation,
  useUpdateOneUserAlertPermissionMutation,
  useCreateNotificationToggleMutation,
  useUpdateNotificationToggleMutation,
} from '@pabau/graphql'
import styles from './index.module.less'

const Index: FC = () => {
  const user = useContext(UserContext)
  const size = useWindowSize()
  const { t } = useTranslationI18()

  const [activeTab, setActiveTab] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [saveLoading, setSaveLoading] = useState(true)
  const [isPhoneValid, setIsPhoneValid] = useState(true)

  const [profileData, setProfileData] = useState(null)
  const [allAlerts, setAllAlerts] = useState(null)
  const [updatedAlerts, setUpdatedAlerts] = useState([])

  // These notification types are for pabau web notification alerts (General Section in Notification Tab)
  const [notificationTypes, setNotificationTypes] = useState(null)
  const [notificationToggles, setNotificationToggles] = useState(null)
  const [updatedNotificationToggles, setUpdatedNotificationToggles] = useState(
    []
  )
  const [updatedAppNotifications, setUpdatedAppNotification] = useState([])

  const [savedNotificationsCount, setSavedNotificationsCount] = useState(0)

  const { data, loading } = useGetProfileTabQuery({
    fetchPolicy: 'network-only',
  })
  const { data: securityTabData } = useGetSecurityTabQuery({
    fetchPolicy: 'network-only',
  })
  const { data: notificationTabData } = useGetNotificationTabQuery({
    fetchPolicy: 'network-only',
  })
  const { data: defaultAlertTypes } = useAccountSettingsUserAlertsQuery({
    fetchPolicy: 'network-only',
  })
  const { data: notificationsTypes } = useGetNotificationsTypesQuery({
    fetchPolicy: 'network-only',
  })
  const { data: notificationsData } = useGetNotificationsDataQuery({
    fetchPolicy: 'network-only',
    variables: {
      user: user?.me?.id,
    },
  })

  useEffect(() => {
    setSaveLoading(loading)
    if (!loading && data?.me) setIsLoading(false)
    setProfileData({
      ...data?.me,
      ...securityTabData?.me,
      ...notificationTabData?.me,
    })
    setAllAlerts(defaultAlertTypes?.findManyUserAlert)
    setNotificationTypes(notificationsTypes?.notification_types)
    setNotificationToggles(notificationsData?.notification_toggle)
  }, [
    data,
    loading,
    securityTabData,
    notificationTabData,
    defaultAlertTypes,
    notificationsTypes,
    notificationsData,
  ])

  const [updateProfileMutation] = useUpdateOneUserMutation({
    onCompleted() {
      setSaveLoading(false)
      ResNotification(
        NotificationType.success,
        t('account.settings.response.notification.profilesection.success')
      )
    },
    onError() {
      setSaveLoading(false)
      ResNotification(
        NotificationType.error,
        t('account.settings.response.notification.error')
      )
    },
  })
  const [updateCmStaffGeneralMutation] = useUpdateOneCmStaffGeneralMutation()

  const [createAlertMutation] = useCreateOneUserAlertPermissionMutation({
    onCompleted() {
      incrNotificationsSaveCounter()
    },
    onError() {
      incrNotificationsSaveCounter()
    },
  })
  const [updateAlertMutation] = useUpdateOneUserAlertPermissionMutation({
    onCompleted() {
      incrNotificationsSaveCounter()
    },
    onError() {
      incrNotificationsSaveCounter()
    },
  })

  const [createPabauNotificationToggle] = useCreateNotificationToggleMutation({
    onCompleted() {
      incrNotificationsSaveCounter()
    },
    onError() {
      incrNotificationsSaveCounter()
    },
  })
  const [updatePabauNotificationToggle] = useUpdateNotificationToggleMutation({
    onCompleted() {
      incrNotificationsSaveCounter()
    },
    onError() {
      incrNotificationsSaveCounter()
    },
  })

  const onSaveClick = () => {
    switch (activeTab) {
      case 0:
        saveProfileSection()
        break
      case 1:
        saveSecuritySection()
        break
      case 2:
        saveNotificationSection()
        break
      default:
        break
    }
  }

  const saveAvatarPhoto = (imgData) => {
    const data = { ...profileData }
    const variables = {
      where: { id: data?.id },
      data: {
        image: { set: imgData?.path },
      },
    }
    updateProfileMutation({
      variables: variables,
      refetchQueries: [{ query: GetProfileTabDocument }],
    })
  }

  const saveProfileSection = () => {
    if (!isPhoneValid) return
    setSaveLoading(true)
    const data = { ...profileData }

    const variables = {
      where: { id: data?.id },
      data: {
        image: { set: data?.image },
        email: { set: data?.email },
        signature: { set: data?.signature },
        full_name: {
          set: data?.CmStaffGeneral?.Fname + ' ' + data?.CmStaffGeneral?.Lname,
        },
        phone_number: { set: data?.phone_number },
        language: { set: data?.language },
        timezone: { set: data?.timezone },
      },
    }
    updateProfileMutation({
      variables: variables,
      refetchQueries: [{ query: GetProfileTabDocument }],
    })
    if (data?.CmStaffGeneral?.ID) {
      const cmStaffVariables = {
        where: { ID: data?.CmStaffGeneral?.ID },
        data: {
          Fname: { set: data?.CmStaffGeneral?.Fname },
          Lname: { set: data?.CmStaffGeneral?.Lname },
          Avatar: { set: data?.image },
          CellPhone: { set: data?.phone_number },
        },
      }
      updateCmStaffGeneralMutation({
        variables: cmStaffVariables,
        refetchQueries: [{ query: GetProfileTabDocument }],
      })
    }
  }

  const saveSecuritySection = () => {
    setSaveLoading(true)
    const data = { ...profileData }
    const variables = {
      where: { id: data?.id },
      data: {
        passcode: { set: data?.passcode },
      },
    }
    updateProfileMutation({
      variables: variables,
      refetchQueries: [{ query: GetSecurityTabDocument }],
    })
  }

  const saveNotificationSection = () => {
    const alerts = [...updatedAlerts]
    if (alerts?.length > 0) {
      for (const el of alerts) {
        setSaveLoading(true)
        if (el?.id) {
          const variables = {
            where: { id: el?.id },
            data: {
              ios_notification: { set: el?.ios_notification },
              sms_notification: { set: el?.sms_notification },
              email_notification: { set: el?.email_notification },
            },
          }
          updateAlertMutation({
            variables: variables,
            refetchQueries: [{ query: GetNotificationTabDocument }],
          })
        } else {
          const variables = {
            data: {
              Company: {},
              User: { connect: { id: user?.me?.id } },
              UserAlert: { connect: { id: el?.UserAlert?.id } },
              ios_notification: el?.ios_notification || 0,
              sms_notification: el?.sms_notification || 0,
              email_notification: el?.email_notification || 0,
              pabau_notification: el?.pabau_notification || 0,
            },
          }
          createAlertMutation({
            variables: variables,
            refetchQueries: [{ query: GetNotificationTabDocument }],
          })
        }
      }
    }
    const toggles = [...updatedNotificationToggles]
    if (toggles?.length > 0) {
      for (const el of toggles) {
        setSaveLoading(true)
        if (el?.id) {
          updatePabauNotificationToggle({
            variables: {
              id: el?.id,
              enabled: el?.enabled,
            },
            refetchQueries: [
              {
                query: GetNotificationsDataDocument,
                variables: {
                  user: user?.me?.id,
                },
              },
            ],
          })
        } else {
          createPabauNotificationToggle({
            variables: {
              ...el,
              user: user?.me?.id,
              company: user?.me?.company?.id,
            },
            refetchQueries: [
              {
                query: GetNotificationsDataDocument,
                variables: {
                  user: user?.me?.id,
                },
              },
            ],
          })
        }
      }
    }
    if (
      updatedAlerts?.length +
        updatedNotificationToggles?.length +
        updatedAppNotifications.length ===
        0 &&
      savedNotificationsCount === 0
    ) {
      setSaveLoading(false)
      ResNotification(
        NotificationType.success,
        t('account.settings.response.notification.updated')
      )
    }
  }

  const onAlertChange = (alertData) => {
    const userProfileAlerts = [...profileData?.UserAlertPermission]
    const index1 = userProfileAlerts?.findIndex(
      (el) => el?.UserAlert?.id === alertData?.UserAlert?.id
    )
    if (index1 !== -1) {
      userProfileAlerts.splice(index1, 1, alertData)
    } else {
      userProfileAlerts.push(alertData)
    }
    setProfileData({ ...profileData, UserAlertPermission: userProfileAlerts })

    const userAlerts = [...updatedAlerts]
    const index = userAlerts?.findIndex(
      (el) => el?.UserAlert?.id === alertData?.UserAlert?.id
    )
    if (index !== -1) {
      userAlerts.splice(index, 1, alertData)
    } else {
      userAlerts.push(alertData)
    }
    setUpdatedAlerts([...userAlerts])
    if (
      savedNotificationsCount !== 0 &&
      savedNotificationsCount > userAlerts?.length
    ) {
      setSavedNotificationsCount(savedNotificationsCount - userAlerts?.length)
    }
  }

  const onPabauWebChange = (data) => {
    const userPabauNotifications = notificationToggles
      ? [...notificationToggles]
      : []
    const updatedPabauToggles = updatedNotificationToggles
      ? [...updatedNotificationToggles]
      : []
    if (data?.notification_type) {
      const index = userPabauNotifications.findIndex(
        (el) => el?.notification_type === data?.notification_type
      )
      if (index !== -1) {
        userPabauNotifications.splice(index, 1, data)
      } else {
        userPabauNotifications.push(data)
      }

      const upIndex = updatedPabauToggles.findIndex(
        (el) => el?.notification_type === data?.notification_type
      )
      if (upIndex !== -1) {
        updatedPabauToggles.splice(upIndex, 1, data)
      } else {
        updatedPabauToggles.push(data)
      }
    }
    setUpdatedNotificationToggles(updatedPabauToggles)
    setNotificationToggles(userPabauNotifications)
    if (
      savedNotificationsCount !== 0 &&
      savedNotificationsCount > updatedPabauToggles?.length
    ) {
      setSavedNotificationsCount(
        savedNotificationsCount - updatedPabauToggles?.length
      )
    }
  }

  // This counter is for showing the notification when all the notifications permissions saved complete!
  const incrNotificationsSaveCounter = () => {
    const counter = savedNotificationsCount + 1
    setSavedNotificationsCount(counter)
    if (
      counter ===
      updatedAlerts?.length +
        updatedNotificationToggles?.length +
        updatedAppNotifications?.length
    ) {
      setSavedNotificationsCount(0)
      setUpdatedAlerts([])
      setUpdatedNotificationToggles([])
      setUpdatedAppNotification([])
      setSaveLoading(false)
      ResNotification(
        NotificationType.success,
        t('account.settings.response.notification.notificationsection.success')
      )
    }
  }

  return (
    <Layout {...user}>
      <div className={styles.mainPageWrapper}>
        <MobileHeader parent="/" title={t('account.settings.header')} />
        <Row className={styles.container}>
          {size.width > 767 && <Col span={size.width < 1024 ? 1 : 5}></Col>}
          <Col
            span={
              size.width < 1024 && size.width > 767
                ? 18
                : size.width > 767
                ? 14
                : 24
            }
          >
            <div className={styles.accountSettingWrapper}>
              {size.width > 767 && <h1>{t('account.settings.header')}</h1>}
              <TabMenu
                onChange={(tab) => setActiveTab(Number(tab))}
                tabPosition={size.width > 767 ? 'left' : 'top'}
                menuItems={[
                  <span key={'1'}>
                    <UserOutlined />
                    {t('account.settings.tab.header1')}
                  </span>,
                  <span key={'2'}>
                    <LockOutlined />
                    {t('account.settings.tab.header2')}
                  </span>,
                  <span key={'3'}>
                    <BellOutlined />
                    {t('account.settings.tab.header3')}
                  </span>,
                ]}
                className={styles.mainBody}
              >
                <Profile
                  loading={isLoading}
                  profileData={profileData}
                  onProfileChange={(data) => {
                    setProfileData(data)
                  }}
                  onAvatarChange={(data) => {
                    saveAvatarPhoto(data)
                  }}
                  setPhoneValid={(isValid) => setIsPhoneValid(isValid)}
                />
                <Security
                  loading={isLoading}
                  profile={profileData}
                  onSecurityChange={(passcode) => {
                    setProfileData({ ...profileData, passcode: passcode })
                  }}
                />
                <Notification
                  loading={isLoading}
                  allAlerts={allAlerts}
                  profileData={profileData}
                  onAlertChange={(data) => onAlertChange(data)}
                  pabauWebNotificationTypes={notificationTypes?.filter(
                    (el) => el.permission_type === 'general'
                  )}
                  pabauWebNotificationToggles={notificationToggles}
                  onPabauNotificationChange={(data) => onPabauWebChange(data)}
                />
              </TabMenu>
            </div>
          </Col>
          {size.width > 767 ? (
            <Col span={5}>
              <div className={styles.buttonWrapper}>
                <Button
                  loading={!isLoading && saveLoading}
                  disabled={isLoading}
                  className={styles.btnSave}
                  onClick={onSaveClick}
                >
                  {t('account.settings.save')}
                </Button>
              </div>
            </Col>
          ) : (
            <Row className={styles.accountMobileSave}>
              <div className={styles.btnSaveMobile}>
                <Button
                  loading={!isLoading && saveLoading}
                  disabled={isLoading}
                  type="primary"
                  onClick={onSaveClick}
                >
                  {t('account.settings.save')}
                </Button>
              </div>
            </Row>
          )}
        </Row>
      </div>
    </Layout>
  )
}

export default Index
