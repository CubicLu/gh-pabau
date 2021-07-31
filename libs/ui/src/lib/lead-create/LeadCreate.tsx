import React, { FC, useState } from 'react'
import {
  FullScreenReportModal,
  OperationType as Operation,
  BasicModal,
  Employees,
  Employee,
  Button,
  CustomFieldsProps,
  FieldSetting,
} from '@pabau/ui'
import { Formik } from 'formik'
import General from './General/index'
import { useTranslation } from 'react-i18next'
import styles from './LeadCreate.module.less'
import * as Yup from 'yup'
import { Dayjs } from 'dayjs'
import { CommonProps } from '../client-create/General'

export interface LeadStatusProps {
  id: number
  status_name: string
}

export interface LocationProps {
  id: number
  name: string
}

export interface LeadCreateProps {
  modalVisible?: boolean
  handleClose?: () => void
  selectTemplate?: string
  onSelectTemplate?: (string) => void
  searchText?: string
  onSearchTextChange?: (string) => void
  fieldsSettings?: FieldSetting[]
  employeeList: Employee[]
  salutationData?: CommonProps[]
  marketingSources?: CommonProps[]
  leadStatusData?: LeadStatusProps[]
  locationData?: LocationProps[]
  customFields?: CustomFieldsProps[]
  isFieldSettingLoading?: boolean
  isMarketingSourceLoading?: boolean
  isLocationLoading?: boolean
  isLeadStatusLoading?: boolean
  initialValues: InitialDetailsDataProps
  validationObject?: {
    [key: string]: Yup.AnyObjectSchema
  }
  handleSubmit?: (
    val,
    selectedEmployees: Employee[],
    resetForm?: () => void,
    setSelectedEmployees?: (
      value: ((prevState: Employee[]) => Employee[]) | Employee[]
    ) => void
  ) => void
}

export interface InitialDetailsDataProps {
  firstName: string
  lastName: string
  Salutation: string
  lead_source: number | undefined
  DOB: Dayjs | undefined
  leadStatus: number
  location: number
  note: string
  Email: string
  Description: string
  MailingStreet: string
  MailingProvince: string
  MailingCity: string
  MailingCountry: string
  MailingPostal: string
  Phone: string
  Mobile: string
  MarketingOptInEmail?: boolean
  MarketingOptInText?: boolean
  MarketingOptInPost?: boolean
  MarketingOptInPhone?: boolean
  [key: string]: string | number | Dayjs | boolean | undefined | null
}

export const LeadCreate: FC<LeadCreateProps> = ({
  modalVisible = true,
  handleClose,
  employeeList,
  fieldsSettings,
  initialValues,
  validationObject,
  handleSubmit,
  ...props
}) => {
  const [assigneeModalOpen, setAssigneeModalOpen] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])
  const { t } = useTranslation('common')

  const handleAssigneeToggle = () => {
    setAssigneeModalOpen(!assigneeModalOpen)
  }

  const validationSchema = Yup.object({
    ...validationObject,
  })

  const handleSelectEmployees = (items: Employee[]) => {
    setSelectedEmployees(items)
  }

  const handleAddEmployee = () => {
    setAssigneeModalOpen(!assigneeModalOpen)
  }

  const employeeData = () => {
    return employeeList.map((item) => {
      return item.name === selectedEmployees?.[0]?.name
        ? { ...item, selected: true }
        : { ...item, selected: false }
    })
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          setSubmitting(true)
          await handleSubmit?.(
            values,
            selectedEmployees,
            resetForm,
            setSelectedEmployees
          )
          setSubmitting(false)
        }}
      >
        {({ setFieldValue, handleSubmit, values, isSubmitting }) => {
          return (
            <FullScreenReportModal
              title={t('quickCreate.lead.modal.newLead')}
              operations={[Operation.assignee, Operation.create]}
              visible={modalVisible}
              onBackClick={handleClose}
              createBtnText={t('quickCreate.client.modal.create')}
              enableCreateBtn={!isSubmitting}
              onCreate={handleSubmit}
              assigneeTitle={t('quickCreate.lead.modal.newLead.assigneeTitle')}
              assigneeName={
                selectedEmployees.length > 0
                  ? selectedEmployees[0].name
                  : 'Automatic'
              }
              avatar={
                selectedEmployees.length > 0 ? selectedEmployees[0].avatar : ''
              }
              onAssigneeClick={handleAssigneeToggle}
            >
              <General
                key={'general'}
                values={values}
                setFieldValue={setFieldValue}
                fieldsSettings={fieldsSettings}
                {...props}
              />
            </FullScreenReportModal>
          )
        }}
      </Formik>
      <BasicModal
        title={t('quickCreate.lead.modal.general.addEmployee')}
        visible={assigneeModalOpen}
        onCancel={handleAssigneeToggle}
        destroyOnClose={true}
      >
        <Employees
          description={t('quickCreate.lead.modal.general.selectEmployee')}
          employees={employeeData()}
          onSelected={handleSelectEmployees}
          multiple={false}
        />
        <div className={styles.wrapButton}>
          <Button
            disabled={selectedEmployees.length <= 0}
            onClick={handleAddEmployee}
            type={'primary'}
            className={styles.addButton}
          >
            {t('quickCreate.lead.modal.general.addEmployee')}
          </Button>
        </div>
      </BasicModal>
    </>
  )
}

export default LeadCreate
