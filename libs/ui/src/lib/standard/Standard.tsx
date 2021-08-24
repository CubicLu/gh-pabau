import React, { FC } from 'react'
import {
  Collapse,
  Checkbox,
  Row,
  Col,
  Tabs,
  Select,
  Input,
  Tooltip,
  Button,
} from 'antd'
import {
  InstagramOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from '@ant-design/icons'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { ColorPicker, ClientLanguage, SocialMediaCheckbox } from '@pabau/ui'
import styles from './Standard.module.less'
import { PabauPlus } from '../badge/Badge'
import { ServiceSpecific } from './ServiceSpecific'
import { useTranslation } from 'react-i18next'

interface P {
  enableReminder: boolean
  onEnableReminder: (boolean) => void
  standardMessage?: string
  hideReminderTimeFrameTabPane?: boolean
  showServiceSpecific?: boolean
  smartDelivery: boolean
  onSmartDelivery: (boolean) => void
  hideReminderSettingTabPane?: boolean
  smartFramework: boolean
  onSmartFramework: (boolean) => void
  requestConfirmation: boolean
  onRequestConfirmation: (boolean) => void
  hideRequestConfirmationOption?: boolean
  allowRescheduling: boolean
  onAllowRescheduling: (boolean) => void
  hideAllowReschedulingOption?: boolean
  allowCancellation: boolean
  onAllowCancellation: (boolean) => void
  hideAllowCancellationOption?: boolean
  displayPolicy: boolean
  onDisplayPolicy: (boolean) => void
  hideDisplayPolicyOption?: boolean
  showService: boolean
  onShowService: (boolean) => void
  hideServiceOption?: boolean
  showEmployeeName: boolean
  onShowEmployeeName: (boolean) => void
  hideEmployeeNameOption?: boolean
  addMedicalHisButton: boolean
  onAddMedicalHisButton: (boolean) => void
  hideMedicalHistoryOption?: boolean
  backGroundColor: string
  onBackGroundColor: (string) => void
  buttonColor: string
  onButtonColor: (string) => void
  selectLanguage: string
  onSelectLanguage: (string) => void
  selectService: string
  onSelectService: (string) => void
  medicalMessage: string
  onMedicalMessage: (string) => void
  informationMessage: string
  onInformationMessage: (string) => void
  onStandardTabChanged: (string) => void
  hideAppearanceTabPane: boolean
  smsMessage: string
  onSmsMessage: (string) => void
  hideMessageBox?: boolean
  onActiveSocialIcon: (value: string[]) => void
  disableCustomTab: boolean
  hideEnablePay?: boolean
  onShowEnablePay: (boolean) => void
  showEnablePay?: boolean
}

const { TabPane } = Tabs
const { Panel } = Collapse
const { Option } = Select
const { TextArea } = Input

export const Standard: FC<P> = ({
  enableReminder,
  onEnableReminder,
  standardMessage,
  smartDelivery,
  onSmartDelivery,
  hideReminderTimeFrameTabPane = false,
  showServiceSpecific = false,
  smartFramework,
  onSmartFramework,
  hideReminderSettingTabPane = true,
  requestConfirmation,
  onRequestConfirmation,
  hideRequestConfirmationOption = false,
  allowRescheduling,
  onAllowRescheduling,
  hideAllowReschedulingOption = false,
  allowCancellation,
  onAllowCancellation,
  hideAllowCancellationOption = false,
  displayPolicy,
  onDisplayPolicy,
  hideDisplayPolicyOption = false,
  showService,
  onShowService,
  hideServiceOption = false,
  showEmployeeName,
  onShowEmployeeName,
  hideEmployeeNameOption = false,
  addMedicalHisButton,
  onAddMedicalHisButton,
  hideMedicalHistoryOption = false,
  backGroundColor,
  onBackGroundColor,
  buttonColor,
  onButtonColor,
  selectLanguage,
  onSelectLanguage,
  selectService,
  onSelectService,
  medicalMessage,
  onMedicalMessage,
  informationMessage,
  onInformationMessage,
  onStandardTabChanged,
  hideAppearanceTabPane,
  smsMessage,
  onSmsMessage,
  hideMessageBox = true,
  onActiveSocialIcon,
  disableCustomTab,
  hideEnablePay = false,
  showEnablePay,
  onShowEnablePay,
}) => {
  function callback(key) {
    onStandardTabChanged(key)
  }
  const size = useWindowSize()
  const { t } = useTranslation('common')

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = React.useState({
      width: 0,
      height: 0,
    })

    React.useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      // Add event listener
      window.addEventListener('resize', handleResize)

      // Call handler right away so state gets updated with initial window size
      handleResize()

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    }, []) // Empty array ensures that effect is only run on mount

    return windowSize
  }

  return (
    <Row className={styles.tabsAlign}>
      <Tabs defaultActiveKey="standard" onChange={callback}>
        <TabPane tab="Standard" key="standard">
          <div style={{ padding: '10px 9px' }}>
            <Row style={{ padding: '0 15px' }}>
              <span className={styles.line1}>
                {standardMessage ||
                  t('notifications.standard.defaultStandardMessage')}
              </span>
            </Row>
            <Collapse
              className={styles.collapseAlignFirst}
              bordered={false}
              defaultActiveKey={['1', '2']}
              expandIconPosition="right"
              style={{ backgroundColor: 'white' }}
            >
              {!hideReminderTimeFrameTabPane && (
                <Panel
                  className={`${styles.panelAlign} ${styles.reminderTimeFrame}`}
                  header={t('notifications.standard.remiderTimeFrame')}
                  key="1"
                >
                  <>
                    <Row align="middle">
                      <Checkbox
                        className={styles.checkboxStyle}
                        value="smart_delivery"
                        checked={smartDelivery}
                        onChange={() => onSmartDelivery(!smartDelivery)}
                      >
                        {t(
                          'notifications.standard.remiderTimeFrame.smartDelivery'
                        )}
                      </Checkbox>
                      <Tooltip
                        placement="topLeft"
                        color="#595959"
                        title={t(
                          'notifications.standard.remiderTimeFrame.smartDeliveyTooltip'
                        )}
                      >
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </Row>
                    <Row gutter={[0, 16]}>
                      <Col>
                        <span className={styles.line1}>
                          {t(
                            'notifications.standard.reminderTimeFrame.message'
                          )}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span className={styles.reminder}>
                          {t(
                            'notifications.standard.reminderTimeFrame.advanceNotice'
                          )}
                        </span>
                      </Col>
                    </Row>
                    <Select defaultValue="48" style={{ width: '100%' }}>
                      <Option value="48">
                        48 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                      <Option value="24">
                        24 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                      <Option value="12">
                        12 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                      <Option value="6">
                        6 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                    </Select>
                  </>
                </Panel>
              )}
              {!hideReminderSettingTabPane && (
                <Panel
                  className={styles.panelAlign}
                  header={t('notifications.standard.reminderSettings')}
                  key="1"
                >
                  <>
                    <Row align="middle">
                      <Checkbox
                        className={styles.checkboxStyle}
                        value="smart_framework"
                        checked={smartFramework}
                        onChange={() => onSmartFramework(!smartFramework)}
                      >
                        {t('notifications.standard.smartFramework')}
                      </Checkbox>
                      <Tooltip
                        placement="topLeft"
                        color="#595959"
                        title={t(
                          'notifications.standard.smartFrameworkTooltip'
                        )}
                      >
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </Row>
                    <Row gutter={[0, 16]}>
                      <Col>
                        <span className={styles.line1}>
                          {t('notifications.standard.reminderSettings.message')}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span className={styles.reminder}>
                          {t(
                            'notifications.standard.reminderSettings.afterNotice'
                          )}
                        </span>
                      </Col>
                    </Row>
                    <Select defaultValue="48" style={{ width: '100%' }}>
                      <Option value="48">
                        48 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                      <Option value="24">
                        24 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                      <Option value="12">
                        12 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                      <Option value="6">
                        6 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                    </Select>
                  </>
                </Panel>
              )}
              {!hideMessageBox && (
                <div
                  className={`${styles.panelAlign} ${styles.messageSection}`}
                >
                  <Row>
                    <span className={styles.textareaLabel}>Message</span>
                  </Row>
                  <Row>
                    <TextArea
                      className={styles.textareaStyle}
                      autoSize={{ minRows: 3, maxRows: 3 }}
                      onChange={(event) => onSmsMessage(event.target.value)}
                      maxLength={size.width > 768 ? 500 : 160}
                      value={smsMessage}
                    />
                  </Row>
                </div>
              )}
              {hideAppearanceTabPane && (
                <Panel
                  className={styles.panelAlign}
                  header={t('notifications.standard.appearance')}
                  key="2"
                >
                  {!hideRequestConfirmationOption && (
                    <Row align="middle">
                      <Checkbox
                        className={styles.checkboxStyle}
                        value="request_confirmation"
                        checked={requestConfirmation}
                        onChange={() =>
                          onRequestConfirmation(!requestConfirmation)
                        }
                      >
                        {t(
                          'notifications.standard.appearance.requestConfirmation'
                        )}
                      </Checkbox>
                      <Tooltip
                        placement="topLeft"
                        color="#595959"
                        title={t(
                          'notifications.standard.appearance.requestConfirmationToolTip'
                        )}
                      >
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </Row>
                  )}
                  {!hideAllowReschedulingOption && (
                    <Row>
                      <Checkbox
                        className={styles.checkboxStyle}
                        value="allow_reschedule"
                        checked={allowRescheduling}
                        onChange={() => onAllowRescheduling(!allowRescheduling)}
                      >
                        {t(
                          'notifications.standard.appearance.allowRescheduling'
                        )}
                      </Checkbox>
                    </Row>
                  )}
                  {!hideAllowCancellationOption && (
                    <Row>
                      <Checkbox
                        className={styles.checkboxStyle}
                        value="allow_cancellation"
                        checked={allowCancellation}
                        onChange={() => onAllowCancellation(!allowCancellation)}
                      >
                        {t(
                          'notifications.standard.appearance.allowCancellation'
                        )}
                      </Checkbox>
                    </Row>
                  )}
                  {!hideDisplayPolicyOption && (
                    <Row>
                      <Checkbox
                        className={styles.checkboxStyle}
                        value="display_policy"
                        checked={displayPolicy}
                        onChange={() => onDisplayPolicy(!displayPolicy)}
                      >
                        {t('notifications.standard.appearance.displayPolicy')}
                      </Checkbox>
                    </Row>
                  )}
                  {!hideServiceOption && (
                    <Row>
                      <Checkbox
                        className={styles.checkboxStyle}
                        value="show_service"
                        checked={showService}
                        onChange={() => onShowService(!showService)}
                      >
                        {t('notifications.standard.appearance.showService')}
                      </Checkbox>
                    </Row>
                  )}
                  {!hideEmployeeNameOption && (
                    <Row>
                      <Checkbox
                        className={styles.checkboxStyle}
                        value="show_employee_name"
                        checked={showEmployeeName}
                        onChange={() => onShowEmployeeName(!showEmployeeName)}
                      >
                        {t(
                          'notifications.standard.appearance.showEmployeeName'
                        )}
                      </Checkbox>
                    </Row>
                  )}
                  {!hideEnablePay && (
                    <Row align="middle">
                      <Checkbox
                        className={styles.checkboxStyle}
                        value="show_enable_pay"
                        checked={showEnablePay}
                        onChange={() => onShowEnablePay(!showEnablePay)}
                      >
                        {t('notifications.standard.appearance.enablePayButton')}
                      </Checkbox>
                      <Tooltip
                        className={styles.tooltipStyle}
                        placement="topLeft"
                        color="#595959"
                        title={t(
                          'notifications.standard.appearance.enablePayButtonTooltip'
                        )}
                      >
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </Row>
                  )}
                  {!hideMedicalHistoryOption && (
                    <>
                      <Row>
                        <span className={styles.separateText}>
                          {t(
                            'notifications.standard.appearance.medicalSetting'
                          )}
                        </span>
                      </Row>
                      <Row align="middle">
                        <Checkbox
                          className={styles.checkboxStyle}
                          value="add_his_button"
                          checked={addMedicalHisButton}
                          onChange={() =>
                            onAddMedicalHisButton(!addMedicalHisButton)
                          }
                        >
                          {t(
                            'notifications.standard.appearance.addCompeleteFormButton'
                          )}
                        </Checkbox>
                        <Tooltip
                          placement="topLeft"
                          color="#595959"
                          title={t(
                            'notifications.standard.appearance.addCompeleteFormButtonToolTip'
                          )}
                        >
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </Row>
                      <div className={styles.hidesection}>
                        {addMedicalHisButton && (
                          <>
                            <Row>
                              <Checkbox
                                className={styles.checkboxStyle}
                                value="hide_his_completed"
                              >
                                {t(
                                  'notifications.standard.appearance.hideHistory'
                                )}
                              </Checkbox>
                            </Row>
                            <Row>
                              <span className={styles.reminder}>
                                {t(
                                  'notifications.standard.appearance.medicalhistoryButton'
                                )}
                              </span>
                            </Row>
                            <Row>
                              <TextArea
                                className={styles.textareaStyle}
                                autoSize={{ minRows: 3, maxRows: 3 }}
                                maxLength={size.width > 768 ? 500 : 160}
                                onChange={(event) =>
                                  onMedicalMessage(event.target.value)
                                }
                              />
                            </Row>
                          </>
                        )}
                      </div>
                    </>
                  )}
                  <ColorPicker
                    heading={t(
                      'notifications.standard.appearance.backgroundColor'
                    )}
                    onSelected={(val) => onBackGroundColor(val)}
                    selectedColor=""
                  />
                  <ColorPicker
                    heading={t(
                      'notifications.standard.appearance.buttonsColor'
                    )}
                    onSelected={(val) => onButtonColor(val)}
                    selectedColor=""
                  />
                  <Row className={styles.informText}>
                    <span className={styles.reminder}>
                      {t('notifications.standard.appearance.information')}
                    </span>
                  </Row>
                  <Row>
                    <TextArea
                      className={styles.textareaStyle}
                      placeholder={t(
                        'notifications.standard.appearance.specialOffer'
                      )}
                      autoSize={{ minRows: 3, maxRows: 3 }}
                      maxLength={size.width > 768 ? 500 : 160}
                      onChange={(event) =>
                        onInformationMessage(event.target.value)
                      }
                    />
                  </Row>
                </Panel>
              )}

              {hideAppearanceTabPane && (
                <Panel
                  className={styles.panelAlign}
                  header={t('notifications.standard.socialMedia.title')}
                  key="3"
                >
                  <Row>
                    <SocialMediaCheckbox
                      mediaIcon={[
                        {
                          label: 'facebook',
                          link: 'www.facebook.com',
                          icon: <FacebookOutlined />,
                        },
                        {
                          label: 'linksIn',
                          link: 'www.linkin.com',
                          icon: <LinkedinOutlined />,
                        },
                        {
                          label: 'instagram',
                          link: 'www.instagram.com',
                          icon: <InstagramOutlined />,
                        },
                        {
                          label: 'twitter',
                          link: 'null',
                          icon: <TwitterOutlined />,
                        },
                      ]}
                      onClick={(values) => {
                        onActiveSocialIcon(values)
                      }}
                    />
                  </Row>
                </Panel>
              )}
              <div className={styles.clientLang}>
                <div className={styles.papauPlusContainer}>
                  <PabauPlus label="Plus" modalType="Marketing" />
                </div>
              </div>

              <Panel
                className={styles.panelAlign}
                header={t('notifications.standard.clientLanguage')}
                key="4"
              >
                <Row>
                  <Col>
                    <span className={styles.reminder}>
                      {t('notifications.standard.clientlanguage.message')}
                    </span>
                  </Col>
                </Row>
                <Row className={styles.clientLangLogo}>
                  <ClientLanguage
                    selectLanguageHook={[selectLanguage, onSelectLanguage]}
                    defaultLanguage="EN"
                    isClickable={false}
                    isHover={true}
                  />
                </Row>
              </Panel>
            </Collapse>
          </div>
        </TabPane>
        {!disableCustomTab && (
          <TabPane tab="Custom" key="custom">
            <div style={{ padding: '10px 9px' }}>
              <Row style={{ padding: '0 15px' }}>
                <span className={styles.line1}>
                  {t('notifications.custom.line1')}
                  <span className={styles.anchor}>
                    <Button type="link">
                      {t('notifications.custom.messageTemplate')}
                    </Button>
                  </span>
                </span>
              </Row>
              {!hideReminderTimeFrameTabPane && (
                <>
                  <Row style={{ padding: '0 15px' }}>
                    <Col>
                      <span className={styles.reminder}>
                        {t(
                          'notifications.standard.reminderTimeFrame.advanceNotice'
                        )}
                      </span>
                    </Col>
                  </Row>

                  <Row style={{ padding: '0 15px' }}>
                    <Select defaultValue="48" style={{ width: '100%' }}>
                      <Option value="48">
                        48 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                      <Option value="24">
                        24 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                      <Option value="12">
                        12 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                      <Option value="6">
                        6 {t('notifications.standard.reminderTimeFrame.hours')}
                      </Option>
                    </Select>
                  </Row>
                </>
              )}
              <div className={styles.clientLang}>
                <div className={styles.papauPlusContainer}>
                  <PabauPlus label="Plus" modalType="Marketing" />
                </div>
              </div>
              <Collapse
                className={styles.collapseAlignFirst}
                bordered={false}
                defaultActiveKey={['1']}
                expandIconPosition="right"
                style={{ backgroundColor: 'white' }}
              >
                <Panel
                  className={styles.panelAlign}
                  header={t('notifications.standard.clientLanguage')}
                  key="1"
                >
                  <Row>
                    <Col>
                      <span className={styles.reminder}>
                        {t('notifications.standard.clientlanguage.message')}
                      </span>
                    </Col>
                  </Row>
                  <Row className={styles.clientLangLogo}>
                    <ClientLanguage
                      selectLanguageHook={[selectLanguage, onSelectLanguage]}
                      defaultLanguage="EN"
                      isClickable={true}
                      isHover={false}
                    />
                  </Row>
                </Panel>
              </Collapse>
              {showServiceSpecific && (
                <Collapse
                  className={styles.collapseAlignFirst}
                  bordered={false}
                  defaultActiveKey={['1']}
                  expandIconPosition="right"
                  style={{ backgroundColor: 'white' }}
                >
                  <Panel
                    className={styles.panelAlign}
                    header="Service Specific"
                    key="1"
                  >
                    <Row>
                      <Col>
                        <span className={styles.reminder1}>
                          {t('notifications.standard.serviceSpecific.message')}
                        </span>
                      </Col>
                    </Row>
                    <Row className={styles.clientLangLogo}>
                      <ServiceSpecific
                        selectServiceHook={[selectService, onSelectService]}
                        defaultService={'Japanese straightening'}
                        isClickable={true}
                        isHover={false}
                        selectLanguage={selectLanguage}
                      />
                    </Row>
                  </Panel>
                </Collapse>
              )}
            </div>
          </TabPane>
        )}
      </Tabs>
    </Row>
  )
}

export default Standard
