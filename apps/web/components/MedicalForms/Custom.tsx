import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import {
  BasicModal,
  Button,
  DotButton,
  EmailMessageTemplateItem,
  MedicalFormBuilder,
  MedicalFormItem,
  MedicalFormPreview,
  MyLottie,
  Notification,
  NotificationType,
  Pagination,
  SmsMessageTemplateItem,
  Table,
  UserListItem,
  UserGroupListItem,
  LabTestsListItem,
  MedicalConditionsListItem,
  CompanyListItem,
  VersionHistory,
  MacroItem,
  InvProductsListItem,
} from '@pabau/ui'
import { Input, Tooltip } from 'antd'
import { useMedia } from 'react-use'
// import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import emailConfirmSent from '../../assets/lottie/email-confirmation-sent.json'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './Custom.module.less'
import { medicalFormPreviewProps } from './mock'
import Icon1 from '../../assets/images/form-type/treatment-icon.png'
import Icon2 from '../../assets/images/form-type/consent-icon.png'
import Icon3 from '../../assets/images/form-type/prescription-icon.png'

import treatmentIcon from '../../assets/images/form-type/treatment.svg'
import consentIcon from '../../assets/images/form-type/consent.svg'
import ePaperIcon from '../../assets/images/form-type/e-paper.svg'
import presciptionIcon from '../../assets/images/form-type/presciption.svg'
import labFormIcon from '../../assets/images/form-type/lab-form.svg'
import {
  useDeleteMedicalFormMutation,
  useFindMedicalFormsCountQuery,
} from '@pabau/graphql'

interface Paginate {
  total: number
  skip: number
  take: number
  currentPage: number
  showingRecords: number
}

interface CustomProps {
  isLoading: boolean
  medicalFormItems: MedicalFormItem[]
  smsMessageTemplateItems: SmsMessageTemplateItem[]
  emailMessageTemplateItems: EmailMessageTemplateItem[]
  userListItems: UserListItem[]
  userGroupListItems: UserGroupListItem[]
  labTestsListItems: LabTestsListItem[]
  companyServiceListItems: CompanyListItem[]
  invProductsListItems?: InvProductsListItem[]
  medicalConditionsListItems?: MedicalConditionsListItem[]
  medicalFormMacros: MacroItem[]
  onSaveForm?: (MedicalFormItem) => void
  onHandleMacro?: (action: string, macro: MacroItem) => void
  pagenateParams: Paginate
  updatePaginateData?: (pagenateData: Paginate) => void
}

const Custom: FC<CustomProps> = ({
  isLoading = true,
  medicalFormItems,
  smsMessageTemplateItems,
  emailMessageTemplateItems,
  userListItems,
  userGroupListItems = [],
  labTestsListItems = [],
  companyServiceListItems = [],
  medicalFormMacros = [],
  invProductsListItems = [],
  medicalConditionsListItems = [],
  onSaveForm,
  pagenateParams,
  updatePaginateData,
  onHandleMacro,
}) => {
  const [showVersions, setShowVersions] = useState(false)
  const [currentItem, setCurrentItem] = useState<MedicalFormItem>()
  const [showPreview, setShowPreview] = useState(false)
  const [shareModal, setShareModal] = React.useState(false)
  const [successModal, setSuccessModal] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [editFormModal, setEditFormModal] = React.useState(false)
  const [selectedItem, setSelectedItem] = useState<MedicalFormItem>()
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [popoverVisibleMobile, setPopoverVisibleMobile] = useState(null)
  const isMobile = useMedia('(max-width: 767px)', false)

  const { t } = useTranslationI18()

  const [deleteMutation] = useDeleteMedicalFormMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('clients.clientcard.notes.clientnote.delete')
      )
    },
  })
  const medicalHistoryTypeCount = useFindMedicalFormsCountQuery({
    variables: {
      where: {
        user_deleted: { equals: 0 },
        name: { not: { equals: '' } },
        deleted_at: { equals: null },
        form_type: { equals: 'questionnaire' },
      },
    },
  })
  const formTypeList: { [key: string]: string } = {
    questionnaire: t('ui.medicalformbuilder.form.type.medicalhistory'),
    medicalHistory: t('ui.medicalformbuilder.form.type.medicalhistory'),
    consent: t('ui.medicalformbuilder.form.type.consent'),
    treatment: t('ui.medicalformbuilder.form.type.treatment'),
    epaper: t('ui.medicalformbuilder.form.type.epaper'),
    prescription: t('ui.medicalformbuilder.form.type.prescription'),
    lab: t('ui.medicalformbuilder.form.type.lab'),
  }

  const handleDefault = () => {
    // const mappedItems = medicalFormItems?.map((item) => {
    //   if (
    //     item.index === selectedItem?.index &&
    //     item.formType === ('Questionnaire' || 'Questionnaire Default')
    //   ) {
    //     return { ...item, formType: 'Questionnaire Default' }
    //   }
    //   if (item.formType === 'Questionnaire Default') {
    //     return { ...item, formType: 'Questionnaire' }
    //   }
    //   return item
    // })

    // setMedicalFormItems(mappedItems)
    Notification(
      NotificationType.success,
      `${selectedItem?.name}  ${t('notifications.medicalForm.DefaultForm')}`
    )
    return false
  }

  // const router = useRouter()

  const handleIdEditClick = () => {
    // router.push(`medical-forms/edit/${currentItem.index}`)
    setEditFormModal(true)
  }

  const menuList = [
    {
      key: 1,
      icon: <CopyOutlined />,
      label: t('setup.medical.forms.menuList.clone'),
    },
    {
      key: 2,
      icon: <ShareAltOutlined />,
      label: t('setup.medical.forms.menuList.share'),
      onClick: () => {
        setShareModal(true)
        setPopoverVisible(false)
        setPopoverVisibleMobile(null)
      },
    },
    {
      key: 3,
      icon: <EditOutlined />,
      label: t('setup.medical.forms.menuList.edit'),
      onClick: () => {
        handleIdEditClick()
        setPopoverVisible(false)
        setPopoverVisibleMobile(null)
      },
    },
    {
      key: 4,
      icon: <DeleteOutlined />,
      label: t('setup.medical.forms.menuList.delete'),
      onClick: () => {
        setDeleteModal(true)
        setPopoverVisible(false)
        setPopoverVisibleMobile(null)
      },
    },
    {
      key: 5,
      icon: <EditOutlined />,
      label: t('setup.medical.forms.menuList.default'),
      visible: true,
      onClick: () => {
        handleDefault()
        setPopoverVisible(false)
        setPopoverVisibleMobile(null)
      },
    },
  ]

  const statusValues = {
    active: {
      title: t('setup.medical.forms.statusValues.active'),
      class: styles.activeBtn,
    },
    inactive: {
      title: t('setup.medical.forms.statusValues.inactive'),
      class: styles.inactiveBtn,
    },
    require_setup: {
      title: t('setup.medical.forms.statusValues.requireSetup'),
      class: styles.requireSetupBtn,
    },
  }

  const getImage = (medicalform) => {
    switch (medicalform?.formType) {
      case 'treatment':
        return <img src={Icon1} alt="icon" className={styles.bgIcon} />
      case 'consent':
        return <img src={Icon2} alt="icon" className={styles.bgIcon} />
      case 'lab':
        return <img src={Icon3} alt="icon" className={styles.bgIcon} />
      case 'prescription':
        return <img src={Icon1} alt="icon" className={styles.bgIcon} />
      case 'questionnaire':
        return <img src={Icon2} alt="icon" className={styles.bgIcon} />
      default:
        return null
        break
    }
  }

  const getTypeImage = (formType) => {
    switch (formType) {
      case 'treatment':
        return (
          <img
            src={treatmentIcon}
            height="16px"
            alt="treatment type"
            data-acceptclicking={false}
          />
        )
      case 'consent':
        return (
          <img
            src={consentIcon}
            height="16px"
            alt="consent type"
            data-acceptclicking={false}
          />
        )
      case 'lab':
        return (
          <img
            src={labFormIcon}
            height="16px"
            alt="lab type"
            data-acceptclicking={false}
          />
        )
      case 'prescription':
        return (
          <img
            src={presciptionIcon}
            height="16px"
            alt="prescription type"
            data-acceptclicking={false}
          />
        )
      case 'questionnaire':
        return (
          <img
            src={treatmentIcon}
            height="16px"
            alt="questionnaire type"
            data-acceptclicking={false}
          />
        )
      case 'ePaper':
        return (
          <img
            src={ePaperIcon}
            height="16px"
            alt="ePaper type"
            data-acceptclicking={false}
          />
        )
      default:
        return null
        break
    }
  }
  const createdDate = (createdAt) => {
    const [date] = createdAt.split(' ')
    return <div data-acceptclicking={true}>{date}</div>
  }

  const columns = [
    {
      key: 'name',
      title: t('setup.medical.forms.columns.name'),
      dataIndex: 'name',
      className: 'drag-visible',
      visible: true,
      render: (name, rowData) => (
        <Tooltip placement="topLeft" title={name}>
          <div data-acceptclicking={true} className={styles.name}>
            {name}
          </div>
        </Tooltip>
      ),
    },
    {
      key: 'formType',
      title: t('setup.medical.forms.columns.type'),
      visible: true,
      className: 'drag-visible',
      dataIndex: 'formType',
      render: (formType, rowData) => (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          data-acceptclicking={true}
        >
          {getTypeImage(formType)}
          <span
            style={{ paddingLeft: '8px' }}
            onClick={handleIdEditClick}
            data-acceptclicking={false}
          >
            {formTypeList[formType] ? formTypeList[formType] : 'No Type'}
          </span>
        </div>
      ),
    },
    {
      key: 'createdAt',
      title: t('setup.medical.forms.columns.createdDate'),
      className: 'drag-visible',
      visible: true,
      dataIndex: 'createdAt',
      render: (createdAt, rowData) => createdDate(createdAt),
    },
    {
      key: 'version',
      title: t('setup.medical.forms.columns.version'),
      className: 'drag-visible',
      visible: true,
      dataIndex: 'version',
      render: (version, rowData) => {
        const { currentVersion } = version
        return (
          <div data-acceptclicking={true}>
            <span
              className={styles.versionBtn}
              onClick={() => {
                setCurrentItem(rowData)
                setShowVersions(true)
              }}
              data-acceptclicking={false}
            >
              {currentVersion}
            </span>
          </div>
        )
      },
    },
    {
      key: 'status',
      title: t('setup.medical.forms.columns.status'),
      className: 'drag-visible',
      visible: true,
      dataIndex: 'status',
      render: (status, item) =>
        !item?.Services?.length ? (
          <div data-acceptclicking={true}>
            <Tooltip
              placement="top"
              title="This form will be manually sent to clients."
            >
              <Button className={styles.manualBtn} data-acceptclicking={false}>
                Manual
              </Button>
            </Tooltip>
          </div>
        ) : (
          <div data-acceptclicking={true}>
            <Button
              className={statusValues[status].class}
              data-acceptclicking={false}
            >
              {statusValues[status].title}
              <Tooltip
                placement="top"
                title={item.Services.map((val) => val.name)
                  .join(', ')
                  .replace(/, ([^,]*)$/, ' & $1')}
              >
                <span className={styles.serviceNum}>
                  {item?.Services?.length}
                </span>
              </Tooltip>
            </Button>
          </div>
        ),
    },
    {
      title: '',
      key: 'operation',
      className: `drag-visible preview-col preview-col-visible`,
      visible: true,
      render: (val, item) => (
        <div
          className={styles.tableOperations}
          onClick={(e) => e.stopPropagation()}
        >
          {isMobile ? (
            <div data-acceptclicking={true}>
              <DotButton
                menuList={menuList}
                ignoreOption={{
                  name: 'Default',
                  target: 'Questionnaire',
                  type: item.formType,
                }}
                popoverVisible={
                  item.key === popoverVisibleMobile ? true : false
                }
                setPopoverVisible={(val) =>
                  setPopoverVisibleMobile(val ? item.key : null)
                }
              />
            </div>
          ) : (
            item.index === currentItem?.index && (
              <div data-acceptclicking={true}>
                <Button
                  icon={<EyeOutlined />}
                  style={{ marginRight: '8px' }}
                  onClick={() => setShowPreview((showPreview) => !showPreview)}
                >
                  {t('setup.medical.forms.previewButton.text')}
                </Button>
                <DotButton
                  menuList={menuList}
                  ignoreOption={{
                    name: 'Default',
                    target: 'Questionnaire',
                    type: item.formType,
                  }}
                  popoverVisible={popoverVisible}
                  setPopoverVisible={setPopoverVisible}
                />
              </div>
            )
          )}
        </div>
      ),
    },
    {
      key: 'medicalform',
      className: 'drag-visible icon-img-td',
      visible: isMobile ? true : false,
      /* eslint-disable react/display-name */
      render: (medicalform) => getImage(medicalform),
    },
  ]

  const handleShareClick = () => {
    setSuccessModal(true)
    setShareModal(false)
  }

  const handleSaveForm = (currentMedicalItem) => {
    onSaveForm?.(currentMedicalItem)
    // const index = medicalFormItems.findIndex(
    //   (item) => item.key === currentMedicalItem.key
    // )
    // if (index !== -1) {
    //   medicalFormItems.splice(index, 1, currentMedicalItem)
    //   Notification(
    //     NotificationType.success,
    //     `${currentMedicalItem?.name} - ${t('setup.medical.forms.save.text')}`
    //   )
    // }
    setEditFormModal(false)
  }

  const onPaginationChange = (currentPage, take) => {
    const skip = pagenateParams.take * (currentPage - 1)
    updatePaginateData?.({
      ...pagenateParams,
      skip,
      take,
      currentPage: currentPage,
    })
  }

  const handleDelete = async () => {
    if (currentItem) {
      await deleteMutation({
        variables: {
          formId: Number.parseInt(currentItem.key),
        },
      })
      setDeleteModal(false)
    }
  }

  return (
    <div className={styles.customContainer}>
      {currentItem && (
        <VersionHistory
          currentVersion={currentItem.version.currentVersion}
          history={currentItem.version.history}
          visible={showVersions}
          onVisibleChange={(val) => setShowVersions(val)}
        />
      )}
      <Table
        loading={isLoading}
        draggable={!isLoading}
        dataSource={medicalFormItems as never[]}
        noDataText={'No Data'}
        columns={columns}
        pagination={false}
        isHover={true}
        scroll={{ x: 'max-content' }}
        onRowHover={(record) => {
          setCurrentItem(record)
        }}
        onLeaveRow={(record) => {
          setPopoverVisible(false)
        }}
        onRowClickWithEvent={(record, event) => {
          setSelectedItem(record)
          if (
            typeof event.target.dataset.acceptclicking !== 'undefined' &&
            event.target.dataset.acceptclicking === 'true'
          ) {
            setEditFormModal(true)
          }
          setPopoverVisibleMobile(null)
        }}
        needEvent={true}
      />

      <BasicModal
        visible={shareModal}
        centered
        title={t('setup.medical.forms.shareModal.title')}
        onCancel={() => setShareModal(false)}
        modalWidth={682}
        newButtonText={t('setup.medical.forms.shareModal.btnText')}
        isValidate={true}
        onOk={handleShareClick}
      >
        <p>{t('setup.medical.forms.shareModal.label')}</p>
        <label>{t('setup.medical.forms.shareModal.input.label')}</label>
        <Input
          placeholder={t('setup.medical.forms.shareModal.input.placeholder')}
        />
      </BasicModal>
      <BasicModal
        visible={successModal}
        centered
        modalWidth={452}
        onCancel={() => setSuccessModal(false)}
      >
        <div style={{ marginLeft: -14 }}>
          <MyLottie
            width={400}
            height={400}
            options={{
              animationData: emailConfirmSent,
              autoplay: true,
            }}
          ></MyLottie>
          <div style={{ width: 275, margin: '0 auto' }}>
            <p
              style={{ textAlign: 'center', fontWeight: 500, color: '#3D3D46' }}
            >
              {t('setup.medical.forms.shareModal.success.message')}
            </p>
            <p style={{ textAlign: 'center', fontWeight: 400 }}>
              {t('setup.medical.forms.shareModal.success.message.addition')}
            </p>
          </div>
        </div>
      </BasicModal>
      <BasicModal
        onOk={handleDelete}
        visible={deleteModal}
        centered
        title={t('setup.medical.forms.deleteModal.title')}
        onCancel={() => setDeleteModal(false)}
        modalWidth={682}
        newButtonText={t('setup.medical.forms.deleteModal.btnText')}
        newButtonDisable={
          currentItem?.formType === 'questionnaire' &&
          medicalHistoryTypeCount?.data?.findManyMedicalFormCount <= 1
            ? true
            : false
        }
        isValidate={true}
      >
        <p>
          {currentItem?.formType === 'questionnaire' &&
          medicalHistoryTypeCount?.data?.findManyMedicalFormCount <= 1 ? (
            t('setup.medical.forms.deleteModal.deleteText')
          ) : (
            <>
              {currentItem?.name} {t('common-label-delete-warning')}
            </>
          )}
        </p>
      </BasicModal>
      {showPreview && (
        <MedicalFormPreview
          {...medicalFormPreviewProps}
          visible={showPreview}
          formData={currentItem.formData ? currentItem.formData : ''}
          formName={currentItem.name ? currentItem.name : ''}
          closePreviewDialog={() =>
            setShowPreview((showPreview) => !showPreview)
          }
          onHandleMacro={onHandleMacro}
          medicalFormMacros={medicalFormMacros}
          userGroupListItems={userGroupListItems}
          invProductsListItems={invProductsListItems}
          medicalConditionsListItems={medicalConditionsListItems}
        />
      )}
      <MedicalFormBuilder
        visible={editFormModal}
        previewData={selectedItem?.formData}
        preFormName={selectedItem?.name}
        preFormType={selectedItem?.formType}
        preFormServices={selectedItem?.serviceId}
        currentForm={selectedItem}
        onHideFormBuilder={() => setEditFormModal(false)}
        onSaveForm={handleSaveForm}
        onHandleMacro={onHandleMacro}
        create={false}
        smsMessageTemplateItems={smsMessageTemplateItems}
        emailMessageTemplateItems={emailMessageTemplateItems}
        userListItems={userListItems}
        userGroupListItems={userGroupListItems}
        labTestsListItems={labTestsListItems}
        medicalFormMacros={medicalFormMacros}
        companyServiceListItems={companyServiceListItems}
        invProductsListItems={invProductsListItems}
        medicalConditionsListItems={medicalConditionsListItems}
      />
      <div className={styles.paginationContainer}>
        <Pagination
          total={pagenateParams.total}
          defaultPageSize={10}
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSizeOptions={['10', '25', '50', '100']}
          onPageSizeChange={(pageSize) => {
            updatePaginateData?.({
              ...pagenateParams,
              showingRecords: pageSize,
              take: pageSize,
            })
          }}
          pageSize={pagenateParams.take}
          current={pagenateParams.currentPage}
          showingRecords={pagenateParams.showingRecords}
        />
      </div>
    </div>
  )
}

export default Custom
