import React, { FC, useState, useContext } from 'react'
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
import { MasterCategory } from '../../types/services'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useSelectedDataStore } from '../../store/selectedData'
import { SettingsContext } from '../../context/settings-context'

export interface P {
  items: MasterCategory[]
  onSelected: (id: number) => void
}

export const ServiceCategorySelector: FC<P> = ({ items, onSelected }) => {
  const [showMasterCategories, setShowMasterCategories] = useState(true)
  const [selectedData, setSelectedData] = useSelectedDataStore()
  const [isGroup, setIsGroup] = useState<boolean>(false)
  const settings = useContext(SettingsContext)
  console.log('SETTINGS', settings)
  const handleSelectedMasterCategory = (id: number) => {
    setShowMasterCategories(false)
    setSelectedData('SET_MASTER_CATEGORY_ID', id)
  }

  const handleSelectedCategory = (id: number) => {
    setSelectedData('SET_CATEGORY_ID', id)
    onSelected(id)
  }

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
                  !isGroup && styles.active
                )}
                onClick={() => {
                  setSelectedData('SET_PEOPLE_COUNT', 1)
                  setIsGroup(false)
                }}
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
                  isGroup && styles.active
                )}
                onClick={() => {
                  setSelectedData('SET_PEOPLE_COUNT', 2)
                  setIsGroup(true)
                }}
              >
                <span className={styles.userIcon}>
                  <TeamOutlined />
                  <CheckCircleFilled />
                </span>
                <p>{t('connect.onlinebooking.selector.group')}</p>
              </div>
            </div>

            {isGroup && (
              <Formik
                enableReinitialize={true}
                initialValues={{ persons: 2 }}
                validationSchema={Yup.object({
                  persons: Yup.number()
                    .min(2)
                    .max(50)
                    .required('between two and fifty'),
                })}
                onSubmit={null}
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
                          setSelectedData(
                            'SET_PEOPLE_COUNT',
                            Number(values.target.value)
                          )
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
                  onSelected(null)
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
              .find((row) => row.id === selectedData.masterCategoryID)
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
