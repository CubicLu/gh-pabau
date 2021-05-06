import { LeftOutlined } from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
import {
  Breadcrumb,
  BusinessDetails,
  BusinessDetailsNotifications,
  Button,
  MobileHeader,
  Notification,
  NotificationType,
  Security,
  System,
  TabMenu,
  Terminology,
} from '@pabau/ui'
import { Typography } from 'antd'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import CommonHeader from '../../../components/CommonHeader'
import Layout from '../../../components/Layout/Layout'
import { useGridData } from '../../../hooks/useGridData'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './index.module.less'

const { Title } = Typography

export const Index: FC = () => {
  const { t } = useTranslationI18()
  const router = useRouter()
  const ADD_MUTATION = gql`
    mutation MyMutation($variable: [business_details_insert_input!]!) {
      insert_business_details(objects: $variable) {
        affected_rows
      }
    }
  `
  const [createBusinessDetails] = useMutation(ADD_MUTATION)

  const tabMenuItems = [
    t('business.details.tab.tabtitle'),
    t('business.terminology.tab.title'),
    t('business.system.tab.title'),
    t('business.security.tab.title'),
    t('business.notification.tab.title'),
  ]
  const { getParentSetupData } = useGridData(t)
  const parentMenu = getParentSetupData(router.pathname)

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
  const onSave = async (values, type) => {
    const data = {
      businses_name: '',
      business_type: '',
      company_email: '',
      phone: '',
      website: '',
      currency: '',
      business_location: '',
      date_format: '',
      default_language_clients: '',
      default_language_staff: '',
      time_zone: '',
      week_start: '',
      vat: '',
      disable_prescriptions: false,
      medical_approvals: false,
      perform_surgical: false,
      secure_medical_forms: false,
      people_attend_appointment_singular: t(
        'setup.business-details.people.appointment.singular'
      ),
      people_attend_appointment_plural: t(
        'setup.business-details.people.appointment.plural'
      ),
      booking_multiple_attendees_singular: t(
        'setup.business-details.booking.attendees.singular'
      ),
      booking_multiple_attendees_plural: t(
        'setup.business-details.booking.attendees.plural'
      ),
      employee_singular: t('setup.business-details.employee.singular'),
      employee_plural: t('setup.business-details.employee.plural'),
      teacher_singular: t('setup.business-details.teacher.singular'),
      teacher_plural: t('setup.business-details.teacher.plural'),
      client_postal: t('setup.business-details.client.postal'),
      client_sms: t('setup.business-details.client.sms'),
      client_email: t('setup.business-details.client.email'),
      client_phone: t('setup.business-details.client.phone'),
      leads_postal: t('setup.business-details.leads.postal'),
      leads_sms: t('setup.business-details.leads.sms'),
      leads_email: t('setup.business-details.leads.email'),
      leads_phone: t('setup.business-details.leads.phone'),
    }
    switch (type) {
      case 'business': {
        const { basicInformation, businessLocation, languageSetting } = values
        const {
          businessName,
          businessType,
          companyEmail,
          phone,
          website,
        } = basicInformation
        const {
          currency,
          dateFormat,
          defaultLanuageClients,
          defaultLanuageStaff,
          timezone,
          weekStart,
        } = languageSetting
        data.businses_name = businessName
        data.business_type = businessType
        data.company_email = companyEmail
        data.phone = phone
        data.website = website
        data.currency = currency
        data.business_location = businessLocation
        data.date_format = dateFormat
        data.default_language_clients = defaultLanuageClients
        data.default_language_staff = defaultLanuageStaff
        data.time_zone = timezone
        data.week_start = weekStart
        break
      }
      case 'terminology': {
        const { config, optIns } = values
        const vat = config[4].items[0].value
        data.vat = vat
        data.people_attend_appointment_singular = config[0].items[0].value
        data.people_attend_appointment_plural = config[0].item[1].value
        data.booking_multiple_attendees_singular = config[1].item[0].value
        data.booking_multiple_attendees_plural = config[1].item[1].value
        data.employee_singular = config[2].item[0].value
        data.employee_plural = config[2].item[1].value
        data.teacher_singular = config[3].item[0].value
        data.teacher_plural = config[3].item[1].value
        data.client_postal = optIns[0].items[0].value
        data.client_sms = optIns[0].items[1].value
        data.client_email = optIns[0].items[2].value
        data.client_phone = optIns[0].items[3].value
        data.leads_postal = optIns[1].items[0].value
        data.leads_sms = optIns[1].items[1].value
        data.leads_email = optIns[1].items[2].value
        data.leads_phone = optIns[1].items[3].value
        break
      }
      case 'system': {
        const {
          disablePrescriptions,
          medicalApprovals,
          performSurgical,
          secureMedicalForms,
        } = values
        data.disable_prescriptions = disablePrescriptions
        data.medical_approvals = medicalApprovals
        data.perform_surgical = performSurgical
        data.secure_medical_forms = secureMedicalForms
        break
      }
      case 'notification': {
        break
      }
      default: {
        const { basicInformation, businessLocation, languageSetting } = values
        const {
          businessName,
          businessType,
          companyEmail,
          phone,
          website,
        } = basicInformation
        const {
          currency,
          dateFormat,
          defaultLanuageClients,
          defaultLanuageStaff,
          timezone,
          weekStart,
        } = languageSetting
        data.businses_name = businessName
        data.business_type = businessType
        data.company_email = companyEmail
        data.phone = phone
        data.website = website
        data.currency = currency
        data.business_location = businessLocation
        data.date_format = dateFormat
        data.default_language_clients = defaultLanuageClients
        data.default_language_staff = defaultLanuageStaff
        data.time_zone = timezone
        data.week_start = weekStart
        const { config, optIns } = values
        const vat = config[4].items[0].value
        data.vat = vat
        data.people_attend_appointment_singular = config[0].items[0].value
        data.people_attend_appointment_plural = config[0].item[1].value
        data.booking_multiple_attendees_singular = config[1].item[0].value
        data.booking_multiple_attendees_plural = config[1].item[1].value
        data.employee_singular = config[2].item[0].value
        data.employee_plural = config[2].item[1].value
        data.teacher_singular = config[3].item[0].value
        data.teacher_plural = config[3].item[1].value
        data.client_postal = optIns[0].items[0].value
        data.client_sms = optIns[0].items[1].value
        data.client_email = optIns[0].items[2].value
        data.client_phone = optIns[0].items[3].value
        data.leads_postal = optIns[1].items[0].value
        data.leads_sms = optIns[1].items[1].value
        data.leads_email = optIns[1].items[2].value
        data.leads_phone = optIns[1].items[3].value
        const {
          disablePrescriptions,
          medicalApprovals,
          performSurgical,
          secureMedicalForms,
        } = values
        data.disable_prescriptions = disablePrescriptions
        data.medical_approvals = medicalApprovals
        data.perform_surgical = performSurgical
        data.secure_medical_forms = secureMedicalForms
        break
      }
    }
    try {
      Notification(
        NotificationType.success,
        t('notification.type.success.message')
      )
      await createBusinessDetails({
        variables: {
          variable: data,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <CommonHeader />
      <Layout>
        <div className={styles.businessDetailsContainer}>
          <Breadcrumb
            breadcrumbItems={[
              {
                breadcrumbName: t('navigation-breadcrumb-setup'),
                path: 'setup',
              },
              { breadcrumbName: t('setup.business-details.header'), path: '' },
            ]}
          />
          <Title>{t('setup.business-details.header')}</Title>
        </div>
        <MobileHeader className={styles.businessDetailsHeaderMobile}>
          <div className={styles.allContentAlignMobile}>
            <div className={styles.marketingTextStyle}>
              <LeftOutlined onClick={handleBack} />
              <Title>{t('setup.business-details.header')}</Title>
            </div>
          </div>
        </MobileHeader>
        <div className={styles.tabsForDesktop}>
          <TabMenu tabPosition="left" menuItems={tabMenuItems} minHeight="auto">
            <BusinessDetails
              apiKey="apikey"
              onSave={(values) => onSave(values, 'business')}
            />
            <Terminology onSave={(values) => onSave(values, 'terminology')} />
            <System onSave={(values) => onSave(values, 'system')} />
            <Security />
            <BusinessDetailsNotifications
              onSave={(values) => onSave(values, 'notification')}
            />
          </TabMenu>
        </div>
        <div className={styles.tabsForMobile}>
          <TabMenu tabPosition="top" menuItems={tabMenuItems} minHeight="auto">
            <BusinessDetails apiKey="XXXXXXXXXX" />
            <Terminology />
            <System />
            <Security />
            <BusinessDetailsNotifications />
          </TabMenu>
        </div>
        <div className={styles.buttonForMobile}>
          <div className={styles.btnSaveWrap}>
            <Button
              type="primary"
              onClick={(values) => onSave(values, 'notification')}
            >
              {t('business.details.save.changes')}
            </Button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Index
