import {
  LeftOutlined,
  PlusSquareFilled,
  SearchOutlined,
} from '@ant-design/icons'
import {
  FindMedicalFormsDocument,
  MedicalFormOrderByInput,
  MedicalFormWhereInput,
  MessageTemplateOrderByInput,
  MessageTemplateWhereInput,
  SortOrder,
  useCreateOneMedicalFormMutation,
  useFindMedicalFormsCountQuery,
  useFindMedicalFormsQuery,
  useFindMessageTemplateQuery,
  useFindUserQuery,
  UserOrderByInput,
  UserWhereInput,
  useUpdateOneMedicalFormMutation,
} from '@pabau/graphql'
import {
  Breadcrumb,
  Button,
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
} from '@pabau/ui'
import { Input, Select, Typography } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { FC, useEffect, useMemo, useState } from 'react'
import notificationBannerImage from '../../../assets/images/notification-image.png'
import Layout from '../../../components/Layout/Layout'
import Custom from '../../../components/MedicalForms/Custom'
import Library from '../../../components/MedicalForms/Library'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './index.module.less'
const { Title } = Typography
const { Option } = Select

enum Tab {
  Custom = '0',
  Library = '1',
}

export const Index: FC = () => {
  const [hideBanner, setHideBanner] = useState(false)
  const [currentTab, setCurrentTab] = useState('0')
  const [query, setQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [medicalFormItems, setMedicalFormItems] = useState<MedicalFormItem[]>(
    []
  )
  const [smsMessageTemplateItems, setSmsMessageTemplateItems] = useState<
    SmsMessageTemplateItem[]
  >([])
  const [emailMessageTemplateItems, setEmailMessageTemplateItems] = useState<
    EmailMessageTemplateItem[]
  >([])
  const [userListItems, setUserListItems] = useState<UserListItem[]>([])

  const [paginateData, setPaginateData] = useState({
    total: 0,
    skip: 0,
    take: 50,
    currentPage: 1,
    showingRecords: 50,
  })

  const [searchData, setSearchrData] = useState({
    formType: '',
    searchValue: '',
    sortName: 'created_at',
    sortOrder: SortOrder.Desc,
  })

  const { t } = useTranslationI18()

  const getQueryVariables = useMemo(() => {
    const whereQuery: MedicalFormWhereInput = {}
    whereQuery.AND = []
    whereQuery.AND.push(
      { user_deleted: { equals: 0 } },
      { name: { not: { equals: '' } } }
    )
    if (searchData.formType !== '') {
      whereQuery.AND.push({ form_type: { equals: searchData.formType } })
    }

    if (searchData.searchValue !== '') {
      whereQuery.AND.push({ name: { contains: searchData.searchValue } })
    }

    const orderBy: MedicalFormOrderByInput = {
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

  const medicalForms = useFindMedicalFormsQuery(getQueryVariables)

  const medicalFormsCount = useFindMedicalFormsCountQuery(getQueryVariables)

  const whereQuerySmsTemplate: MessageTemplateWhereInput = {}
  whereQuerySmsTemplate.AND = []
  whereQuerySmsTemplate.AND.push({ template_type: { equals: 'sms' } })
  const orderBySmsTemplate: MessageTemplateOrderByInput = {
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
  const orderByEmailTemplate: MessageTemplateOrderByInput = {
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
  const orderByUserList: UserOrderByInput = {
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
    if (medicalForms.data?.findManyMedicalForm) {
      const medicalFormList = medicalForms.data?.findManyMedicalForm.map(
        (medicalForm, index) => ({
          key: medicalForm.id.toString(),
          name: medicalForm.name,
          formType: medicalForm.form_type,
          createdAt: dayjs(medicalForm.created_at).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
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
        })
      )
      setMedicalFormItems(medicalFormList)
    }
  }, [medicalForms])

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
                    <Select
                      defaultValue={searchData.formType}
                      style={{ width: 150 }}
                      onChange={(e) => changeSearchData({ formType: e })}
                    >
                      <Option value="">{t('ui.searchtag.selectall')}</Option>
                      <Option value="consent">
                        {t('ui.medicalformbuilder.form.type.consent')}
                      </Option>
                      <Option value="treatment">
                        {t('ui.medicalformbuilder.form.type.treatment')}
                      </Option>
                      <Option value="prescription">
                        {t('ui.medicalformbuilder.form.type.prescription')}
                      </Option>
                      <Option value="epaper">
                        {t('ui.medicalformbuilder.form.type.epaper')}
                      </Option>
                      <Option value="questionnaire">
                        {t('ui.medicalformbuilder.form.type.medicalhistory')}
                      </Option>
                      <Option value="lab">
                        {t('ui.medicalformbuilder.form.type.lab')}
                      </Option>
                    </Select>
                  </div>
                  <div>
                    <Select
                      defaultValue={searchData.sortName}
                      style={{ width: 150 }}
                      onChange={(e) => changeSearchData({ sortName: e })}
                    >
                      <Option value="created_at">
                        {t('setup.medical.forms.columns.createdDate')}
                      </Option>
                      <Option value="name">
                        {t('ui.medicalformbuilder.form.name')}
                      </Option>
                    </Select>
                  </div>
                  <div>
                    <Select
                      defaultValue={searchData.sortOrder}
                      style={{ width: 120 }}
                      onChange={(e) => changeSearchData({ sortOrder: e })}
                    >
                      <Option value={SortOrder.Asc}>
                        {t('setup.medical.forms.search.asc')}
                      </Option>
                      <Option value={SortOrder.Desc}>
                        {t('setup.medical.forms.search.desc')}
                      </Option>
                    </Select>
                  </div>
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
                onHideFormBuilder={() => setShowCreateForm(false)}
                onSaveForm={saveForm}
                create={true}
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
            medicalFormItems={medicalFormItems}
            smsMessageTemplateItems={smsMessageTemplateItems}
            emailMessageTemplateItems={emailMessageTemplateItems}
            userListItems={userListItems}
            onSaveForm={saveForm}
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
