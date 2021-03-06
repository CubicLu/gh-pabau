import { Breadcrumb, Button, Notification, NotificationType } from '@pabau/ui'
import { Card, Col, Row } from 'antd'
import { useFormik } from 'formik'
import React, { FC } from 'react'
import * as Yup from 'yup'
import Layout from '../../../components/Layout/Layout'
import General from '../../../components/Setup/Settings/ReferralSettings/General'
import { useUser } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import useWindowSize from '../../../hooks/useWindowSize'
import CommonHeader from '../../../components/CommonHeader'
import { GeneralReferralConfig } from '../../../types/referralSettings'
import styles from './referral.module.less'

interface P {
  general: GeneralReferralConfig
}

const Referral: FC<P> = () => {
  const { t } = useTranslationI18()
  const user = useUser()

  const ReferralConfigObj = {
    general: {
      inputList: [
        {
          key: 1,
          name: 'expiryDays',
          label: t('setup.settings.referral.general.expiry'),
          value: Number.parseInt(t('setup.settings.referral.expiry.value')),
          helpText: t('setup.settings.referral.general.expiry.tooltip'),
        },
      ],
      dropdownList: [
        {
          key: 1,
          id: 'reward',
          label: t('setup.settings.referral.general.reward'),
          value: t('setup.settings.referral.reward.value'),
          options: [
            t('setup.settings.referral.options.none.value'),
            t('setup.settings.referral.options.voucher.value'),
          ],
          helpText: t('setup.settings.referral.general.reward.tooltip'),
        },
        {
          key: 2,
          id: 'refereeReward',
          label: t('setup.settings.referral.general.referee'),
          value: t('setup.settings.referral.referee.reward.value'),
          options: [
            t('setup.settings.referral.reward.options.none.value'),
            t('setup.settings.referral.reward.options.voucher.value'),
          ],
          helpText: t('setup.settings.referral.general.referee.tooltip'),
        },
      ],
    },
  }
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
        .typeError(t('setup.settings.referral.reward.validate.string'))
        .required(t('setup.settings.referral.reward.validate.required')),
      refereeReward: Yup.string()
        .typeError(t('setup.settings.referral.referee.validate.string'))
        .required(t('setup.settings.referral.referee.validate.required')),
      expiryDays: Yup.number()
        .typeError(t('setup.settings.referral.expiry.validate.number'))
        .required(t('setup.settings.referral.expiry.validate.required')),
    }),
    onSubmit: (value) => {
      console.log(value)
      Notification(
        NotificationType.success,
        t('setup.settings.referral.submit.success')
      )
    },
  })

  const handleSave = (): void => {
    referralFormik.handleSubmit()
  }

  return (
    <div className={styles.referralMainWrapper}>
      <Layout {...user}>
        <CommonHeader
          title={t('setup.settings.referral.title')}
          isLeftOutlined
          reversePath="/setup"
        />
        <Card className={styles.referralContainer}>
          {size.width > 767 && (
            <Row className={styles.titleWrapper}>
              <Col span={'auto'} className={styles.title}>
                <Breadcrumb
                  items={[
                    { breadcrumbName: t('sidebar.setup'), path: 'setup' },
                    {
                      breadcrumbName: t('setup.settings.referral.title'),
                      path: '',
                    },
                  ]}
                />
                <h4>{t('setup.settings.referral.title')}</h4>
                <p className={styles.description}>
                  {t('setup.settings.referral.description')}
                </p>
              </Col>
              <Col span={'auto'} className={styles.titleSaveBtn}>
                <Button
                  type="primary"
                  className={styles.saveBtn}
                  onClick={handleSave}
                >
                  {t('setup.settings.loyalty.savechanges')}
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
              <Button type={'primary'}>
                {t('setup.settings.loyalty.savechanges')}
              </Button>
            </div>
          )}
        </Card>
      </Layout>
    </div>
  )
}

export default Referral
