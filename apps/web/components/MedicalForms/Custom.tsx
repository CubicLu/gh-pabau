import React, { FC, useEffect, useState } from 'react'
import {
  Pagination,
  DotButton,
  MedicalFormPreview,
  VersionHistory,
  VersionItem,
  Button,
  Table,
  BasicModal,
  MyLottie,
  Notification,
  NotificationType,
} from '@pabau/ui'
import {
  CopyOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { medicalFormData, medicalFormPreviewProps } from './mock'
import treatmentType from '../../assets/images/form-type/treatment.svg'
import { Input } from 'antd'
import styles from './Custom.module.less'
import emailConfirmSent from '../../assets/lottie/email-confirmation-sent.json'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useRouter } from 'next/router'

interface MedicalFormVersion {
  currentVersion: string
  history: {
    [key: string]: VersionItem[]
  }
}

interface MedicalFormItem {
  name: string
  formType: string
  createdAt: string
  version: MedicalFormVersion
  status: string
  index?: number | string
}

interface CustomProps {
  data?: MedicalFormItem[]
}

const defaultData: MedicalFormItem[] = medicalFormData

const Custom: FC<CustomProps> = ({ data }) => {
  const [showVersions, setShowVersions] = useState(false)
  const [currentItem, setCurrentItem] = useState<MedicalFormItem>()
  const [showPreview, setShowPreview] = useState(false)
  const [medicalFormitems, setMedicalFormItems] = useState<MedicalFormItem[]>(
    defaultData
  )
  const [shareModal, setShareModal] = React.useState(false)
  const [successModal, setSuccessModal] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [selectedItem, setSelectedItem] = useState<MedicalFormItem>()
  const [popoverVisible, setPopoverVisible] = useState(false)

  const { t } = useTranslationI18()

  const handleDefault = () => {
    const mappedItems = medicalFormitems.map((item) => {
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

  const router = useRouter()

  const handleIdEditClick = () => {
    router.push(`medical-forms/edit/${currentItem.index}`)
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
    },
    {
      key: 'formType',
      title: t('setup.medical.forms.columns.type'),
      visible: true,
      className: 'drag-visible',
      dataIndex: 'formType',
      /* eslint-disable react/display-name */
      render: (formType, rowData) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={treatmentType} height="16px" alt="treatment type" />
          <span style={{ paddingLeft: '8px' }} onClick={handleIdEditClick}>
            {formType}
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
          <span
            className={styles.versionBtn}
            onClick={() => {
              setCurrentItem(rowData)
              setShowVersions(true)
            }}
          >
            {currentVersion}
          </span>
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
        <Button className={statusValues[status].class}>
          {statusValues[status].title}
        </Button>
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
            <div>
              {showPreview && (
                <MedicalFormPreview
                  {...medicalFormPreviewProps}
                  visible={showPreview}
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
    setMedicalFormItems(data || defaultData)
  }, [data])

  useEffect(() => {
    setMedicalFormItems(medicalFormitems)
  }, [medicalFormitems])

  const handleShareClick = () => {
    setSuccessModal(true)
    setShareModal(false)
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
        dataSource={medicalFormitems as never[]}
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
        onRowClick={(record) => {
          setSelectedItem(record)
        }}
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
      <div className={styles.paginationContainer}>
        <Pagination showingRecords={10} total={medicalFormitems.length} />
      </div>
    </div>
  )
}

export default Custom
