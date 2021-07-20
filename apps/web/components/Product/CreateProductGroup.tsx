import type { CategoryFragment } from '@pabau/graphql'
import { BasicModal, Button, ImageSelectorModal, CheckboxTree } from '@pabau/ui'
import { PlusOutlined } from '@ant-design/icons'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './ProductListComponents.module.less'

const newGroup = {
  id: 0,
  name: '',
  image: '',
  InvCategory: [
    {
      name: '',
      id: 0,
    },
  ],
}
interface P {
  groupModalType: string
  changeModalState: (visible: boolean) => void
  categories: CategoryFragment[]
  loadingCategories: boolean
  formikValues: typeof newGroup
  onCreate: (
    values: { name: string; id: number },
    categories?: number[]
  ) => void
  onEdit: (values: { name: string; id: number }, categories?: number[]) => void
  visible: boolean
}

const CreateProductGroup = ({
  groupModalType,
  onCreate,
  onEdit,
  categories,
  loadingCategories,
  changeModalState,
  formikValues,
  visible,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [expandedKeys, setExpandedKeys] = useState(['all'])
  const [formikInitialValues, setFormikInitialValues] = useState<
    typeof newGroup
  >(newGroup)
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  const setInitialValue = (values: typeof newGroup) => {
    setFormikInitialValues(values)
    setCheckedKeys(
      values?.InvCategory?.map((category) => category?.id.toString())
    )
  }

  useEffect(() => {
    formikValues
      ? setInitialValue(formikValues)
      : setFormikInitialValues(newGroup)
  }, [formikValues])
  const onExpand = (expandedKeysValue: string[]) => {
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue) => setCheckedKeys(checkedKeysValue)
  return (
    <Formik
      initialValues={formikInitialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Name is  required!')
          .min(
            2,
            t('crud-table-input-min-length-validate', {
              what: 'products.list.category.column.name',
              min: 2,
            })
          )
          .max(
            50,
            t('crud-table-input-max-length-validate', {
              what: t('products.list.category.column.name'),
            })
          ),
      })}
      onSubmit={(values, { resetForm }) => {
        const convertedCategories = checkedKeys?.map((key) => Number(key))
        groupModalType === 'Create'
          ? onCreate(values, convertedCategories)
          : onEdit(values, convertedCategories)
        changeModalState(false)
        resetForm()
      }}
    >
      {({ setFieldValue, resetForm, isValid, values }) =>
        ({ visible } && (
          <BasicModal
            visible={visible}
            modalWidth={500}
            wrapClassName={styles.productGroupModal}
            title={
              groupModalType === 'Create'
                ? t('products.list.products.groupmodal.title.create')
                : t('products.list.products.groupmodal.title.edit')
            }
            onCancel={() => {
              resetForm()
              changeModalState(false)
            }}
          >
            <Form layout="vertical">
              <div className="nameInput">
                <label>{t('products.list.products.groupmodal.name')}</label>
                <Input
                  name={'name'}
                  size={'large'}
                  placeholder={t(
                    'products.list.products.groupmodal.name.placeholder'
                  )}
                />
              </div>
              <div style={{ marginTop: '30px' }}>
                <CheckboxTree
                  treeData={[
                    {
                      children:
                        !loadingCategories &&
                        categories?.map((category) => {
                          return {
                            key: category?.id.toString(),
                            title: category?.name,
                          }
                        }),
                      key: 'all',
                      title: t('products.list.products.groupmodal.category'),
                    },
                  ]}
                  checkedKeys={checkedKeys}
                  expandedKeys={expandedKeys}
                  onCheck={onCheck}
                  onExpand={onExpand}
                  autoExpandParent={autoExpandParent}
                />
              </div>
              <div className="chooseImageInput">
                <label>{t('products.list.products.groupmodal.image')}</label>
                <Button
                  type="default"
                  size="small"
                  className={styles.chooseImgBtn}
                  onClick={() => setShowImageSelector(true)}
                >
                  <PlusOutlined />
                  {t('products.list.products.groupmodal.image.choose')}
                </Button>
                {values?.image && (
                  <div
                    className={styles.productGroupImgPreview}
                    style={{
                      backgroundImage: `url(${values?.image})`,
                    }}
                  />
                )}
              </div>
              <div className="footerBtnInput">
                <div>
                  <SubmitButton type="default" size="large">
                    {t('common-label-cancel')}
                  </SubmitButton>
                </div>
                <div>
                  <SubmitButton type="primary" size="large" disabled={!isValid}>
                    {groupModalType === 'Create'
                      ? t('common-label-create')
                      : t('common-label-save')}
                  </SubmitButton>
                </div>
              </div>
            </Form>
            {showImageSelector && (
              <ImageSelectorModal
                visible={showImageSelector}
                title={t('ui.imageselector.title')}
                attachButtonText={t('ui.imageselector.attach')}
                chooseButtonText={t('ui.imageselector.choose')}
                onOk={(image) => {
                  setFieldValue('image', image.source)
                  setShowImageSelector(false)
                }}
                onCancel={() => {
                  setShowImageSelector(false)
                }}
              />
            )}
          </BasicModal>
        ))
      }
    </Formik>
  )
}

export default CreateProductGroup
