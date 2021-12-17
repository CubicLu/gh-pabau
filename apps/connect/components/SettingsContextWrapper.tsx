import React, { FC } from 'react'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { LoadingOutlined } from '@ant-design/icons'
import { useGetCompanyBySlugQuery } from '@pabau/graphql'
import { SettingsContext } from '../context/settings-context'

const SettingsContextWrapper: FC = ({ children }) => {
  const router = useRouter()
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  console.log('Calling settings')
  const companySlug =
    typeof router.query.company_slug === 'object'
      ? router.query.company_slug[0]
      : router.query.company_slug

  const {
    loading: loadingSettings,
    error: errorSettings,
    data: csr,
  } = useGetCompanyBySlugQuery({
    variables: {
      slug: companySlug,
    },
    skip: !companySlug,
  })

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

  if (!companySlug || !csr || !csr.findFirstCompany || errorSettings) {
    return <p>Invalid online bookings URL</p>
  }

  const meta = []
  for (const m of csr?.findFirstCompany.CompanyMeta) {
    meta[m.meta_name] = m.meta_value
  }
  if (csr.findFirstCompany.remote_url === null) {
    meta['pod_url'] = 'https://crm.pabau.com'
  } else {
    meta['pod_url'] = csr.findFirstCompany.remote_url
  }

  return (
    <SettingsContext.Provider
      value={{
        ...csr.findFirstCompany,
        BookingSetting: { ...csr.findFirstCompany.BookingSetting[0] },
        BookitProGeneral: { ...csr.findFirstCompany.BookitProGeneral[0] },
        ...meta,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContextWrapper
