import React, { FC, RefObject } from 'react'
import {
  Table,
  Button,
  Switch,
  FormikInput,
  ImageSelectorModal,
  Pagination,
  BasicModal as CreateCategoryModal,
} from '@pabau/ui'
import {
  ServiceCategoriesDocument,
  ServiceCategoriesAggregateDocument,
} from '@pabau/graphql'
import { Formik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import {
  PlusOutlined,
  PictureOutlined,
  CloseCircleFilled,
} from '@ant-design/icons'
import { appointmentColors } from '../../../mocks/Services'
import styles from './CategoriesTab.module.less'

interface EditCategory {
  id: string
  name: string
  assigned: string
  color: string
  image: string
  order: number
  is_active: boolean
}

interface PaginateDataType {
  total: number
  offset: number
  limit: number
  currentPage: number
  showingRecords: number
}

export interface ColumnType {
  title: string
  dataIndex: string
  visible: boolean
  className?: string
  render?: (val, row) => JSX.Element
}

interface QueryVariablesType {
  variables: QueryVariablesProps
}

interface QueryVariablesProps {
  offset?: number
  limit?: number
  searchTerm?: string
}

interface CategoriesProps {
  editData: EditCategory
  handleSubmitCategory: (val, { resetForm }) => void
  categoryTableRef: RefObject<HTMLDivElement>
  isLoading: boolean
  sourceData: EditCategory[]
  columns: ColumnType[]
  searchTerm: string
  openModal: () => void
  setEditData: (e) => void
  updateOrder: (e) => void
  setSourceData: (e) => void
  paginateData: PaginateDataType
  onPaginationChange: (cp, limit) => void
  setPaginateData: (e) => void
  modalShowState: boolean
  closeModal: () => void
  showImageSelector: boolean
  setShowImageSelector: (e) => void
  openDeleteModal: boolean
  setDeleteModal: (e) => void
  deleteMutation: (e) => void
  listQueryVariables: () => QueryVariablesType
  listAggregateQueryVariables: () => QueryVariablesType
}

const Categories: FC<CategoriesProps> = ({
  editData,
  handleSubmitCategory,
  categoryTableRef,
  isLoading,
  sourceData,
  columns,
  searchTerm,
  openModal,
  setEditData,
  updateOrder,
  setSourceData,
  paginateData,
  onPaginationChange,
  setPaginateData,
  modalShowState,
  closeModal,
  showImageSelector,
  setShowImageSelector,
  openDeleteModal,
  setDeleteModal,
  deleteMutation,
  listQueryVariables,
  listAggregateQueryVariables,
}) => {
  const { t } = useTranslationI18()
  const categoriesSchema = Yup.object({
    name: Yup.string().required(
      t('setup.services.categoriestab.createservicecategory.requiredmessage')
    ),
  })
  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        editData?.id
          ? editData
          : {
              name: undefined,
              color: undefined,
              is_active: true,
              image: undefined,
            }
      }
      validationSchema={categoriesSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmitCategory(values, { resetForm })
      }}
    >
      {({ setFieldValue, handleSubmit, handleReset, values, errors }) => (
        <div ref={categoryTableRef} className={styles.categoriesTabMain}>
          <Table
            loading={isLoading}
            draggable={true}
            dataSource={sourceData?.map((e: { id }) => ({
              key: e.id,
              ...e,
            }))}
            scroll={{ x: 'max-content' }}
            columns={columns}
            pagination={false}
            searchTerm={searchTerm}
            noDataBtnText={t(
              'setup.services.categoriestab.table.nodatabtntext'
            )}
            noDataText={t('setup.services.categoriestab.table.nodatatext')}
            onAddTemplate={openModal}
            onRowClick={(e) => {
              openModal()
              setEditData(e)
            }}
            updateDataSource={({ newData, oldIndex, newIndex }) => {
              setSourceData(
                (newData = newData.map((data: { order: number }, i: number) => {
                  data.order =
                    sourceData[i]?.order === sourceData[i + 1]?.order
                      ? sourceData[i]?.order + 1
                      : !sourceData[i].order
                      ? 1
                      : sourceData[i].order
                  return data
                }))
              )
              if (oldIndex > newIndex) {
                for (let i = newIndex; i <= oldIndex; i++) {
                  updateOrder(newData[i])
                }
              } else {
                for (let i = oldIndex; i <= newIndex; i++) {
                  updateOrder(newData[i])
                }
              }
            }}
          />
          <div className={styles.paginationFooter}>
            <Pagination
              total={paginateData.total}
              defaultPageSize={50}
              showSizeChanger={false}
              onChange={onPaginationChange}
              pageSizeOptions={['10', '25', '50', '100']}
              onPageSizeChange={(pageSize) => {
                setPaginateData({
                  ...paginateData,
                  limit: pageSize,
                  offset: 0,
                  currentPage: 1,
                })
              }}
              pageSize={paginateData.limit}
              current={paginateData.currentPage}
              showingRecords={paginateData.showingRecords}
              className={styles.categoryPagination}
            />
          </div>
          <CreateCategoryModal
            visible={modalShowState}
            modalWidth={500}
            wrapClassName="addCategoryModal"
            title={
              editData?.id
                ? t('setup.services.categoriestab.editservicecategorymodal')
                : t('setup.services.categoriestab.createservicecategorymodal')
            }
            onCancel={() => {
              handleReset()
              setEditData(null)
              closeModal?.()
            }}
          >
            <div className="nameInput">
              <label>
                {t(
                  'setup.services.categoriestab.createservicecategorymodal.name'
                )}
              </label>
              <FormikInput
                name="name"
                placeholder={t(
                  'setup.services.categoriestab.createservicecategorymodal.name.placeholder'
                )}
                value={values?.name}
                onChange={(val) => setFieldValue('name', val.target.value)}
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>
            <div className={styles.appointmentColor}>
              <p className={styles.appointmentColorTitle}>
                {t(
                  'setup.services.categoriestab.createservicecategorymodal.defaultappointmentcolour'
                )}
              </p>
              <div className={styles.appointmentColorItems}>
                {appointmentColors.map((color) => (
                  <div
                    key={color}
                    className={
                      color === values?.color
                        ? classNames(
                            styles.appointmentColorItem,
                            styles.appointmentColorSelected
                          )
                        : styles.appointmentColorItem
                    }
                    onClick={() => setFieldValue('color', color)}
                  >
                    <div
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="chooseImageInput">
              <label>
                {t('setup.services.servicestab.createmodal.general.image')}
              </label>
              <div
                className={styles.createCategoryImageContainer}
                style={{ backgroundImage: `url(${values.image})` }}
              >
                {values.image && (
                  <span
                    className={styles.categoryCloseIcon}
                    onClick={() => setFieldValue('image', null)}
                  >
                    <CloseCircleFilled />
                  </span>
                )}
                {!values.image && (
                  <PictureOutlined
                    style={{
                      color: 'var(--light-grey-color)',
                      fontSize: '32px',
                    }}
                  />
                )}
              </div>
              <Button
                type="default"
                size="small"
                className={styles.chooseImgBtn}
                onClick={() => setShowImageSelector(true)}
              >
                <PlusOutlined />
                {t(
                  'setup.services.categoriestab.createservicecategorymodal.choosefromlibrary'
                )}
              </Button>
              <ImageSelectorModal
                visible={showImageSelector}
                onOk={(image) => {
                  setFieldValue('image', image.source)
                  setShowImageSelector(false)
                }}
                onCancel={() => {
                  setShowImageSelector(false)
                }}
              />
            </div>
            <div className="footerBtnInput">
              <div>
                <label>{t('marketingsource-status-label')}</label>
                <Switch
                  size="small"
                  checked={values?.is_active}
                  onChange={(check) => setFieldValue('is_active', check)}
                />
              </div>
              <div>
                <Button
                  type="default"
                  size="large"
                  onClick={() => closeModal?.()}
                >
                  {t('common-label-cancel')}
                </Button>
              </div>
              <div>
                {editData?.id && !values?.is_active && (
                  <Button
                    size="large"
                    onClick={() => {
                      closeModal?.()
                      setDeleteModal((val) => !val)
                    }}
                  >
                    {t('common-label-delete')}
                  </Button>
                )}
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleSubmit()}
                >
                  {!editData?.id
                    ? t('common-label-create')
                    : t('common-label-save')}
                </Button>
              </div>
            </div>
          </CreateCategoryModal>
          <CreateCategoryModal
            modalWidth={682}
            centered={true}
            onCancel={() => {
              setDeleteModal(false)
            }}
            onOk={async () => {
              const { id } = editData
              await deleteMutation({
                variables: { id },
                optimisticResponse: {},
                refetchQueries: [
                  {
                    query: ServiceCategoriesDocument,
                    ...listQueryVariables(),
                  },
                  {
                    query: ServiceCategoriesAggregateDocument,
                    ...listAggregateQueryVariables(),
                  },
                ],
              })
              setDeleteModal(false)
            }}
            visible={openDeleteModal}
            title={t('setup.services.categoriestab.deletemodal.title')}
            newButtonText={t('setup.services.categoriestab.deletemodal.button')}
            isValidate={true}
          >
            <span className={styles.categoriesName}>
              {editData?.name} {t('common-label-delete-warning')}
            </span>
          </CreateCategoryModal>
        </div>
      )}
    </Formik>
  )
}

export default Categories
