import React, { FC, useEffect, useState } from 'react'
import { Typography, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  TabMenu,
  Breadcrumb,
  NotificationBanner,
  MedicalFilter,
  Button,
  ChooseModal,
  ChooseModalItem,
  MedicalFilterProps,
  CreateTemplateModal,
  CreateTemplateModalProps,
} from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import Custom from '../../../components/Setup/Communication/Custom'
import Library from '../../../components/Setup/Communication/Library'
import CommonHeader from '../../../components/CommonHeader'
// import notificationBannerImage from '../../../assets/images/notification-image.png'
import icon from '../../../assets/images/notification.png'
import styles from './index.module.less'
import {
  defaultChooseTemplateState,
  chooseTemplateStepArgs,
  ChooseTemplateState,
} from '../../../components/Setup/Communication/choose-modal.data'
import createTemplateStateArgs from '../../../components/Setup/Communication/template-modal.data'

const { Title } = Typography

/*--- Filter Props ---*/

const communicationFilterProps: MedicalFilterProps = {
  filter: {
    language: 'English (UK)',
    status: 'active',
    formtype: {
      medicalHistory: false,
      consent: false,
      treatmentForm: false,
      epaper: false,
      presciption: false,
      labForm: false,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onApply: () => {},
}

/*--- Filter Props End ---*/

/*--- TabMenu Props ---*/

const tabMenuProps: Array<string> = ['Custom', 'Library']

/*--- TabMenu Props End ---*/

// interface IndexProps {}

export const Index: FC = () => {
  const [hideBanner, setHideBanner] = useState(false)
  const [currentTab, setCurrentTab] = useState('0')
  const [query, setQuery] = useState('')

  /*--- Choose Modal State ---*/
  const [chooseTemplateVisible, setChooseTemplateVisible] = useState(false)
  const [chooseTemplateStep, setChooseTemplateStep] = useState(
    defaultChooseTemplateState
  )
  const [chooseTemplateArgs, setChooseTemplateArgs] = useState(
    chooseTemplateStepArgs[defaultChooseTemplateState._step][
      defaultChooseTemplateState._type
    ]
  )
  /*--- Choose Modal State End ---*/

  /*--- Create Modal State ---*/

  const [
    createTemplateArgs,
    setCreateTemplateArgs,
  ] = useState<CreateTemplateModalProps>(null)

  /*--- Create Modal State End ---*/

  /*--- Template Type State ---*/

  const [selectedTemplateType, setSelectedTemplateType] = useState('SMS')
  const [selectedServiceType, setSelectedServiceType] = useState(null)

  /*--- Create Modal State End ---*/

  /*--- Choose Modal Action ---*/
  function chooseTemplateAction() {
    const _tempStep: ChooseTemplateState = {
      _step: 0,
      _type: 'SelectType',
    }
    chooseTemplateVisible && setChooseTemplateStep(_tempStep)
    setChooseTemplateVisible(!chooseTemplateVisible)
  }

  useEffect(() => {
    setChooseTemplateArgs(
      chooseTemplateStepArgs[chooseTemplateStep._step][chooseTemplateStep._type]
    )
  }, [chooseTemplateStep])

  function nextChooseTemplate(item: ChooseModalItem) {
    if (chooseTemplateStep._step === 0) {
      setSelectedTemplateType(item.title)
    }

    if (chooseTemplateStep._step === 1) {
      setSelectedServiceType(item.title)
    }

    if (chooseTemplateStep._step === 0 && item.title === 'Letter') {
      // createTemplateAction()
    } else {
      const _step = chooseTemplateStep._step + 1
      const _type = item.title
      if (_step === 2) {
        // _step = 0
        // _type = 'SelectType'
        createTemplateAction()
      } else {
        const _tempStep: ChooseTemplateState = {
          _step: _step,
          _type: _type,
        }
        setChooseTemplateStep(_tempStep)
      }
    }
  }
  /*--- Choose Modal Action End---*/

  /*--- Create Template Modal Action ---*/

  function createTemplateAction() {
    const tempState: CreateTemplateModalProps =
      createTemplateStateArgs[selectedTemplateType]
    setCreateTemplateArgs({
      ...tempState,
      onClosed: () => closeCreateTemplateModalAction(),
      visible: true,
    })
  }

  const closeCreateTemplateModalAction = () => {
    const tempState = createTemplateArgs
    setCreateTemplateArgs({
      ...tempState,
      visible: false,
    })
  }

  useEffect(() => {
    if (selectedTemplateType === 'Letter') createTemplateAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplateType])

  /*--- Create Template Modal Action End ---*/

  return (
    <>
      <CommonHeader />
      <Layout>
        {/* Need to upgrade Last NotificationBanner  */}
        <NotificationBanner
          title="Enable client notifications"
          desc="We recomment enabling enabling your confirmation email so that Pabau will automatically send out your questionnaire to a client at the point of booking an appointment."
          imgPath={icon}
          allowClose={true}
          setHide={[hideBanner, setHideBanner]}
        />
        <div className={styles.medicalFormsContainer}>
          <div className={styles.medicalFormsHeader}>
            <div>
              <Breadcrumb
                breadcrumbItems={[
                  { breadcrumbName: 'Setup', path: '' },
                  { breadcrumbName: 'Communication Templates', path: '' },
                ]}
              />
              <Title>{'Communication Templates'}</Title>
            </div>
            <div className={styles.medicalFormsOps}>
              {currentTab === '0' && (
                <>
                  <div>
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      addonAfter={<SearchOutlined />}
                      placeholder="Search in Custom"
                    />
                  </div>
                  <div>
                    <MedicalFilter {...communicationFilterProps} />
                  </div>
                  <div>
                    <Button
                      type="primary"
                      onClick={() => chooseTemplateAction()}
                    >
                      {'Create Template'}
                    </Button>
                  </div>
                </>
              )}
              {currentTab === '1' && (
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  addonAfter={<SearchOutlined />}
                  placeholder="Search in Library"
                />
              )}
            </div>
          </div>
          <TabMenu
            tabPosition="top"
            minHeight="100vh"
            menuItems={tabMenuProps}
            // onChange={(key) => setCurrentTab(key)}
            onTabClick={(activeKey) => setCurrentTab(activeKey)}
          >
            <Custom />
            <Library />
            <div>Triggers Tab</div>
          </TabMenu>
        </div>
      </Layout>
      {chooseTemplateArgs && (
        <ChooseModal
          {...(chooseTemplateStepArgs[chooseTemplateStep._step][
            chooseTemplateStep._type
          ] ||
            chooseTemplateStepArgs[defaultChooseTemplateState._step][
              defaultChooseTemplateState._type
            ])}
          visible={chooseTemplateVisible}
          onClose={() => chooseTemplateAction()}
          onSelected={(item: ChooseModalItem) => {
            // Notification(
            //   NotificationType.info,
            //   `Seleted Service Type: ${item.title}`
            // )
            nextChooseTemplate(item)
          }}
        />
      )}
      <CreateTemplateModal
        {...createTemplateArgs}
        selectedService={selectedServiceType}
      />
    </>
  )
}

export default Index