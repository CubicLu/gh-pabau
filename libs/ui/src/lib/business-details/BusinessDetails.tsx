import React, { FC, useEffect, useState } from 'react'
import { Row, Col, Divider } from 'antd'
import {
  Button,
  Input,
  SimpleDropdown,
  LanguageDropdown,
  PhoneNumberInput,
  BusinessTypes,
  BusinessLocation,
  Notification,
  NotificationType,
  Avatar,
  AvatarUploader,
} from '@pabau/ui'
import timezones from '../../assets/timezone'
import currency from '../../assets/currency'
import NormalClinicLogo from '../../assets/images/our-clinic.png'
import styles from './BusinessDetails.module.less'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'react-use'
import { bizTypes } from '../../assets/images/biz-types'

interface BasicInformation {
  businessName: string
  companyEmail: string
  phone: string
  website: string
  businessType: []
}

interface LanguageSetting {
  defaultLanuageStaff: string
  defaultLanuageClients: string
  timezone: string
  currency: string
  dateFormat: string
  weekStart: string
}

export interface BusinessDetailsProps {
  apiKey: string
  onSave?(val): void
  basicInformation?: BasicInformation
  languageSetting?: LanguageSetting
  businessLocation?: string
}

const defaultBasicInfo: BasicInformation = {
  businessName: '',
  companyEmail: '',
  phone: '',
  website: '',
  businessType: [],
}

export const BusinessDetails: FC<BusinessDetailsProps> = ({
  apiKey,
  onSave,
  basicInformation,
  languageSetting,
  businessLocation,
}) => {
  const { t } = useTranslation('common')
  const defaultBizLocation = t('default.biz.location')
  const size = useWindowSize()
  const defaultLangSetting: LanguageSetting = {
    defaultLanuageStaff: t('business.details.default.lang.setting.language'),
    defaultLanuageClients: t('business.details.default.lang.setting.language'),
    timezone: t('business.details.default.lang.setting.timezone'),
    currency: t('business.details.default.lang.setting.currency'),
    dateFormat: t('business.details.date.format.value.dmy'),
    weekStart: t('business.details.week.day.monday'),
  }

  const [basicInfo, setBasicInfo] = useState<BasicInformation>(defaultBasicInfo)
  const [langSetting, setLangSetting] = useState<LanguageSetting>(
    defaultLangSetting
  )
  const [bizLocation, setBizLocation] = useState(defaultBizLocation)
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [userImage, setUserImage] = useState<string>(NormalClinicLogo)

  const handleChangeImage = (image: string) => {
    setUserImage(image)
  }
  const uploadPhoto = () => {
    setShowAvatarUploader(true)
  }
  const handleSaveChanges = () => {
    Notification(
      NotificationType.success,
      t('notification.type.success.message')
    )
    onSave?.({
      basicInformation: basicInfo,
      languageSetting: langSetting,
      businessLocation: bizLocation,
    })
  }
  const handleBasicInfoChange = (key, value) => {
    const _basicInfo: BasicInformation = { ...basicInfo }
    _basicInfo[key] = value
    setBasicInfo(_basicInfo)
  }
  const handleLangSettingChange = (key, value) => {
    const _langSetting: LanguageSetting = { ...langSetting }
    _langSetting[key] = value
    setLangSetting(_langSetting)
  }

  useEffect(() => {
    setBasicInfo(basicInformation || defaultBasicInfo)
    setLangSetting(languageSetting || defaultLangSetting)
    setBizLocation(businessLocation || defaultBizLocation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicInformation, languageSetting, businessLocation])

  return (
    <div className={styles.businessDetailsTabContainer}>
      <div className={styles.detailsSubContainer}>
        <div className={styles.detailsHeaderContainer}>
          <div>
            <p className={styles.tabTitle}>
              {t('business.details.tab.tabtitle')}
            </p>
            <p className={styles.tabSubTitle}>
              {t('business.details.tab.subtitle')}
            </p>
          </div>
        </div>
      </div>
      <Divider />
      <div className={styles.basicInformationSection}>
        <p className={styles.sectionTitle} style={{ marginBottom: '12px' }}>
          {t('business.details.tab.basic.information.section')}
        </p>
        <div className={styles.normalClinicLogo}>
          {/* <NormalClinicLogo /> */}
          <div onClick={uploadPhoto}>
            <Avatar
              src={userImage}
              size={size.width > 767 ? 128 : 88}
              name={'Clinic Logo'}
              edit={true}
            />
          </div>
        </div>
        <Row gutter={[32, 28]} style={{ marginTop: '14px' }}>
          <Col className="gutter-row" xs={24} sm={12}>
            <Input
              label={t('business.details.input.business.name')}
              requiredMark={true}
              reqiredMsg={t(
                'business.details.input.business.name.requires.message'
              )}
              text={basicInfo.businessName}
              onChange={(val) => handleBasicInfoChange('businessName', val)}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <Input
              type="email"
              label={
                <>
                  {t('business.details.input.business.email')}
                  <small>
                    &nbsp;{t('business.details.input.business.email.text')}
                  </small>
                </>
              }
              requiredMark={true}
              reqiredMsg={t(
                'business.details.input.business.email.requires.message'
              )}
              text={basicInfo.companyEmail}
              onChange={(val) => handleBasicInfoChange('companyEmail', val)}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <PhoneNumberInput
              onChange={(val) => handleBasicInfoChange('phone', val)}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <Input
              label={t('business.details.input.website.label')}
              text={basicInfo.website}
              onChange={(val) => handleBasicInfoChange('website', val)}
            />
          </Col>
        </Row>
        <BusinessTypes List={bizTypes} />
      </div>
      <Divider />
      <div className={styles.languageSettingSection}>
        <p className={styles.sectionTitle} style={{ marginBottom: '6px' }}>
          {t('business.details.language.setting.title')}
        </p>
        <p className={styles.sectionSubTitle} style={{ marginBottom: '24px' }}>
          {t('business.details.language.setting.subtitle')}
        </p>
        <Row gutter={[32, 28]}>
          <Col className="gutter-row" xs={24} sm={12}>
            <LanguageDropdown
              label={t('business.details.default.lanuage.staff')}
              value={langSetting.defaultLanuageStaff}
              onChange={(val) =>
                handleLangSettingChange('defaultLanuageStaff', val)
              }
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <LanguageDropdown
              label={t('business.details.default.lanuage.clients')}
              value={langSetting.defaultLanuageClients}
              onSelected={(val) =>
                handleLangSettingChange('defaultLanuageClients', val)
              }
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <SimpleDropdown
              label={t('business.details.timezone.label')}
              value={langSetting.timezone}
              dropdownItems={timezones.map((timezone) => timezone.text || '')}
              onSelected={(val) => handleLangSettingChange('timezone', val)}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <SimpleDropdown
              label={t('business.details.currency.label')}
              value={langSetting.currency}
              dropdownItems={currency}
              onSelected={(val) => handleLangSettingChange('currency', val)}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <SimpleDropdown
              label={t('business.details.date.format.label')}
              value={langSetting.dateFormat}
              dropdownItems={[
                t('business.details.date.format.value.dmy'),
                t('business.details.date.format.value.mdy'),
              ]}
              onSelected={(val) => handleLangSettingChange('dateFormat', val)}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12}>
            <SimpleDropdown
              label={t('business.details.week.start.label')}
              tooltip={t('business.details.week.start.tooltip')}
              value={langSetting.weekStart}
              dropdownItems={[
                t('business.details.week.day.monday'),
                t('business.details.week.day.tuesday'),
                t('business.details.week.day.wednesday'),
                t('business.details.week.day.thursday'),
                t('business.details.week.day.friday'),
                t('business.details.week.day.saturday'),
                t('business.details.week.day.sunday'),
              ]}
              onSelected={(val) => handleLangSettingChange('weekStart', val)}
            />
          </Col>
        </Row>
      </div>
      <Divider />
      <div className={styles.businessLocationSection}>
        <p className={styles.sectionTitle} style={{ marginBottom: '20px' }}>
          {t('business.details.location')}
        </p>
        <BusinessLocation
          apiKey={apiKey}
          value={bizLocation}
          onChange={(value) => setBizLocation(value)}
        />
      </div>
      <div className={styles.btnSave}>
        <Button type="primary" onClick={() => handleSaveChanges()}>
          {t('business.details.save.changes')}
        </Button>
      </div>
      <AvatarUploader
        visible={showAvatarUploader}
        title={t('account.settings.profile.avatarupload.title')}
        onCreate={handleChangeImage}
        imageURL={userImage}
        onCancel={() => setShowAvatarUploader(false)}
        shape={'rectangle'}
      />
    </div>
  )
}

export default BusinessDetails
