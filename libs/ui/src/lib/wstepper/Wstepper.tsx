import React, { FC, useEffect, ReactNode } from 'react'
import styles from './Wstepper.module.less'
import Wizard from '../wizard/Wizard'
import { StepperItem } from '@pabau/ui'
import Stepper from '../stepper/Stepper'
import { ButtonType } from 'antd/lib/button/button'

interface WStepperProps {
  active: number
  data: StepperItem[]
  hideStep?: boolean
  disableNextStep?: boolean
  disablePrevStep?: boolean
  nextButtonContent?: ReactNode | string
  prevButtonContent?: ReactNode | string
  nextBtnLabel?: string | number | ReactNode
  extraBtn?: boolean
  extraBtnType?: ButtonType
  extraBtnLabel?: string | number | ReactNode
  extraBtnClick?: () => void
  onActiveStepChange?: (index) => void
  nextButtonDecorator?: ReactNode
  hideNextStep?: boolean
  hidePrevStep?: boolean
}

export const Wstepper: FC<WStepperProps> = ({
  active,
  children,
  data,
  disableNextStep = false,
  disablePrevStep = false,
  onActiveStepChange,
  hideNextStep = false,
  hidePrevStep = false,
  ...props
}) => {
  const [index, setIndex] = React.useState(0)

  useEffect(() => {
    setIndex(active)
  }, [active])

  return (
    <div className={styles.container}>
      <div className={styles.stepperContianer}>
        <div>
          <Stepper datasource={data} step={active} />
        </div>
      </div>

      {children}

      <Wizard
        {...props}
        onPrev={() => onActiveStepChange?.(index - 1)}
        onNext={() => onActiveStepChange?.(index + 1)}
        active={active}
        allSteps={data.length}
        disableNextStep={disableNextStep}
        disablePrevStep={disablePrevStep}
        hideNextStep={hideNextStep}
        hidePrevStep={hidePrevStep}
      />
    </div>
  )
}

export default Wstepper
