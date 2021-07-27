import { useTranslation } from 'react-i18next'
import React, { FC } from 'react'
import { InvoiceProp } from './../ClientFinancialsLayout'
import styles from './Tabs.module.less'
import { Form, Input, DatePicker, Select, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import {
  financeInvIssuingCompanies,
  financeInvContracts,
  financeInvAppointment,
} from '../../../../pages/test/ClientCardMock'

interface Invoice {
  invoice?: InvoiceProp
}

const DetailsTab: FC<Invoice> = ({ invoice }) => {
  const { t } = useTranslation('common')
  const [form] = Form.useForm()
  const { Option } = Select
  const { TextArea } = Input

  return (
    <div className={styles.detailsPage}>
      <div className={styles.detailsContainer}>
        <Form
          form={form}
          initialValues={{
            invoice: invoice?.id,
          }}
          onValuesChange={() => console.log('onValuesChange')}
          layout={'vertical'}
        >
          <Form.Item label={t('ui.client-card-financial.invoice-no')}>
            <Input
              placeholder={t('ui.client-card-financial.invoice-no')}
              name="invoice"
              size={'large'}
              value={invoice?.id}
            />
          </Form.Item>
          <Form.Item label={t('ui.client-card-financial.appointment')}>
            <Select
              size={'large'}
              defaultValue={financeInvAppointment[0]['key']}
              onChange={() => console.log('handleChange')}
              placeholder={t('ui.client-card-financial.select-contract')}
              style={{ width: '100%' }}
            >
              {financeInvAppointment.map((is) => {
                return (
                  <Option key={is.key} value={is.key}>
                    {is.value}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label={t('ui.client-card-financial.invoice-date')}>
            <DatePicker
              onChange={() => {
                console.log('as')
              }}
              size={'large'}
              name="invoiceDate"
              style={{ width: '100%' }}
              value={moment(invoice?.date)}
            />
          </Form.Item>
          <Form.Item label={t('ui.client-card-financial.issuing-company')}>
            <Select
              size={'large'}
              defaultValue={financeInvIssuingCompanies[0]['key']}
              onChange={() => console.log('handleChange')}
              placeholder={t('ui.client-card-financial.select-issuing-company')}
              style={{ width: '100%' }}
            >
              {financeInvIssuingCompanies.map((is) => {
                return (
                  <Option key={is.key} value={is.key}>
                    {is.value}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label={t('ui.client-card-financial.contract')}>
            <Select
              size={'large'}
              defaultValue={financeInvContracts[0]['key']}
              onChange={() => console.log('handleChange')}
              placeholder={t('ui.client-card-financial.select-contract')}
              style={{ width: '100%' }}
            >
              {financeInvContracts.map((is) => {
                return (
                  <Option key={is.key} value={is.key}>
                    {is.value}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          <div className={styles.issuedTo}>
            <p className={styles.label}>
              {t('ui.client-card-financial.issued-to')}
            </p>
            <Button type="primary" block size={'large'}>
              {invoice?.issuedTo}
            </Button>
            <Button
              block
              size={'large'}
              onClick={() => console.log('Add Third Party')}
            >
              <PlusOutlined />
              {t('ui.client-card-financial.add-third-party')}
            </Button>
          </div>

          <Form.Item
            label={t('ui.client-card-financial.invoice-notes')}
            name="notes"
          >
            <TextArea rows={4} onChange={() => console.log('handleChange')} />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default DetailsTab
