import { LeftOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from '@pabau/ui'
import { Card, Col, Row } from 'antd'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { FC, useContext } from 'react'
import { useMedia } from 'react-use'
import * as Yup from 'yup'
import Layout from '../../../components/Layout/Layout'
import General from '../../../components/Setup/Settings/LoyaltySettings/General'
import { UserContext } from '../../../context/UserContext'
import { useGridData } from '../../../hooks/useGridData'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './loyalty.module.less'

interface P {
  general: GeneralLoyaltyConfig
}

const LoyaltySettings: FC<P> = () => {
  const { t } = useTranslationI18()
  const router = useRouter()
  const isMobile = useMedia('(max-width: 768px)', false)
  const user = useContext(UserContext)

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

  const { getParentSetupData } = useGridData(t)
  let path = router.pathname
  const pathArray = router.pathname.split('/')
  if (pathArray.length > 3) {
    pathArray.pop()
    path = pathArray.join('/')
  }
  const parentMenu = getParentSetupData(path)
  const handleBack = () => {
    if (parentMenu.length > 0) {
      router.push({
        pathname: '/setup',
        query: { menu: parentMenu[0]?.keyValue },
      })
    } else {
      router.push('/setup')
    }
  }

  return (
    <div className={styles.loyaltyMainWrapper}>
      <Layout {...user}>
        <Card className={styles.loyaltyContainer}>
          <div className={styles.hideDesktopView}>
            <Row className={styles.mobDevice}>
              <Col>
                <div className={styles.mobTopHead}>
                  <div className={styles.mobTopHeadRow}>
                    <LeftOutlined onClick={handleBack} />{' '}
                    <h6>{t('setup.settings.loyalty.title')}</h6>
                  </div>
                  <p>{t('setup.settings.loyalty.description')}</p>
                </div>
              </Col>
            </Row>
          </div>
          <div className={styles.hideMobileView}>
            <Row className={styles.loyaltyWrapper}>
              <Col span={'auto'} className={styles.titleWrapper}>
                <Breadcrumb
                  breadcrumbItems={[
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
      </Layout>
    </div>
  )
}

export default LoyaltySettings
