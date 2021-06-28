import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import {
  useFindMedicalFormsCountQuery,
  useFindMedicalFormsQuery,
} from '@pabau/graphql'
import {
  BasicModal,
  Button,
  DotButton,
  MedicalFormBuilder,
  MedicalFormItem,
  MedicalFormPreview,
  MyLottie,
  Notification,
  NotificationType,
  Pagination,
  Table,
  VersionHistory,
} from '@pabau/ui'
import { Input } from 'antd'
import moment from 'moment'
// import { useRouter } from 'next/router'
import React, { FC, useEffect, useMemo, useState } from 'react'
import treatmentType from '../../assets/images/form-type/treatment.svg'
import emailConfirmSent from '../../assets/lottie/email-confirmation-sent.json'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './Custom.module.less'
import { medicalFormPreviewProps } from './mock'

interface CustomProps {
  addItem?: MedicalFormItem
  data?: MedicalFormItem[]
}

const Custom: FC<CustomProps> = ({ addItem = null, data }) => {
  const [showVersions, setShowVersions] = useState(false)
  const [currentItem, setCurrentItem] = useState<MedicalFormItem>()
  const [showPreview, setShowPreview] = useState(false)
  const [medicalFormItems, setMedicalFormItems] = useState<MedicalFormItem[]>(
    []
  )
  const [shareModal, setShareModal] = React.useState(false)
  const [successModal, setSuccessModal] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [editFormModal, setEditFormModal] = React.useState(false)
  const [selectedItem, setSelectedItem] = useState<MedicalFormItem>()
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    skip: 0,
    take: 10,
    currentPage: 1,
    showingRecords: 10,
  })

  const { t } = useTranslationI18()

  const formTypeList: { [key: string]: string } = {
    medicalHistory: t('ui.medicalformbuilder.form.type.medicalhistory'),
    consent: t('ui.medicalformbuilder.form.type.consent'),
    treatmentForm: t('ui.medicalformbuilder.form.type.treatment'),
    epaper: t('ui.medicalformbuilder.form.type.epaper'),
    presciption: t('ui.medicalformbuilder.form.type.presciption'),
    labForm: t('ui.medicalformbuilder.form.type.lab'),
  }

  const getQueryVariables = useMemo(() => {
    const queryOptions = {
      variables: {
        take: paginateData.take,
        skip: paginateData.skip,
        isDeleted: 0,
      },
    }
    return queryOptions
  }, [paginateData.take, paginateData.skip])

  const medicalForms = useFindMedicalFormsQuery(getQueryVariables)

  const medicalFormsCount = useFindMedicalFormsCountQuery(getQueryVariables)

  useEffect(() => {
    if (medicalForms.data?.medicalForms) {
      const medicalFormList = medicalForms.data?.medicalForms.map(
        (medicalForm, index) => ({
          key: medicalForm.id.toString(),
          name: medicalForm.name,
          formType: medicalForm.form_type,
          createdAt: moment(medicalForm.created_at).format(
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
    if (medicalFormsCount.data?.medicalFormsCount) {
      setPaginateData((prevData) => {
        return {
          ...prevData,
          total: medicalFormsCount.data?.medicalFormsCount,
        }
      })
    }
  }, [medicalFormsCount])

  const handleDefault = () => {
    const mappedItems = medicalFormItems.map((item) => {
      if (
        item.index === selectedItem?.index &&
        item.formType === ('Questionnaire' || 'Questionnaire Default')
      ) {
        return { ...item, formType: 'Questionnaire Default' }
      }
      if (item.formType === 'Questionnaire Default') {
        return { ...item, formType: 'Questionnaire' }
      }
      return item
    })

    setMedicalFormItems(mappedItems)
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
      },
    },
    {
      key: 3,
      icon: <EditOutlined />,
      label: t('setup.medical.forms.menuList.edit'),
      onClick: () => {
        handleIdEditClick()
        setPopoverVisible(false)
      },
    },
    {
      key: 4,
      icon: <DeleteOutlined />,
      label: t('setup.medical.forms.menuList.delete'),
      onClick: () => {
        setDeleteModal(true)
        setPopoverVisible(false)
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

  const columns = [
    {
      key: 'name',
      title: t('setup.medical.forms.columns.name'),
      dataIndex: 'name',
      className: 'drag-visible',
      visible: true,
      /* eslint-disable react/display-name */
      render: (name, rowData) => <div data-acceptclicking={true}>{name}</div>,
    },
    {
      key: 'formType',
      title: t('setup.medical.forms.columns.type'),
      visible: true,
      className: 'drag-visible',
      dataIndex: 'formType',
      /* eslint-disable react/display-name */
      render: (formType, rowData) => (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          data-acceptclicking={true}
        >
          <img
            src={treatmentType}
            height="16px"
            alt="treatment type"
            data-acceptclicking={false}
          />
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
      /* eslint-disable react/display-name */
      render: (createdAt, rowData) => (
        <div data-acceptclicking={true}>{createdAt}</div>
      ),
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
      render: (status) => (
        <div data-acceptclicking={true}>
          <Button
            className={statusValues[status].class}
            data-acceptclicking={false}
          >
            {statusValues[status].title}
          </Button>
        </div>
      ),
    },
    {
      title: '',
      key: 'operation',
      className: 'drag-visible',
      visible: true,
      render: (val, item) => (
        <div className={styles.tableOperations}>
          {item.index === currentItem?.index && (
            <div data-acceptclicking={true}>
              {showPreview && (
                <MedicalFormPreview
                  {...medicalFormPreviewProps}
                  visible={showPreview}
                  formData={item.formData ? item.formData : ''}
                  formName={item.name ? item.name : ''}
                  closePreviewDialog={() =>
                    setShowPreview((showPreview) => !showPreview)
                  }
                />
              )}
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
          )}
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (addItem) {
      setMedicalFormItems((prevItems) => [
        ...prevItems,
        {
          ...addItem,
          index: prevItems.length,
          key: (prevItems.length + 1).toString(),
        },
      ])
    }
  }, [addItem])

  const handleShareClick = () => {
    setSuccessModal(true)
    setShareModal(false)
  }

  const saveForm = (currentMedicalItem) => {
    const index = medicalFormItems.findIndex(
      (item) => item.key === currentMedicalItem.key
    )
    if (index !== -1) {
      medicalFormItems.splice(index, 1, currentMedicalItem)
      Notification(
        NotificationType.success,
        `${currentMedicalItem?.name} - ${t('setup.medical.forms.save.text')}`
      )
    }
    setEditFormModal(false)
  }

  const onPaginationChange = (currentPage, take) => {
    const skip = paginateData.take * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      skip,
      take,
      currentPage: currentPage,
    })
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
        draggable
        dataSource={medicalFormItems as never[]}
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
        visible={deleteModal}
        centered
        title={t('setup.medical.forms.deleteModal.title')}
        onCancel={() => setDeleteModal(false)}
        modalWidth={682}
        newButtonText={t('setup.medical.forms.deleteModal.btnText')}
        isValidate={true}
      >
        <p>
          {currentItem?.name} {t('common-label-delete-warning')}
        </p>
      </BasicModal>
      <MedicalFormBuilder
        visible={editFormModal}
        previewData={currentItem?.formData}
        preFormName={currentItem?.name}
        currentForm={currentItem}
        onHideFormBuilder={() => setEditFormModal(false)}
        onSaveForm={saveForm}
        create={false}
      />
      <div className={styles.paginationContainer}>
        <Pagination
          total={paginateData.total}
          defaultPageSize={10}
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSizeOptions={['10', '25', '50', '100']}
          onPageSizeChange={(pageSize) => {
            setPaginateData({
              ...paginateData,
              showingRecords: pageSize,
              take: pageSize,
            })
          }}
          pageSize={paginateData.take}
          current={paginateData.currentPage}
          showingRecords={paginateData.showingRecords}
        />
      </div>
    </div>
  )
}

export default Custom
