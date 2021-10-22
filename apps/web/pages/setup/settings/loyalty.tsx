import { Breadcrumb, Button } from '@pabau/ui'
import { Card, Col, Row } from 'antd'
import { useFormik } from 'formik'
import React, { FC } from 'react'
import { useMedia } from 'react-use'
import * as Yup from 'yup'
import Layout from '../../../components/Layout/Layout'
import General from '../../../components/Setup/Settings/LoyaltySettings/General'
import { useUser } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import CommonHeader from '../../../components/CommonHeader'
import styles from './loyalty.module.less'

interface P {
  general: GeneralLoyaltyConfig
}

const LoyaltySettings: FC<P> = () => {
  const { t } = useTranslationI18()
  const isMobile = useMedia('(max-width: 768px)', false)
  const user = useUser()

  const LoyaltySettingsObj = {
    general: {
      dropdownList: {
        key: 1,
        id: 'receipt',
        label: t('setup.settings.loyalty.general.dropdown.label'),
        value: t('setup.settings.loyalty.general.dropdown.yes'),
        options: [
          t('setup.settings.loyalty.general.dropdown.yes'),
          t('setup.settings.loyalty.general.dropdown.no'),
        ],
        helpText: t('setup.settings.loyalty.general.dropdown.help'),
      },
      inputPoint: {
        label: t('setup.settings.loyalty.general.inputpoint.label'),
        pointText: t('setup.settings.loyalty.general.inputpoint.placeholder'),
        value: Number.parseInt(t('setup.settings.loyalty.general.point.value')),
        helpText: t('setup.settings.loyalty.general.inputpoint.help'),
      },
    },
  }

  const loyaltyFormik = useFormik({
    initialValues: {
      showOnReceipt: LoyaltySettingsObj.general.dropdownList.value,
      inputPoint: LoyaltySettingsObj.general.inputPoint.value,
    },
    validationSchema: Yup.object({
      showOnReceipt: Yup.string().required(
        t('setup.settings.loyalty.showonreceipt.validate.required')
      ),
      inputPoint: Yup.number()
        .typeError(t('setup.settings.loyalty.inputpoint.validate.number'))
        .required(t('setup.settings.loyalty.inputpoint.validate.required')),
    }),
    onSubmit: (value) => {
      console.log(value)
    },
  })

  const handleSave = (): void => {
    loyaltyFormik.handleSubmit()
  }

  return (
    <Layout {...user}>
      <CommonHeader
        isLeftOutlined
        reversePath="/setup"
        title={t('setup.settings.loyalty.title')}
      />
      <div className={styles.loyaltyMainWrapper}>
        <Card className={styles.loyaltyContainer}>
          <div className={styles.hideMobileView}>
            <Row className={styles.loyaltyWrapper}>
              <Col span={'auto'} className={styles.titleWrapper}>
                <Breadcrumb
                  items={[
                    { breadcrumbName: t('sidebar.setup'), path: 'setup' },
                    {
                      breadcrumbName: t('setup.settings.loyalty.title'),
                      path: '',
                    },
                  ]}
                />
                <h4>{t('setup.settings.loyalty.title')}</h4>
                <p className={styles.description}>
                  {t('setup.settings.loyalty.description')}
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
          </div>
          <General
            generalObj={LoyaltySettingsObj.general}
            values={loyaltyFormik.values}
            setFieldValue={loyaltyFormik.setFieldValue}
            errors={loyaltyFormik.errors}
          />
          {isMobile && (
            <div className={styles.mobSaveBtn} onClick={handleSave}>
              <Button type={'primary'}>
                {t('setup.settings.loyalty.savechanges')}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  )
}

export default LoyaltySettings
