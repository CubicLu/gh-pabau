import React, { useState } from 'react'
import { userDetail } from '../../../../mocks/UserDetail'
import {
  ReportProps,
  PeerFeedback,
  BasicModal,
  Employees,
  Button,
  Employee,
} from '@pabau/ui'
import styles from './Performance.module.less'
import { useTranslation } from 'react-i18next'

const PeerFeedbackTab = () => {
  const { t } = useTranslation('common')
  const { performancePeerFeedback: performance } = userDetail(t)
  const [reports, setReports] = useState<ReportProps[]>(performance.reports)
  const [showRemindModal, setShowRemindModal] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRemindEmployees, setSelectedRemindEmployees] = useState<
    Employee[]
  >()

  const onReportDelete = (reportId: number) => {
    const newReports: ReportProps[] = reports.filter(
      (thread) => thread.id !== reportId
    )
    setReports([...newReports])
  }

  const handleShowRemindModal = () => {
    setShowRemindModal(true)
  }

  const handleSelectEmployees = (items: Employee[]) => {
    setSelectedRemindEmployees(items)
  }

  const handleRemindEmployees = () => {
    setShowRemindModal(false)
  }

  return (
    <div>
      <PeerFeedback
        title={'Yearly appraisal 2017'}
        users={performance.users}
        lastSendOut={performance.lastSendOut}
        reviewDate={performance.reviewDate}
        reviewFilled={performance.reviewFilled}
        filled={performance.filled}
        reviewData={performance.reviewData}
        employees={performance.employees}
        reports={reports}
        onReportDelete={onReportDelete}
        onRemindClick={handleShowRemindModal}
      />
      <BasicModal
        title={'Quarterly Appraisal'}
        visible={showRemindModal}
        onCancel={() => setShowRemindModal(false)}
      >
        <div className={styles.remindModal}>
          <Employees
            description={
              'Select which colleagues you wish to remind to complete the review.'
            }
            employees={performance.remindEmployees}
            onSelected={handleSelectEmployees}
          />
          <div className={styles.btnRemind}>
            <Button
              type={'primary'}
              size={'large'}
              onClick={handleRemindEmployees}
            >
              Remind
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}

export default PeerFeedbackTab
