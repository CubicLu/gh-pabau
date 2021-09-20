import {
  LeftOutlined,
  PlusSquareFilled,
  SearchOutlined,
} from '@ant-design/icons'
import {
  FindMedicalFormsDocument,
  MedicalFormOrderByWithRelationInput,
  MedicalFormWhereInput,
  MessageTemplateOrderByWithRelationInput,
  MessageTemplateWhereInput,
  SortOrder,
  useCreateOneMedicalFormMutation,
  useFindMedicalFormsCountQuery,
  useFindMedicalFormsQuery,
  useFindMessageTemplateQuery,
  useFindUserQuery,
  useGetBusinessDetailsQuery,
  UserOrderByWithRelationInput,
  UserWhereInput,
  useUpdateOneMedicalFormMutation,
} from '@pabau/graphql'
import {
  Breadcrumb,
  Button,
  defaultMedicaFormAdvanceSettingData,
  EmailMessageTemplateItem,
  MedicalFilter,
  MedicalFormBuilder,
  MedicalFormItem,
  MobileHeader,
  Notification,
  NotificationBanner,
  NotificationType,
  SmsMessageTemplateItem,
  TabMenu,
  UserListItem,
  useLiveQuery,
  MacroItem,
} from '@pabau/ui'
import { useUser } from '../../../context/UserContext'
import { Input, Typography } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { FC, useEffect, useMemo, useState } from 'react'
import notificationBannerImage from '../../../assets/images/notification-image.png'
import Layout from '../../../components/Layout/Layout'
import Custom from '../../../components/MedicalForms/Custom'
import Library from '../../../components/MedicalForms/Library'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { gql, useMutation } from '@apollo/client'
import styles from './index.module.less'
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

enum Tab {
  Custom = '0',
  Library = '1',
}

function isValidJSONString(str) {
  try {
    JSON.parse(str)
  } catch {
    return false
  }
  return true
}

export const Index: FC = () => {
  const [hideBanner, setHideBanner] = useState(false)
  const [currentTab, setCurrentTab] = useState('0')
  const [query, setQuery] = useState('')
  const [companyDateFormat, setCompanyDateFormat] = useState('d/m/Y')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [medicalFormItems, setMedicalFormItems] = useState<MedicalFormItem[]>(
    []
  )
  const [medicalFormMacros, setMedicalFormMacros] = useState<MacroItem[]>([])
  const [smsMessageTemplateItems, setSmsMessageTemplateItems] = useState<
    SmsMessageTemplateItem[]
  >([])
  const [emailMessageTemplateItems, setEmailMessageTemplateItems] = useState<
    EmailMessageTemplateItem[]
  >([])
  const [userListItems, setUserListItems] = useState<UserListItem[]>([
    {
      id: 0,
      full_name: 'Appointment owner',
    },
  ])

  const [paginateData, setPaginateData] = useState({
    total: 0,
    skip: 0,
    take: 50,
    currentPage: 1,
    showingRecords: 50,
  })

  const [searchData, setSearchrData] = useState({
    searchValue: '',
    sortName: 'created_at',
    sortOrder: SortOrder.Desc,
  })

  const { t } = useTranslationI18()
  const loggedInUser = useUser()
  const getQueryVariables = useMemo(() => {
    const whereQuery: MedicalFormWhereInput = {}
    whereQuery.AND = []
    whereQuery.AND.push(
      { user_deleted: { equals: 0 } },
      { name: { not: { equals: '' } } }
    )

    if (searchData.searchValue !== '') {
      whereQuery.AND.push({ name: { contains: searchData.searchValue } })
    }

    const orderBy: MedicalFormOrderByWithRelationInput = {
      [searchData.sortName]: searchData.sortOrder,
    }

    const queryOptions = {
      variables: {
        take: paginateData.take,
        skip: paginateData.skip,
        where: whereQuery,
        orderBy: orderBy,
      },
    }
    return queryOptions
  }, [paginateData.take, paginateData.skip, searchData])

  const businessDetails = useGetBusinessDetailsQuery()
  const {
    data: medicalForms,
    loading: loadingMedicalForms,
  } = useFindMedicalFormsQuery(getQueryVariables)

  const medicalFormsCount = useFindMedicalFormsCountQuery(getQueryVariables)

  const whereQuerySmsTemplate: MessageTemplateWhereInput = {}
  whereQuerySmsTemplate.AND = []
  whereQuerySmsTemplate.AND.push({ template_type: { equals: 'sms' } })
  const orderBySmsTemplate: MessageTemplateOrderByWithRelationInput = {
    template_id: SortOrder.Asc,
  }

  const getSmsMessageTemplateQueryVariables = {
    variables: {
      where: whereQuerySmsTemplate,
      orderBy: orderBySmsTemplate,
    },
  }

  const smsMessageTemplates = useFindMessageTemplateQuery(
    getSmsMessageTemplateQueryVariables
  )

  const whereQueryEmailTemplate: MessageTemplateWhereInput = {}
  whereQueryEmailTemplate.AND = []
  whereQueryEmailTemplate.AND.push({ template_type: { equals: 'email' } })
  const orderByEmailTemplate: MessageTemplateOrderByWithRelationInput = {
    template_id: SortOrder.Asc,
  }

  const getEmailMessageTemplateQueryVariables = {
    variables: {
      where: whereQueryEmailTemplate,
      orderBy: orderByEmailTemplate,
    },
  }

  const emailMessageTemplates = useFindMessageTemplateQuery(
    getEmailMessageTemplateQueryVariables
  )

  const whereQueryUserList: UserWhereInput = {}
  whereQueryUserList.AND = []
  whereQueryUserList.AND.push({ deleted: { not: { equals: 1 } } })
  const orderByUserList: UserOrderByWithRelationInput = {
    full_name: SortOrder.Asc,
  }

  const getUserListQueryVariables = {
    variables: {
      where: whereQueryUserList,
      orderBy: orderByUserList,
    },
  }

  const userLists = useFindUserQuery(getUserListQueryVariables)

  useEffect(() => {
    if (businessDetails?.data?.me?.Company?.details?.date_format)
      setCompanyDateFormat(
        businessDetails?.data?.me?.Company?.details?.date_format
      )
  }, [businessDetails])

  useEffect(() => {
    if (medicalForms?.findManyMedicalForm) {
      const medicalFormList = medicalForms?.findManyMedicalForm.map(
        (medicalForm, index) => ({
          key: medicalForm.id.toString(),
          name: medicalForm.name,
          formType: medicalForm.form_type,
          createdAt:
            companyDateFormat === 'd/m/Y'
              ? dayjs(medicalForm.created_at).format('DD/MM/YYYY HH:mm:ss')
              : dayjs(medicalForm.created_at).format('MM/DD/YYYY HH:mm:ss'),
          version: {
            currentVersion: '3',
            history: {
              last_week: [
                {
                  version: '3',
                  updatedBy: 'William Brandham',
                  date: 'January 22, 2:27 PM',
                },
                {
                  version: '2',
                  updatedBy: 'Meri Redjepi',
                  date: 'January 22, 1:26 PM',
                },
                {
                  version: '1',
                  updatedBy: 'Meri Redjepi',
                  date: 'January 22, 2:27 PM',
                },
              ],
            },
          },
          status: 'active',
          index: index,
          formData: medicalForm.data,
          rules: [],
          advSetting:
            medicalForm.MedicalFormAdvancedSetting.length > 0
              ? {
                  id: medicalForm.MedicalFormAdvancedSetting[0].id,
                  shareToClient: medicalForm.MedicalFormAdvancedSetting[0]
                    .share_to_client
                    ? 1
                    : 0,
                  reminder: medicalForm.MedicalFormAdvancedSetting[0].reminder,
                  data: isValidJSONString(
                    medicalForm.MedicalFormAdvancedSetting[0].data
                  )
                    ? JSON.parse(medicalForm.MedicalFormAdvancedSetting[0].data)
                    : defaultMedicaFormAdvanceSettingData.data,
                }
              : defaultMedicaFormAdvanceSettingData,
        })
      )
      setMedicalFormItems(medicalFormList)
    }
  }, [medicalForms, companyDateFormat])

  useEffect(() => {
    if (medicalFormsCount.data?.findManyMedicalFormCount) {
      setPaginateData((prevData) => {
        return {
          ...prevData,
          total: medicalFormsCount.data?.findManyMedicalFormCount,
        }
      })
    }
  }, [medicalFormsCount])

  useEffect(() => {
    if (smsMessageTemplates.data?.findManyMessageTemplate) {
      const smsMessageTemplateList = smsMessageTemplates.data?.findManyMessageTemplate.map(
        (smsMessageTemplateItem) => ({
          template_id: smsMessageTemplateItem.template_id,
          template_name: smsMessageTemplateItem.template_name,
        })
      )
      setSmsMessageTemplateItems(smsMessageTemplateList)
    }
  }, [smsMessageTemplates])

  useEffect(() => {
    if (emailMessageTemplates.data?.findManyMessageTemplate) {
      const emailMessageTemplateList = emailMessageTemplates.data?.findManyMessageTemplate.map(
        (emailMessageTemplateItem) => ({
          template_id: emailMessageTemplateItem.template_id,
          template_name: emailMessageTemplateItem.template_name,
        })
      )
      setEmailMessageTemplateItems(emailMessageTemplateList)
    }
  }, [emailMessageTemplates])

  useEffect(() => {
    if (userLists.data?.findManyUser) {
      const userList = userLists.data?.findManyUser.map((user) => ({
        id: user.id,
        full_name: user.full_name,
      }))
      userList.splice(0, 0, {
        id: 0,
        full_name: 'Appointment owner',
      })
      setUserListItems(userList)
    }
  }, [userLists])

  const [addMutation] = useCreateOneMedicalFormMutation({
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('setup.medical.forms.create.text')
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.medical.forms.create.err.text')
      )
    },
  })

  const [editMutation] = useUpdateOneMedicalFormMutation({
    onCompleted(data) {
      Notification(NotificationType.success, t('setup.medical.forms.save.text'))
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.medical.forms.save.err.text')
      )
    },
  })

  const saveForm = async (medicalItem) => {
    setShowCreateForm(false)

    const updateVariables = {
      where: {
        id: Number(medicalItem.key),
      },
      data: {
        name: { set: medicalItem.name },
        data: { set: medicalItem.formData },
        form_type: {
          set:
            medicalItem.formType === 'medicalHistory'
              ? 'questionnaire'
              : medicalItem.formType,
        },
        updated_at: { set: dayjs() },
        MedicalFormAdvancedSetting:
          Number(medicalItem.advSetting.id) === 0
            ? {
                create: [
                  {
                    share_to_client:
                      medicalItem.advSetting.shareToClient === 1 ? true : false,
                    reminder: medicalItem.advSetting.reminder,
                    data: JSON.stringify(medicalItem.advSetting.data),
                  },
                ],
              }
            : {
                update: [
                  {
                    data: {
                      share_to_client: {
                        set:
                          medicalItem.advSetting.shareToClient === 1
                            ? true
                            : false,
                      },
                      reminder: { set: medicalItem.advSetting.reminder },
                      data: JSON.stringify(medicalItem.advSetting.data),
                    },
                    where: {
                      id: Number(medicalItem.advSetting.id),
                    },
                  },
                ],
              },
      },
    }

    const creatVariables = {
      data: {
        name: medicalItem.name,
        form_type:
          medicalItem.formType === 'medicalHistory'
            ? 'questionnaire'
            : medicalItem.formType,
        data: medicalItem.formData,
        created_at: dayjs(),
        user_deleted: 0,
        locked: 0,
        printout: '',
        user_created: 0,
        encoded: 0,
        service_id: '',
        temp_static: 0,
        old_data: '',
        form_category: '',
        author: '',
        diagnosis_code: '',
        is_fav: 0,
        diagnosis_code_enabled: 0,
        lab_id: 0,
        Company: {},
        MedicalFormAdvancedSetting: {
          create: [
            {
              share_to_client:
                medicalItem.advSetting.shareToClient === 1 ? true : false,
              reminder: medicalItem.advSetting.reminder,
              data: JSON.stringify(medicalItem.advSetting.data),
            },
          ],
        },
      },
    }

    await (medicalItem.key !== ''
      ? editMutation({
          variables: updateVariables,
          refetchQueries: [
            {
              query: FindMedicalFormsDocument,
              ...getQueryVariables,
            },
          ],
        })
      : addMutation({
          variables: creatVariables,
          refetchQueries: [
            {
              query: FindMedicalFormsDocument,
              ...getQueryVariables,
            },
          ],
        }))
  }

  const createForm = () => {
    setShowCreateForm(true)
  }

  const updatePaginateData = (paginateData) => {
    setPaginateData(paginateData)
  }

  const changeSearchData = (item) => {
    const newSearchData = {
      ...searchData,
      [Object.keys(item)[0]]: item[Object.keys(item)[0]],
    }
    setSearchrData(newSearchData)
  }

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

  return (
    <Layout>
      <NotificationBanner
        title={t('setup.medical.forms.notificationBanner.title')}
        desc={t('setup.medical.forms.notificationBanner.desc')}
        imgPath={notificationBannerImage}
        allowClose={true}
        setHide={[hideBanner, setHideBanner]}
        enableClientForms={t(
          'setup.medical.forms.notificationBanner.enableClientForms'
        )}
      />

      <div className={styles.medicalFormsContainer}>
        <div className={styles.desktopViewNone}>
          {currentTab === Tab.Custom && (
            <MobileHeader className={styles.mobileHeader}>
              <div className={styles.allContentAlignMobile}>
                <div className={styles.mobileHeaderTextStyle}>
                  <Link href="/setup">
                    <LeftOutlined />
                  </Link>
                  <p>{t('setup.medical.forms.patientFormName')}</p>
                </div>
                <div className={styles.mobileHeaderOpsStyle}>
                  <MedicalFilter />
                  <PlusSquareFilled
                    className={styles.plusIconStyle}
                    onClick={() => setShowCreateForm(true)}
                  />
                </div>
              </div>
            </MobileHeader>
          )}
          {currentTab === Tab.Library && (
            <MobileHeader className={styles.mobileHeader}>
              <div className={styles.allContentAlignMobile}>
                <div className={styles.mobileHeaderTextStyle}>
                  <Link href="/setup">
                    <LeftOutlined />
                  </Link>
                  <p>{t('setup.medical.forms.patientFormName')}</p>
                </div>
                <div className={styles.mobileHeaderOpsStyle}>
                  <Input
                    value={searchData.searchValue}
                    onChange={(e) =>
                      changeSearchData({ searchValue: e.target.value })
                    }
                    placeholder={t('setup.medical.forms.searchLibrary')}
                  />
                </div>
              </div>
            </MobileHeader>
          )}
        </div>
        <div className={styles.medicalFormsHeader}>
          <div>
            <Breadcrumb
              breadcrumbItems={[
                {
                  breadcrumbName: t('navigation-breadcrumb-setup'),
                  path: 'setup',
                },
                {
                  breadcrumbName: t('setup.medical.forms.patientFormName'),
                  path: '',
                },
              ]}
            />
            <Title>{t('setup.medical.forms.patientFormName')}</Title>
          </div>
          <div className={styles.medicalFormsOps}>
            {currentTab === Tab.Custom && (
              <>
                <div className={styles.medicalFormsSearch}>
                  <div>
                    <Input
                      value={searchData.searchValue}
                      onChange={(e) =>
                        changeSearchData({ searchValue: e.target.value })
                      }
                      addonAfter={<SearchOutlined />}
                      placeholder={t('setup.medical.forms.searchMyForms')}
                    />
                  </div>
                </div>
                <div>
                  <MedicalFilter />
                </div>
                <div>
                  <Button type="primary" onClick={createForm}>
                    {t('setup.medical.forms.createForm.text')}
                  </Button>
                </div>
              </>
            )}
            {currentTab === Tab.Library && (
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                addonAfter={<SearchOutlined />}
                placeholder={t('setup.medical.forms.searchLibrary')}
              />
            )}
            {showCreateForm && (
              <MedicalFormBuilder
                visible={showCreateForm}
                previewData=""
                preFormName=""
                preFormType=""
                onHideFormBuilder={() => setShowCreateForm(false)}
                onSaveForm={saveForm}
                create={true}
                smsMessageTemplateItems={smsMessageTemplateItems}
                emailMessageTemplateItems={emailMessageTemplateItems}
                userListItems={userListItems}
                medicalFormMacros={medicalFormMacros}
              />
            )}
          </div>
        </div>
        <TabMenu
          tabPosition="top"
          minHeight="1px"
          menuItems={[
            t('setup.medical.forms.menuItems.myForms'),
            t('setup.medical.forms.menuItems.library'),
          ]}
          onTabClick={(key) => setCurrentTab(key)}
        >
          <Custom
            isLoading={loadingMedicalForms}
            medicalFormItems={medicalFormItems}
            smsMessageTemplateItems={smsMessageTemplateItems}
            emailMessageTemplateItems={emailMessageTemplateItems}
            userListItems={userListItems}
            medicalFormMacros={medicalFormMacros}
            onSaveForm={saveForm}
            onHandleMacro={onHandleMacro}
            pagenateParams={paginateData}
            updatePaginateData={updatePaginateData}
          />
          <Library />
        </TabMenu>
      </div>
    </Layout>
  )
}

export default Index
