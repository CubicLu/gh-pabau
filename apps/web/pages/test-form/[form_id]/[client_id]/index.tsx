import {
  useGetBusinessDetailsQuery,
  useGetContactDetailsLazyQuery,
  useGetMedicalFormDetailsLazyQuery,
  useGetLatestMedicalHistoryFormAttrLazyQuery,
  useGetMedicalContactFormLazyQuery,
  useFindManyUserGroupsQuery,
  useFindInvProductsQuery,
  useFindManyMedicalCondtionsQuery,
  useDeleteMedicalFormContactMutation,
  useCreateOneMedicalFormContactMutation,
  useCreateOneMedicalAttrMutation,
} from '@pabau/graphql'
import {
  FormComponentBuilder,
  MedicalFormTypes,
  Notification,
  NotificationType,
  MacroItem,
  UserGroupListItem,
  InvProductsListItem,
  MedicalConditionsListItem,
  useLiveQuery,
  previewMapping,
  PreviewAttr,
  AttrFieldType,
} from '@pabau/ui'
import { useUser } from '../../../../context/UserContext'
import { Typography } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../../style.module.less'
import { gql, useMutation } from '@apollo/client'

const { Title } = Typography

const LIST_QUERY_MACRO = gql`
  query medical_form_macro($createdBy: Int = 0) {
    medical_form_macro(
      where: {
        _or: [{ created_by: { _eq: $createdBy } }, { type: { _eq: 0 } }]
      }
    ) {
      id
      createdAt
      title
      message
      type
      created_by
      company_id
    }
  }
`
const ADD_MUTATION_MACRO = gql`
  mutation insert_medical_form_macro_one(
    $title: String
    $message: String
    $type: Int
    $created_by: Int
    $company_id: Int
  ) {
    insert_medical_form_macro_one(
      object: {
        title: $title
        message: $message
        type: $type
        created_by: $created_by
        company_id: $company_id
      }
    ) {
      id
    }
  }
`

const DELETE_MUTATION_MACRO = gql`
  mutation delete_medical_form_macro_by_pk($id: Int!) {
    delete_medical_form_macro_by_pk(id: $id) {
      id
    }
  }
`

const updateQueryParams = (params: { name: string; value: string }[]) => {
  const queryParams = new URLSearchParams(window.location.search)
  for (const { name, value } of params) {
    queryParams.set(name, `${value}`)
  }
  window.history.pushState(null, null, '?' + queryParams.toString())
}

export const TestForm = () => {
  const { t } = useTranslation('connect')
  const router = useRouter()

  const [formData, setFormData] = useState('')
  const [formName, setFormName] = useState('')
  const [formAttrs, setFormAttrs] = useState<PreviewAttr[]>([])
  const [formAttrsLoading, setFormAttrsLoading] = useState(false)
  const [dob, setDob] = useState('---')
  const [postcode, setPostcode] = useState('---')
  const [homePhone, setHomePhone] = useState('---')
  const [clientName, setClientName] = useState('---')
  const [homeAddress, setHomeAddress] = useState('---')
  const [mobilePhone, setMobilePhone] = useState('---')
  const [hideMacro, setHideMacro] = useState(true)
  const [hidePadlock, setHidePadlock] = useState(true)
  const [saveFormLoading, setSaveFormLoading] = useState(false)

  const [companyDateFormat, setCompanyDateFormat] = useState('d/m/Y')
  const [medicalFormMacros, setMedicalFormMacros] = useState<MacroItem[]>([])
  const [userGroupListItems, setUserGroupListItems] = useState<
    UserGroupListItem[]
  >([])
  const [invProductsListItems, setInvProductsListItems] = useState<
    InvProductsListItem[]
  >([])
  const [medicalConditionsListItems, setMedicalConditionsListItems] = useState<
    MedicalConditionsListItem[]
  >([])

  useGetBusinessDetailsQuery({
    onCompleted({ me }) {
      if (me?.Company?.details?.date_format)
        setCompanyDateFormat(me?.Company?.details?.date_format)
    },
  })
  useFindInvProductsQuery({
    onCompleted({ findManyInvProduct: data }) {
      const invProductsList = data?.map((invProduct) => ({
        id: invProduct.id,
        name: invProduct.name,
        category_id: invProduct.category_id,
      }))
      setInvProductsListItems(invProductsList)
    },
  })
  useFindManyUserGroupsQuery({
    onCompleted({ findManyUserGroup: data }) {
      const userGroupList = data?.map((userGroup) => ({
        id: userGroup.id,
        group_name: userGroup.group_name,
      }))
      setUserGroupListItems(userGroupList)
    },
  })
  useFindManyMedicalCondtionsQuery({
    onCompleted({ findManyMedicalCondition: data }) {
      const medicalConditionsList = data?.map((medicalCondition) => ({
        id: medicalCondition.id,
        name: medicalCondition.name,
      }))
      setMedicalConditionsListItems(medicalConditionsList)
    },
  })

  const [getMedicalFormDetails] = useGetMedicalFormDetailsLazyQuery({
    onCompleted(response) {
      if (response?.findUniqueMedicalForm?.data)
        setFormData(response?.findUniqueMedicalForm?.data)
      if (response?.findUniqueMedicalForm?.name)
        setFormName(response?.findUniqueMedicalForm?.name)
    },
  })

  const [getMedicalHistoryAttr] = useGetLatestMedicalHistoryFormAttrLazyQuery({
    onCompleted({ medicalHistoryAttributes }) {
      setFormAttrsLoading(() => false)
      if (medicalHistoryAttributes) {
        const { MedicalContactAttr } = medicalHistoryAttributes
        setFormAttrs(MedicalContactAttr as PreviewAttr[])
      }
    },
    onError() {
      setFormAttrsLoading(() => false)
    },
  })

  const [getMedicalContactForm] = useGetMedicalContactFormLazyQuery({
    onCompleted({ medicalHistoryAttributes }) {
      setFormAttrsLoading(() => false)
      if (medicalHistoryAttributes) {
        const { MedicalContactAttr } = medicalHistoryAttributes
        setFormAttrs(MedicalContactAttr as PreviewAttr[])
      }
    },
    onError() {
      setFormAttrsLoading(() => false)
    },
  })

  const [getContactDetails] = useGetContactDetailsLazyQuery({
    onCompleted({ findManyCmContact }) {
      if (findManyCmContact?.length > 0) {
        let homeAddress = ''
        if (findManyCmContact[0].MailingStreet !== '')
          homeAddress += findManyCmContact[0].MailingStreet
        if (findManyCmContact[0].MailingCity !== '') {
          if (homeAddress !== '') homeAddress += ', '
          homeAddress += findManyCmContact[0].MailingCity
        }
        if (findManyCmContact[0].MailingCountry !== '') {
          if (homeAddress !== '') homeAddress += ', '
          homeAddress += findManyCmContact[0].MailingCountry
        }
        setClientName(
          `${findManyCmContact[0].Fname} ${findManyCmContact[0].Lname}`
        )
        if (dayjs(findManyCmContact[0].DOB).isValid()) {
          setDob(
            companyDateFormat === 'd/m/Y'
              ? dayjs(findManyCmContact[0].DOB).format('DD/MM/YYYY') +
                  ' (' +
                  moment(findManyCmContact[0].DOB).toNow(true) +
                  ')'
              : dayjs(findManyCmContact[0].DOB).format('MM/DD/YYYY') +
                  ' (' +
                  moment(findManyCmContact[0].DOB).toNow(true) +
                  ')'
          )
        }

        setHomeAddress(homeAddress)
        setPostcode(findManyCmContact[0].MailingPostal)
        setHomePhone(findManyCmContact[0].Phone)
        setMobilePhone(findManyCmContact[0].Mobile)
      }
    },
  })

  const [deleteFormContactMutation] = useDeleteMedicalFormContactMutation()
  const [
    addMedicalFormContactMutation,
  ] = useCreateOneMedicalFormContactMutation({
    onCompleted({ createOneMedicalFormContact }) {
      const contactFormId = createOneMedicalFormContact?.id
      updateQueryParams([{ name: 'id', value: contactFormId?.toString() }])
      Notification(NotificationType.success, t('setup.medical.forms.save.text'))
      setSaveFormLoading(() => false)
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.medical.forms.save.err.text')
      )
      setSaveFormLoading(() => false)
    },
  })

  const [addMedicalAttrMutation] = useCreateOneMedicalAttrMutation()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (
      params.get('mode') &&
      params.get('mode') === 'employee' &&
      params.get('uid')
    ) {
      setHideMacro(false)
      setHidePadlock(false)
    }
  }, [])

  useEffect(() => {
    getContactDetails({
      variables: {
        contactId: { equals: Number(router.query.client_id) },
      },
    })
  }, [router.query.client_id, getContactDetails])

  useEffect(() => {
    const { mode = '', form_id = 0, client_id = 0 } = router.query
    getMedicalFormDetails({
      variables: {
        medicalFormId: Number(form_id),
      },
    })
    if (!mode) {
      setFormAttrsLoading(() => true)
      getMedicalHistoryAttr({
        variables: {
          contactId: Number(client_id),
          formId: Number(form_id),
        },
      })
    }
  }, [router.query, getMedicalFormDetails, getMedicalHistoryAttr])

  useEffect(() => {
    const { id = 0, mode = '', client_id = 0 } = router.query
    if (mode === 'update') {
      setFormAttrsLoading(() => true)
      getMedicalContactForm({
        variables: {
          contactId: Number(client_id),
          contactFormId: Number(id),
        },
      })
    }
  }, [router.query, getMedicalContactForm])

  const loggedInUser = useUser()
  const getMacroQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        createdBy: loggedInUser?.me?.user,
      },
    }
    return queryOptions
  }, [loggedInUser])

  const { data: macros } = useLiveQuery(
    LIST_QUERY_MACRO,
    getMacroQueryVariables
  )

  useEffect(() => {
    if (typeof macros !== 'undefined' && macros) {
      const medicalFormMacroList = macros.map((macro, index) => ({
        id: macro.id,
        title: macro.title,
        message: macro.message,
        type: macro.type,
        createdAt:
          companyDateFormat === 'd/m/Y'
            ? dayjs(macro.createdAt).format('DD/MM/YYYY HH:mm:ss')
            : dayjs(macro.createdAt).format('MM/DD/YYYY HH:mm:ss'),
      }))
      setMedicalFormMacros(medicalFormMacroList)
    }
  }, [macros, companyDateFormat])

  const [addMacroMutation] = useMutation(ADD_MUTATION_MACRO, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.medical.forms.macro.create.text')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.medical.forms.macro.create.err.text')
      )
    },
  })

  const [delMacroMutation] = useMutation(DELETE_MUTATION_MACRO, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.medical.forms.macro.del.text')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.medical.forms.macro.del.err.text')
      )
    },
  })

  const onHandleMacro = async (action, macro) => {
    if (action === 'add') {
      const creatMacroVariables = {
        title: macro.title,
        message: macro.message,
        type: macro.type,
        company_id: loggedInUser?.me?.company,
        created_by: loggedInUser?.me?.user,
      }
      await addMacroMutation({
        variables: creatMacroVariables,
        refetchQueries: [
          {
            query: LIST_QUERY_MACRO,
            ...getMacroQueryVariables,
          },
        ],
      })
    } else if (action === 'del') {
      await delMacroMutation({
        variables: { id: Number(macro.id) },
        refetchQueries: [
          {
            query: LIST_QUERY_MACRO,
            ...getMacroQueryVariables,
          },
        ],
      })
    }
  }

  const saveMedicalFormContact = async (draggedForms: AttrFieldType[]) => {
    const complete = 1
    const custom_contact_id = 0
    const custom_contact_name = ''
    const custom_user_name = ''
    const diagnosis_code = ''
    const form_status = 0
    const imported = 0
    const locked = 0
    const pharmacy_id = 0
    const priority = 'pLow'
    const related_to = 0
    const user_created = loggedInUser?.me?.user
    const user_updated = 0
    const history_mode = 'insert'
    const medical_attr_attachment_size = 0
    const medical_attr_custom_contact_id = 0
    const medical_attr_custom_contact_name = ''
    let creatMedicalContactAttrVariables = []
    for (const [, item] of draggedForms.entries()) {
      creatMedicalContactAttrVariables = [
        ...creatMedicalContactAttrVariables,
        {
          attachment_size: medical_attr_attachment_size,
          contact_id: Number(router.query.client_id),
          custom_contact_id: medical_attr_custom_contact_id,
          custom_contact_name: medical_attr_custom_contact_name,
          group_label: formName,
          value: typeof item?.attrValue === 'undefined' ? '' : item?.attrValue,
          MedicalAttr: {
            connect: {
              id: Number(
                typeof item?.attrId === 'undefined' ? 0 : item?.attrId
              ),
            },
          },
        },
      ]
    }

    const creatMedicalFormContactVariables = {
      Form: { connect: { id: Number(router.query.form_id) } },
      Contact: { connect: { ID: Number(router.query.client_id) } },
      CreatedBy: { connect: { id: Number(user_created) } },
      complete: complete,
      custom_contact_id: custom_contact_id,
      custom_contact_name: custom_contact_name,
      custom_user_name: custom_user_name,
      diagnosis_code: diagnosis_code,
      form_status: form_status,
      imported: imported,
      locked: locked,
      pharmacy_id: pharmacy_id,
      priority: priority,
      related_to: related_to,
      user_updated: user_updated,
      MedicalFormContactHistory: {
        create: [
          {
            Company: {
              connect: { id: Number(loggedInUser?.me?.company) },
            },
            mode: history_mode,
            user_id: user_created,
            contact_id: Number(router.query.client_id),
          },
        ],
      },
      MedicalContactAttr: {
        create: creatMedicalContactAttrVariables,
      },
    }

    await deleteFormContactMutation({
      variables: {
        deletedAt: dayjs(),
        formContactId: Number(router.query.id),
      },
    })

    await addMedicalFormContactMutation({
      variables: { data: { ...creatMedicalFormContactVariables } },
    })
  }

  const saveMedicalAttr = async (draggedForms: AttrFieldType[]) => {
    for (const [, item] of draggedForms.entries()) {
      const creatMedicalAttrVariables = {
        name: item.attrName,
        description: '',
        Company: {},
      }
      await addMedicalAttrMutation({
        variables: { data: { ...creatMedicalAttrVariables } },
      }).then((e) => (item.attrId = e.data.createOneMedicalAttr.id))
    }
    saveMedicalFormContact(draggedForms)
  }

  const saveMedicalFormHistory = (draggedForms: MedicalFormTypes[]) => {
    setSaveFormLoading(() => true)
    let attrNameIndex = 0
    const newDraggedForms: AttrFieldType[] = []
    for (const [, item] of draggedForms.entries()) {
      const cAttr: AttrFieldType = {}

      const cssClassArr = previewMapping.find(
        (mappingItem) => Object.values(mappingItem)[0] === item.formName
      )

      let cssClass = ''
      if (cssClassArr) cssClass = Object.keys(cssClassArr)?.[0]

      if (cssClass === '' || cssClass === 'heading') {
        continue
      }
      let attr_name = ''
      if (item.txtQuestion !== '') {
        attr_name = attrNameIndex + item.txtQuestion.trim()
      } else if (item.txtValue !== '') {
        attr_name = attrNameIndex + item.txtValue.trim()
      } else if (item.arrItems.length > 0) {
        attr_name = attrNameIndex + item.arrItems[0].name.trim()
      } else {
        attr_name = attrNameIndex + 'nothing'
      }
      if (cssClass === 'labs_tests') {
        attr_name = attrNameIndex + 'labs_tests[]'
      }
      if (cssClass === 'btn_medical_condition') {
        attr_name = attrNameIndex + 'btn_medical_condition'
      }
      cAttr.attrName = attr_name.replaceAll('_', ' ').toLowerCase()

      if (cssClass === 'input_text' || cssClass === 'textarea') {
        cAttr.attrValue = item.txtValue || item.arrValue
      } else if (cssClass === 'checkbox') {
        const vals = item.arrItems.filter(
          (arrItem) => item.arrValue.indexOf(arrItem.id.toString()) >= 0
        )
        if (vals.length > 0) {
          const val1 = vals.map((val) =>
            btoa(unescape(encodeURIComponent(val.name)))
          )
          cAttr.attrValue = val1.join(',')
        } else {
          cAttr.attrValue = ''
        }
      } else if (
        cssClass === 'radio' ||
        cssClass === 'select' ||
        cssClass === 'slider'
      ) {
        const val = item.arrItems.filter(
          (arrItem) => arrItem.id === Number(item.txtValue)
        )
        if (val.length > 0) cAttr.attrValue = val[0].name
      } else if (cssClass === 'labs_tests') {
        cAttr.attrValue = item?.arrValue?.join(',')
      } else if (cssClass === 'cl_drugs') {
        const drugs = item?.arrValue?.map((el) => {
          if (typeof el === 'string') return el
          return el
        })
        if (drugs?.length) {
          for (const [index, drug] of drugs?.entries()) {
            for (const key of Object.keys(drug)) {
              if (
                key !== 'key' &&
                key !== 'dosageOptions' &&
                key !== 'quantityOptions' &&
                drug[key]
              ) {
                newDraggedForms.push({
                  attrName: `${attrNameIndex}drug${key}${index + 1}`,
                  attrValue: drug[key],
                })
              }
            }
          }
        }
        attrNameIndex++
        continue
      } else if (cssClass === 'btn_medical_condition') {
        cAttr.attrValue =
          typeof item?.arrValue === 'object'
            ? item?.arrValue?.join(',')
            : item?.arrValue
      } else {
        cAttr.attrValue = item?.arrValue
      }
      newDraggedForms.push(cAttr)
      attrNameIndex++
    }
    saveMedicalAttr(newDraggedForms)
  }

  const ClientDetails = () => {
    return (
      <div>
        <div className={styles.item}>
          <span className={styles.title}>
            {t('connect.account.medicalhistory.clientname')}
          </span>
          <span className={styles.content}>{clientName || '---'}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.title}>
            {t('connect.account.medicalhistory.dob')}
          </span>
          <span className={styles.content}>{dob || '---'}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.title}>
            {t('connect.account.medicalhistory.homeaddress')}
          </span>
          <span className={styles.content}>{homeAddress || '---'}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.title}>
            {t('connect.account.medicalhistory.postcode')}
          </span>
          <span className={styles.content}>{postcode || '---'}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.title}>
            {t('connect.account.medicalhistory.homephone')}
          </span>
          <span className={styles.content}>{homePhone || '---'}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.title}>
            {t('connect.account.medicalhistory.mobilephone')}
          </span>
          <span className={styles.content}>{mobilePhone || '---'}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.testForm}>
      <div className={styles.testFormHeader}>
        <Title>{'Test Form'}</Title>
      </div>
      <div className={styles.testFormContent}>
        <ClientDetails />
        <div>
          {!formAttrsLoading && (
            <FormComponentBuilder
              previewData={formData}
              previewAttrs={formAttrs}
              formSaveLabel={'Save Form'}
              saveMedicalFormHistory={saveMedicalFormHistory}
              onHandleMacro={onHandleMacro}
              medicalFormMacros={medicalFormMacros}
              userGroupListItems={userGroupListItems}
              invProductsListItems={invProductsListItems}
              medicalConditionsListItems={medicalConditionsListItems}
              hideMacro={hideMacro}
              hidePadlock={hidePadlock}
              saveFormLoading={saveFormLoading}
            />
          )}
          {formAttrsLoading && 'Loading...'}
        </div>
      </div>
    </div>
  )
}

export default TestForm
