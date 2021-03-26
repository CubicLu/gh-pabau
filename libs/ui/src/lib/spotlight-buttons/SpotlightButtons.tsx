import React from 'react'
import { ModalType, PabauPlus } from '../badge/Badge'
import styles from './SpotlightButtons.module.less'
type ReactElementLike =
  | React.FunctionComponent<{ className?: string }>
  | React.ComponentClass<{ className?: string }, unknown>
  | React.FC<unknown>
  | React.ComponentClass<unknown, unknown>

export interface SpotlightButtonsProps {
  buttons: {
    name: string
    icon: ReactElementLike
    badge?: boolean
    href?: string
    onClick?(event?: React.MouseEvent<HTMLElement, MouseEvent>): void
    modalType?: ModalType
  }[]
}

export const SpotlightButtons: React.FC<SpotlightButtonsProps> = (
  props: SpotlightButtonsProps
) => {
  return (
    <div className={styles.spotlightWrapper}>
      <div className={styles.spotlightButton}>
        {props.buttons.map((button) => {
          const { icon: Icon, name, badge: Badge } = button
          // this <a> tag can be swapped out later to effect the functionality of the component
          return (
            <div key={button.name} className={styles.buttonWrapper}>
              <a
                href={button.href}
                onClick={button.onClick}
                className={styles.interact}
              >
                <div className={styles.button}>
                  <span className={styles.iconWrapper}>
                    <Icon />
                  </span>
                  <div className={styles.inlineContent}>
                    <h2>{name}</h2>
                    {Badge && (
                      <PabauPlus modalType={button.modalType || 'Marketing'} />
                    )}
                  </div>
                </div>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SpotlightButtons
