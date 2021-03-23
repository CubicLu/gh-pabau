import React, {
  FC,
  useState,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from 'react'
import { ClientNotification, Standard, Appointment, Smstext } from '@pabau/ui'
import CancelAppointmentPreview from '../ClientNotificationPreview/CancelAppointmentPreview'
import NoShowAppointmentPreview from '../ClientNotificationPreview/NoShowAppointmentPreview'
import NewAppointmentPreview from '../ClientNotificationPreview/NewAppointmentPreview'
import RescheduleAppointmentPreview from '../ClientNotificationPreview/RescheduleAppointmentPreview'
import BookedOntoClassPreview from '../ClientNotificationPreview/BookedOntoClassPreview'
import WaitListPreview from '../ClientNotificationPreview/WaitListPreview'
import MedicalFormsPreview from '../ClientNotificationPreview/MedicalFormsPreview'
import InvoicePreview from '../ClientNotificationPreview/InvoicePreview'
import OutstandingInvoicePreview from '../ClientNotificationPreview/OutstandingInvoicePreview'
import BirthdayPreview from '../ClientNotificationPreview/BirthdayPreview'
import PackageSessionPreview from '../ClientNotificationPreview/PackageSessionPreview'
import ClassSpotAvailablePreview from '../ClientNotificationPreview/ClassSpotAvailablePreview'
import GiftVoucherPreview from '../ClientNotificationPreview/GiftVouchersPreview'
import RequestFeedbackPreview from '../ClientNotificationPreview/RequestFeedbackPreview'
import ConnectRegistrationPreview from '../ClientNotificationPreview/ConnectRegistrationPreview'
import LeadResponsesPreview from '../ClientNotificationPreview/LeadResponsesPreview'
import ReferralPreview from '../ClientNotificationPreview/ReferralPreview'
import DocumentSharedPreview from '../ClientNotificationPreview/DocumnetSharedPreview'

interface refProps {
  propsData?: () => DataProps
}

interface DataProps {
  requestConfirm?: boolean
  allowRescheduling?: boolean
  allowCancellation?: boolean
  displayPolicy?: boolean
  showService?: boolean
  showEmployeeName?: boolean
  addMedicalHisButton?: boolean
  selectLanguage?: string
  backGroundColor?: string
  buttonColor?: string
  informationMessage?: string
  medicalMessage?: string
  standardTapIndex?: string
  activeSocialIcons?: string[]
}

interface P {
  onSeletedTab: (number) => void
  isTabComponent?: boolean
  isPreviewComponent?: boolean
  isSmsComponent?: boolean
  displayRadioGroup?: boolean
  displayButtons?: boolean
  ref?: ForwardedRef<refProps>
  standardMessage?: string
  hideReminderTimeFrameTabPane?: boolean
  hideReminderSettingTabPane?: boolean
  hideRequestConfirmationOption?: boolean
  hideMedicalHistoryOption?: boolean
  hideAllowReschedulingOption?: boolean
  hideAllowCancellationOption?: boolean
  hideDisplayPolicyOption?: boolean
  hideServiceOption?: boolean
  hideEmployeeNameOption?: boolean
  type?: string
  smsCustom?: string
  hideEnablePay?: boolean
}

// eslint-disable-next-line react/display-name
const Index: FC<P> = forwardRef(
  (
    {
      onSeletedTab,
      standardMessage,
      hideReminderTimeFrameTabPane = false,
      hideRequestConfirmationOption = false,
      hideMedicalHistoryOption = false,
      hideAllowReschedulingOption = false,
      hideAllowCancellationOption = false,
      hideDisplayPolicyOption = false,
      hideServiceOption = false,
      hideEmployeeNameOption = false,
      hideReminderSettingTabPane = true,
      type = '',
      smsCustom = '',
      isTabComponent = true,
      isPreviewComponent = true,
      isSmsComponent = true,
      displayRadioGroup = true,
      displayButtons = true,
      hideEnablePay = true,
    },
    ref
  ) => {
    const [enableReminder, setEnableReminder] = useState(false)
    const [smartDelivery, setSmartDelivery] = useState(false)
    const [smartFramework, setSmartFramework] = useState(false)
    const [requestConfirmation, setRequestConfirmation] = useState(true)
    const [allowRescheduling, setAllowRescheduling] = useState(true)
    const [allowCancellation, setAllowCancellation] = useState(true)
    const [displayPolicy, setDisplayPolicy] = useState(true)
    const [showService, setShowService] = useState(true)
    const [showEmployeeName, setShowEmployeeName] = useState(true)
    const [showEnablePay, setShowEnablePay] = useState(true)
    const [addMedicalHisButton, setAddMedicalHisButton] = useState(true)
    const [backGroundColor, setBackGroundColor] = useState('')
    const [buttonColor, setButtonColor] = useState('')
    const [selectLanguage, setSelectLanguage] = useState('en')
    const [medicalMessage, setMedicalMessage] = useState('')
    const [informationMessage, setInformationMessage] = useState('')
    const [standardTapIndex, setStandardTap] = useState('1')
    const [hideAppearanceTabPane, setHideAppearanceTabPane] = useState(true)
    const [smsMessage, setSmsMessage] = useState(smsCustom || 'Hi, Kristy')

    const [activeSocialIcons, setActiveSocialIcons] = useState([])
    const [disableCustomTab, setDisableCustomTab] = useState(false)

    useImperativeHandle(ref, () => ({
      propsData: () => {
        return {
          requestConfirm: requestConfirmation,
          allowRescheduling,
          allowCancellation,
          displayPolicy,
          showService,
          showEmployeeName,
          addMedicalHisButton,
          selectLanguage,
          backGroundColor,
          buttonColor,
          informationMessage,
          medicalMessage,
          standardTapIndex,
          activeSocialIcons,
        }
      },
    }))
    function handleSelectedTab(value) {
      onSeletedTab(value)
    }

    const preview = () => {
      switch (type) {
        case 'cancel':
        case 'cancelClassBooking':
          return (
            <CancelAppointmentPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              showService={showService}
              showEmployeeName={showEmployeeName}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              type={type}
            />
          )
        case 'noShowAppointment':
        case 'missedAClass':
          return (
            <NoShowAppointmentPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
            />
          )
        case 'newAppointment':
          return (
            <NewAppointmentPreview
              requestConfirm={requestConfirmation}
              allowRescheduling={allowRescheduling}
              allowCancellation={allowCancellation}
              addMedicalHisButton={addMedicalHisButton}
              medicalMessage={medicalMessage}
              displayPolicy={displayPolicy}
              showService={showService}
              showEmployeeName={showEmployeeName}
              selectLanguage={selectLanguage}
              backGroundColor={backGroundColor}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              standardTapIndex={standardTapIndex}
              activeSocialIcons={activeSocialIcons}
            />
          )
        case 'invoice':
          return (
            <InvoicePreview
              informationMessage={informationMessage}
              buttonColor={buttonColor}
              selectLanguage={selectLanguage}
              activeSocialIcons={activeSocialIcons}
              backGroundColor={backGroundColor}
              standardTapIndex={standardTapIndex}
            />
          )
        case 'outstandingInvoice':
          return (
            <OutstandingInvoicePreview
              informationMessage={informationMessage}
              buttonColor={buttonColor}
              selectLanguage={selectLanguage}
              activeSocialIcons={activeSocialIcons}
              backGroundColor={backGroundColor}
              standardTapIndex={standardTapIndex}
              showEnablePay={showEnablePay}
            />
          )
        case 'reschedule':
        case 'classReschedule':
          return (
            <RescheduleAppointmentPreview
              requestConfirm={requestConfirmation}
              allowRescheduling={allowRescheduling}
              allowCancellation={allowCancellation}
              displayPolicy={displayPolicy}
              showService={showService}
              showEmployeeName={showEmployeeName}
              selectLanguage={selectLanguage}
              backGroundColor={backGroundColor}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              standardTapIndex={standardTapIndex}
              activeSocialIcons={activeSocialIcons}
              addMedicalHisButton={addMedicalHisButton}
              medicalMessage={medicalMessage}
            />
          )
        case 'bookedOntoClass':
          return (
            <BookedOntoClassPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              showService={showService}
              showEmployeeName={showEmployeeName}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              type={type}
            />
          )
        case 'waitList':
          return (
            <WaitListPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              type={type}
            />
          )
        case 'documentShared':
        case 'secureEmailTemplate':
          return (
            <DocumentSharedPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              type={type}
            />
          )
        case 'referral':
          return (
            <ReferralPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              type={type}
            />
          )
        case 'leadResponses':
          return (
            <LeadResponsesPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              type={type}
            />
          )
        case 'connectRegistration':
          return (
            <ConnectRegistrationPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              type={type}
            />
          )
        case 'classSpotAvailable':
          return (
            <ClassSpotAvailablePreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              type={type}
            />
          )
        case 'giftVoucher':
          return (
            <GiftVoucherPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              type={type}
            />
          )
        case 'requestFeedback':
          return (
            <RequestFeedbackPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              type={type}
            />
          )
        case 'medical-forms':
        case 'clinic-emailing-timeline':
        case 'emailAppointment':
          return (
            <MedicalFormsPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
              type={type}
            />
          )
        case 'birthday':
          return (
            <BirthdayPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              type={type}
            />
          )
        case 'package-session-used':
          return (
            <PackageSessionPreview
              standardTapIndex={standardTapIndex}
              backGroundColor={backGroundColor}
              activeSocialIcons={activeSocialIcons}
              selectLanguage={selectLanguage}
              buttonColor={buttonColor}
            />
          )
        default:
          return (
            <Appointment
              requestConfirm={requestConfirmation}
              allowRescheduling={allowRescheduling}
              allowCancellation={allowCancellation}
              displayPolicy={displayPolicy}
              showService={showService}
              showEmployeeName={showEmployeeName}
              addMedicalHisButton={addMedicalHisButton}
              selectLanguage={selectLanguage}
              backGroundColor={backGroundColor}
              buttonColor={buttonColor}
              informationMessage={informationMessage}
              medicalMessage={medicalMessage}
              standardTapIndex={standardTapIndex}
              activeSocialIcons={activeSocialIcons}
            />
          )
      }
    }
    return (
      <ClientNotification
        onSmsTabChanged={(value) => {
          if (value === 2) {
            console.log('this is smstext tab')
            setDisableCustomTab(true)
            handleSelectedTab(value)
            setEnableReminder(true)
            setSmartDelivery(true)
            setHideAppearanceTabPane(false)
            setStandardTap('1')
          } else {
            console.log('this is email tab')
            handleSelectedTab(value)
            setEnableReminder(false)
            setSmartDelivery(false)
            setHideAppearanceTabPane(true)
            setDisableCustomTab(false)
          }
        }}
        tabComponent={
          isTabComponent && (
            <Standard
              disableCustomTab={disableCustomTab}
              onStandardTabChanged={(value) => setStandardTap(value)}
              enableReminder={enableReminder}
              onEnableReminder={(value) => setEnableReminder(value)}
              smartDelivery={smartDelivery}
              onSmartDelivery={(value) => setSmartDelivery(value)}
              smartFramework={smartFramework}
              onSmartFramework={(value) => setSmartFramework(value)}
              requestConfirmation={requestConfirmation}
              onRequestConfirmation={(value) => setRequestConfirmation(value)}
              allowRescheduling={allowRescheduling}
              onAllowRescheduling={(value) => setAllowRescheduling(value)}
              allowCancellation={allowCancellation}
              onAllowCancellation={(value) => setAllowCancellation(value)}
              displayPolicy={displayPolicy}
              onDisplayPolicy={(value) => setDisplayPolicy(value)}
              showService={showService}
              onShowService={(value) => setShowService(value)}
              showEmployeeName={showEmployeeName}
              onShowEmployeeName={(value) => setShowEmployeeName(value)}
              addMedicalHisButton={addMedicalHisButton}
              onAddMedicalHisButton={(value) => setAddMedicalHisButton(value)}
              backGroundColor={backGroundColor}
              onBackGroundColor={(value) => setBackGroundColor(value)}
              buttonColor={buttonColor}
              onButtonColor={(value) => setButtonColor(value)}
              selectLanguage={selectLanguage}
              onSelectLanguage={(value) => setSelectLanguage(value)}
              medicalMessage={medicalMessage}
              onMedicalMessage={(value) => setMedicalMessage(value)}
              informationMessage={informationMessage}
              onInformationMessage={(value) => setInformationMessage(value)}
              hideAppearanceTabPane={hideAppearanceTabPane}
              smsMessage={smsMessage}
              onSmsMessage={(value) => setSmsMessage(value)}
              onActiveSocialIcon={(value) => {
                setActiveSocialIcons(value.map((e) => e))
              }}
              standardMessage={standardMessage}
              hideRequestConfirmationOption={hideRequestConfirmationOption}
              hideAllowReschedulingOption={hideAllowReschedulingOption}
              hideAllowCancellationOption={hideAllowCancellationOption}
              hideDisplayPolicyOption={hideDisplayPolicyOption}
              hideMedicalHistoryOption={hideMedicalHistoryOption}
              hideReminderTimeFrameTabPane={hideReminderTimeFrameTabPane}
              hideReminderSettingTabPane={hideReminderSettingTabPane}
              hideEmployeeNameOption={hideEmployeeNameOption}
              hideServiceOption={hideServiceOption}
              hideEnablePay={hideEnablePay}
              onShowEnablePay={(value) => setShowEnablePay(value)}
              showEnablePay={showEnablePay}
            />
          )
        }
        previewComponent={isPreviewComponent && preview()}
        smsComponent={
          isSmsComponent && (
            <Smstext
              smsMessage={smsMessage}
              // enableReminder={enableReminder}
              // smartDelivery={smartDelivery}
            />
          )
        }
        displayButtons={displayButtons}
        displayRadioGroup={displayRadioGroup}
      />
    )
  }
)

export default Index
