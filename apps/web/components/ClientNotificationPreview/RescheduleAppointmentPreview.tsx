import { Appointment } from '@pabau/ui'
import React, { FC, useContext } from 'react'
import CustomTemplate from '../ClientNotification/CustomTemplate'
import { GlobalContext } from '../ClientNotification/Index'

interface P {
  requestConfirm?: boolean
  allowRescheduling?: boolean
  allowCancellation?: boolean
  displayPolicy?: boolean
  showService?: boolean
  showEmployeeName?: boolean
  selectLanguage: string
  backGroundColor?: string
  buttonColor?: string
  informationMessage?: string
  standardTapIndex?: string
  activeSocialIcons?: string[]
  addMedicalHisButton?: boolean
  medicalMessage?: string
}

const RescheduleAppointmentPreview: FC<P> = ({
  requestConfirm,
  allowRescheduling,
  allowCancellation,
  displayPolicy,
  showService,
  showEmployeeName,
  selectLanguage,
  informationMessage,
  backGroundColor,
  buttonColor,
  standardTapIndex,
  activeSocialIcons = [],
  addMedicalHisButton,
  medicalMessage,
}) => {
  const { t } = useContext(GlobalContext)
  return (
    <div>
      {standardTapIndex === 'standard' ? (
        <Appointment
          requestConfirm={requestConfirm}
          allowRescheduling={allowRescheduling}
          allowCancellation={allowCancellation}
          displayPolicy={displayPolicy}
          showService={showService}
          showEmployeeName={showEmployeeName}
          addMedicalHisButton={addMedicalHisButton}
          medicalMessage={
            medicalMessage ||
            `${t('notifications.clientNotification.medicalMessage')}`
          }
          selectLanguage={selectLanguage}
          backGroundColor={backGroundColor}
          buttonColor={buttonColor}
          informationMessage={informationMessage}
          standardTapIndex={standardTapIndex}
          activeSocialIcons={activeSocialIcons}
          type={'reschedule'}
          t={t}
        />
      ) : (
        <CustomTemplate
          backGroundColor={backGroundColor}
          selectLanguage={selectLanguage}
        />
      )}
    </div>
  )
}

export default RescheduleAppointmentPreview
