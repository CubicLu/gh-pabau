import React, { FC } from 'react'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { LoadingOutlined } from '@ant-design/icons'
import { useGetCompanyServerBySlugQuery } from '@pabau/graphql'

const CompanyServerWrapper: FC = ({ children }) => {
  const router = useRouter()
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  const companySlug =
    typeof router.query.company_slug === 'object'
      ? router.query.company_slug[0]
      : router.query.company_slug

  const { loading, error, data } = useGetCompanyServerBySlugQuery({
    variables: {
      slug: companySlug,
    },
    skip: !companySlug,
  })

  if (loading || error || !data) {
    return <div>Loading...</div>
  }

  sessionStorage.setItem('remoteurl', data.Public_CompanyServer.remote_url)

  if (loading) {
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

  if (!companySlug || !data) {
    return <p>Invalid online bookings URL</p>
  }

  return <div>{children}</div>
}

export default CompanyServerWrapper
