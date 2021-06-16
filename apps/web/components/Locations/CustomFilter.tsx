import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonTypes } from '@pabau/ui'
import { Radio, Select } from 'antd'
import { Formik } from 'formik'
import React, { FC } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { getBadgesList } from '../../mocks/Locations'
import styles from './LocationsLayout.module.less'

interface P {
  onFilter(values: string | string[] | boolean | number | any): void
  formRef: any
}

interface InitialValues {
  status: string
  tags: string[]
}

const CustomFilter: FC<P> = ({ onFilter, formRef }) => {
  const { t } = useTranslationI18()
  const { badgesList } = getBadgesList(t)
  const initialValues: InitialValues = {
    status: 'active',
    tags: [],
  }

  const renderOptions = () => (
    <>
      {badgesList.map((item) => (
        <Select.Option key={item.name} value={item.name}>
          <FontAwesomeIcon color={'#9292A3'} size="1x" icon={item.icon} />
          <span style={{ marginLeft: 8 }}>{item.title}</span>
        </Select.Option>
      ))}
    </>
  )
  const onSubmit = (values) => {
    onFilter(values)
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      innerRef={formRef}
    >
      {({ setFieldValue, handleReset, values, handleSubmit }) => (
        <div className={styles.popover}>
          <div className={styles.filterTitle}>
            <div className={styles.divider}>{t('setup.locations.filter')}</div>
          </div>
          <div>
            <div className={styles.statusesContainer}>
              {t('setup.locations.status')}
            </div>
            <div>
              <Radio.Group
                onChange={(e) => setFieldValue('status', e.target.value)}
                value={values.status}
                className={styles.radio}
              >
                <Radio value={'active'} className={styles.active}>
                  {t('setup.locations.active')}
                </Radio>
                <Radio value={'inactive'} className={styles.inactive}>
                  {t('setup.locations.disabled')}
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <div className={styles.box}>
            <p>{t('setup.locations.tags')}</p>
            <Select
              mode="multiple"
              showArrow
              style={{ width: '100%' }}
              placeholder={t('setup.locations.selecttags')}
              value={values.tags}
              onChange={(value) => {
                setFieldValue('tags', value)
              }}
            >
              {renderOptions()}
            </Select>
          </div>

          <div className={styles.btngroup}>
            <Button onClick={handleReset}>
              {t('setup.locations.clearall')}
            </Button>
            <Button
              type={ButtonTypes.primary}
              className={styles.btn}
              onClick={() => handleSubmit()}
            >
              {t('setup.locations.applyfilters')}
            </Button>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default CustomFilter
