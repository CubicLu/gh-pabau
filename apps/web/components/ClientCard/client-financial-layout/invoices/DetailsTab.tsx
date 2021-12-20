import { useTranslation } from 'react-i18next'
import React, { FC, useEffect, useRef, useState } from 'react'
import { InvoiceProp } from './../ClientFinancialsLayout'
import styles from './Tabs.module.less'
import { DatePicker, Select, Button } from 'antd'
import { Form, Input } from 'formik-antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import { Formik } from 'formik'
import {
  useLocationsQuery,
  useIssuingCompaniesQuery,
  useGetInsurerContractsQuery,
  useGetClientAppointmentsQuery,
  SortOrder,
  useCheckInvoiceLazyQuery,
} from '@pabau/graphql'
import { DisplayDate, GetDateFormat } from '../../../../hooks/displayDate'
import dayjs from 'dayjs'

interface Invoice {
  invoice?: InvoiceProp
  toggleSaveBtn?: (e: boolean) => void
}

interface optionProp {
  key: number
  value: string
  date?: Date | string | number
  prefix?: string
  startingNumber?: number
}

const DetailsTab: FC<Invoice> = ({ invoice, toggleSaveBtn }) => {
  const detailsFormRef = useRef(null)
  const { t } = useTranslation('common')
  const { Option } = Select
  const { TextArea } = Input
  const [appointments, setAppointments] = useState<optionProp[]>([])
  const [locations, setLocations] = useState<optionProp[]>([])
  const [issuingCompanies, setIssuingCompanies] = useState<optionProp[]>([])
  const [contracts, setContracts] = useState<optionProp[]>([])
  const [invoicePrefix, setInvoicePrefix] = useState('')

  const { data: apppointmentData } = useGetClientAppointmentsQuery({
    variables: {
      take: 10,
      skip: 0,
      orderBy: SortOrder.Desc,
      contactId: invoice?.customer?.ID,
    },
  })

  const { data: locationData } = useLocationsQuery({
    variables: {
      isActive: 1,
      searchTerm: '',
      filter: {},
    },
  })

  const { data: issuingCompaniesData } = useIssuingCompaniesQuery()
  const { data: contractsData } = useGetInsurerContractsQuery({
    variables: {
      limit: 1000,
    },
  })

  useEffect(() => {
    if (apppointmentData) {
      const arr = apppointmentData.findManyBooking.map((e) => {
        return {
          key: e.id,
          date: e.start_date,
          value: `${e.service} /w ${e.CmStaffGeneral?.Fname} ${e.CmStaffGeneral?.Lname}`,
        }
      })
      setAppointments(arr)
    }
  }, [apppointmentData])

  useEffect(() => {
    if (locationData && locationData.findManyCompanyBranch.length > 0) {
      const arr = locationData.findManyCompanyBranch.map((e) => {
        return { key: e.id, value: e.name }
      })
      setLocations(arr)
    }
  }, [locationData])

  useEffect(() => {
    if (issuingCompaniesData) {
      const arr = issuingCompaniesData.findManyIssuingCompany.map((e) => {
        return {
          key: e.id,
          value: e.name,
          prefix: e.invoice_prefix,
          startingNumber: e.invoice_starting_number,
        }
      })
      setIssuingCompanies(arr)
    }
  }, [issuingCompaniesData])

  useEffect(() => {
    if (contractsData) {
      const arr = contractsData.contracts.map((e) => {
        return { key: e.id, value: e.name }
      })
      setContracts(arr)
    }
  }, [contractsData])

  const [checkInvoice] = useCheckInvoiceLazyQuery({
    onCompleted(response) {
      if (response !== null) {
        detailsFormRef.current.setFieldError(
          'invoice',
          t('ui.client-card-financial.invoice-no-warning')
        )
        toggleSaveBtn(false)
      }
    },
  })

  return (
    <div className={styles.detailsPage}>
      <div className={styles.detailsContainer}>
        <Formik
          innerRef={detailsFormRef}
          enableReinitialize
          initialValues={{
            invoice: invoice?.invoice_id,
            appointment: invoice?.booking ? invoice?.booking : null,
            date: invoice?.date,
            location: invoice?.location,
            issuingCompany: invoice?.issuingCompany,
            contract: invoice?.contract ? invoice.contract : null,
            issuedTo: invoice?.issuedTo,
            notes: invoice?.note,
          }}
          onSubmit={(values) => {
            console.log(values)
          }}
          render={({ setFieldValue, values }) => (
            <Form layout={'vertical'}>
              <Form.Item
                label={t('ui.client-card-financial.invoice-no')}
                name="invoice"
                initialValue={values.invoice}
                rules={[{ required: true }]}
              >
                <Input
                  name="invoice"
                  placeholder={t('ui.client-card-financial.invoice-no')}
                  size="large"
                  prefix={invoicePrefix ? invoicePrefix : false}
                  onChange={(e) => {
                    if (e.target.value !== invoice?.invoice_id) {
                      checkInvoice({
                        variables: {
                          customId: e.target.value,
                        },
                      })
                    } else {
                      detailsFormRef.current.setFieldError('invoice', false)
                      toggleSaveBtn(true)
                    }
                  }}
                />
              </Form.Item>
              {appointments.length > 0 && (
                <Form.Item
                  name="appointment"
                  label={t('ui.client-card-financial.appointment')}
                >
                  <Select
                    size={'large'}
                    value={values.appointment}
                    onChange={(e) => setFieldValue('appointment', e)}
                    placeholder={t(
                      'ui.client-card-financial.select-appointment'
                    )}
                    style={{ width: '100%' }}
                  >
                    {appointments.map((e) => {
                      return (
                        <Option key={e.key} value={e.key}>
                          {`${DisplayDate(
                            new Date(
                              dayjs(`${e.date}` as 'YYYYMMDDHHmmss').format(
                                'YYYY-MM-DD'
                              )
                            )
                          )} - ${e.value}`}
                        </Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              )}
              <Form.Item
                name="date"
                label={t('ui.client-card-financial.invoice-date')}
              >
                <DatePicker
                  size={'large'}
                  name="date"
                  style={{ width: '100%' }}
                  value={moment(values.date, GetDateFormat())}
                  format={GetDateFormat()}
                  onChange={(e) => setFieldValue('date', e)}
                />
              </Form.Item>
              <Form.Item
                name="location"
                label={t('ui.client-card-financial.location')}
              >
                <Select
                  size={'large'}
                  value={values.location}
                  onChange={(e) => setFieldValue('location', e)}
                  placeholder={t(
                    'ui.client-card-financial.location-placeholder'
                  )}
                  style={{ width: '100%' }}
                >
                  {locations.map((e) => {
                    return (
                      <Option key={e.key} value={e.key}>
                        {e.value}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
              {issuingCompanies.length > 0 && (
                <Form.Item
                  name="issuingCompany"
                  label={t('ui.client-card-financial.issuing-company')}
                >
                  <Select
                    size={'large'}
                    value={values.issuingCompany}
                    onChange={(e) => {
                      setFieldValue('issuingCompany', e)
                      if (e === invoice?.issuingCompany) {
                        setInvoicePrefix('')
                        setFieldValue('invoice', invoice?.invoice_id)
                        return
                      }
                      const selectedItem = issuingCompanies.find(
                        (f) => f.key === e
                      )
                      setInvoicePrefix(selectedItem.prefix)
                      setFieldValue('invoice', selectedItem.startingNumber + 1)
                    }}
                    placeholder={t(
                      'ui.client-card-financial.select-issuing-company'
                    )}
                    style={{ width: '100%' }}
                  >
                    {issuingCompanies.map((is) => {
                      return (
                        <Option key={is.key} value={is.key}>
                          {is.value}
                        </Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              )}
              {contracts.length > 0 && (
                <Form.Item
                  name="contract"
                  label={t('ui.client-card-financial.contract')}
                >
                  <Select
                    size={'large'}
                    value={values.contract}
                    onChange={(e) => setFieldValue('contract', e)}
                    placeholder={t('ui.client-card-financial.select-contract')}
                    style={{ width: '100%' }}
                  >
                    {contracts.map((is) => {
                      return (
                        <Option key={is.key} value={is.key}>
                          {is.value}
                        </Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              )}
              <div className={styles.issuedTo}>
                <p className={styles.label}>
                  {t('ui.client-card-financial.issued-to')}
                </p>
                <Button
                  type="primary"
                  block
                  size={'large'}
                  className={styles.issuedToBtn}
                >
                  {values.issuedTo}
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
                className={styles.invoiceNotesRow}
              >
                <TextArea
                  name="notes"
                  rows={4}
                  onChange={(e) => setFieldValue('notes', e.target.value)}
                  placeholder={t(
                    'ui.client-card-financial.invoice-notes-placeholder'
                  )}
                  value={values.notes}
                />
              </Form.Item>
            </Form>
          )}
        />
      </div>
    </div>
  )
}

export default DetailsTab
