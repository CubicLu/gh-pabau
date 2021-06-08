import { Notification, NotificationType, Security } from '@pabau/ui'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import {
  useGetCompanyDetails2faQuery,
  useUpdateCompanyDetails2faMutation,
} from '@pabau/graphql'
import { useContext, useEffect, useState } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { UserContext } from '../../context/UserContext'

const TwoFADetailsTab = () => {
  const { me } = useContext(UserContext)
  const { t } = useTranslationI18()
  const {
    data: twoFAdata,
    loading: twoFAloading,
  } = useGetCompanyDetails2faQuery()

  const [updateCompanyDetails2faMutation] = useUpdateCompanyDetails2faMutation()
  const [twoFAstatus, setTwoFAstatus] = useState(false)

  useEffect(() => {
    if (!twoFAloading) {
      setTwoFAstatus(!!twoFAdata.company.details.enable_2fa)
    }
  }, [twoFAloading, twoFAdata])

  const handleDisable2fa = async () => {
    try {
      await updateCompanyDetails2faMutation({
        variables: { company_id: me.company.id, enable_2fa: 0 },
      })
      setTwoFAstatus(false)
      Notification(
        NotificationType.success,
        t('setup.business-details.2fa.update-success')
      )
    } catch (error) {
      Notification(NotificationType.error, error.toString())
    }
  }

  const handleEnable2fa = async () => {
    try {
      await updateCompanyDetails2faMutation({
        variables: { company_id: me.company.id, enable_2fa: 1 },
      })
      setTwoFAstatus(true)
      Notification(
        NotificationType.success,
        t('setup.business-details.2fa.update-success')
      )
    } catch (error) {
      Notification(NotificationType.error, error.toString())
    }
  }

  if (!twoFAloading) {
    return (
      <Security
        twoFAstatus={twoFAstatus}
        newButtonText={'Enable 2FA'}
        dangerButtonText={'Disable 2FA'}
        onDelete={handleDisable2fa}
        onOk={handleEnable2fa}
      />
    )
  }

  return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
}

export default TwoFADetailsTab
