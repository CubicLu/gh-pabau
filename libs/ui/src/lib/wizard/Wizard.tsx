import React from 'react'
import styles from './Wizard.module.less'
import { Button } from '@pabau/ui'
import classnames from 'classnames'
interface WizardProps {
  onPrev?: () => void
  onNext?: () => void
  extraBtnClick?: () => void
  active: number
  allSteps: number
  showNextBtn?: boolean
  nextBtnLabel?: string | number | React.ReactNode
  disableNextStep?: boolean
  nextButtonDecorator?: React.ReactNode
  nextButtonContent?: React.ReactNode | string
  previousButtonContent?: React.ReactNode | string
  background?: string
  allowDisablePrevious?: boolean
  finishDisablesNextStep?: boolean
  hideStep?: boolean
}

export const Wizard: React.FC<WizardProps> = ({
  onPrev,
  onNext,
  extraBtnClick,
  active,
  allSteps,
  disableNextStep = false,
  nextButtonDecorator,
  background,
  nextButtonContent,
  previousButtonContent,
  allowDisablePrevious = true,
  finishDisablesNextStep = true,
  hideStep = false,
}) => {
  return (
    <div
      className={styles.footer}
      style={{
        backgroundColor: background || 'unset',
        gridTemplateColumns: `1fr `.repeat(hideStep ? 2 : 3),
      }}
    >
      <div>
        <Button
          onClick={(event) => onPrev?.()}
          disabled={
            active <= 0 || (active === allSteps - 1 && allowDisablePrevious)
          }
        >
          {previousButtonContent || 'Previous Step'}
        </Button>
      </div>
      {!hideStep && (
        <span
          className={classnames(styles.breadcrumbgraytxt, styles.centeredtext)}
        >
          Step {active + 1}/{allSteps}
        </span>
      )}
      {nextButtonDecorator ? (
        <div className={styles.nextButtonDecorator}>
          {nextButtonDecorator}
          <Button
            type="primary"
            onClick={(event) => onNext?.()}
            disabled={
              disableNextStep ||
              (allSteps - 1 <= active && finishDisablesNextStep)
            }
          >
            {nextButtonContent || 'Next Step'}
          </Button>
        </div>
      ) : (
        <Button
          type="primary"
          onClick={(event) => onNext?.()}
          disabled={
            disableNextStep ||
            (allSteps - 1 <= active && finishDisablesNextStep)
          }
        >
          {nextButtonContent || 'Next Step'}
        </Button>
      )}
    </div>
  )
}

export default Wizard
