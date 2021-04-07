import { useRouter } from 'next/router'
import Layout from '../../components/Layout/Layout'
import React from 'react'
import { useGetReportByIdQuery, useGetReportByCodeQuery } from '@pabau/graphql'

const reportPrefixes = new Set(['CO', 'FI', 'LE', 'MA', 'OT', 'ST'])

export default function Report() {
  const router = useRouter()
  const report_id =
    typeof router.query.id === 'object' ? router.query.id[0] : router.query.id

  let searchingByID = true
  if (reportPrefixes.has(report_id.substr(0, 2))) {
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
    skip: searchingByID,
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
    <Layout active="reports">
      <h1>{report.name}</h1>
    </Layout>
  )
}
