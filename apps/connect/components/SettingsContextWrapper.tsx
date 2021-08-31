import React, { FunctionComponent } from 'react'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { LoadingOutlined } from '@ant-design/icons'
import { useGetCompanyBySlugQuery } from '@pabau/graphql'
import { SettingsContext } from '../context/settings-context'

export interface Settings {
  company_id: number
}
const SettingsContextWrapper: FunctionComponent = ({ children }) => {
  const router = useRouter()

  const companySlug =
    typeof router.query.company_slug === 'object'
      ? router.query.company_slug[0]
      : router.query.company_slug

  const {
    loading: loadingSettings,
    error: errorSettings,
    data: companySettingsResult,
  } = useGetCompanyBySlugQuery({
    variables: {
      slug: 'nenad-clinic',
    },
  })

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  if (errorSettings) {
    console.error('SettingsContextWrapper error', errorSettings)
  }

  if (loadingSettings) {
    return (
      <Spin
        style={{
          position: 'absolute',
          margin: 'auto',
          left: '50%',
          top: '45%',
          textAlign: 'center',
        }}
        size={'large'}
        delay={0}
        spinning={true}
        indicator={antIcon}
      />
    )
  }

  if (!companySettingsResult === null) {
    return <div>Invalid Company</div>
  }

  return (
    <SettingsContext.Provider value={companySettingsResult?.findFirstCompany}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContextWrapper
