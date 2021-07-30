import { Popover, Drawer } from 'antd'
import { Formik } from 'formik'
import { Radio } from 'formik-antd'
import { FilterOutlined } from '@ant-design/icons'
import { Button } from '@pabau/ui'
import useWindowSize from '../../hooks/useWindowSize'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/products/list.module.less'
import { useState } from 'react'
interface P {
  initialValues: { status: number; type: string }
  selectedCategoryType: string
  activeTab: string
  categoryType: string[]
  ActiveTab: any
  changeFilter: (status: number) => void
  changeCategoryType: (type: string) => void
}

export const Filter = ({
  initialValues,
  selectedCategoryType,
  activeTab,
  categoryType,
  ActiveTab,
  changeFilter,
  changeCategoryType,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  const size = useWindowSize()

  const [mobFilterDrawer, setMobFilterDrawer] = useState(false)

  const popoverContent = (values, setFieldValue, resetForm, submitForm) => {
    return (
      <div>
        <p className={styles.filterBtnReset} onClick={() => resetForm()}>
          {t('common-label-reset')}
          <span
            style={{ paddingLeft: '10px' }}
            onClick={() => {
              setMobFilterDrawer((e) => !e)
            }}
          >
            {t('add-button-filter-cancel')}
          </span>
        </p>
        <p>{t('add-button-filter-header-text-status')} </p>
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
            <label>{t('products.list.create.category.categorytype')}</label>
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
          onClick={() => {
            submitForm()
            if (size.width < 768) setMobFilterDrawer(() => !mobFilterDrawer)
          }}
          style={{ marginTop: '1rem' }}
        >
          {t('common-label-apply')}
        </Button>
      </div>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values) => {
        changeFilter(values?.status)
        if (values?.type !== selectedCategoryType) {
          changeCategoryType(values?.type)
        }
      }}
    >
      {({ setFieldValue, values, resetForm, submitForm }) => {
        const renderData =
          size.width > 767 ? (
            <Popover
              content={popoverContent(
                values,
                setFieldValue,
                resetForm,
                submitForm
              )}
              title={t('add-button-filter-header-text-filter')}
              trigger={'click'}
              placement={size.width > 767 ? 'bottom' : 'bottomRight'}
              overlayClassName={styles.filterModal}
            >
              <Button>
                <FilterOutlined />
                {t('products.list.filter')}
              </Button>
            </Popover>
          ) : (
            <>
              <FilterOutlined
                className={styles.downloadIconStyle}
                onClick={() => setMobFilterDrawer(() => !mobFilterDrawer)}
              />
              <Drawer
                visible={mobFilterDrawer}
                className={styles.mobFilterDrawer}
                closable={false}
              >
                {popoverContent(values, setFieldValue, resetForm, submitForm)}
              </Drawer>
            </>
          )
        return renderData
      }}
    </Formik>
  )
}

export default Filter
