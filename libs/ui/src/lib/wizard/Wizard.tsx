import React from 'react'
import styles from './Wizard.module.less'
import { Button } from '@pabau/ui'
import classnames from 'classnames'
interface WizardProps {
  onPrev?: () => void
  onNext?: () => void
  active: number
  allSteps: number
  disableNextStep?: boolean
  nextButtonDecorator?: React.ReactNode
  nextButtonContent?: React.ReactNode | string
  previousButtonContent?: React.ReactNode | string
  background?: string
  allowDisablePrevious?: boolean
  finishDisablesNextStep?: boolean
  hideNextStep?: boolean
  hidePrevStep?: boolean
  hideStep?: boolean
}

export const Wizard: React.FC<WizardProps> = ({
  onPrev,
  onNext,
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
  hideNextStep = false,
  hidePrevStep = false,
}) => {
  return (
    <div
      className={styles.footer}
      style={{
        backgroundColor: background || 'unset',
        gridTemplateColumns: `1fr `.repeat(hideStep ? 2 : 3),
      }}
    >
      {hidePrevStep ? (
        <div />
      ) : (
        <div>
          <Button
            onClick={() => onPrev?.()}
            disabled={
              active <= 0 || (active === allSteps - 1 && allowDisablePrevious)
            }
          >
            {previousButtonContent || 'Previous Step'}
          </Button>
        </div>
      )}
      {!hideStep && (
        <span
          className={classnames(styles.breadcrumbgraytxt, styles.centeredtext)}
        >
          Step {active + 1}/{allSteps}
        </span>
      )}
      {hideNextStep ? (
        <div />
      ) : (
        <>
          {nextButtonDecorator ? (
            <div className={styles.nextButtonDecorator}>
              {nextButtonDecorator}
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
            </div>
          ) : (
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
          )}{' '}
        </>
      )}
    </div>
  )
}

export default Wizard
