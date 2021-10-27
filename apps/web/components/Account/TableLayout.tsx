import React, { FC, useState, useEffect, useMemo, RefObject } from 'react'
import { Table, Pagination } from '@pabau/ui'
import { QueryResult } from '@apollo/client'
import { Dayjs } from 'dayjs'
import {
  CreditNotesQueryVariables,
  CreditNoteCountQueryVariables,
} from '@pabau/graphql'

export interface AccountTabProps {
  searchTerm: string
  selectedDates: Dayjs[]
  filterValue: FilterValueType
  selectedRange: string
  accountRef: RefObject<HTMLDivElement>
  companyCurrency: string
}

export interface PaginateDataType {
  total: number
  offset: number
  limit: number
  currentPage: number
  showingRecords: number
}

export interface FilterValueType {
  location: number
  issuingCompany: number
  creditNoteType: string
}

export interface QueryVariable {
  variables: CreditNotesQueryVariables
}

export interface AggregateQueryVariables {
  variables: CreditNoteCountQueryVariables
}

export interface TableLayoutProps {
  noDataText: string
  tabName: string
  columns?: Column[]
  searchTerm?: string
  selectedDates?: Dayjs[]
  filterValue?: FilterValueType
  selectedRange?: string
  listQuery?: (variable: QueryVariable) => QueryResult
  aggregateQuery?: (variable: AggregateQueryVariables) => QueryResult
  setIsHealthcodeEnabled?: (value: boolean) => void
  accountRef: RefObject<HTMLDivElement>
}
interface Column {
  title: string
  dataIndex: string
  className?: string
  visible?: boolean
  width?: string
  skeletonWidth?: string
}
const TableLayout: FC<TableLayoutProps> = ({
  columns,
  searchTerm,
  selectedDates,
  filterValue,
  selectedRange,
  listQuery,
  aggregateQuery,
  noDataText,
  tabName,
  setIsHealthcodeEnabled,
  accountRef,
}) => {
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const [tableData, setTableData] = useState([])
  const [aggregateCount, setAggregateCount] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const resetPagination = () => {
    setPaginateData({
      total: 0,
      offset: 0,
      limit: 50,
      currentPage: 1,
      showingRecords: 0,
    })
  }

  useEffect(() => {
    resetPagination()
  }, [searchTerm, selectedDates, filterValue])

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        searchTerm: '%' + searchTerm + '%',
        offset: paginateData.offset,
        limit: paginateData.limit,
        startDate: selectedDates?.[0].format('YYYY-MM-DD'),
        endDate: selectedDates?.[1].format('YYYY-MM-DD'),
        locationId: filterValue?.location,
        issuingCompanyId: filterValue?.issuingCompany,
        creditNoteType: filterValue?.creditNoteType,
      },
    }
    if (filterValue?.location === 0) {
      delete queryOptions.variables.locationId
    }
    if (filterValue?.issuingCompany === 0) {
      delete queryOptions.variables.issuingCompanyId
    }
    if (filterValue?.creditNoteType === '') {
      delete queryOptions.variables.creditNoteType
    }

    if (selectedRange === 'All records') {
      delete queryOptions.variables.startDate
      delete queryOptions.variables.endDate
    }
    return queryOptions
  }, [
    searchTerm,
    paginateData.offset,
    paginateData.limit,
    selectedDates,
    filterValue,
    selectedRange,
  ])

  const getAggregateQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        searchTerm: '%' + searchTerm + '%',
        startDate: selectedDates?.[0].format('YYYY-MM-DD'),
        endDate: selectedDates?.[1].format('YYYY-MM-DD'),
        locationId: filterValue?.location,
        issuingCompanyId: filterValue?.issuingCompany,
        creditNoteType: filterValue?.creditNoteType,
      },
    }
    if (filterValue?.location === 0) {
      delete queryOptions.variables.locationId
    }
    if (filterValue?.issuingCompany === 0) {
      delete queryOptions.variables.issuingCompanyId
    }
    if (filterValue?.creditNoteType === '') {
      delete queryOptions.variables.creditNoteType
    }
    if (selectedRange === 'All records') {
      delete queryOptions.variables.startDate
      delete queryOptions.variables.endDate
    }
    return queryOptions
  }, [searchTerm, selectedDates, filterValue, selectedRange])

  const { data, loading } = listQuery(getQueryVariables)
  const { data: aggregateData } = aggregateQuery(getAggregateQueryVariables)

  useEffect(() => {
    if (loading) {
      setIsLoading(true)
    }
    if (data && !loading) {
      const tableRecords = data?.[Object.keys(data)[0]]
      const records = tableRecords?.map((d) => ({ ...d, key: d.id }))
      setTableData(records)
      if (
        (tabName === 'invoice' || tabName === 'debt') &&
        tableRecords?.[0]?.isHealthcodeEnabled
      ) {
        setIsHealthcodeEnabled(true)
      }
      setIsLoading(false)
    }
  }, [data, loading, setIsHealthcodeEnabled, tabName])

  useEffect(() => {
    if (aggregateData) {
      const count = aggregateData?.[Object.keys(aggregateData)[0]]
      setAggregateCount(count)
    }
  }, [aggregateData])

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData((d) => ({ ...d, offset, currentPage }))
  }

  useEffect(() => {
    if (aggregateCount !== undefined) {
      setPaginateData((paginateData) => ({
        ...paginateData,
        total: aggregateCount ?? 0,
        showingRecords: tableData?.length,
      }))
    }
  }, [tableData, aggregateCount])

  useEffect(() => {
    if (accountRef.current) {
      accountRef.current.scrollIntoView({ behavior: 'auto' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginateData.currentPage, paginateData.limit])

  return (
    <section>
      <div>
        <Table
          columns={columns}
          style={{ height: '100%' }}
          sticky={{ offsetHeader: 70, offsetScroll: 0 }}
          scroll={{ x: 'max-content' }}
          key={loading?.toString()}
          loading={isLoading}
          pagination={false}
          dataSource={tableData}
          searchTerm={searchTerm}
          noDataText={noDataText}
        />
      </div>
      <Pagination
        showingRecords={paginateData.showingRecords}
        defaultCurrent={1}
        total={paginateData.total}
        pageSize={paginateData.limit}
        current={paginateData.currentPage}
        onChange={onPaginationChange}
        pageSizeOptions={['10', '25', '50', '100']}
        onPageSizeChange={(pageSize) => {
          setPaginateData({
            ...paginateData,
            limit: pageSize,
            offset: 0,
            currentPage: 1,
          })
        }}
      />
    </section>
  )
}

export default TableLayout
