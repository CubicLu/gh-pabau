import React, { FC, useState } from 'react'
import styles from './selector.module.less'
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
import ClassNames from 'classnames'
export interface Service {
  id: number
  name: string
  rating: number
  duration: string
  price: string
  online_only_service?: boolean
  selected: boolean
  review: number
  is_bundle: boolean
}
export interface Category {
  id: number
  name: string
  icon: JSX.Element
  video: boolean
  rdmValue: number
  active: boolean
  services: Service[]
}
export interface MasterCategory {
  id: number
  name: string
  active: boolean
  icon: JSX.Element
  addonIcon?: JSX.Element
  categories: Category[]
}

export interface ChooseModalProps {
  view: boolean
  items: MasterCategory[]
  onSelected: (item: Category, id: number) => void
  click: (member: number, viewbtn: boolean) => void
  translation: (val: string) => string
  indicator: boolean
  setindicator: (valuee: boolean) => void
}

export const ChooseModal: FC<ChooseModalProps> = ({
  items,
  onSelected,
  click,
  view,
  translation,
  indicator,
  setindicator,
}) => {
  const [type, settype] = useState('')
  const [id, setid] = useState<number>()
  const [member, setmember] = useState<number>(2)
  //const [cat, setcat] = useState(false)
  const [category, setcategory] = useState<MasterCategory>()
  // const [viewall, setviewall] = useState(true)
  //const { t } = useTranslationI18()
  const handleSelectItem = (item: Category) => {
    console.log(item)
    item.active = true
    onSelected(item, id)
  }
  const intial = {
    persons: 2,
  }
  const formikValidationSchema = Yup.object({
    persons: Yup.number().min(2).max(50).required('between two and fifty'),
  })
  // {translation('connect.onlinebooking.selector.group.description')}
  return (
    <div className={styles.consultation}>
      {view ? (
        <>
          <div className={styles.alertMsg}>
            <p>{translation('connect.onlinebooking.selector.information')}</p>
          </div>
          <div className={styles.prsongroup}>
            <h5>
              {translation('connect.onlinebooking.selector.group.description')}
            </h5>
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
                <p>{translation('connect.onlinebooking.selector.me')}</p>
              </div>
              <div
                //  className={styles.userInfo}
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
                <p>{translation('connect.onlinebooking.selector.group')}</p>
              </div>
            </div>

            {type === 'group' && (
              <Formik
                enableReinitialize={true}
                initialValues={intial}
                validationSchema={formikValidationSchema}
                onSubmit={(values) => {
                  //console.log(values)
                }}
              >
                {({ setFieldValue }) => (
                  <Form
                    className={styles.formInput}
                    initialValues={{
                      remember: true,
                    }}
                    layout="vertical"
                  >
                    <Form.Item
                      label={translation('Number of people')}
                      name="persons"
                    >
                      <Input
                        name="persons"
                        type={'number'}
                        autoComplete="off"
                        onChange={(values) => {
                          setmember(Number(values.target.value))
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
      {indicator ? (
        <div className={styles.slide}>
          <div
            className={ClassNames(
              styles.custCard
              // indicator && styles.fadeRight,
              // !indicator && styles.fadeLeft
            )}
          >
            {category.categories.map((item) => (
              <div
                key={item.id}
                className={styles.chooseServiceTypeItem}
                onClick={() => {
                  // setcategory(item)
                  //setcat(true)
                  setindicator(false)
                  handleSelectItem(item)
                }}
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
      ) : (
        <div>
          <div
            className={ClassNames(
              styles.custCard
              // !indicator && styles.fadeLeft,
              // indicator && styles.fadeRight
            )}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={styles.chooseServiceTypeItem}
                onClick={() => {
                  setcategory(item)
                  setindicator(true)
                  setid(item.id)
                  click(type === 'group' ? member : 1, false)
                }}
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
              {view && (
                <Button
                  onClick={() => {
                    // setviewall(false)
                    click(type === 'group' ? member : 1, true)
                  }}
                  className={styles.viewBut}
                >
                  {translation('connect.onlinebooking.selector.viewall')}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChooseModal
