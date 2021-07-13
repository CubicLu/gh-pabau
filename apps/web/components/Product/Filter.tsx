import { Popover } from 'antd'
import { Formik } from 'formik'
import { Radio } from 'formik-antd'
import { FilterOutlined } from '@ant-design/icons'
import { Button } from '@pabau/ui'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/products/list.module.less'

interface P {
  filter: number
  initialValues: { status: number; type: string }
  selectedCategoryType: string
  activeTab: string
  categoryType: string[]
  ActiveTab: any
  changeFilter: (status: number) => void
  changeCategoryType: (type: string) => void
}

export const Filter = ({
  filter,
  initialValues,
  selectedCategoryType,
  activeTab,
  categoryType,
  ActiveTab,
  changeFilter,
  changeCategoryType,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values) => {
        if (values?.status !== filter) changeFilter(values?.status)
        if (values?.type !== selectedCategoryType) {
          changeCategoryType(values?.type)
        }
      }}
    >
      {({ setFieldValue, values, resetForm, submitForm }) => (
        <Popover
          content={
            <div>
              <p className={styles.filterBtnReset} onClick={() => resetForm()}>
                {t('common-label-reset')}
              </p>
              <p>{t('add-button-filter-header-text-status')}</p>
              <Radio.Group
                name="status"
                onChange={(val) => setFieldValue('status', val?.target?.value)}
              >
                <Radio name="status" value={1}>
                  <span>{t('basic-crud-table-button-active')}</span>
                </Radio>
                <br />
                <Radio name="status" value={0}>
                  <span>{t('basic-crud-table-button-inactive')}</span>
                </Radio>
              </Radio.Group>
              {activeTab === ActiveTab.Products && (
                <div>
                  <label>
                    {t('products.list.create.category.categorytype')}
                  </label>
                  <div
                    className={styles.productCategoryType}
                    defaultValue={values?.type}
                  >
                    {categoryType?.map((type) => (
                      <div
                        key={type}
                        className={type === values?.type ? styles.selected : ''}
                        onClick={() => setFieldValue('type', type)}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <Button
                block
                onClick={() => submitForm()}
                style={{ marginTop: '1rem' }}
              >
                {t('common-label-apply')}
              </Button>
            </div>
          }
          title={t('add-button-filter-header-text-filter')}
          trigger={'click'}
          placement={'bottom'}
          overlayClassName={styles.filterModal}
        >
          <Button>
            <FilterOutlined />
            {t('products.list.filter')}
          </Button>
        </Popover>
      )}
    </Formik>
  )
}

export default Filter
