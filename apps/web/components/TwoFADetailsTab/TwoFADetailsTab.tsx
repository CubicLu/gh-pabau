import { Notification, NotificationType, Security } from '@pabau/ui'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import {
  useGetCompanyDetails2faQuery,
  useUpdateCompanyDetails2faMutation,
} from '@pabau/graphql'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useUser } from '../../context/UserContext'

const TwoFADetailsTab = () => {
  const { me } = useUser()
  const { t } = useTranslationI18()
  const { data: twoFAdata, loading: twoFAloading } =
    useGetCompanyDetails2faQuery()

  const [updateCompanyDetails2faMutation] = useUpdateCompanyDetails2faMutation()
  const [twoFAstatus, setTwoFAstatus] = useState(0)

  useEffect(() => {
    if (!twoFAloading) {
      setTwoFAstatus(twoFAdata.me.Company.details.enable_2fa)
    }
  }, [twoFAloading, twoFAdata])

  const handleDisable2fa = async () => {
    try {
      await updateCompanyDetails2faMutation({
        variables: { company_id: me.company, enable_2fa: 0 },
      })
      setTwoFAstatus(0)
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
        variables: { company_id: me.company, enable_2fa: 1 },
      })
      setTwoFAstatus(1)
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
