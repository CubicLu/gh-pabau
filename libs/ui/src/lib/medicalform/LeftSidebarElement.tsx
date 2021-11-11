import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import conditionsIcon from '../../assets/images/medicalform_conditions.svg'
import customCompanyIcon from '../../assets/images/medicalform_custom_company.svg'
import customDobIcon from '../../assets/images/medicalform_custom_dob.svg'
import customGenderIcon from '../../assets/images/medicalform_custom_gender.svg'
import customPhyAddressIcon from '../../assets/images/medicalform_custom_physical_address.svg'
import customReferIcon from '../../assets/images/medicalform_custom_refer.svg'
import customTelePhoneIcon from '../../assets/images/medicalform_custom_tele_phone.svg'
import dobIcon from '../../assets/images/medicalform_dob.svg'
import drawingIcon from '../../assets/images/medicalform_drawing.svg'
import dropdownIcon from '../../assets/images/medicalform_dropdown.svg'
import drugsIcon from '../../assets/images/medicalform_drugs.svg'
import headingIcon from '../../assets/images/medicalform_heading.svg'
import labTestIcon from '../../assets/images/medicalform_labtest.svg'
import longAnswerIcon from '../../assets/images/medicalform_longanswer.svg'
import multipleChoiceIcon from '../../assets/images/medicalform_multiplechoice.svg'
import shortAnswerIcon from '../../assets/images/medicalform_shortanswer.svg'
import signatureIcon from '../../assets/images/medicalform_signature.svg'
import singleChoiceIcon from '../../assets/images/medicalform_singlechoice.svg'
import sliderIcon from '../../assets/images/medicalform_singlechoice.svg'
import textBlockIcon from '../../assets/images/medicalform_textblock.svg'
import travelDesctinationIcon from '../../assets/images/medicalform_traveldestination.svg'
import vaccineHistoryIcon from '../../assets/images/medicalform_vaccinehistory.svg'
import snomedIcon from '../../assets/images/medicalform_drugs.svg'
import vaccineSchedulerIcon from '../../assets/images/medicalform_vaccinescheduler.svg'
import styles from './LeftSidebar.module.less'
import LeftSidebarMedicalFormTitle from './LeftSidebarMedicalFormTitle'

interface P {
  type: string
  component: string
  handlingClickLeft?: (componentName: string) => void
}

export const LeftSidebarElement: FC<P> = ({
  type,
  component,
  handlingClickLeft,
}) => {
  const { t } = useTranslation('common')
  const componentInfos = [
    {
      component: 'basic_heading',
      type: { type },
      iconUrl: headingIcon,
      bgcolor: '#6383F1',
      title: t('ui.medicalform.setting.component.heading.title'),
      desc: t('ui.medicalform.setting.component.heading.description'),
    },
    {
      component: 'basic_shortanswer',
      type: { type },
      iconUrl: shortAnswerIcon,
      bgcolor: '#6383F1',
      title: t('ui.medicalform.setting.component.shortanswer.title'),
      desc: t('ui.medicalform.setting.component.shortanswer.description'),
    },
    {
      component: 'basic_longanswer',
      type: { type },
      iconUrl: longAnswerIcon,
      bgcolor: '#6383F1',
      title: t('ui.medicalform.setting.component.longanswer.title'),
      desc: t('ui.medicalform.setting.component.longanswer.description'),
    },
    {
      component: 'basic_textblock',
      type: { type },
      iconUrl: textBlockIcon,
      bgcolor: '#6383F1',
      title: t('ui.medicalform.setting.component.textblock.title'),
      desc: t('ui.medicalform.setting.component.textblock.description'),
    },
    {
      component: 'basic_singlechoice',
      type: { type },
      iconUrl: singleChoiceIcon,
      bgcolor: '#65CD98',
      title: t('ui.medicalform.setting.component.singlechoice.title'),
      desc: t('ui.medicalform.setting.component.singlechoice.description'),
    },
    {
      component: 'basic_multiplechoice',
      type: { type },
      iconUrl: multipleChoiceIcon,
      bgcolor: '#65CD98',
      title: t('ui.medicalform.setting.component.multiplechoice.title'),
      desc: t('ui.medicalform.setting.component.multiplechoice.description'),
    },
    {
      component: 'basic_dropdown',
      type: { type },
      iconUrl: dropdownIcon,
      bgcolor: '#65CD98',
      title: t('ui.medicalform.setting.component.dropdown.title'),
      desc: t('ui.medicalform.setting.component.dropdown.description'),
    },
    {
      component: 'basic_drawing',
      type: { type },
      iconUrl: drawingIcon,
      bgcolor: '#F78561',
      title: t('ui.medicalform.setting.component.drawing.title'),
      desc: t('ui.medicalform.setting.component.drawing.description'),
    },
    {
      component: 'basic_staticimage',
      type: { type },
      iconUrl: drawingIcon,
      bgcolor: '#F78561',
      title: t('ui.medicalform.setting.component.staticimage.title'),
      desc: t('ui.medicalform.setting.component.staticimage.description'),
    },
    {
      component: 'basic_signature',
      type: { type },
      iconUrl: signatureIcon,
      bgcolor: '#F78561',
      title: t('ui.medicalform.setting.component.signature.title'),
      desc: t('ui.medicalform.setting.component.signature.description'),
    },
    {
      component: 'basic_photo',
      type: { type },
      iconUrl: drawingIcon,
      bgcolor: '#F78561',
      title: t('ui.medicalform.setting.component.photo.title'),
      desc: t('ui.medicalform.setting.component.photo.description'),
    },
    {
      component: 'basic_conditions',
      type: { type },
      iconUrl: conditionsIcon,
      bgcolor: '#FAAD14',
      title: t('ui.medicalform.setting.component.conditions.title'),
      desc: t('ui.medicalform.setting.component.conditions.description'),
    },
    {
      component: 'basic_drugs',
      type: { type },
      iconUrl: drugsIcon,
      bgcolor: '#FAAD14',
      title: t('ui.medicalform.setting.component.drugs.title'),
      desc: t('ui.medicalform.setting.component.drugs.description'),
    },
    {
      component: 'basic_labtests',
      type: { type },
      iconUrl: labTestIcon,
      bgcolor: '#FAAD14',
      title: t('ui.medicalform.setting.component.labtests.title'),
      desc: t('ui.medicalform.setting.component.labtests.description'),
    },
    {
      component: 'basic_traveldestination',
      type: { type },
      iconUrl: travelDesctinationIcon,
      bgcolor: '#FAAD14',
      title: t('ui.medicalform.setting.component.traveldestination.title'),
      desc: t('ui.medicalform.setting.component.traveldestination.description'),
    },
    {
      component: 'basic_vaccinescheduler',
      type: { type },
      iconUrl: vaccineSchedulerIcon,
      bgcolor: '#FAAD14',
      title: t('ui.medicalform.setting.component.vaccinescheduler.title'),
      desc: t('ui.medicalform.setting.component.vaccinescheduler.description'),
    },
    {
      component: 'basic_vaccinehistory',
      type: { type },
      iconUrl: vaccineHistoryIcon,
      bgcolor: '#FAAD14',
      title: t('ui.medicalform.setting.component.vaccinehistory.title'),
      desc: t('ui.medicalform.setting.component.vaccinehistory.description'),
    },
    {
      component: 'basic_snomed',
      type: { type },
      iconUrl: snomedIcon,
      bgcolor: '#FAAD14',
      title: t('ui.medicalform.setting.component.snomed.title'),
      desc: t('ui.medicalform.setting.component.snomed.description'),
    },
    {
      component: 'basic_slider',
      type: { type },
      iconUrl: sliderIcon,
      bgcolor: '#65CD98',
      title: t('ui.medicalform.setting.component.slider.title'),
      desc: t('ui.medicalform.setting.component.slider.description'),
    },
    {
      component: 'custom_emailmarketing',
      type: { type },
      iconUrl: dobIcon,
      bgcolor: '#20BAB1',
      title: t('ui.medicalform.setting.component.custom.emailmarketing.title'),
      desc: t(
        'ui.medicalform.setting.component.custom.emailmarketing.description'
      ),
    },
    {
      component: 'custom_smsmarketing',
      type: { type },
      iconUrl: dobIcon,
      bgcolor: '#20BAB1',
      title: t('ui.medicalform.setting.component.custom.smsmarketing.title'),
      desc: t(
        'ui.medicalform.setting.component.custom.smsmarketing.description'
      ),
    },
    {
      component: 'custom_phonecall',
      type: { type },
      iconUrl: dobIcon,
      bgcolor: '#20BAB1',
      title: t('ui.medicalform.setting.component.custom.phonecall.title'),
      desc: t('ui.medicalform.setting.component.custom.phonecall.description'),
    },
    {
      component: 'custom_lettermarketing',
      type: { type },
      iconUrl: dobIcon,
      bgcolor: '#20BAB1',
      title: t('ui.medicalform.setting.component.custom.lettermarketing.title'),
      desc: t(
        'ui.medicalform.setting.component.custom.lettermarketing.description'
      ),
    },
    {
      component: 'custom_membershipnumber',
      type: { type },
      iconUrl: dobIcon,
      bgcolor: '#20BAB1',
      title: t(
        'ui.medicalform.setting.component.custom.membershipnumber.title'
      ),
      desc: t(
        'ui.medicalform.setting.component.custom.membershipnumber.description'
      ),
    },
    {
      component: 'custom_authorizationcode',
      type: { type },
      iconUrl: dobIcon,
      bgcolor: '#20BAB1',
      title: t(
        'ui.medicalform.setting.component.custom.authorizationcode.title'
      ),
      desc: t(
        'ui.medicalform.setting.component.custom.authorizationcode.description'
      ),
    },
    {
      component: 'custom_company',
      type: { type },
      iconUrl: customCompanyIcon,
      bgcolor: '#5991D2',
      title: t('ui.medicalform.setting.component.custom.company.title'),
      desc: t('ui.medicalform.setting.component.custom.company.description'),
    },
    {
      component: 'custom_dob',
      type: { type },
      iconUrl: customDobIcon,
      bgcolor: '#88C65B',
      title: t('ui.medicalform.setting.component.custom.dob.title'),
      desc: t('ui.medicalform.setting.component.custom.dob.description'),
    },
    {
      component: 'custom_gender',
      type: { type },
      iconUrl: customGenderIcon,
      bgcolor: '#88C65B',
      title: t('ui.medicalform.setting.component.custom.gender.title'),
      desc: t('ui.medicalform.setting.component.custom.gender.description'),
    },
    {
      component: 'custom_physicaladdress',
      type: { type },
      iconUrl: customPhyAddressIcon,
      bgcolor: '#88C65B',
      title: t('ui.medicalform.setting.component.custom.physicaladdress.title'),
      desc: t(
        'ui.medicalform.setting.component.custom.physicaladdress.description'
      ),
    },
    {
      component: 'custom_referredby',
      type: { type },
      iconUrl: customReferIcon,
      bgcolor: '#88C65B',
      title: t('ui.medicalform.setting.component.custom.referredby.title'),
      desc: t('ui.medicalform.setting.component.custom.referredby.description'),
    },
    {
      component: 'custom_telephonenumber',
      type: { type },
      iconUrl: customTelePhoneIcon,
      bgcolor: '#88C65B',
      title: t('ui.medicalform.setting.component.custom.telephonenumber.title'),
      desc: t(
        'ui.medicalform.setting.component.custom.telephonenumber.description'
      ),
    },
  ]

  const filteredComponent = componentInfos.filter(
    (item) => item.component === component
  )

  return (
    <div
      className={styles.mainBody}
      onClick={() => handlingClickLeft?.(component)}
    >
      {filteredComponent && (
        <LeftSidebarMedicalFormTitle
          iconUrl={filteredComponent[0].iconUrl}
          bgcolor={filteredComponent[0].bgcolor}
          title={filteredComponent[0].title}
          desc={filteredComponent[0].desc}
        />
      )}
    </div>
  )
}

export default LeftSidebarElement
