import React, { FC, useEffect, useState } from 'react'
import {
  FullScreenReportModal,
  OperationType as Operation,
  BasicModal,
  Employees,
  Employee,
  Button,
} from '@pabau/ui'
import { Formik } from 'formik'
import General from './General/index'
import { useTranslation } from 'react-i18next'
import styles from './LeadCreate.module.less'
import * as Yup from 'yup'

export interface LeadCreateProps {
  modalVisible?: boolean
  handleClose?: () => void
  selectTemplate?: string
  onSelectTemplate?: (string) => void
  searchText?: string
  onSearchTextChange?: (string) => void
}

export interface InitialDetailsDataProps {
  firstName: string
  lastName: string
  hearOption: string
  dateOfBirth: Date
  leadStage: string
  note: string
  email: string
  phoneNumber: string
  telePhone: string
  address: string
  country: string
  city: string
  postCode: string
  newsLetter: string
  sms: string
  postal: string
  phoneCalls: string
  procedureType: string
  treatmentInterestPage: string
  title: string
  keyword: string
}

const employeeList = [
  { name: 'Jessica Winter', selected: true },
  { name: 'Jeff Hackley', selected: false },
  { name: 'Alexander Wang', selected: false },
  { name: 'Linda Davis', selected: false },
  { name: 'William Tyson', selected: false },
  { name: 'Max Starck', selected: false },
  { name: 'Kyle Walsh', selected: false },
  { name: 'Owen Phillips', selected: false },
  { name: 'Aidan Kelly', selected: false },
  { name: 'Ewan Morgan', selected: false },
  { name: 'Jordan Martin', selected: false },
  { name: 'Grant Dudley', selected: false },
]

export const LeadCreate: FC<LeadCreateProps> = ({
  modalVisible = true,
  handleClose,
}) => {
  const [assigneeModalOpen, setAssigneeModalOpen] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])
  const [assigneeName, setAssigneeName] = useState('Jessica Winter')

  const { t } = useTranslation('common')

  useEffect(() => {
    setSelectedEmployees(
      employeeList.filter(
        (item) => item.name === assigneeName && item.selected === true
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAssigneeToggle = () => {
    setAssigneeModalOpen(!assigneeModalOpen)
    setSelectedEmployees(
      employeeList.filter((item) => item.name === assigneeName)
    )
  }

  const initialValues: InitialDetailsDataProps = {
    firstName: '',
    lastName: '',
    note: '',
    leadStage: '',
    hearOption: t('quickCreate.client.modal.general.hearOption.selectOption'),
    dateOfBirth: new Date(),
    email: '',
    phoneNumber: '',
    telePhone: '',
    address: '',
    country: '',
    city: '',
    postCode: '',
    newsLetter: '',
    sms: '',
    postal: '',
    phoneCalls: '',
    procedureType: '',
    treatmentInterestPage: '',
    title: '',
    keyword: '',
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required(
      t('quickCreate.validation.firstName.required')
    ),
    lastName: Yup.string().required(
      t('quickCreate.validation.lastName.required')
    ),
    hearOption: Yup.string().required(
      t('quickCreate.validation.hearOption.required')
    ),
    email: Yup.string()
      .email(t('quickCreate.validation.email.validate'))
      .required(t('quickCreate.validation.email.required')),
    address: Yup.string().required(
      t('quickCreate.validation.address.required')
    ),
    country: Yup.string().required(
      t('quickCreate.validation.country.required')
    ),
    city: Yup.string().required(t('quickCreate.validation.city.required')),
    postCode: Yup.string().required(
      t('quickCreate.validation.postCode.required')
    ),
    procedureType: Yup.string().required(
      t('quickCreate.validation.procedureType.required')
    ),
    treatmentInterestPage: Yup.string().required(
      t('quickCreate.validation.treatmentInterestPage.required')
    ),
    title: Yup.string().required(t('quickCreate.validation.title.required')),
    keyword: Yup.string().required(
      t('quickCreate.validation.keyword.required')
    ),
  })

  const handleSelectEmployees = (items: Employee[]) => {
    setSelectedEmployees(items)
  }

  const handleAddEmployee = () => {
    setAssigneeName(selectedEmployees[0].name)
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
        onSubmit={() => console.log('submitted')}
      >
        {({ setFieldValue, handleSubmit, values, isValid, dirty, errors }) => {
          return (
            <FullScreenReportModal
              title={t('quickCreate.lead.modal.newLead')}
              operations={[Operation.assignee, Operation.create]}
              visible={modalVisible}
              onBackClick={handleClose}
              createBtnText={t('quickCreate.client.modal.create')}
              subMenu={[t('quickCreate.lead.modal.tab.general')]}
              enableCreateBtn={isValid}
              onCreate={handleSubmit}
              assigneeTitle={t('quickCreate.lead.modal.newLead.assigneeTitle')}
              assigneeName={assigneeName}
              onAssigneeClick={handleAssigneeToggle}
            >
              {[
                <General
                  key={'general'}
                  values={initialValues}
                  setFieldValue={setFieldValue}
                />,
              ]}
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
