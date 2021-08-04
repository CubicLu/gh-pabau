  import { useGetReportByCodeQuery, useGetReportByIdQuery } from '@pabau/graphql'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout/Layout'

const reportPrefixes = new Set(['CO', 'FI', 'LE', 'MA', 'OT', 'ST', 'AD'])

export default function Report() {
  const router = useRouter()
  const { name } = router.query

  const report_id = typeof name === 'object' ? name[0] : name

  let searchingByID = true
  if (reportPrefixes.has(report_id?.substr(0, 2))) {
    searchingByID = false
  }

  const {
    loading: loadingI,
    error: errorI,
    data: dataI,
  } = useGetReportByIdQuery({
    variables: {
      id: Number.parseInt(report_id),
    },
    skip: !searchingByID,
  })

  const {
    loading: loadingC,
    error: errorC,
    data: dataC,
  } = useGetReportByCodeQuery({
    variables: {
      code: report_id,
    },
    skip: searchingByID,
  })

  if (errorC && errorI) return <Layout active={'reports'}>Error</Layout>
  if ((loadingC && loadingI) || (!dataC && !dataI))
    return <Layout active={'reports'}>Loading...</Layout>

  const report = searchingByID ? dataI.findFirstReport : dataC.findFirstReport

  return (
    name && (
      <Layout active="reports">
        <h1>{name}</h1>
        <p>report content page...</p>
      </Layout>
    )
  )
}
