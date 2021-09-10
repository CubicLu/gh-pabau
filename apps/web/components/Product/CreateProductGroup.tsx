import type { CategoryFragment } from '@pabau/graphql'
import {
  BasicModal,
  Button,
  ImageSelectorModal,
  CheckboxTree,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { PlusOutlined } from '@ant-design/icons'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './ProductListComponents.module.less'
import postData, { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'
import { cdnURL } from '../../baseUrl'

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
  changeModalState,
  formikValues,
  visible,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [expandedKeys, setExpandedKeys] = useState(['all'])
  const [formikInitialValues, setFormikInitialValues] =
    useState<typeof newGroup>(newGroup)
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  const setInitialValue = (values: typeof newGroup) => {
    setFormikInitialValues(values)
    setCheckedKeys(
      values?.InvCategory?.map((category) => category?.id?.toString())
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
          .required(t('products.list.products.name.required'))
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
              max: 50,
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
      {({ setFieldValue, resetForm, values }) =>
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
            <Form layout="vertical" className={styles.createGroupModal}>
              <Form.Item name={'name'}>
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
              </Form.Item>
              <div
                style={{
                  marginTop: '30px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                <CheckboxTree
                  treeData={[
                    {
                      children: categories?.map((category) => {
                        return {
                          key: category?.id?.toString(),
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
                  <Button
                    type="default"
                    size="large"
                    onClick={() => {
                      resetForm()
                      changeModalState(false)
                    }}
                  >
                    {t('common-label-cancel')}
                  </Button>
                </div>
                <div>
                  <SubmitButton type="primary" size="large">
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
                onOk={async (image, file) => {
                  if (file) {
                    const reader = new FileReader()
                    if (file?.type?.match('image.*')) {
                      reader.readAsDataURL(file)
                    }
                    reader.onloadend = async () => {
                      const data = await postData(
                        cdnURL + '/api/upload.php',
                        {
                          mode: 'upload-cropped-photo',
                          imageData: reader.result.toString(),
                          section: 'avatar_photos',
                          type: 'file_attachments',
                        },
                        null
                      )
                      if (data.error) {
                        Notification(NotificationType.error, t(data.code))
                        return
                      } else {
                        setFieldValue('image', getImage(data.path))
                        setShowImageSelector(false)
                      }
                    }
                  } else {
                    setFieldValue('image', image.source)
                    setShowImageSelector(false)
                  }
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
