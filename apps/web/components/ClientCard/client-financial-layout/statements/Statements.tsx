import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Pagination } from '@pabau/ui'
import styles from './Statements.module.less'
import { ClientFinancialsLayoutProps } from './../ClientFinancialsLayout'
import {
  Button,
  Modal,
  Row,
  Col,
  DatePicker,
  Typography,
  Select,
  Checkbox,
} from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import InvoiceFooter from './../invoices/invoice-footer/InvoiceFooter'
import { financeInvIssuingCompanies } from '../../../../pages/test/ClientCardMock'

interface LocationOptionProp {
  key: number
  value: string
}

interface P {
  dataProps: ClientFinancialsLayoutProps
  locationOptions: LocationOptionProp[]
}

export const Statements: FC<P> = (props) => {
  const { dataProps, locationOptions } = props
  const { totalPayments, totalInvoiced, totalBalance } = dataProps
  const [statements, setStatements] = useState(dataProps.statements)
  const { Text } = Typography
  const { Option } = Select
  const { t } = useTranslation('common')
  const [showCreateStatementModal, setShowCreateStatementModal] = useState(
    false
  )
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [location, setLocation] = useState('')
  const [issuingCompany, setIssuingCompany] = useState('')
  const [showOutstandings, setShowOutstandings] = useState(false)

  const columns = [
    {
      title: t('ui.client-card-financial.statements.ref-no'),
      dataIndex: 'refNo',
      className: 'columnTitle',
      width: 100,
      visible: true,
      render: function renderItem(value) {
        return <span className={styles.primaryText}>#{value}</span>
      },
    },
    {
      title: t('ui.client-card-financial.statements.statement-date'),
      dataIndex: 'startDate',
      visible: true,
      width: 80,
      render: function renderItem(value, row) {
        return `${value} - ${row.endDate}`
      },
    },
    {
      title: t('ui.client-card-financial.statements.issued-to'),
      dataIndex: 'issuedTo',
      visible: true,
      width: 150,
    },
    {
      title: t('ui.client-card-financial.statements.location'),
      dataIndex: 'location',
      visible: true,
      width: 80,
    },
  ]

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  const onPressCreateStatement = () => {
    setStatements([
      ...statements,
      {
        endDate: toDate,
        id: statements.length + 1,
        issuedTo: issuingCompany,
        location: location,
        refNo: 918715,
        startDate: fromDate,
      },
    ])
    setShowCreateStatementModal(false)
  }

  return (
    <>
      <Modal
        title={t(
          'ui.client-card-financial.statements.create-account-statement'
        )}
        visible={showCreateStatementModal}
        footer={false}
        onCancel={() => setShowCreateStatementModal(false)}
        wrapClassName={styles.createStatementModal}
      >
        <Row gutter={24}>
          <Col span={12}>
            <span className={styles.label}>
              {t('ui.client-card-financial.statements.from')}
            </span>
            <DatePicker
              style={{ width: '100%' }}
              onChange={(date, dateString) => {
                console.log(date)
                setFromDate(dateString)
              }}
            />
          </Col>
          <Col span={12}>
            <span className={styles.label}>
              {t('ui.client-card-financial.statements.to')}
            </span>
            <DatePicker
              style={{ width: '100%' }}
              onChange={(date, dateString) => {
                console.log(date)
                setToDate(dateString)
              }}
            />
          </Col>
        </Row>
        <div className={styles.createStatementRow}>
          <Text>{t('ui.client-card-financial.statements.location')}</Text>
          <Select
            showSearch
            style={{ width: '100%' }}
            onChange={(e) => setLocation(e.toString())}
            placeholder={t(
              'ui.client-card-financial.statements.location.placeholder'
            )}
          >
            <Option value="All">
              {t('ui.client-card-financial.invoices.all')}
            </Option>
            {locationOptions.map((e, i) => {
              return (
                <Option value={e.value} key={i}>
                  {e.value}
                </Option>
              )
            })}
          </Select>
        </div>
        <div className={styles.createStatementRow}>
          <Text>
            {t('ui.client-card-financial.statements.issuing-company')}
          </Text>
          <Select
            showSearch
            style={{ width: '100%' }}
            onChange={(e) => setIssuingCompany(e.toString())}
            placeholder={t(
              'ui.client-card-financial.statements.issuing-company.placeholder'
            )}
          >
            <Option value="All">
              {t('ui.client-card-financial.invoices.all')}
            </Option>
            {financeInvIssuingCompanies.map((is) => {
              return (
                <Option key={is.key} value={is.key}>
                  {is.value}
                </Option>
              )
            })}
          </Select>
        </div>
        <div className={styles.createStatementRow}>
          <Checkbox
            checked={showOutstandings}
            onChange={(e) => setShowOutstandings(e.target.checked)}
          >
            {t(
              'ui.client-card-financial.statements.show-outstanding-invoices-only'
            )}
          </Checkbox>
        </div>
        <div className={styles.createStatementBtnRow}>
          <Button
            type="primary"
            disabled={
              fromDate && toDate && location && issuingCompany ? false : true
            }
            onClick={onPressCreateStatement}
          >
            {t('ui.client-card-financial.statements.create')}
          </Button>
        </div>
      </Modal>

      <div className={styles.financialItems}>
        <div className={styles.filterRow} style={{ alignItems: 'center' }}>
          <Button
            type="primary"
            size={'small'}
            onClick={() => setShowCreateStatementModal(true)}
          >
            {t('ui.client-card-financial.statements.new-statement')}
          </Button>
          <div className={styles.filter}>
            <FilterOutlined />
          </div>
        </div>
        <div style={{ minHeight: 'calc(100vh - 245px)' }}>
          <Table
            loading={false}
            draggable={false}
            scroll={{ x: true }}
            dataSource={statements?.map((e: { id }) => ({
              key: e.id,
              ...e,
            }))}
            columns={columns}
            noDataText={t('ui.client-card-financial.items')}
          />
          <div className={styles.pagination}>
            <Pagination
              total={paginateData.total}
              defaultPageSize={10}
              showSizeChanger={false}
              onChange={onPaginationChange}
              pageSize={paginateData.limit}
              current={paginateData.currentPage}
              showingRecords={paginateData.showingRecords}
            />
          </div>
        </div>

        <InvoiceFooter
          buttons={[
            {
              text: t('ui.client-card-financial.payments.total-payments'),
              value: totalPayments,
            },
            {
              text: t('ui.client-card-financial.total-invoiced'),
              value: totalInvoiced,
            },
            {
              text: t('ui.client-card-financial.statements.balance'),
              value: totalBalance,
            },
          ]}
          loading={false}
        />
      </div>
    </>
  )
}
