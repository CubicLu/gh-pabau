import React, { FC, useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import {
  ClientFormsLayout,
  MedicalFormContact,
  basicFormFilters,
  FormFilterProps,
} from '@pabau/ui'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { useGetClientFormsQuery } from '@pabau/graphql'
import crypto from 'crypto'

const isBase64 = (str) => {
  if (str === '' || str.trim() === '') return false
  try {
    return btoa(atob(str)) === str
  } catch {
    return false
  }
}

const utc = (date: string) => {
  return dayjs(date).utc()?.format('DD-MMM-YYYY hh:mm:ss A')
}

const returnLastUpdate = (medFormContact) => {
  if (medFormContact?.updated_at) return medFormContact?.updated_at
  if (medFormContact?.created_at) return medFormContact?.created_at
  return ''
}
const returnCreatedOn = (medFormContact) => {
  if (medFormContact?.created_at) return medFormContact?.created_at
  return ''
}

const processMedicalContactForms = (medicalFormData) => {
  return medicalFormData?.map((medicalFormContact) => {
    let medicalFormDetails = []
    const {
      Contact = {},
      created_at = '',
      CreatedBy = {},
      Prescriber = {},
    } = medicalFormContact
    if (isBase64(medicalFormContact?.Form?.data)) {
      const parsedBase64 = atob(medicalFormContact.Form.data)
      const data = JSON.parse(parsedBase64?.replace("it\\'s", ''))
      const formType = medicalFormContact?.Form?.form_type
      let index = 0

      for (const [, item] of data.form_structure.entries()) {
        const { cssClass = '', title: iTitle = '' } = item
        if (cssClass === 'staticText' && formType === 'treatment') continue

        let title = ''
        if (
          typeof iTitle !== 'undefined' &&
          typeof iTitle === 'object' &&
          iTitle !== null
        ) {
          const t = JSON.parse(JSON.stringify(iTitle))
          title = t[1]['value'].trim()
        } else if (typeof iTitle !== 'undefined' && iTitle !== null) {
          title = iTitle.trim()
        }

        let name = ''
        if (cssClass === 'epaper') name = ''
        else {
          if (title !== '') {
            name = title?.replaceAll(' ', ' ').trim().toLowerCase()
          } else {
            name = item?.values?.replaceAll(' ', ' ').trim().toLowerCase()
          }
        }

        const valueKey = index.toString() + name

        let label = ''
        if (title !== '') {
          label = title?.trim()
        } else {
          label = item?.values?.trim()
        }

        if (cssClass === 'heading') {
          label = '<h3>' + label + '</h3>'
        }

        if (
          (cssClass === 'staticText' ||
            cssClass === 'staticHTML' ||
            cssClass === 'input_text') &&
          Prescriber
        ) {
          label.replaceAll('[PRESCRIBER_NAME]', Prescriber.full_name)
          // if (formType === 'lab') {
          //   console.log('.....')
          // }
        }

        if (cssClass === 'staticText' || cssClass === 'staticHTML') {
          label = label.replaceAll('[FNAME]', Contact?.Fname)
          label = label.replaceAll('[PATIENTID]', Contact?.custom_id)
          label = label.replaceAll('[TITLE]', Contact?.Salutation)
          label = label.replaceAll(
            '[ANAME]',
            Contact?.Fname + ' ' + Contact?.Lname
          )
          label = label.replaceAll(
            '[APPOINTMENTNAME]',
            Contact?.Fname + ' ' + Contact?.Lname
          )
          label = label.replaceAll('[APPOINTMENTFIRSTNAME]', Contact?.Fname)
          label = label.replaceAll('[APPOINTMENTLASTNAME]', Contact?.Lname)
          label = label.replaceAll('[CLIENTEMAIL]', Contact?.Email)
          label = label.replaceAll('[CLIENTDOB]', Contact?.DOB)
          label = label.replaceAll('[CLIENTGENDER]', Contact?.gender)
          label = label.replaceAll('[CLIENTPHONE]', Contact?.Phone)
          label = label.replaceAll('[CLIENTMOBILE]', Contact?.Mobile)
          label = label.replaceAll('[CLIENTSALUTATION]', Contact?.Salutation)
          label = label.replaceAll('[CLIENTCITY]', Contact?.MailingCity)
          label = label.replaceAll('[CLIENTSTREET]', Contact?.MailingStreet)
          label = label.replaceAll('[CLIENTPOSTAL]', Contact?.MailingPostal)
          label = label.replaceAll('[CLIENTCOUNTRY]', Contact?.MailingCountry)
          label = label.replaceAll(
            '[CLIENTMAILINGCOUNTRY]',
            Contact?.MailingCountry
          )

          // label = label.replaceAll('[APPOINTMENTMANAGE]', '')
          // label = label.replaceAll('[MEDICAL_FORM]', '')
          // label = label.replaceAll('[BDAYVOUCHER]', '')
          // label = label.replaceAll('[PRESCRIPTION_DATE]', '')
          // label = label.replaceAll('[PACKAGE_NAME]', '')
          // label = label.replaceAll('[CLIENT_INS_COMP]', '')
          // label = label.replaceAll('[CLIENT_INS_CONTRACT]', '')
          // label = label.replaceAll('[CLIENT_INS_MEM_NUM]', '')
          // label = label.replaceAll('[CLIENT_INS_AUTH_CODE]', '')
          // label = label.replaceAll('[CLIENT_INS_MOBILE]', '')
          // label = label.replaceAll('[CLIENT_INS_WEBSITE]', '')
          // label = label.replaceAll('[CLIENT_INS_CITY]', '')
          // label = label.replaceAll('[CLIENT_INS_STREET]', '')
          // label = label.replaceAll('[CLIENT_INS_COUNTY]', '')
          // label = label.replaceAll('[CLIENT_INS_POSTAL]', '')
          // label = label.replaceAll('[CLIENT_INS_EMAIL]', '')
          // label = label.replaceAll('[CLIENT_INS_IMAGE]', '')
          // label = label.replaceAll('[CLIENT_INS_COUNTRY]', '')
          // label = label.replaceAll('[CLIENT_INS_STREET2]', '')
          // label = label.replaceAll('[CLIENT_INS_PROVIDERNUM]', '')
          // label = label.replaceAll('[CLIENTLOYALTY]', '')
          // label = label.replaceAll('[CLIENTFORM]', '')
          // label = label.replaceAll('[CLIENTCOUNTY]', '')
          // label = label.replaceAll('[CLIENTADDRESS2]', '')
          // label = label.replaceAll('[DIAG_CODE]', '')
          // label = label.replaceAll('[NUMBER_OF_SESSIONS]', '')

          label = label.replaceAll('[LNAME]', Contact?.Lname)
          label = label.replaceAll('[MOBILE]', Contact?.Mobile)
          label = label.replaceAll('[PHONE]', Contact?.Phone)
          label = label.replaceAll('[CLIENTID]', Contact?.custom_id)

          if (created_at) {
            label = label.replaceAll(
              '[DATE]',
              dayjs(created_at).format('DD MMM YYYY, h:mm A')
            )
          }

          label = label.replaceAll('[EMAIL]', Contact?.Email)
          label = label.replaceAll('[MAILINGCOUNTRY]', Contact?.MailingCountry)
          label = label.replaceAll('[MAILINGCITY]', Contact?.MailingCity)
          label = label.replaceAll('[MAILINGPOSTAL]', Contact?.MailingPostal)
          label = label.replaceAll('[MAILINGSTREET]', Contact?.MailingStreet)
          label = label.replaceAll(
            '[MAILINGPROVINCE]',
            Contact?.MailingProvince
          )
          if (Contact?.InsuranceCompany.length > 0) {
            label = label.replaceAll(
              '[INSURANCE_MEMBERSHIP]',
              Contact?.InsuranceCompany?.[0]?.membership_number
            )
          }
          if (label.indexOf('[CLIENT_PREFERENCES]') !== -1) {
            const contactId = crypto
              .createHash('md5')
              .update(medicalFormContact.contact_id.toString())
            label = label?.replaceAll(
              '[CLIENT_PREFERENCES]',
              `https://crm.pabau.com/modules/newsletters/update_preferences.php?company=${medicalFormContact.Form.company_id}&id=${contactId}`
            )
          }

          label = label.replaceAll(
            '[DOB]',
            dayjs(Contact?.DOB).format('DD MMM YYYY, h:mm A')
          )
          label = label.replaceAll(
            '[FULLADDRESS]',
            `${Contact?.MailingCountry}, 
              ${Contact?.MailingStreet}, 
              ${Contact?.MailingCity}, 
              ${Contact?.MailingPostal}`
          )
          label = label.replaceAll(
            '[FULLADDRESS2]',
            `${Contact?.MailingCountry}, 
              ${Contact?.MailingStreet}, 
              ${Contact?.MailingCity}, 
              ${Contact?.MailingPostal}`
          )

          if (medicalFormContact?.Form?.Company?.details) {
            label = label.replaceAll(
              '[COMPANYNAME]',
              medicalFormContact?.Form?.Company?.details.company_name
            )
            label = label.replaceAll(
              '[COMPANYLOGO]',
              `<img id="med-logo" src="${medicalFormContact?.Form?.Company?.details.logo}" style="max-height:80px;">`
            )
          }

          if (cssClass === 'staticText' && formType === 'prescription') continue
        }

        if (cssClass === 'cl_services') label = 'Services'
        else if (cssClass === 'cl_drugs') label = 'Drugs'
        else if (cssClass === 'labs_tests') label = 'Labs Tests'
        else if (cssClass === 'vaccine_scheduler') label = 'Vaccine Schedule'
        else if (cssClass === 'vaccine_history') label = 'Vaccine History'

        let realContent = ''
        let content = ''
        const contentValue = medicalFormContact.MedicalContactAttr.filter(
          (medicalContactAttr) =>
            medicalContactAttr.MedicalAttr.name.indexOf(valueKey) >= 0
        )
        if (contentValue.length > 0) content = contentValue[0].value

        if (cssClass === 'input_text') realContent = content
        else if (cssClass === 'staticText' && formType !== 'prescription')
          realContent = content
        else if (cssClass === 'team') realContent = content
        else if (cssClass === 'textarea') realContent = content
        else if (cssClass === 'checkbox') {
          const myArray = content.split(',')
          const t = myArray.map((a) => atob(a))
          realContent = t?.length > 0 ? t.join(', ') : 'None selected'
        } else if (cssClass === 'radio') realContent = content
        else if (cssClass === 'select') realContent = content
        else if (cssClass === 'slider') realContent = content
        else if (cssClass === 'image') realContent = content
        else if (cssClass === 'staticImage') realContent = content
        else if (cssClass === 'signature') realContent = content
        else if (cssClass === 'travel_destination') realContent = content
        else if (cssClass === 'diagram') realContent = content
        else if (cssClass === 'facediagram') realContent = content
        else if (cssClass === 'diagram_mini') realContent = content
        else if (cssClass === 'photo_and_drawer') realContent = content
        else if (cssClass === 'epaper') realContent = content
        else if (cssClass === 'custom_photo_and_drawer') realContent = content
        else if (cssClass === 'cl_services') realContent = content
        else if (cssClass === 'labs_tests') realContent = content
        else if (cssClass === 'vaccine_scheduler') realContent = content
        else if (cssClass === 'vaccine_history') realContent = content
        else if (cssClass === 'cl_drugs') realContent = content
        else if (cssClass === 'history_data') realContent = content
        else if (cssClass === 'btn_medical_condition') realContent = content

        medicalFormDetails = [
          ...medicalFormDetails,
          {
            label: label,
            content: realContent,
            clsClass: cssClass,
          },
        ]

        if (cssClass !== 'staticText') index++
        if (cssClass === 'heading') index--
      }
    }

    return {
      id: Number(medicalFormContact?.id),
      name: medicalFormContact?.Form?.name,
      user: CreatedBy?.full_name,
      created: utc(created_at),
      updated: utc(medicalFormContact?.updated_at),
      type: medicalFormContact?.Form.form_type,
      isPinned: false,
      isAdminForm: false,
      data: {
        patient: `${Contact?.Fname} ${Contact?.Lname}`,
        lastUpdate: returnLastUpdate(medicalFormContact?.updated_at),
        createdOn: returnCreatedOn(created_at),
        createdBy: CreatedBy?.full_name,
        details: medicalFormDetails,
      },
    }
  })
}

const allFilter = [
  {
    id: 0,
    type: 'All',
    selected: true,
  },
]

const Forms: FC = () => {
  const router = useRouter()

  const [formFilters, setFormFilters] = useState<FormFilterProps[]>([])
  const [medicalFormContacts, setMedicalFormContacts] = useState<
    MedicalFormContact[]
  >(null)

  const variables = useMemo(() => {
    const selected = formFilters
      ?.filter((el) => el?.key && el?.selected)
      ?.map((el) => el?.key || '')
    return {
      contactId: router.query.id ? Number(router.query.id) : 0,
      formTypes: selected,
    }
  }, [router.query.id, formFilters])

  const {
    data: clientForms,
    loading: clientFormsLoading,
  } = useGetClientFormsQuery({
    fetchPolicy: 'network-only',
    variables: variables,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    if (basicFormFilters?.length) {
      setFormFilters([...allFilter, ...basicFormFilters])
    }
  }, [])

  useEffect(() => {
    if (clientForms?.findManyMedicalFormContact && !clientFormsLoading) {
      const arrangedClientForms = processMedicalContactForms(
        clientForms?.findManyMedicalFormContact
      )
      setMedicalFormContacts(arrangedClientForms)
    }
  }, [clientForms, clientFormsLoading])

  return (
    <ClientCardLayout clientId={Number(router.query.id)} activeTab="forms">
      <ClientFormsLayout
        formFilterButtons={formFilters}
        setFormFilterButtons={setFormFilters}
        forms={medicalFormContacts}
        onFilterClick={() => Promise.resolve(true)}
        onShareCick={() => Promise.resolve(true)}
        onVersionClick={() => Promise.resolve(true)}
        onEditClick={() => Promise.resolve(true)}
        onPinClick={() => Promise.resolve(true)}
        onDeleteClick={() => Promise.resolve(true)}
      />
    </ClientCardLayout>
  )
}

export default Forms
