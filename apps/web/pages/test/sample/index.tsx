import { useEffect, useState } from 'react'
import CommonHeader from '../../../components/CommonHeader'
import Layout from '../../../components/Layout/Layout'
import { useRetrieveAuthenticatedUserQuery } from '@pabau/graphql'

export default function SamplePost() {
  const [name, setName] = useState<string>('')

  const { data } = useRetrieveAuthenticatedUserQuery({
    fetchPolicy: 'cache-first',
    errorPolicy: 'ignore',
    onError(e) {
      console.log('Silent error:', e)
    },
  })

  useEffect(() => {
    setName(data?.me.full_name)
  }, [data])

  return (
    <Layout>
      <CommonHeader title="Sample Post" isLeftOutlined reversePath="/setup" />

      <h1>Sample Post </h1>
      <h2>Logged in username {name}</h2>
    </Layout>
  )
}
