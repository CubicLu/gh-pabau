import React, { FC, useState } from 'react'
import styles from './ServiceCategorySelector.module.less'
import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
import {
  RightOutlined,
  UserOutlined,
  TeamOutlined,
  CheckCircleFilled,
} from '@ant-design/icons'
import { Button } from '@pabau/ui'
import * as Yup from 'yup'
import classnames from 'classnames'

import { MasterCategory, Category, Service } from '../../types/services'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

export interface P {
  items: MasterCategory[]
  onSelected: (id: number) => void
  click: (member: number, viewbtn: boolean) => void
}

export const ServiceCategorySelector: FC<P> = ({
  items,
  onSelected,
  click,
}) => {
  const [showMasterCategories, setShowMasterCategories] = useState(true)
  const [masterCategoryID, setMasterCategoryID] = useState<number>()
  const [categoryID, setCategoryID] = useState<number>()
  const [peopleBooked, setPeopleBooked] = useState(1)

  const [type, settype] = useState('')

  const handleSelectedMasterCategory = (id: number) => {
    setShowMasterCategories(false)
    setMasterCategoryID(id)
  }

  const handleSelectedCategory = (id: number) => {
    setCategoryID(id)
    onSelected(id)
  }

  const formIntialValues = {
    persons: 2,
  }
  const formikValidationSchema = Yup.object({
    persons: Yup.number().min(2).max(50).required('between two and fifty'),
  })

  const { t } = useTranslationI18()

  return (
    <div className={styles.consultation}>
      {showMasterCategories ? (
        <>
          <div className={styles.alertMsg}>
            <p>{t('connect.onlinebooking.selector.information')}</p>
          </div>
          <div className={styles.prsongroup}>
            <h5>{t('connect.onlinebooking.selector.group.description')}</h5>
            <div className={styles.userWrapper}>
              <div
                className={classnames(
                  styles.userInfo,
                  type !== 'group' && styles.active
                )}
                onClick={() => settype('me')}
              >
                <span className={styles.userIcon}>
                  <UserOutlined />
                  <CheckCircleFilled />
                </span>
                <p>{t('connect.onlinebooking.selector.me')}</p>
              </div>
              <div
                className={classnames(
                  styles.userInfo,
                  type === 'group' && styles.active
                )}
                onClick={() => settype('group')}
              >
                <span className={styles.userIcon}>
                  <TeamOutlined />
                  <CheckCircleFilled />
                </span>
                <p>{t('connect.onlinebooking.selector.group')}</p>
              </div>
            </div>

            {type === 'group' && (
              <Formik
                enableReinitialize={true}
                initialValues={formIntialValues}
                validationSchema={formikValidationSchema}
                onSubmit={(values) => {}}
              >
                {({ setFieldValue }) => (
                  <Form
                    className={styles.formInput}
                    initialValues={{
                      remember: true,
                    }}
                    layout="vertical"
                  >
                    <Form.Item label={t('Number of people')} name="persons">
                      <Input
                        name="persons"
                        type={'number'}
                        autoComplete="off"
                        onChange={(values) => {
                          setPeopleBooked(Number(values.target.value))
                          setFieldValue('persons', values.target.value)
                        }}
                      />
                    </Form.Item>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </>
      ) : null}
      {showMasterCategories ? (
        <div>
          <div className={styles.custCard}>
            {items.map((item) => (
              <div
                key={item.id}
                className={styles.chooseServiceTypeItem}
                onClick={() => handleSelectedMasterCategory(item.id)}
              >
                <div className={styles.section1}>
                  <div>{item.icon}</div>
                  <p className={styles.cardText}>{item.name}</p>
                </div>

                <RightOutlined />
                {item.addonIcon && <div>{item.addonIcon}</div>}
              </div>
            ))}
            <div className={styles.btnView}>
              <Button
                onClick={() => {
                  click(type === 'group' ? peopleBooked : 1, true)
                }}
                className={styles.viewBut}
              >
                {t('connect.onlinebooking.selector.viewall')}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.slide}>
          <div className={styles.custCard}>
            {items
              .find((row) => row.id === masterCategoryID)
              ?.categories.map((item) => (
                <div
                  key={item.id}
                  className={styles.chooseServiceTypeItem}
                  onClick={() => handleSelectedCategory(item.id)}
                >
                  <div className={styles.section1}>
                    <div>{item.icon}</div>
                    <p className={styles.cardText}>{item.name}</p>
                  </div>

                  <RightOutlined />
                </div>
              ))}
            <div className={styles.btnView}></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceCategorySelector
