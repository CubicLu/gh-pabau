import React, { useState } from 'react'
import { Breadcrumb, Wstepper as WStepper, StepperItem } from '@pabau/ui'
import Layout from '../../components/Layout/Layout'
import styles from './lead-forms.module.less'
import LeadSettings from '../../components/Setup/LeadCapture/LeadSetting'
import LeadIntegration from '../../components/Setup/LeadCapture/LeadIntegration'
import LeadTesting from '../../components/Setup/LeadCapture/LeadTesting'
import LeadResult from '../../components/Setup/LeadCapture/LeadResult'
import LeadFormResult from '../../components/Setup/LeadCapture/lead-forms/LeadFormResult'
import LeadCustomizeForm from '../../components/Setup/LeadCapture/lead-forms/LeadCustomizeForm'
import CommonHeader from '../../components/CommonHeader'
import useWindowSize from '../../hooks/useWindowSize'
import { FlagOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { Typography } from 'antd'

const { Title } = Typography

export const LeadForms: React.FC = () => {
  const size = useWindowSize()
  const allAPISteps = ['Basic', 'Configure (API)', 'Testing (API)', 'Result']
  const allFormSteps = ['Basic', 'Customize Form', 'Result']
  const [activeStepper, setActiveStepper] = useState('API')
  const [activeStep, setActiveStep] = useState(0)

  const apiStepper: StepperItem[] = [
    {
      step: 1,
      name: 'Basic',
      img: <HomeOutlined />,
      isActive: true,
      index: 0,
    },
    {
      step: 2,
      name: 'Configure (API)',
      img: (
        <FontAwesomeIcon
          icon={Icons.faPencilAlt}
          style={{ fontSize: '12px' }}
        />
      ),
      isActive: false,
      index: 1,
    },
    {
      step: 3,
      name: 'Testing (API)',
      img: <ToolOutlined />,
      isActive: false,
      index: 2,
    },
    {
      step: 4,
      name: 'Result',
      img: <FlagOutlined />,
      isActive: false,
      index: 3,
    },
  ]

  const formStepper: StepperItem[] = [
    {
      step: 1,
      name: 'Basic',
      img: <HomeOutlined />,
      isActive: true,
      index: 0,
    },
    {
      step: 2,
      name: 'Customize Form',
      img: (
        <FontAwesomeIcon
          icon={Icons.faPencilAlt}
          style={{ fontSize: '12px' }}
        />
      ),
      isActive: false,
      index: 1,
    },
    {
      step: 3,
      name: 'Result',
      img: <FlagOutlined />,
      isActive: false,
      index: 2,
    },
  ]

  const setActiveStepperForLead = (type) => {
    setActiveStepper(type)
  }

  const onAPIFlowComplete = () => {
    setActiveStep(allAPISteps.length - 1)
  }

  return (
    <Layout active={'setup'}>
      <CommonHeader title="Lead Capture" reversePath="/setup" isLeftOutlined />
      <div className={styles.cardWrapper}>
        {size.width > 767 && (
          <div style={{ background: '#FFF' }}>
            <Breadcrumb
              items={[
                { breadcrumbName: 'Setup', path: 'setup' },
                { breadcrumbName: 'Lead Capture', path: '' },
              ]}
            />
            <Title>Lead Capture</Title>
          </div>
        )}
        <WStepper
          data={activeStepper === 'API' ? apiStepper : formStepper}
          active={activeStep}
          disableNextStep={
            activeStepper === 'API' &&
            allAPISteps[activeStep] === 'Testing (API)'
          }
          onActiveStepChange={(step) => {
            setActiveStep(step)
          }}
        >
          {allAPISteps[activeStep] === 'Basic' && (
            <LeadSettings
              activeStepper={activeStepper}
              captureLeadStepChange={setActiveStepperForLead}
            />
          )}
          {activeStepper === 'API' ? (
            <>
              {allAPISteps[activeStep] === 'Configure (API)' && (
                <LeadIntegration />
              )}
              {allAPISteps[activeStep] === 'Testing (API)' && (
                <LeadTesting onAPIFlowComplete={onAPIFlowComplete} />
              )}
              {allAPISteps[activeStep] === 'Result' && <LeadResult />}
            </>
          ) : (
            <>
              {allFormSteps[activeStep] === 'Customize Form' && (
                <LeadCustomizeForm />
              )}
              {allFormSteps[activeStep] === 'Result' && <LeadFormResult />}
            </>
          )}
        </WStepper>
      </div>
    </Layout>
  )
}

export default LeadForms
