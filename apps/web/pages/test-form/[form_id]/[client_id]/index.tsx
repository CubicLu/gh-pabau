import {
  useGetBusinessDetailsQuery,
  useGetContactDetailsLazyQuery,
  useGetMedicalFormDetailsLazyQuery,
  useFindManyUserGroupsQuery,
  useFindInvProductsQuery,
  useFindManyMedicalCondtionsQuery,
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

const defaultData = {
  clientName: '---',
  dob: '---',
  homeAddress: '---',
  postcode: '---',
  homePhone: '---',
  mobilePhone: '---',
}

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

export const TestForm = () => {
  const { t } = useTranslation('connect')
  const [clientName, setClientName] = useState('')
  const [formData, setFormData] = useState('')
  const [formName, setFormName] = useState('')
  const [dob, setDob] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [postcode, setPostcode] = useState('')
  const [homePhone, setHomePhone] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const [hideMacro, setHideMacro] = useState(true)
  const [hidePadlock, setHidePadlock] = useState(true)

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
  const router = useRouter()

  const [getMedicalFormDetails] = useGetMedicalFormDetailsLazyQuery({
    onCompleted(response) {
      if (response?.findUniqueMedicalForm?.data)
        setFormData(response?.findUniqueMedicalForm?.data)
      if (response?.findUniqueMedicalForm?.name)
        setFormName(response?.findUniqueMedicalForm?.name)
    },
    onError(error) {
      console.error(error)
    },
  })

  const [getContactDetails] = useGetContactDetailsLazyQuery({
    onCompleted(response) {
      if (response?.findManyCmContact?.length > 0) {
        let homeAddress = ''
        if (response.findManyCmContact[0].MailingStreet !== '')
          homeAddress += response.findManyCmContact[0].MailingStreet
        if (response.findManyCmContact[0].MailingCity !== '') {
          if (homeAddress !== '') homeAddress += ', '
          homeAddress += response.findManyCmContact[0].MailingCity
        }
        if (response.findManyCmContact[0].MailingCountry !== '') {
          if (homeAddress !== '') homeAddress += ', '
          homeAddress += response.findManyCmContact[0].MailingCountry
        }
        setClientName(
          response.findManyCmContact[0].Fname +
            ' ' +
            response.findManyCmContact[0].Lname
        )
        if (dayjs(response.findManyCmContact[0].DOB).isValid()) {
          setDob(
            companyDateFormat === 'd/m/Y'
              ? dayjs(response.findManyCmContact[0].DOB).format('DD/MM/YYYY') +
                  ' (' +
                  moment(response.findManyCmContact[0].DOB).toNow(true) +
                  ')'
              : dayjs(response.findManyCmContact[0].DOB).format('MM/DD/YYYY') +
                  ' (' +
                  moment(response.findManyCmContact[0].DOB).toNow(true) +
                  ')'
          )
        } else {
          setDob('--/--/----')
        }

        setHomeAddress(homeAddress !== '' ? homeAddress : '---')
        setPostcode(
          response.findManyCmContact[0].MailingPostal !== ''
            ? response.findManyCmContact[0].MailingPostal
            : '---'
        )
        setHomePhone(
          response.findManyCmContact[0].Phone !== ''
            ? response.findManyCmContact[0].Phone
            : '---'
        )
        setMobilePhone(
          response.findManyCmContact[0].Mobile !== ''
            ? response.findManyCmContact[0].Mobile
            : '---'
        )
      }
    },
    onError(error) {
      console.error(error)
    },
  })

  useEffect(() => {
    const {
      clientName,
      dob,
      homeAddress,
      postcode,
      homePhone,
      mobilePhone,
    } = defaultData
    setClientName(clientName)
    setDob(dob)
    setHomeAddress(homeAddress)
    setPostcode(postcode)
    setHomePhone(homePhone)
    setMobilePhone(mobilePhone)

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
    getMedicalFormDetails({
      variables: {
        medicalFormId: Number(router.query.form_id),
      },
    })
  }, [router.query.form_id, getMedicalFormDetails])

  const businessDetails = useGetBusinessDetailsQuery()

  useEffect(() => {
    if (businessDetails?.data?.me?.Company?.details?.date_format)
      setCompanyDateFormat(
        businessDetails?.data?.me?.Company?.details?.date_format
      )
  }, [businessDetails])

  const saveMedicalFormHistory = (draggedForms: MedicalFormTypes[]) => {
    Notification(
      NotificationType.success,
      `${formName} ${t('connect.account.medicalhistory.form.save.success')}`
    )
  }

  const loggedInUser = useUser()
  const { data: userGroups } = useFindManyUserGroupsQuery()
  const { data: invProducts } = useFindInvProductsQuery()
  const { data: medicalConditions } = useFindManyMedicalCondtionsQuery()

  useEffect(() => {
    console.log('userGroups', userGroups)
    if (userGroups?.findManyUserGroup) {
      const userGroupList = userGroups?.findManyUserGroup.map((userGroup) => ({
        id: userGroup.id,
        group_name: userGroup.group_name,
      }))
      setUserGroupListItems(userGroupList)
    }
  }, [userGroups])

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

  useEffect(() => {
    console.log('invProducts', invProducts)
    if (invProducts?.findManyInvProduct) {
      const invProductsList = invProducts?.findManyInvProduct.map(
        (invProduct) => ({
          id: invProduct.id,
          name: invProduct.name,
          category_id: invProduct.category_id,
        })
      )
      setInvProductsListItems(invProductsList)
    }
  }, [invProducts])

  useEffect(() => {
    console.log('medicalConditions', medicalConditions)
    if (medicalConditions?.findManyMedicalCondition) {
      const medicalConditionsList = medicalConditions?.findManyMedicalCondition.map(
        (medicalCondition) => ({
          id: medicalCondition.id,
          name: medicalCondition.name,
        })
      )
      setMedicalConditionsListItems(medicalConditionsList)
    }
  }, [medicalConditions])

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

  return (
    <div className={styles.testForm}>
      <div className={styles.testFormHeader}>
        <Title>{'Test Form'}</Title>
      </div>
      <div className={styles.testFormContent}>
        <div>
          <div className={styles.item}>
            <span className={styles.title}>
              {t('connect.account.medicalhistory.clientname')}
            </span>
            <span className={styles.content}>{clientName}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>
              {t('connect.account.medicalhistory.dob')}
            </span>
            <span className={styles.content}>{dob}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>
              {t('connect.account.medicalhistory.homeaddress')}
            </span>
            <span className={styles.content}>{homeAddress}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>
              {t('connect.account.medicalhistory.postcode')}
            </span>
            <span className={styles.content}>{postcode}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>
              {t('connect.account.medicalhistory.homephone')}
            </span>
            <span className={styles.content}>{homePhone}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>
              {t('connect.account.medicalhistory.mobilephone')}
            </span>
            <span className={styles.content}>{mobilePhone}</span>
          </div>
        </div>
        <div>
          <FormComponentBuilder
            previewData={formData}
            formSaveLabel={'Save Form'}
            saveMedicalFormHistory={saveMedicalFormHistory}
            onHandleMacro={onHandleMacro}
            medicalFormMacros={medicalFormMacros}
            userGroupListItems={userGroupListItems}
            invProductsListItems={invProductsListItems}
            medicalConditionsListItems={medicalConditionsListItems}
            hideMacro={hideMacro}
            hidePadlock={hidePadlock}
          />
        </div>
      </div>
    </div>
  )
}

export default TestForm
