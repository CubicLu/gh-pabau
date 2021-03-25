import React, { FC } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Card } from 'antd'

import {
  Layout,
  Breadcrumb,
  Button,
  NotificationType,
  Notification,
} from '@pabau/ui'
import { LeftOutlined } from '@ant-design/icons'
import { ReferralConfigObj } from '../../../mocks/ReferralSettings'
import General from '../../../components/Setup/Settings/ReferralSettings/General'
import useWindowSize from '../../../hooks/useWindowSize'
import styles from './referral.module.less'
import { GeneralReferralConfig } from '../../../types/referralSettings'

interface P {
  general: GeneralReferralConfig
}

const Referral: FC<P> = () => {
  const listInput = ReferralConfigObj.general
  const size = useWindowSize()

  const referralFormik = useFormik({
    initialValues: {
      reward: listInput.dropdownList[0].value,
      refereeReward: listInput.dropdownList[1].value,
      expiryDays: listInput.inputList[0].value,
    },
    validationSchema: Yup.object({
      reward: Yup.string()
        .typeError('You must specify a reward')
        .required('Reward is required'),
      refereeReward: Yup.string()
        .typeError('You must specify a referee rewawrd')
        .required('Referee Reward is required'),
      expiryDays: Yup.number()
        .typeError('You must specify a expiry days')
        .required('Expiry days is required'),
    }),
    onSubmit: (value) => {
      console.log(value)
      Notification(
        NotificationType.success,
        'Success! Referral settings have been saved successfully'
      )
    },
  })

  const handleSave = (): void => {
    referralFormik.handleSubmit()
  }

  return (
    <div className={styles.referralMainWrapper}>
      <Layout>
        <Card className={styles.referralContainer}>
          {size.width <= 767 ? (
            <div className={styles.hideDesktopView}>
              <Row className={styles.mobDevice}>
                <Col span={24}>
                  <div className={styles.mobTopHead}>
                    <div className={styles.mobTopHeadRow}>
                      <LeftOutlined /> <h6> {'Referral settings'}</h6>
                    </div>
                    <p>
                      {
                        'Manage settings around you referral rewards, the templates that are sent as well as the amounts.'
                      }
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <Row className={styles.titleWrapper}>
              <Col span={19} className={styles.title}>
                <Breadcrumb
                  breadcrumbItems={[
                    { breadcrumbName: 'Setup', path: 'setup' },
                    { breadcrumbName: 'Referral settings', path: '' },
                  ]}
                />
                <h4>{'Referral settings'}</h4>
                <p className={styles.description}>
                  {
                    'Manage settings around you referral rewards, the templates that are sent as well as the amounts.'
                  }
                </p>
              </Col>
              <Col span={'auto'} className={styles.titleSaveBtn}>
                <Button
                  type="primary"
                  className={styles.saveBtn}
                  onClick={handleSave}
                >
                  {'Save Changes'}
                </Button>
              </Col>
            </Row>
          )}
          <General
            generalObj={ReferralConfigObj.general}
            values={referralFormik.values}
            setFieldValue={referralFormik.setFieldValue}
            errors={referralFormik.errors}
          />
          {size.width <= 767 && (
            <div className={styles.mobSaveBtn} onClick={handleSave}>
              <Button type={'primary'}>{'Save Changes'}</Button>
            </div>
          )}
        </Card>
      </Layout>
    </div>
  )
}

export default Referral
