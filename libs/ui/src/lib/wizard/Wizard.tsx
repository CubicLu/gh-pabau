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
  showPrevBtn?: boolean
  nextBtnLabel?: string | number | React.ReactNode
  disableNextStep?: boolean
  disablePrevStep?: boolean
  nextButtonDecorator?: React.ReactNode
  nextButtonContent?: React.ReactNode | string
  prevButtonContent?: React.ReactNode | string
  background?: string
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
  disablePrevStep = true,
  nextButtonDecorator,
  background,
  nextButtonContent,
  prevButtonContent,
  finishDisablesNextStep = true,
  hideStep = false,
  showNextBtn = true,
  showPrevBtn = true,
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
        {showPrevBtn && (
          <Button
            onClick={() => onPrev?.()}
            disabled={
              active <= 0 || (active === allSteps - 1 && disablePrevStep)
            }
          >
            {prevButtonContent || 'Previous Step'}
          </Button>
        )}
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
          {showNextBtn && (
            <Button
              type="primary"
              onClick={() => onNext?.()}
              disabled={
                disableNextStep ||
                (allSteps - 1 <= active && finishDisablesNextStep)
              }
            >
              {nextButtonContent || 'Next Step'}
            </Button>
          )}
        </div>
      ) : (
        showNextBtn && (
          <Button
            type="primary"
            onClick={() => onNext?.()}
            disabled={
              disableNextStep ||
              (allSteps - 1 <= active && finishDisablesNextStep)
            }
          >
            {nextButtonContent || 'Next Step'}
          </Button>
        )
      )}
    </div>
  )
}

export default Wizard
