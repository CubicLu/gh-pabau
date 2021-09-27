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
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useSelectedDataStore } from '../../store/selectedData'
import { SettingsContext } from '../../context/settings-context'
import { useCompanyServicesCategorisedQuery } from '@pabau/graphql'
import { Image } from 'antd'

export interface P {
  onSelected: (id: number) => void
}

export const ServiceCategorySelector: FC<P> = ({ onSelected }) => {
  const [showMasterCategories, setShowMasterCategories] = useState(true)
  const [selectedData, setSelectedData] = useSelectedDataStore()
  const [isGroup, setIsGroup] = useState<boolean>(false)
  const settings = useContext(SettingsContext)
  const handleSelectedMasterCategory = (id: number) => {
    setShowMasterCategories(false)
    setSelectedData('SET_MASTER_CATEGORY_ID', id)
  }

  const handleSelectedCategory = (id: number) => {
    setSelectedData('SET_CATEGORY_ID', id)
    onSelected(id)
  }

  const {
    loading: loadingServices,
    error: errorServices,
    data: servicesCategorised,
  } = useCompanyServicesCategorisedQuery({
    variables: {
      company_id: settings?.id,
    },
  })

  const { t } = useTranslationI18()

  if (errorServices) return <div>Error!</div>
  if (loadingServices) return <div>Loading...</div>

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
            {servicesCategorised.Public_MasterCategories?.map((item) => (
              <div
                key={item.id}
                className={styles.chooseServiceTypeItem}
                onClick={() => handleSelectedMasterCategory(item.id)}
              >
                <div className={styles.section1}>
                  <Image
                    preview={false}
                    height={'40px'}
                    width={'40px'}
                    src={'https://crm.pabau.com' + item.image}
                    alt={item.name}
                  />
                  <p className={styles.cardText}>{item.name}</p>
                </div>

                <RightOutlined />
                {/*{item.addonIcon && <div>{item.addonIcon}</div>}*/}
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
            {servicesCategorised.Public_MasterCategories.find(
              (row) => row.id === selectedData.masterCategoryID
            )?.Public_ServiceCategories?.map((item) => (
              <div
                key={item.id}
                className={styles.chooseServiceTypeItem}
                onClick={() => handleSelectedCategory(item.id)}
              >
                <div className={styles.section1}>
                  <Image
                    preview={false}
                    height={'40px'}
                    width={'40px'}
                    src={'https://crm.pabau.com' + item.image}
                    alt={item.name}
                  />
                  <p className={styles.cardText}>{item.name}</p>
                </div>

                <RightOutlined />
              </div>
            ))}
            <div className={styles.btnView}>&nbsp;</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceCategorySelector
