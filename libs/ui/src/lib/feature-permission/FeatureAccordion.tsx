import React, { FC } from 'react'
import { Collapse } from 'antd'
import { Button } from '@pabau/ui'
import { DownOutlined } from '@ant-design/icons'
import styles from './FeaturePermission.module.less'

const { Panel } = Collapse

export interface AccordionProps {
  headerLabel: string
  subTitle: string
}

export const FeatureAccordion: FC<AccordionProps> = ({
  headerLabel,
  subTitle,
  ...rest
}) => {
  const customArrow = () => {
    return (
      <div>
        <Button
          type="default"
          size="large"
          shape="circle"
          className={styles.arrowIcon}
        >
          <DownOutlined />
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.mainCollapseDiv}>
      <Collapse defaultActiveKey={[]} expandIcon={customArrow} ghost={true}>
        <Panel
          header={
            <div className={styles.header}>
              <p className={styles.headerText}>{headerLabel}</p>
              <span className={styles.subTitle}>{subTitle}</span>
            </div>
          }
          key="true"
        >
          <div className={styles.panel}>{rest.children}</div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default FeatureAccordion
