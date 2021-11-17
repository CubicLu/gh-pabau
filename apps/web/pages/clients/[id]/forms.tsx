import React, { FC, useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import {
  ClientFormsLayout,
  formFilterButtons,
  MedicalFormContact,
} from '@pabau/ui'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { useGetClientFormsQuery } from '@pabau/graphql'
import crypto from 'crypto'

const Forms: FC = () => {
  const router = useRouter()
  const [medicalFormContacts, setMedicalFormContacts] = useState<
    MedicalFormContact[]
  >(null)

  const contactId = useMemo(() => {
    return router.query.id ? Number(router.query.id) : 0
  }, [router.query.id])

  const {
    data: clientForms,
    loading: clientFormsLoading,
  } = useGetClientFormsQuery({
    fetchPolicy: 'network-only',
    variables: {
      contactId: contactId,
    },
  })

  console.log('clientForms =', clientForms)
  console.log('clientFormsLoading =', clientFormsLoading)

  useEffect(() => {
    if (clientForms?.findManyMedicalFormContact && !clientFormsLoading) {
      const t = clientForms?.findManyMedicalFormContact?.map(
        (medicalFormContact) => {
          const data = JSON.parse(atob(medicalFormContact.Form.data))
          console.log('data =', data)
          let medicalFormDetails = []
          let index = 0
          for (const [, item] of data.form_structure.entries()) {
            let title = ''
            if (
              typeof item.title !== 'undefined' &&
              typeof item.title === 'object' &&
              item.title !== null
            ) {
              const t = JSON.parse(JSON.stringify(item.title))
              title = t[1]['value'].trim()
            } else {
              title = item.title.trim()
            }

            let name = ''
            if (item.cssClass === 'epaper') {
              name = ''
            } else {
              if (title !== '') {
                name = title.replace(' ', ' ').trim().toLowerCase()
              } else {
                name = item.values.replace(' ', ' ').trim().toLowerCase()
              }
            }

            const valueKey = index.toString() + name

            console.log('valueKey =', valueKey)

            let label = ''
            if (title !== '') {
              label = title.trim()
            } else {
              label = item.values.trim()
            }

            if (item.cssClass === 'heading') {
              label = '<h3>' + label + '</h3>'
            }

            if (
              (item.cssClass === 'staticText' ||
                item.cssClass === 'staticHTML' ||
                item.cssClass === 'input_text') &&
              medicalFormContact.Prescriber
            ) {
              label.replace(
                '[PRESCRIBER_NAME]',
                medicalFormContact.Prescriber.full_name
              )
              if (medicalFormContact.Form.form_type === 'lab') {
                console.log('.....')
              }
            }

            if (
              item.cssClass === 'staticText' ||
              item.cssClass === 'staticHTML'
            ) {
              label = label.replace('[FNAME]', medicalFormContact.Contact.Fname)
              label = label.replace(
                '[PATIENTID]',
                medicalFormContact.Contact.custom_id
              )
              label = label.replace(
                '[TITLE]',
                medicalFormContact.Contact.Salutation
              )
              label = label.replace(
                '[ANAME]',
                medicalFormContact.Contact.Fname +
                  ' ' +
                  medicalFormContact.Contact.Lname
              )
              label = label.replace('[LNAME]', medicalFormContact.Contact.Lname)
              label = label.replace(
                '[MOBILE]',
                medicalFormContact.Contact.Mobile
              )
              label = label.replace('[PHONE]', medicalFormContact.Contact.Phone)
              label = label.replace(
                '[CLIENTID]',
                medicalFormContact.Contact.custom_id
              )

              if (medicalFormContact.created_at) {
                label = label.replace(
                  '[DATE]',
                  dayjs(medicalFormContact.created_at).format(
                    'DD MMM YYYY, h:mm A'
                  )
                )
              }

              label = label.replace('[EMAIL]', medicalFormContact.Contact.Email)
              label = label.replace(
                '[MAILINGCOUNTRY]',
                medicalFormContact.Contact.MailingCountry
              )
              label = label.replace(
                '[MAILINGCITY]',
                medicalFormContact.Contact.MailingCity
              )
              label = label.replace(
                '[MAILINGPOSTAL]',
                medicalFormContact.Contact.MailingPostal
              )
              label = label.replace(
                '[MAILINGSTREET]',
                medicalFormContact.Contact.MailingStreet
              )
              label = label.replace(
                '[MAILINGPROVINCE]',
                medicalFormContact.Contact.MailingProvince
              )
              if (medicalFormContact.Contact.InsuranceCompany.length > 0)
                label = label.replace(
                  '[INSURANCE_MEMBERSHIP]',
                  medicalFormContact.Contact.InsuranceCompany[0]
                    .membership_number
                )
              if (label.indexOf('[CLIENT_PREFERENCES]') !== -1) {
                const contactId = crypto
                  .createHash('md5')
                  .update(medicalFormContact.contact_id.toString())
                label = label.replace(
                  '[CLIENT_PREFERENCES]',
                  'https://crm.pabau.com/modules/newsletters/update_preferences.php?company=' +
                    medicalFormContact.Form.company_id +
                    '&id=' +
                    contactId
                )
              }

              label = label.replace(
                '[DOB]',
                dayjs(medicalFormContact.Contact.DOB).format(
                  'DD MMM YYYY, h:mm A'
                )
              )
              label = label.replace(
                '[FULLADDRESS]',
                medicalFormContact.Contact.MailingCountry +
                  ', ' +
                  medicalFormContact.Contact.MailingStreet +
                  ', ' +
                  medicalFormContact.Contact.MailingCity +
                  ', ' +
                  medicalFormContact.Contact.MailingPostal
              )

              if (medicalFormContact?.Form?.Company?.details) {
                label = label.replace(
                  '[COMPANYNAME]',
                  medicalFormContact?.Form?.Company?.details.company_name
                )
                label = label.replace(
                  '[COMPANYLOGO]',
                  '<img id="med-logo" src="' +
                    medicalFormContact?.Form?.Company?.details.logo +
                    '" style="max-height:80px;">'
                )
              }

              if (
                item.cssClass === 'staticText' &&
                medicalFormContact.Form.form_type === 'prescription'
              ) {
                continue
              }
            }

            if (item.cssClass === 'cl_services') {
              label = 'Services'
            } else if (item.cssClass === 'cl_drugs') {
              label = 'Drugs'
            } else if (item.cssClass === 'labs_tests') {
              label = 'Labs Tests'
            } else if (item.cssClass === 'vaccine_scheduler') {
              label = 'Vaccine Schedule'
            } else if (item.cssClass === 'vaccine_history') {
              label = 'Vaccine History'
            }

            let realContent = ''
            let content = ''
            const contentValue = medicalFormContact.MedicalContactAttr.filter(
              (medicalContactAttr) =>
                medicalContactAttr.MedicalAttr.name.indexOf(valueKey) >= 0
            )
            if (contentValue.length > 0) {
              content = contentValue[0].value
            }

            if (item.cssClass === 'input_text') {
              realContent = content
            } else if (
              item.cssClass === 'staticText' &&
              medicalFormContact.Form.form_type !== 'prescription'
            ) {
              realContent = content
            } else if (item.cssClass === 'team') {
              realContent = content
            } else if (item.cssClass === 'textarea') {
              realContent = content
            } else if (item.cssClass === 'checkbox') {
              const myArray = content.split(',')
              const t = myArray.map((a) => atob(a))
              realContent = t.join(', ')
            } else if (item.cssClass === 'radio') {
              realContent = content
            } else if (item.cssClass === 'select') {
              realContent = content
            } else if (item.cssClass === 'slider') {
              realContent = content
            } else if (item.cssClass === 'image') {
              realContent = content
            } else if (item.cssClass === 'staticImage') {
              realContent = content
            } else if (item.cssClass === 'signature') {
              realContent = content
            } else if (item.cssClass === 'travel_destination') {
              realContent = content
            } else if (item.cssClass === 'diagram') {
              realContent = content
            } else if (item.cssClass === 'facediagram') {
              realContent = content
            } else if (item.cssClass === 'diagram_mini') {
              realContent = content
            } else if (item.cssClass === 'photo_and_drawer') {
              realContent = content
            } else if (item.cssClass === 'epaper') {
              realContent = content
            } else if (item.cssClass === 'custom_photo_and_drawer') {
              realContent = content
            } else if (item.cssClass === 'cl_services') {
              realContent = content
            } else if (item.cssClass === 'labs_tests') {
              realContent = content
            } else if (item.cssClass === 'vaccine_scheduler') {
              realContent = content
            } else if (item.cssClass === 'vaccine_history') {
              realContent = content
            } else if (item.cssClass === 'cl_drugs') {
              realContent = content
            } else if (item.cssClass === 'history_data') {
              realContent = content
            } else if (item.cssClass === 'btn_medical_condition') {
              realContent = content
            }

            medicalFormDetails = [
              ...medicalFormDetails,
              {
                label: label,
                content: realContent,
              },
            ]

            if (item.cssClass !== 'staticText') {
              index++
            }
            if (item.cssClass === 'heading') {
              index--
            }
          }

          return {
            id: Number(medicalFormContact.id),
            name: medicalFormContact.Form.name,
            user: medicalFormContact.CreatedBy.full_name,
            created: medicalFormContact.created_at,
            updated: medicalFormContact.updated_at,
            type: medicalFormContact.Form.form_type,
            isPinned: false,
            isAdminForm: false,
            data: {
              patient:
                medicalFormContact.Contact.Fname +
                ' ' +
                medicalFormContact.Contact.Lname,
              lastUpdate: medicalFormContact.updated_at
                ? medicalFormContact.updated_at
                : medicalFormContact.created_at
                ? medicalFormContact.created_at
                : '',
              createdOn: medicalFormContact.created_at
                ? medicalFormContact.created_at
                : '',
              createdBy: medicalFormContact.CreatedBy.full_name,
              details: medicalFormDetails,
            },
          }
        }
      )
      setMedicalFormContacts(t)
    }
  }, [clientForms, clientFormsLoading])

  return (
    <ClientCardLayout clientId={Number(router.query.id)} activeTab="forms">
      <ClientFormsLayout
        formFilters={formFilterButtons}
        forms={medicalFormContacts}
        onButtonFilterClick={() => Promise.resolve(true)}
        onFilterClick={() => Promise.resolve(true)}
        onPrintClick={() => Promise.resolve(true)}
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
